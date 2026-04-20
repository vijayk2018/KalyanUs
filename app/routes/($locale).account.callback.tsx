import {redirect} from 'react-router';

export async function loader({context, request}: {context: any; request: Request}) {
  await context.customerAccount.handleAuthStatus();
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('return_to') || '/';
  const safeReturnTo = returnTo.includes('://') ? '/' : returnTo;

  return redirect(safeReturnTo);
}
