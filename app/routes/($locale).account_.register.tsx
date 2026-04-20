import {redirect} from 'react-router';

const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

function buildRedirectUrl(base: string, key: string, value: string) {
  const url = new URL(base, 'http://localhost');
  url.searchParams.set(key, value);
  return `${url.pathname}${url.search}${url.hash}`;
}

export async function action({request, context}: {request: Request; context: any}) {
  const formData = await request.formData();

  const fullName = String(formData.get('full_name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const password = String(formData.get('password') || '').trim();
  const returnTo = String(formData.get('return_to') || '/').trim() || '/';
  const acceptTerms = formData.get('accept_terms') === 'on';

  if (!fullName || !email || !password || password.length < 8) {
    return redirect(
      buildRedirectUrl(
        returnTo,
        'customerAccountError',
        'Please provide full name, email, and at least 8-character password.',
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

  const {data, errors} = await context.storefront.mutate(CUSTOMER_CREATE_MUTATION, {
    variables: {
      input: {
        firstName,
        lastName: lastName || undefined,
        email,
        phone: phone || undefined,
        password,
      },
    },
  });

  const apiErrors = data?.customerCreate?.customerUserErrors ?? [];
  if (errors?.length || apiErrors.length) {
    const errorMessage =
      apiErrors[0]?.message || errors?.[0]?.message || 'Unable to create account. Please try again.';
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
