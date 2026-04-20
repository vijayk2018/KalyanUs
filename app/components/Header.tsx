import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {HeartIcon, Menu, Search, Store, UserIcon, X} from 'lucide-react';
import kalyanLogo from '../assets/kalyanLogo.svg';
import kjLogin from '../assets/Sign-in.jpg';
import jewelryMegaMenuPromo from '../assets/menuJewellery.jpg';
import { FaStore } from 'react-icons/fa';
import Google from '../assets/google.svg';
import Register from '../assets/regiteer.png'
import { getWishlist } from '~/lib/wishlist';
import WishlistDrawer from './WishlistDrawer';

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
  const {shop, menu} = header;
  const logoUrl = shop.brand?.logo?.image?.url || kalyanLogo;
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const mobileMenuItems = (menu || FALLBACK_HEADER_MENU).items;
  const getItemUrl = (url: string) =>
    url.includes('myshopify.com') ||
    url.includes(publicStoreDomain) ||
    url.includes(header.shop.primaryDomain.url)
      ? new URL(url).pathname
      : url;
  const openLoginModal = () => {
    setAuthView('login');
    setIsAuthModalOpen(true);
  };
  const openRegisterModal = () => {
    setAuthView('register');
    setIsAuthModalOpen(true);
  };

  const [wishlistCount, setWishlistCount] = useState(0);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    const updateWishlistCount = () => {
      const items = getWishlist();
      setWishlistCount(items.length);
    };

    updateWishlistCount();

    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);


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
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="flex flex-col items-center text-[#202020] relative"
            >
              <HeartIcon size={24} strokeWidth={1.8} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
              <span className="text-[12px] mt-1 font-serif">Wishlist</span>
            </button>
            <button type="button" className="flex flex-col items-center text-[#202020]">
              <Store size={22} strokeWidth={1.8} />
              <span className="text-[12px] mt-1 font-serif">Store</span>
            </button>
            <button
              type="button"
              onClick={openLoginModal}
              className="flex flex-col items-center text-[#202020]"
            >
              <UserIcon size={22} strokeWidth={1.8} />
              <span className="text-[12px] mt-1 font-serif">Profile</span>
            </button>
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
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} onProfileClick={openLoginModal} wishlistCount={wishlistCount} setIsWishlistOpen={setIsWishlistOpen}/>
          <HeaderMenu
            menu={menu}
            viewport="desktop"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
        </div>
      </header>
      </div>

      {isAuthModalOpen ? (
        <AuthModal
          view={authView}
          onClose={() => setIsAuthModalOpen(false)}
          onSwitchView={(nextView) => setAuthView(nextView)}
        />
      ) : null}

      <WishlistDrawer
        open={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
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
  const {close} = useAside();
  const [activeDesktopMenuId, setActiveDesktopMenuId] = useState<string | null>(
    null,
  );
  const [desktopMenuLeftOffset, setDesktopMenuLeftOffset] = useState(0);
  const [desktopMenuWidth, setDesktopMenuWidth] = useState(0);
  const menuItems = (menu || FALLBACK_HEADER_MENU).items;
  const getItemUrl = (url: string) =>
    url.includes('myshopify.com') ||
    url.includes(publicStoreDomain) ||
    url.includes(primaryDomainUrl)
      ? new URL(url).pathname
      : url;
  const getDisplayTitle = (title: string) => title.toUpperCase();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const syncViewportWidth = () => setDesktopMenuWidth(window.innerWidth);
    syncViewportWidth();
    window.addEventListener('resize', syncViewportWidth);
    return () => window.removeEventListener('resize', syncViewportWidth);
  }, []);

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
      {menuItems.map((item) => {
        if (!item.url) return null;

        const url = getItemUrl(item.url);
        const hasSubmenu = viewport === 'desktop' && item.items?.length > 0;

        if (hasSubmenu) {
          const viewAllItem = item.items.find((group) =>
            group.title.trim().toLowerCase().includes('view all'),
          );
          const groupedItems = item.items.filter(
            (group) => group.id !== viewAllItem?.id,
          );
          const shouldShowPromoCard = Boolean(viewAllItem);

          const resolveMenuUrl = (menuUrl?: string, fallback = url) =>
            menuUrl ? getItemUrl(menuUrl) : fallback;

          return (
            <div
              key={item.id}
              className="group relative"
              onMouseEnter={(event) => {
                setActiveDesktopMenuId(item.id);
                setDesktopMenuLeftOffset(event.currentTarget.getBoundingClientRect().left);
                if (typeof window !== 'undefined') {
                  setDesktopMenuWidth(window.innerWidth);
                }
              }}
              onMouseLeave={() => setActiveDesktopMenuId(null)}
            >
              <NavLink
                className="text-white font-serif"
                end
                onClick={close}
                prefetch="intent"
                style={activeLinkStyle}
                to={url}
              >
                {item.title}
              </NavLink>

              <div
                className={`absolute top-full z-50 pt-2 ${
                  activeDesktopMenuId === item.id ? 'block' : 'hidden'
                }`}
                style={{
                  left: `${-desktopMenuLeftOffset}px`,
                  width: desktopMenuWidth ? `${desktopMenuWidth}px` : '100vw',
                }}
                onMouseEnter={() => setActiveDesktopMenuId(item.id)}
                onMouseLeave={() => setActiveDesktopMenuId(null)}
              >
                <div className="rounded-b-md bg-white px-8 py-6 text-[#202020] shadow-2xl">
                  <div
                    className={`mx-auto grid w-full gap-8 ${
                      shouldShowPromoCard ? 'grid-cols-[1fr_320px]' : 'grid-cols-1'
                    }`}
                  >
                    <div
                      className={`grid gap-6 ${
                        groupedItems.length >= 4
                          ? 'grid-cols-4'
                          : groupedItems.length === 3
                            ? 'grid-cols-3'
                            : groupedItems.length === 2
                              ? 'grid-cols-2'
                              : 'grid-cols-1'
                      }`}
                    >
                      {groupedItems.map((group) => {
                        const normalizedGroupTitle = group.title
                          .trim()
                          .toLowerCase();
                        const isCategory = normalizedGroupTitle === 'category';
                        const items = group.items ?? [];
                        const splitIndex = Math.ceil(items.length / 2);
                        const columnA = isCategory ? items.slice(0, splitIndex) : items;
                        const columnB = isCategory ? items.slice(splitIndex) : [];

                        return (
                        <div key={group.id} className="space-y-3">
                          <p className="font-semibold tracking-[0.08em] text-[13px] w-30 underline decoration-[#cf254a] underline-offset-4">
                            {getDisplayTitle(group.title)}
                          </p>
                          <div className={isCategory ? 'grid grid-cols-2 gap-x-6 gap-y-2' : 'space-y-2'}>
                            {(columnA.length ? columnA : [group]).map((subItem) => {
                              const subUrl = resolveMenuUrl(subItem.url, resolveMenuUrl(group.url));
                              return (
                                <NavLink
                                  key={subItem.id}
                                  to={subUrl}
                                  prefetch="intent"
                                  className="block text-[13px] uppercase leading-5 text-[#202020] transition-colors hover:text-[#8e0a35]"
                                >
                                  {subItem.title}
                                </NavLink>
                              );
                            })}
                            {columnB.map((subItem) => {
                              const subUrl = resolveMenuUrl(subItem.url, resolveMenuUrl(group.url));
                              return (
                                <NavLink
                                  key={subItem.id}
                                  to={subUrl}
                                  prefetch="intent"
                                  className="block text-[13px] uppercase leading-5 text-[#202020] transition-colors hover:text-[#8e0a35]"
                                >
                                  {subItem.title}
                                </NavLink>
                              );
                            })}
                          </div>
                        </div>
                      )})}
                    </div>

                    {shouldShowPromoCard ? (
                      <NavLink
                        to={resolveMenuUrl(viewAllItem?.url, url)}
                        prefetch="intent"
                        className="block overflow-hidden rounded-md"
                      >
                        <img
                          src={jewelryMegaMenuPromo}
                          alt={`${item.title} collection`}
                          className="h-[340px] w-full rounded-md object-cover"
                        />
                        <span className="mt-3 inline-block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#202020] border-t border-[#cf254a] pt-1">
                          View All Designs
                        </span>
                      </NavLink>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        }

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
  onProfileClick,
  wishlistCount,
  setIsWishlistOpen
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'> & {onProfileClick: () => void; wishlistCount: number; setIsWishlistOpen: (isOpen: boolean) => void}) {
  
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
            <div className="relative flex justify-center mb-1" onClick={() => setIsWishlistOpen(true)}>
              <HeartIcon size={24} className="text-black" />

              {wishlistCount > 0 && (
                <span className="absolute -top-3 -right-1 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
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
            <button type="button" onClick={onProfileClick} className="mb-1">
              <Suspense fallback="Sign in">
                <Await resolve={isLoggedIn} errorElement="Sign in">
                  {(isLoggedIn) => (isLoggedIn ? 'Account' : <UserIcon className='text-black' size={24} />)}
                </Await>
              </Suspense>
            </button>
            <p className='text-center text-[#000000] hover:text-white 2xl:text-[15px] xl:text-[14px] lg:text-[13px] font-serif'>Profile</p>
          </div>
          
        </div>
      </nav>
    // </div>
  );
}

function AuthModal({
  view,
  onClose,
  onSwitchView,
}: {
  view: 'login' | 'register';
  onClose: () => void;
  onSwitchView: (view: 'login' | 'register') => void;
}) {
  return (
    <div className="fixed flex justify-center items-center inset-0 z-[100] bg-black/50 p-4" onClick={onClose}>
      <div
        className="mx-auto  w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl relative"
        onClick={(event) => event.stopPropagation()}
      >

        {/* CLOSE BUTTON */}
        <div className="absolute top-0 right-0 p-3">
          <button
            type="button"
            onClick={onClose}
            className="text-[#8aa1d8]"
            aria-label="Close auth popup"
          >
            <X size={26} />
          </button>
        </div>


        {view === 'login' ? (
          <div className="grid md:grid-cols-2">
            <div className="hidden md:block">
              <img src={kjLogin} alt="Login banner" className="h-full w-full object-cover" />
            </div>
            
            <div className="px-6 pb-8 md:px-10  pt-8">
              <h2 className="text-3xl text-[#b80f47] font-light mb-5">Login</h2>
              <p className="text-[12px] text-gray-500 mb-6 pb-3">
                To enjoy a seamless experience while shopping
                <div className='px-5 border-b border-[#b80f47] w-[6rem] mt-3 '></div>
              </p>
              
              <input
                type="text"
                placeholder="Enter E Mail / Mobile number"
                className="w-full rounded border border-gray-200 placeholder:text-gray-200 px-4 py-3 text-sm outline-none mb-4"
              />
              <button type="button" className="w-full bg-[#cf254a] py-3 text-sm font-semibold text-white">
                CONTINUE
              </button>
              <p className="my-4 text-center text-xs text-gray-500">OR</p>
              <button type="button" className="flex items-center gap-3 justify-center w-full rounded border border-gray-200 py-3 text-sm text-gray-700">
                <img src={Google} alt="Login banner" className="h-3 w-3 object-cover" /> <span>Login Using Google</span>
              </button>
              <p className="mt-6 text-center text-sm text-gray-500">
                Do not have an account?{' '}
                <button
                  type="button"
                  onClick={() => onSwitchView('register')}
                  className="font-semibold text-[#cf254a]"
                >
                  SIGN UP
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2">
            <div className="hidden md:block">
              <img src={Register} alt="Signup banner" className="h-full w-full object-contain" />
            </div>
            <div className="px-6 pb-8 md:px-10 pt-8 mt-8">
             
              <div className="space-y-4">
                <input type="text" placeholder="Enter Full Name" className="w-full rounded border border-[#d8dff5] placeholder:text-gray-200 px-4 py-3 outline-none" />
                <input type="email" placeholder="Email" className="w-full rounded border border-[#d8dff5] placeholder:text-gray-200 px-4 py-3 outline-none" />
                <input type="tel" placeholder="Phone" className="w-full rounded border border-[#d8dff5] placeholder:text-gray-200 px-4 py-3 outline-none" />
              </div>
              <label className="mt-5 flex items-center gap-2 text-[12px] text-gray-600">
                <input type="checkbox" className="h-4 w-4" />
                <p>I agree to the <span className='text-[#cf254a]'>Terms of Use</span> & <span className='text-[#cf254a]'>Privacy Policy</span></p>
              </label>
              <button type="button" className="mt-6 w-full bg-[#cf254a] py-3 text-sm font-semibold text-white">
                SEND OTP
              </button>
              <p className="mt-6 text-center text-sm text-gray-500">
                Already a member with us?{' '}
                <button
                  type="button"
                  onClick={() => onSwitchView('login')}
                  className="font-semibold text-[#cf254a]"
                >
                  LOGIN
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
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
  const {open} = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  );
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

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

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
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
    {
      id: '1',
      title: 'Jewelry',
      type: 'HTTP',
      url: '/collections/jewelry',
      items: [
        {
          id: '1-1',
          title: 'All Jewelry',
          type: 'HTTP',
          url: '/collections/jewelry',
          items: [
            {id: '1-1-1', title: 'Gold', type: 'HTTP', url: '/collections/gold', items: []},
            {id: '1-1-2', title: 'Diamond', type: 'HTTP', url: '/collections/diamond', items: []},
            {id: '1-1-3', title: 'Rose Gold', type: 'HTTP', url: '/collections/rose-gold', items: []},
            {id: '1-1-4', title: 'Two Tone', type: 'HTTP', url: '/collections/two-tone', items: []},
            {id: '1-1-5', title: 'Tri Tone', type: 'HTTP', url: '/collections/tri-tone', items: []},
          ],
        },
        {
          id: '1-2',
          title: 'Category',
          type: 'HTTP',
          url: '/collections/category',
          items: [
            {id: '1-2-1', title: 'Earrings', type: 'HTTP', url: '/collections/earrings', items: []},
            {id: '1-2-2', title: 'Pendants', type: 'HTTP', url: '/collections/pendants', items: []},
            {id: '1-2-3', title: 'Bangles', type: 'HTTP', url: '/collections/bangles', items: []},
            {id: '1-2-4', title: 'Mangalsutras', type: 'HTTP', url: '/collections/mangalsutras', items: []},
            {id: '1-2-5', title: 'Maang Tikka', type: 'HTTP', url: '/collections/maang-tikka', items: []},
            {id: '1-2-6', title: 'Pendant With Chain', type: 'HTTP', url: '/collections/pendant-with-chain', items: []},
          ],
        },
        {
          id: '1-3',
          title: 'Curated Shop',
          type: 'HTTP',
          url: '/collections/curated-shop',
          items: [
            {id: '1-3-1', title: 'Necklaces', type: 'HTTP', url: '/collections/necklaces', items: []},
            {id: '1-3-2', title: 'Rings', type: 'HTTP', url: '/collections/rings', items: []},
            {id: '1-3-3', title: 'Bracelets', type: 'HTTP', url: '/collections/bracelets', items: []},
            {id: '1-3-4', title: 'Chains', type: 'HTTP', url: '/collections/chains', items: []},
            {id: '1-3-5', title: 'Anklet', type: 'HTTP', url: '/collections/anklets', items: []},
            {id: '1-3-6', title: 'Waist Chain', type: 'HTTP', url: '/collections/waist-chain', items: []},
          ],
        },
        {
          id: '1-4',
          title: 'Shop For',
          type: 'HTTP',
          url: '/collections/shop-for',
          items: [
            {id: '1-4-1', title: 'Bridal Jewelry', type: 'HTTP', url: '/collections/bridal-jewelry', items: []},
            {id: '1-4-2', title: 'Groom Jewelry', type: 'HTTP', url: '/collections/groom-jewelry', items: []},
            {id: '1-4-3', title: 'Gifts', type: 'HTTP', url: '/collections/gifts', items: []},
            {id: '1-4-4', title: 'Women', type: 'HTTP', url: '/collections/women', items: []},
            {id: '1-4-5', title: 'Men', type: 'HTTP', url: '/collections/men', items: []},
            {id: '1-4-6', title: 'Kids', type: 'HTTP', url: '/collections/kids', items: []},
            {id: '1-4-7', title: 'Unisex', type: 'HTTP', url: '/collections/unisex', items: []},
          ],
        },
      ],
    },
    {id: '2', title: 'Gold', type: 'HTTP', url: '/collections/gold', items: []},
    {id: '3', title: 'Diamond', type: 'HTTP', url: '/collections/diamond', items: []},
    {id: '4', title: 'Earrings', type: 'HTTP', url: '/collections/earrings', items: []},
    {id: '5', title: 'Rings', type: 'HTTP', url: '/collections/rings', items: []},
    {id: '6', title: 'Necklace', type: 'HTTP', url: '/collections/necklace', items: []},
    {id: '7', title: 'Muhurat', type: 'HTTP', url: '/muhurat', items: []},
    {id: '8', title: 'Collection', type: 'HTTP', url: '/collections', items: []},
    {id: '9', title: 'Occasion', type: 'HTTP', url: '/collections/occasion', items: []},
    {id: '10', title: 'Price Range', type: 'HTTP', url: '/search?price_range=all', items: []},
    {id: '11', title: 'More', type: 'HTTP', url: '/#more', items: []},
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