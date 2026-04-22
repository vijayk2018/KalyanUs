import { Suspense, useEffect, useState } from 'react';
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
import jewelryMegaMenuPromo from '../assets/menuJewellery.jpg';
import { FaStore } from 'react-icons/fa';
import { getWishlist } from '~/lib/wishlist';
import WishlistDrawer from './WishlistDrawer';
import StoreAuthModal from './StoreAuthModal';

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
  const loginUrl = 'https://shopify.com/66607317088/account'
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuItems = (menu || FALLBACK_HEADER_MENU).items;
  const getItemUrl = (url: string) =>
    url.includes('myshopify.com') ||
      url.includes(publicStoreDomain) ||
      url.includes(header.shop.primaryDomain.url)
      ? new URL(url).pathname
      : url;

  const [wishlistCount, setWishlistCount] = useState(0);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

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

  useEffect(() => {
    let isMounted = true;

    isLoggedIn.then((value) => {
      if (isMounted) setIsUserLoggedIn(value);
    });

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);


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
              onClick={() => {isLoggedIn ? setIsWishlistOpen(true) : setIsStoreModalOpen(true)}}
              className="flex flex-col items-center text-[#202020] relative cursor-pointer hover:text-[#650827]"
            >
              <HeartIcon size={24} strokeWidth={1.8} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
              <span className="text-[12px] mt-1 font-serif">Wishlist</span>
            </button>
            <NavLink to="/experience-centre" className="flex flex-col items-center text-[#202020]">
              <Store size={22} strokeWidth={1.8} />
              <span className="text-[12px] mt-1 font-serif">Store</span>
            </NavLink>
            {/* <button
              type="button"
              onClick={() => setIsStoreModalOpen(true)}
              className="flex flex-col items-center text-[#202020]"
            >
              <UserIcon size={22} strokeWidth={1.8} />
              <span className="text-[12px] mt-1 font-serif">Profile</span>
            </button> */}
            
            <button
              onClick={() => {isUserLoggedIn ? window.location.href = '/account' : setIsStoreModalOpen(true)}}
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
                className="header-search-input w-full rounded-sm px-3 py-2 pr-12 text-[22px] font-serif placeholder:text-[#d5d5d5] outline-none"
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
                <img src={logoUrl} alt={`${shop.name} logo`} className="h-[86px] mx-auto" />
              ) : (
                <span className="font-serif text-2xl text-white">{shop.name}</span>
              )}
            </NavLink>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="bg-[#f5f5f5] border-t border-[#ececec] px-4 pb-4">
            <div className="flex items-center justify-between pt-5 pb-4">
              <img src={logoUrl} alt="Menu logo" className="h-9" />
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
          <NavLink prefetch="intent" to="/" style={activeLinkStyle} end className="2xl:mt-[7rem] lg:mt-[6rem] ml-[2.5vw]">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${shop.name} logo`}
                className="mx-auto 2xl:h-[101px] xl:h-[86px] lg:h-[86px] translate-x-[2px] translate-y-[2px]"
              />
            ) : (
              <span className="font-serif text-2xl text-white">{shop.name}</span>
            )}
          </NavLink>
          <div className='flex flex-col space-y-6 hidden lg:block '>
            <HeaderCtas
              isLoggedIn={isUserLoggedIn}
              cart={cart}
              wishlistCount={wishlistCount}
              setIsWishlistOpen={setIsWishlistOpen}
              setIsStoreModalOpen={setIsStoreModalOpen}
            />
            <HeaderMenu
              menu={menu}
              viewport="desktop"
              primaryDomainUrl={header.shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
            />
          </div>
        </header>
      </div>

      <WishlistDrawer
        open={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
      <StoreAuthModal
        open={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
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
  wishlistCount,
  setIsWishlistOpen,
  setIsStoreModalOpen,
}: Pick<HeaderProps, 'cart'> & {
  isLoggedIn: boolean;
  wishlistCount: number;
  setIsWishlistOpen: (isOpen: boolean) => void;
  setIsStoreModalOpen: (isOpen: boolean) => void;
}) {

  const loginUrl = 'https://shopify.com/66607317088/account'

  useEffect(() => {
    const onWishlistAddAttempt = (event: Event) => {
      if (isLoggedIn) return;
      event.preventDefault();
      setIsStoreModalOpen(true);
    };

    window.addEventListener('wishlist:add-attempt', onWishlistAddAttempt);

    return () => {
      window.removeEventListener('wishlist:add-attempt', onWishlistAddAttempt);
    };
  }, [isLoggedIn, setIsStoreModalOpen]);

  
  return (
    // <div className='lg:block hidden'>
    <nav className="header-ctas max-w-[35vw] flex items-center bg-[#e8e4d1] pt-4 2xl:px-8 lg:px-4 2xl:pb-[10px] xl:pb-2 lg:pb-[5px] rounded-b-3xl mt-4" role="navigation">
      <form action="/search" method="get" className="relative flex-1 flex items-center mr-8 rounded-full">
        <input
          name="q"
          type="search"
          placeholder="Search entire store here..."
          aria-label="Search entire store"
          className="header-search-input px-4 py-2 pr-10 bg-white rounded-full w-full 2xl:h-[30px] xl:h-[25px] lg:h-[20px] font-serif font-normal text-[14px] outline-none placeholder:text-gray-300"
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
      <div className="flex items-center 2xl:gap-8 xl:gap-6 lg:gap-4">
        <button
          type="button"
          onClick={() => {isLoggedIn ? setIsWishlistOpen(true) : setIsStoreModalOpen(true)}}
          className="flex flex-col 2xl:space-x-2 xl:space-x-1.5 lg:space-x-1 text-center transition cursor-pointer"
        >
          <div className="relative flex justify-center mb-1">
            <HeartIcon size={24} className="text-black" />

            {wishlistCount > 0 && (
              <span className="absolute -top-3 -right-1 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full">
                {wishlistCount}
              </span>
            )}
          </div>
          <p className='text-center text-[#000000]  2xl:text-[15px] xl:text-[14px] lg:text-[13px] font-serif'>Wishlist</p>
        </button>
        <NavLink to="/experience-centre" className="flex flex-col items-center space-x-2 text-center transition cursor-pointer">
          <div className='flex justify-center mb-1'>
            <FaStore size={24} className='text-black' />
          </div>
          <p className='text-center text-[#000000]  2xl:text-[15px] xl:text-[14px] lg:text-[13px] font-serif'>Store</p>
        </NavLink>
        <button
          type="button"
          onClick={() => {isLoggedIn ? window.location.href = '/account' : setIsStoreModalOpen(true)}}
          className="flex flex-col items-center space-x-2  text-center transition cursor-pointer"
        >
          <div className="mb-1">
            <UserIcon className='text-black' size={24} /> 
          </div>
          <p className='text-center text-[#000000] 2xl:text-[15px] xl:text-[14px] lg:text-[13px] font-serif'>Profile</p>
        </button>

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