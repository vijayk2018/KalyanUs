import {redirect} from 'react-router';

const CUSTOMER_CREATE_MUTATION = `
  mutation CustomerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;

function buildRedirectUrl(base: string, key: string, value: string) {
  const url = new URL(base, 'http://localhost');
  url.searchParams.set(key, value);
  return `${url.pathname}${url.search}${url.hash}`;
}

function normalizePhone(phone: string, dialCode: string) {
  const trimmedPhone = phone.trim();
  if (!trimmedPhone) return '';

  const compactDial = dialCode.trim().replace(/\s+/g, '');
  const digitsOnlyPhone = trimmedPhone.replace(/[^\d]/g, '');
  if (!digitsOnlyPhone) return '';

  if (trimmedPhone.startsWith('+')) {
    return `+${trimmedPhone.replace(/[^\d]/g, '')}`;
  }

  if (/^\+\d+$/.test(compactDial)) {
    return `${compactDial}${digitsOnlyPhone}`;
  }

  return '';
}

export async function action({request, context}: {request: Request; context: any}) {
  const formData = await request.formData();

  const fullName = String(formData.get('full_name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const dialCode = String(formData.get('dial_code') || '').trim();
  const returnTo = String(formData.get('return_to') || '/').trim() || '/';
  const acceptTerms = formData.get('accept_terms') === 'on';

  if (!fullName || !email) {
    return redirect(
      buildRedirectUrl(
        returnTo,
        'customerAccountError',
        'Please provide full name and email.',
      ),
    );
  }

  if (!acceptTerms) {
    return redirect(
      buildRedirectUrl(
        returnTo,
        'customerAccountError',
        'Please accept Terms of Use and Privacy Policy.',
      ),
    );
  }

  const [firstName, ...lastNameParts] = fullName.split(/\s+/);
  const lastName = lastNameParts.join(' ');
  const normalizedPhone = normalizePhone(phone, dialCode);
  const configuredStoreDomain = context.env?.PUBLIC_STORE_DOMAIN || 'avi0gn-m1.myshopify.com';
  const normalizedStoreDomain = configuredStoreDomain.replace(/^https?:\/\//, '');
  const adminApiUrl = `https://${normalizedStoreDomain}/admin/api/2026-01/graphql.json`;
  const shopifyAccessToken =
    context.env?.SHOPIFY_ACCESS_TOKEN ?? context.env?.ADMIN_API_ACCESS_TOKEN;

  if (!shopifyAccessToken) {
    return redirect(
      buildRedirectUrl(
        returnTo,
        'customerAccountError',
        'Server is missing SHOPIFY_ACCESS_TOKEN or ADMIN_API_ACCESS_TOKEN configuration.',
      ),
    );
  }

  const response = await fetch(adminApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': shopifyAccessToken,
    },
    body: JSON.stringify({
      query: CUSTOMER_CREATE_MUTATION,
      variables: {
        input: {
          firstName,
          lastName: lastName || undefined,
          email,
          phone: normalizedPhone || undefined,
        },
      },
    }),
  });

  const json = (await response.json()) as {
    data?: {
      customerCreate?: {
        customer?: {id?: string; email?: string};
        userErrors?: Array<{field?: string[]; message?: string}>;
      };
    };
    errors?: Array<{message?: string}>;
  };

  const topLevelError = json.errors?.[0]?.message;
  const apiErrors = json.data?.customerCreate?.userErrors ?? [];
  if (!response.ok || topLevelError || apiErrors.length) {
    const errorMessage =
      apiErrors[0]?.message ||
      topLevelError ||
      'Unable to create account. Please try again.';
    return redirect(buildRedirectUrl(returnTo, 'customerAccountError', errorMessage));
  }

  const loginUrl = new URL('/account/login', 'http://localhost');
  loginUrl.searchParams.set('login_hint', email);
  loginUrl.searchParams.set('login_hint_mode', 'submit');
  loginUrl.searchParams.set('return_to', returnTo);

  return redirect(`${loginUrl.pathname}${loginUrl.search}`);
}

export async function loader() {
  return redirect('/');
}
