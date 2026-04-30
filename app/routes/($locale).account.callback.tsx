import {redirect} from 'react-router';

export async function loader({context, request}: {context: any; request: Request}) {
  await context.customerAccount.handleAuthStatus();
  return redirect('/');
}
