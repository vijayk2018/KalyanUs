import {
  data as remixData,
  Form,
  Link,
  Outlet,
  useLoaderData,
  useLocation,
} from 'react-router';
import {useState} from 'react';
import type {Route} from './+types/account';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  const {data, errors} = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  const {customer} = useLoaderData<typeof loader>();

  const heading = customer
    ? customer.firstName
      ? `Welcome back, ${customer.firstName}`
      : `Welcome to your account`
    : 'Account Details';

  return (
    <div className="min-h-screen bg-[#f8f7f5]" style={{fontFamily: '"Georgia", serif'}}>
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#e5e2de]">
        <div className="max-w-[1100px] mx-auto px-8 py-4 flex items-center justify-between">
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#a09890] font-sans">
            My Account
          </span>
          <Logout variant="topbar" />
          <div className="w-[200px] shrink-0 bg-white border border-[#e5e2de] rounded shadow-sm p-4">
            <AccountMenu />
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-8 py-12">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-5xl font-light text-[#2c2825] tracking-wide m-0 leading-tight">
            {heading}
          </h1>
          <div className="mt-3 w-14 h-px bg-[#a09890]" />
        </div>

        {/* Sidebar + Content */}
        <div className="flex gap-8 items-start flex-wrap">
          {/* Sidebar */}
          

          {/* Main */}
          <main className="flex-1 min-w-[300px] bg-white border border-[#e5e2de] rounded shadow-sm p-8 min-h-[460px]">
            <Outlet context={{customer}} />
          </main>
        </div>
      </div>
    </div>
  );
}

function AccountMenu() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    {to: '/account/orders',    label: 'Orders', },
    {to: '/account/profile',   label: 'Profile', },
    {to: '/account/addresses', label: 'Addresses', },
  ];
  const activeItem =
    navItems.find(
      ({to}) => location.pathname === to || location.pathname.startsWith(to + '/'),
    ) ?? navItems[0];

  return (
    <nav role="navigation" className="flex flex-col">
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#a09890] font-sans mb-3 pl-2 mt-0">
        Navigation
      </p>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded text-[17px] font-light border border-[#e5e2de] bg-white text-[#2c2825]"
          aria-expanded={isDropdownOpen}
          aria-controls="account-menu-dropdown-list"
        >
          <span className="flex items-center gap-2.5">
            
            {activeItem.label}
          </span>
          <span className="text-xs">{isDropdownOpen ? '▲' : '▼'}</span>
        </button>

        {isDropdownOpen ? (
          <div
            id="account-menu-dropdown-list"
            className="absolute z-20 mt-2 w-full rounded border border-[#e5e2de] bg-white shadow-sm p-1"
          >
            {navItems.map(({to, label, icon}) => {
              const isActive =
                location.pathname === to || location.pathname.startsWith(to + '/');
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsDropdownOpen(false)}
                  className={[
                    'flex items-center gap-2.5 px-3 py-2.5 rounded text-[16px] font-light no-underline transition-all duration-150',
                    isActive
                      ? 'bg-[#2c2825] text-white'
                      : 'text-[#5a524c] hover:bg-[#f0ede9] hover:text-[#2c2825]',
                  ].join(' ')}
                >
                  <span className="text-sm opacity-70">{icon}</span>
                  {label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Sign out */}
      <div className="mt-4 pt-4 border-t border-[#f0ede9]">
        <Logout variant="sidebar" />
      </div>
    </nav>
  );
}

function Logout({variant = 'sidebar'}: {variant?: 'sidebar' | 'topbar'}) {
  if (variant === 'topbar') {
    return (
      <Form method="POST" action="/account/logout">
        <button
          type="submit"
          className="bg-transparent border-0 cursor-pointer flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase font-sans text-[#a09890] hover:text-[#e05555] transition-colors duration-150 p-0"
        >
          → Sign out
        </button>
      </Form>
    );
  }

  return (
    <Form method="POST" action="/account/logout">
      <button
        type="submit"
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded bg-transparent border-0 cursor-pointer text-[12px] tracking-[0.15em] uppercase font-sans text-[#a09890] hover:text-[#e05555] hover:bg-[#fff5f5] transition-all duration-150 text-left"
      >
        ⎋ Sign out
      </button>
    </Form>
  );
}