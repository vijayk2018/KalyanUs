const CALLBACK_METAOBJECT_CREATE_MUTATION = `
  mutation CreateCallbackFormEntry($metaobject: MetaobjectCreateInput!) {
    metaobjectCreate(metaobject: $metaobject) {
      metaobject {
        id
        handle
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;

type CallbackPayload = {
  name: string;
  phone: string;
  email: string;
  preferred_store: string;
  product_title: string;
  product_handle: string;
  product_id: string;
};

const requiredFields: Array<keyof CallbackPayload> = [
  'name',
  'phone',
  'email',
  'preferred_store',
  'product_title',
  'product_handle',
  'product_id',
];

export async function action({request, context}: {request: Request; context: any}) {
  let body: Partial<CallbackPayload>;
  try {
    body = (await request.json()) as Partial<CallbackPayload>;
  } catch {
    return Response.json({ok: false, error: 'Invalid request payload.'}, {status: 400});
  }

  const payload = {
    name: String(body.name ?? '').trim(),
    phone: String(body.phone ?? '').trim(),
    email: String(body.email ?? '').trim(),
    preferred_store: String(body.preferred_store ?? '').trim(),
    product_title: String(body.product_title ?? '').trim(),
    product_handle: String(body.product_handle ?? '').trim(),
    product_id: String(body.product_id ?? '').trim(),
  } satisfies CallbackPayload;

  const missingRequired = requiredFields.some((field) => !payload[field]);
  if (missingRequired) {
    return Response.json(
      {ok: false, error: 'Please fill all callback form fields.'},
      {status: 400},
    );
  }

  const adminAccessToken = context.env?.PRIVATE_ADMIN_API_TOKEN;
  const storeDomain = context.env?.PUBLIC_STORE_DOMAIN;
  if (!adminAccessToken || !storeDomain) {
    return Response.json(
      {
        ok: false,
        error:
          'Admin API credentials are missing. Set PRIVATE_ADMIN_API_TOKEN and PUBLIC_STORE_DOMAIN.',
      },
      {status: 500},
    );
  }

  const metaobjectType = context.env?.CALLBACK_METAOBJECT_TYPE ?? 'callback_form';
  const response = await fetch(`https://${storeDomain}/admin/api/2026-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminAccessToken,
    },
    body: JSON.stringify({
      query: CALLBACK_METAOBJECT_CREATE_MUTATION,
      variables: {
        metaobject: {
          type: metaobjectType,
          fields: [
            {key: 'name', value: payload.name},
            {key: 'email', value: payload.email},
            {key: 'phone', value: payload.phone},
            {key: 'preferred_store', value: payload.preferred_store},
            {key: 'product_title', value: payload.product_title},
            {key: 'product_handle', value: payload.product_handle},
            {key: 'product_id', value: payload.product_id},
            {key: 'status', value: 'new'},
            {key: 'created_at', value: new Date().toISOString()},
          ],
        },
      },
    }),
  });

  const json = (await response.json()) as {
    data?: {
      metaobjectCreate?: {
        metaobject?: {id?: string};
        userErrors?: Array<{message?: string}>;
      };
    };
    errors?: Array<{message?: string}>;
  };

  const topLevelError = json.errors?.[0]?.message;
  const userError = json.data?.metaobjectCreate?.userErrors?.[0]?.message;
  const createdMetaobjectId = json.data?.metaobjectCreate?.metaobject?.id;

  if (!response.ok || topLevelError || userError || !createdMetaobjectId) {
    return Response.json(
      {
        ok: false,
        error: topLevelError || userError || 'Failed to create callback form entry.',
      },
      {status: 500},
    );
  }

  return Response.json({ok: true});
}