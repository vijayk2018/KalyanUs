import { Suspense, useState } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { HeartIcon, Menu, Search, Store, UserIcon, X } from 'lucide-react';
import kalyanLogo from '../assets/kalyanLogo.svg';
import { FaStore } from 'react-icons/fa';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const { shop, menu } = header;
  const logoUrl = shop.brand?.logo?.image?.url || kalyanLogo;
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuItems = (menu || FALLBACK_HEADER_MENU).items;
  const getItemUrl = (url: string) =>
    url.includes('myshopify.com') ||
      url.includes(publicStoreDomain) ||
      url.includes(header.shop.primaryDomain.url)
      ? new URL(url).pathname
      : url;

  return (
    <>
      {/* Mobile header */}
      <header className="lg:hidden w-full">
        <div className="bg-[#e8e4d1] px-4 py-2">
          <div className="flex items-center justify-around">
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen((prev) => !prev)}
              className="flex flex-col items-center text-[#202020]"
              aria-label="Open search"
            >
              <Search size={28} strokeWidth={1.8} />
              {/* <span className="text-[11px] mt-1">&nbsp;</span> */}
            </button>
            <button type="button" className="flex flex-col items-center text-[#202020]">
              <HeartIcon size={24} strokeWidth={1.8} />
              <span className="text-[12px] mt-1 font-serif">Wishlist</span>
            </button>
            <button type="button" className="flex flex-col items-center text-[#202020]">
              <Store size={22} strokeWidth={1.8} />
              <span className="text-[12px] mt-1 font-serif">Store</span>
            </button>
            <NavLink
              prefetch="intent"
              to="/account"
              className="flex flex-col items-center text-[#202020]"
            >
              <UserIcon size={22} strokeWidth={1.8} />
              <span className="text-[12px] mt-1 font-serif">Profile</span>
            </NavLink>
          </div>
        </div>

        {isMobileSearchOpen ? (
          <form action="/search" method="get" className="">
            <div className="relative">
              <input
                name="q"
                type="search"
                placeholder="Search entire store here..."
                aria-label="Search entire store"
                className="w-full rounded-sm px-3 py-2 text-[22px] font-serif placeholder:text-[#d5d5d5] outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#878787]"
              >
                <Search size={24} />
              </button>
            </div>
          </form>
        ) : null}

        <div className="bg-[#650827] px-4 py-2">
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="absolute left-0 text-white"
              aria-label="Toggle menu"
            >
              <Menu size={38} />
            </button>
            <NavLink prefetch="intent" to="/" end>
              {logoUrl ? (
                <img src={logoUrl} alt={`${shop.name} logo`} className="h-24 mx-auto" />
              ) : (
                <span className="font-serif text-2xl text-white">{shop.name}</span>
              )}
            </NavLink>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="bg-[#f5f5f5] border-t border-[#ececec] px-4 pb-4">
            <div className="flex items-center justify-between pt-5 pb-4">
              <img src={logoUrl} alt="Menu logo" className="h-10" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="text-[#9a9a9a]"
              >
                <X size={34} strokeWidth={1.6} />
              </button>
            </div>
            <div className="bg-white">
              {mobileMenuItems.map((item) => {
                if (!item.url) return null;
                const url = getItemUrl(item.url);
                return (
                  <NavLink
                    key={item.id}
                    to={url}
                    prefetch="intent"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between border-b border-[#ececec] px-4 py-3 text-[21px] font-serif text-[#101010]"
                  >
                    <span>{item.title}</span>
                    <span className="text-[18px] leading-none">+</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ) : null}
      </header>

      {/* Desktop header */}
      <div className='hidden lg:block '>
        <header className="lg:flex header justify-between 2xl:pb-[8rem] 2xl:px-[4rem] 2xl:pt-[3rem] lg:pb-[8rem] lg:px-[5rem] lg:pt-[3rem]">
          <NavLink prefetch="intent" to="/" style={activeLinkStyle} end className="2xl:mt-[7rem] lg:mt-[6rem]">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${shop.name} logo`}
                className="mx-auto 2xl:h-28 xl:h-24 lg:h-24"
              />
            ) : (
              <span className="font-serif text-2xl text-white">{shop.name}</span>
            )}
          </NavLink>
          <div className='flex flex-col space-y-6 hidden lg:block '>
            <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
            <HeaderMenu
              menu={menu}
              viewport="desktop"
              primaryDomainUrl={header.shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
            />
          </div>
        </header>
      </div>
    </>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport} text-white 2xl:space-x-6 xl:space-x-4 lg:space-x-2 2xl:text-[16px] xl:text-[15px] lg:text-[12px] ${viewport === 'mobile' ? 'flex-col space-y-4' : 'flex'}`;
  const { close } = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="text-white font-serif"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    // <div className='lg:block hidden'>
    <nav className="header-ctas max-w-[35vw] flex items-center bg-[#e8e4d1] pt-8 2xl:px-8 lg:px-4 2xl:pb-5 xl:pb-4 lg:pb-3 rounded-b-3xl 2xl:mt-8  lg:mt-2" role="navigation">
      <form action="/search" method="get" className="relative flex items-center mr-4 rounded-full">
        <input
          name="q"
          type="search"
          placeholder="Search entire store here..."
          aria-label="Search entire store"
          className="px-4 py-2  bg-white rounded-full 2xl:w-64  2xl:h-8 xl:h-7 lg:h-6 font-serif"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-1 p-2 text-gray-600 hover:text-black font-serif"
        >
          <Search size={18} />
        </button>
      </form>
      <HeaderMenuMobileToggle />

      {/* <CartToggle cart={cart} /> */}
      <div className="flex items-center 2xl:gap-8 xl:gap-6 lg:gap-4 ml-auto">
        <div className="flex flex-col 2xl:space-x-2 xl:space-x-1.5 lg:space-x-1 text-center transition">
          <div className='flex justify-center mb-1'>
            <HeartIcon size={24} className='text-black' />
          </div>
          <p className='text-center text-[#000000] hover:text-white 2xl:text-[15px] xl:text-[14px] lg:text-[13px] font-serif'>Wishlist</p>
        </div>
        <div className="flex flex-col items-center space-x-2 text-center transition">
          <div className='flex justify-center mb-1'>
            <FaStore size={24} className='text-black' />
          </div>
          <p className='text-center text-[#000000] hover:text-white 2xl:text-[15px] xl:text-[14px] lg:text-[13px] font-serif'>Store</p>
        </div>
        <div className="flex flex-col items-center space-x-2  text-center transition">
          <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className={'mb-1'}>
            <Suspense fallback="Sign in">
              <Await resolve={isLoggedIn} errorElement="Sign in">
                {(isLoggedIn) => (isLoggedIn ? 'Account' : <UserIcon className='text-black' size={24} />)}
              </Await>
            </Suspense>
          </NavLink>
          <p className='text-center text-[#000000] hover:text-white 2xl:text-[15px] xl:text-[14px] lg:text-[13px] font-serif'>Profile</p>
        </div>

      </div>
    </nav>
    // </div>
  );
}

function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const { open } = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  );
}

