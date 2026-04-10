import type {Route} from './+types/account_.register';

export async function loader({request, context}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const locale = url.searchParams.get('locale') || undefined;
  const loginHint = url.searchParams.get('login_hint') || undefined;

  return context.customerAccount.login({
    countryCode: context.storefront.i18n.country,
    locale,
    loginHint,
    loginHintMode: 'sign_up',
  });
}
