const STAGED_UPLOADS_CREATE_MUTATION = `
  mutation CreateStagedUpload($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;

const FILE_CREATE_MUTATION = `
  mutation CreateReviewImage($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
      files {
        ... on MediaImage {
          id
        }
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;

const REVIEW_METAOBJECT_CREATE_MUTATION = `
  mutation CreateReviewEntry($metaobject: MetaobjectCreateInput!) {
    metaobjectCreate(metaobject: $metaobject) {
      metaobject {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;

type ReviewPayload = {
  nickname: string;
  summary: string;
  review: string;
  product_title: string;
  product_handle: string;
  product_id: string;
};

const requiredFields: Array<keyof ReviewPayload> = [
  'nickname',
  'summary',
  'review',
  'product_title',
  'product_handle',
  'product_id',
];

type AdminGraphQLResponse<T> = {
  data?: T;
  errors?: Array<{message?: string}>;
};

type AdminContext = {
  env?: {
    PUBLIC_STORE_DOMAIN?: string;
    SHOPIFY_ACCESS_TOKEN?: string;
    ADMIN_API_ACCESS_TOKEN?: string;
    REVIEW_METAOBJECT_TYPE?: string;
  };
};

async function adminGraphQL<T>(
  adminApiUrl: string,
  token: string,
  query: string,
  variables: Record<string, unknown>,
) {
  const response = await fetch(adminApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({query, variables}),
  });

  const json = (await response.json()) as AdminGraphQLResponse<T>;
  return {response, json};
}

async function uploadReviewPhoto(
  photo: File,
  adminApiUrl: string,
  token: string,
): Promise<{ok: true; fileId: string} | {ok: false; error: string}> {
  const stagedUploadResult = await adminGraphQL<{
    stagedUploadsCreate?: {
      stagedTargets?: Array<{
        url?: string;
        resourceUrl?: string;
        parameters?: Array<{name?: string; value?: string}>;
      }>;
      userErrors?: Array<{field?: string[]; message?: string}>;
    };
  }>(adminApiUrl, token, STAGED_UPLOADS_CREATE_MUTATION, {
    input: [
      {
        resource: 'FILE',
        filename: photo.name || 'review-image.jpg',
        mimeType: photo.type || 'image/jpeg',
        httpMethod: 'POST',
      },
    ],
  });

  const stagedTopError = stagedUploadResult.json.errors?.[0]?.message;
  const stagedUserError =
    stagedUploadResult.json.data?.stagedUploadsCreate?.userErrors?.[0]?.message;
  const stagedTarget =
    stagedUploadResult.json.data?.stagedUploadsCreate?.stagedTargets?.[0];
  const stagedAccessDenied = [stagedTopError, stagedUserError]
    .filter(Boolean)
    .some((message) => String(message).toLowerCase().includes('access denied'));

  if (!stagedUploadResult.response.ok || stagedTopError || stagedUserError || !stagedTarget?.url || !stagedTarget.resourceUrl) {
    if (stagedAccessDenied) {
      return {
        ok: false,
        error:
          'Shopify access token is missing file upload permission. Enable the Admin API scope write_files (and keep write_metaobjects), then reinstall/regenerate the token.',
      };
    }

    return {
      ok: false,
      error: stagedTopError || stagedUserError || 'Failed to create staged upload target.',
    };
  }

  const uploadFormData = new FormData();
  for (const param of stagedTarget.parameters ?? []) {
    if (param?.name && typeof param.value === 'string') {
      uploadFormData.append(param.name, param.value);
    }
  }
  uploadFormData.append('file', photo);

  const stagedUploadResponse = await fetch(stagedTarget.url, {
    method: 'POST',
    body: uploadFormData,
  });

  if (!stagedUploadResponse.ok) {
    return {ok: false, error: 'Failed to upload review photo file.'};
  }

  const fileCreateResult = await adminGraphQL<{
    fileCreate?: {
      files?: Array<{id?: string}>;
      userErrors?: Array<{field?: string[]; message?: string}>;
    };
  }>(adminApiUrl, token, FILE_CREATE_MUTATION, {
    files: [
      {
        contentType: 'IMAGE',
        originalSource: stagedTarget.resourceUrl,
        alt: 'Customer product review photo',
      },
    ],
  });

  const fileTopError = fileCreateResult.json.errors?.[0]?.message;
  const fileUserError = fileCreateResult.json.data?.fileCreate?.userErrors?.[0]?.message;
  const fileId = fileCreateResult.json.data?.fileCreate?.files?.[0]?.id;

  if (!fileCreateResult.response.ok || fileTopError || fileUserError || !fileId) {
    return {
      ok: false,
      error: fileTopError || fileUserError || 'Failed to create Shopify file record.',
    };
  }

  return {ok: true, fileId};
}

export async function action({request, context}: {request: Request; context: AdminContext}) {
  const formData = await request.formData();

  const payload: ReviewPayload = {
    nickname: String(formData.get('nickname') ?? '').trim(),
    summary: String(formData.get('summary') ?? '').trim(),
    review: String(formData.get('review') ?? '').trim(),
    product_title: String(formData.get('product_title') ?? '').trim(),
    product_handle: String(formData.get('product_handle') ?? '').trim(),
    product_id: String(formData.get('product_id') ?? '').trim(),
  };

  const photo = formData.get('photo');
  const isValidPhoto = photo instanceof File && photo.size > 0;

  if (!isValidPhoto || requiredFields.some((field) => !payload[field])) {
    return Response.json(
      {ok: false, error: 'Please fill all required review fields.'},
      {status: 400},
    );
  }

  const configuredStoreDomain = context.env?.PUBLIC_STORE_DOMAIN || 'avi0gn-m1.myshopify.com';
  const normalizedStoreDomain = configuredStoreDomain.replace(/^https?:\/\//, '');
  const adminApiUrl = `https://${normalizedStoreDomain}/admin/api/2026-01/graphql.json`;
  const shopifyAccessToken = 
    context.env?.SHOPIFY_ACCESS_TOKEN ?? context.env?.ADMIN_API_ACCESS_TOKEN;

  if (!shopifyAccessToken) {
    return Response.json(
      {
        ok: false,
        error:
          'Server is missing SHOPIFY_ACCESS_TOKEN or ADMIN_API_ACCESS_TOKEN configuration.',
      },
      {status: 500},
    );
  }

  const uploadResult = await uploadReviewPhoto(photo, adminApiUrl, shopifyAccessToken);
  if (!uploadResult.ok) {
    return Response.json({ok: false, error: uploadResult.error}, {status: 500});
  }

  const metaobjectType = context.env?.REVIEW_METAOBJECT_TYPE ?? 'review_form';
  const metaobjectFields: Array<{key: string; value: string}> = [
    {key: 'nickname', value: payload.nickname},
    {key: 'summary', value: payload.summary},
    {key: 'review', value: payload.review},
    {key: 'product_title', value: payload.product_title},
    {key: 'product_handle', value: payload.product_handle},
    {key: 'product_id', value: payload.product_id},
    {key: 'review_photo', value: uploadResult.fileId},
    {key: 'submitted_at', value: new Date().toISOString()},
  ];

  const createResult = await adminGraphQL<{
    metaobjectCreate?: {
      metaobject?: {id?: string};
      userErrors?: Array<{field?: string[]; message?: string}>;
    };
  }>(adminApiUrl, shopifyAccessToken, REVIEW_METAOBJECT_CREATE_MUTATION, {
    metaobject: {
      type: metaobjectType,
      fields: metaobjectFields,
    },
  });

  const topLevelError = createResult.json.errors?.[0]?.message;
  const firstUserError = createResult.json.data?.metaobjectCreate?.userErrors?.[0];
  const userErrorFieldPath = firstUserError?.field?.join('.') || 'unknown_field';
  const userError = firstUserError?.message;
  const createdMetaobjectId = createResult.json.data?.metaobjectCreate?.metaobject?.id;

  if (!createResult.response.ok || topLevelError || userError || !createdMetaobjectId) {
    return Response.json(
      {
        ok: false,
        error:
          topLevelError ||
          (userError ? `${userError} (field: ${userErrorFieldPath})` : '') ||
          'Failed to create review entry.',
      },
      {status: 500},
    );
  }

  return Response.json({ok: true});
}
