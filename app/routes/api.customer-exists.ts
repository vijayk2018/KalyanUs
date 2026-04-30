const CUSTOMER_EXISTS_QUERY = `
  query CustomerExists($query: String!) {
    customers(first: 1, query: $query) {
      nodes {
        id
      }
    }
  }
` as const;

type RequestPayload = {
  email?: string;
};

export async function action({request, context}: {request: Request; context: any}) {
  let body: RequestPayload;
  try {
    body = (await request.json()) as RequestPayload;
  } catch {
    return Response.json({ok: false, error: 'Invalid request payload.'}, {status: 400});
  }

  const email = String(body.email ?? '').trim().toLowerCase();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isEmail) {
    return Response.json(
      {ok: false, error: 'Please enter a valid email address.'},
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

  const response = await fetch(adminApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': shopifyAccessToken,
    },
    body: JSON.stringify({
      query: CUSTOMER_EXISTS_QUERY,
      variables: {
        query: `email:${email}`,
      },
    }),
  });

  const json = (await response.json()) as {
    data?: {
      customers?: {
        nodes?: Array<{id?: string}>;
      };
    };
    errors?: Array<{message?: string}>;
  };

  const topLevelError = json.errors?.[0]?.message;
  if (!response.ok || topLevelError) {
    return Response.json(
      {
        ok: false,
        error:
          topLevelError ||
          'Unable to verify account at the moment. Please try again.',
      },
      {status: 500},
    );
  }

  const exists = Boolean(json.data?.customers?.nodes?.[0]?.id);
  return Response.json({ok: true, exists});
}
