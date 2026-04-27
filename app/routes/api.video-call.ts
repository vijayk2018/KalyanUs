const VIDEO_CALL_METAOBJECT_CREATE_MUTATION = `
  mutation CreateVideoCallFormEntry($metaobject: MetaobjectCreateInput!) {
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

type VideoCallPayload = {
  schedule_mode: 'today' | 'pick_date';
  appointment_date: string;
  appointment_time: string;
  name: string;
  email: string;
  isd_code: string;
  phone: string;
  product_title: string;
  product_handle: string;
  product_id: string;
};

const requiredBaseFields: Array<keyof VideoCallPayload> = [
  'schedule_mode',
  'name',
  'email',
  'isd_code',
  'phone',
  'product_title',
  'product_handle',
  'product_id',
];

export async function action({request, context}: {request: Request; context: any}) {
  let body: Partial<VideoCallPayload>;
  try {
    body = (await request.json()) as Partial<VideoCallPayload>;
  } catch {
    return Response.json({ok: false, error: 'Invalid request payload.'}, {status: 400});
  }

  const scheduleMode =
    body.schedule_mode === 'pick_date' ? 'pick_date' : body.schedule_mode === 'today' ? 'today' : '';

  const payload = {
    schedule_mode: scheduleMode,
    appointment_date: String(body.appointment_date ?? '').trim(),
    appointment_time: String(body.appointment_time ?? '').trim(),
    name: String(body.name ?? '').trim(),
    email: String(body.email ?? '').trim(),
    isd_code: String(body.isd_code ?? '').trim(),
    phone: String(body.phone ?? '').trim(),
    product_title: String(body.product_title ?? '').trim(),
    product_handle: String(body.product_handle ?? '').trim(),
    product_id: String(body.product_id ?? '').trim(),
  } as VideoCallPayload;

  const missingBaseFields = requiredBaseFields.some((field) => !payload[field]);
  if (missingBaseFields) {
    return Response.json(
      {ok: false, error: 'Please fill all required video call fields.'},
      {status: 400},
    );
  }

  if (payload.schedule_mode === 'today' && !payload.appointment_time) {
    return Response.json(
      {ok: false, error: 'Please select a time for today.'},
      {status: 400},
    );
  }

  if (payload.schedule_mode === 'pick_date' && !payload.appointment_date) {
    return Response.json(
      {ok: false, error: 'Please select an appointment date.'},
      {status: 400},
    );
  }

  if (payload.schedule_mode === 'today') {
    payload.appointment_date = '';
  } else {
    payload.appointment_time = '';
  }

  const configuredStoreDomain =
    context.env?.PUBLIC_STORE_DOMAIN || 'avi0gn-m1.myshopify.com';
  const normalizedStoreDomain = configuredStoreDomain.replace(/^https?:\/\//, '');
  const adminApiUrl = `https://${normalizedStoreDomain}/admin/api/2026-01/graphql.json`;

  const metaobjectType = context.env?.VIDEO_CALL_METAOBJECT_TYPE ?? 'schedule_a_video_call';
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

  const response = await fetch(adminApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': shopifyAccessToken,
    },
    body: JSON.stringify({
      query: VIDEO_CALL_METAOBJECT_CREATE_MUTATION,
      variables: {
        metaobject: {
          type: metaobjectType,
          fields: [
            {key: 'schedule_mode', value: payload.schedule_mode},
            {key: 'appointment_date', value: payload.appointment_date},
            {key: 'appointment_time', value: payload.appointment_time},
            {key: 'name', value: payload.name},
            {key: 'email', value: payload.email},
            {key: 'isd_code', value: payload.isd_code},
            {key: 'phone', value: payload.phone},
            {key: 'product_title', value: payload.product_title},
            {key: 'product_handle', value: payload.product_handle},
            {key: 'product_id', value: payload.product_id},
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
        error: topLevelError || userError || 'Failed to create video call request.',
      },
      {status: 500},
    );
  }

  return Response.json({ok: true});
}
