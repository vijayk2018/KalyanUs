import {redirect} from 'react-router';

export async function loader({context, request}: {context: any; request: Request}) {
  await context.customerAccount.handleAuthStatus();
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('return_to') || '/';
  const resolvedReturnTo = new URL(returnTo, url.origin);
  const safeReturnTo =
    resolvedReturnTo.origin === url.origin
      ? `${resolvedReturnTo.pathname}${resolvedReturnTo.search}${resolvedReturnTo.hash}`
      : '/';

  return redirect(safeReturnTo);
}