function CartBadge({ count }: { count: number }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      Cart <span aria-label={`(items: ${count})`}>{count}</span>
    </a>
  );
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    { id: '1', title: 'Jewelry', type: 'HTTP', url: '/collections/jewelry', items: [] },
    { id: '2', title: 'Gold', type: 'HTTP', url: '/collections/gold', items: [] },
    { id: '3', title: 'Diamond', type: 'HTTP', url: '/collections/diamond', items: [] },
    { id: '4', title: 'Earrings', type: 'HTTP', url: '/collections/earrings', items: [] },
    { id: '5', title: 'Rings', type: 'HTTP', url: '/collections/rings', items: [] },
    { id: '6', title: 'Necklace', type: 'HTTP', url: '/collections/necklace', items: [] },
    { id: '7', title: 'Muhurat', type: 'HTTP', url: '/muhurat', items: [] },
    { id: '8', title: 'Collection', type: 'HTTP', url: '/collections', items: [] },
    { id: '9', title: 'Occasion', type: 'HTTP', url: '/collections/occasion', items: [] },
    { id: '10', title: 'Price Range', type: 'HTTP', url: '/search?price_range=all', items: [] },
    { id: '11', title: 'More', type: 'HTTP', url: '/#more', items: [] },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? '#ccc' : '#fff',
  };
}
