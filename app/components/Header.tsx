import { Suspense, useEffect, useState } from 'react';
import { Await, NavLink, useAsyncValue, useNavigation, useSearchParams, useLocation } from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import {  Menu, Search, X } from 'lucide-react';
import kalyanLogo from '../assets/kalyanLogo.svg';
import moreBrandStoryImage from '../assets/moreBrandStory.jpg';
import moreCollectionsImage from '../assets/moreCollections.jpg';
import moreBlogImage from '../assets/blogMainBanner.jpg';
import { FaStore } from 'react-icons/fa';
import { clearWishlistCache, getWishlist, loadWishlist } from '~/lib/wishlist';
import WishlistDrawer from './WishlistDrawer';
import StoreAuthModal from './StoreAuthModal';
import StoreIcon from '../assets/store.svg'
import HeartIcon from '../assets/heart.svg'
import UserIcon from '../assets/person.svg'

interface HeaderProps {
  header: HeaderQuery & {
    // Comes from `app/root.tsx` metaobject query so the header can render from
    // your Shopify `mega_menu_panel` / `mega_menu_group` / `mega_menu_item` data.
    metaMenuPanels?: Array<{
      id: string;
      handle?: string | null;
      menuHandle?: {value?: string | null} | null;
      promoLink?: {value?: string | null} | null;
      promoText?: {value?: string | null} | null;
      promoImage?: {
        reference?: {
          image?: {url?: string | null} | null;
          url?: string | null;
        } | null;
      } | null;
      enabled?: {value?: string | null} | null;
      position?: {value?: string | null} | null;
      groupsList?: {
        references?: {
          nodes?: Array<{
            id: string;
            handle?: string | null;
            title?: {value?: string | null} | null;
            position?: {value?: string | null} | null;
            items?: {
              references?: {
                nodes?: Array<{
                  id: string;
                  handle?: string | null;
                  label?: {value?: string | null} | null;
                  link?: {value?: string | null} | null;
                  image?: {
                    reference?: {
                      image?: {url?: string | null} | null;
                      url?: string | null;
                    } | null;
                  } | null;
                  position?: {value?: string | null} | null;
                }> | null;
              } | null;
            } | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  };
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

function parsePosition(raw?: string | null): number {
  const parsed = Number(raw ?? '');
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
}

function asPathUrl(url?: string | null): string {
  const value = (url ?? '').trim();
  if (!value) return '#';
  if (value.startsWith('/')) return value;
  try {
    const parsed = new URL(value);
    return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return value;
  }
}

function getReferenceImageUrl(
  field?: {
    reference?: {
      image?: {url?: string | null} | null;
      url?: string | null;
    } | null;
  } | null,
): string | null {
  const mediaImageUrl = field?.reference?.image?.url?.trim();
  if (mediaImageUrl) return mediaImageUrl;
  const genericFileUrl = field?.reference?.url?.trim();
  return genericFileUrl || null;
}

type BuiltMenuItem = {
  id: string;
  resourceId: string | null;
  tags: string[];
  title: string;
  type: 'HTTP';
  url: string;
  items: BuiltMenuItem[];
};

function buildMenuFromHeaderMetaobjects(
  panels: HeaderProps['header']['metaMenuPanels'],
): {id: string; items: BuiltMenuItem[]} | null {
  if (!panels?.length) return null;

  const topLevelItems = panels
    .filter((panel) => panel.enabled?.value?.toLowerCase() !== 'false')
    .slice()
    .sort(
      (a, b) =>
        parsePosition(a.position?.value) - parsePosition(b.position?.value),
    )
    .map((panel): BuiltMenuItem => {
      const promoLink = asPathUrl(panel.promoLink?.value);

      const groups: BuiltMenuItem[] = (panel.groupsList?.references?.nodes ?? [])
        .slice()
        .sort(
          (a, b) =>
            parsePosition(a.position?.value) - parsePosition(b.position?.value),
        )
        .map((group): BuiltMenuItem => {
          const items: BuiltMenuItem[] = (group.items?.references?.nodes ?? [])
            .slice()
            .sort(
              (a, b) =>
                parsePosition(a.position?.value) - parsePosition(b.position?.value),
            )
            .map((item): BuiltMenuItem => {
              const title = (item.label?.value || item.handle || '').trim();
              const imageUrl = getReferenceImageUrl(item.image);
              return {
                id: item.id,
                resourceId: null,
                tags: imageUrl ? [`meta:image:${imageUrl}`] : [],
                title,
                type: 'HTTP',
                url: asPathUrl(item.link?.value),
                items: [],
              };
            })
            .filter((item) => Boolean(item.title));

          const groupTitle = (group.title?.value || group.handle || '').trim();
          const groupUrl = items[0]?.url ?? promoLink ?? '#';

          return {
            id: group.id,
            resourceId: null,
            tags: [],
            title: groupTitle,
            type: 'HTTP',
            url: groupUrl,
            items,
          };
        })
        .filter((group) => Boolean(group.title));

      const promoText = panel.promoText?.value?.trim();
      const promoImageUrl = getReferenceImageUrl(panel.promoImage);
      if (promoText && promoLink && promoLink !== '#') {
        groups.push({
          id: `${panel.id}-view-all`,
          resourceId: null,
          tags: promoImageUrl ? [`meta:promo:${promoImageUrl}`] : [],
          title: `View All ${promoText}`,
          type: 'HTTP',
          url: promoLink,
          items: [],
        });
      }

      const topTitle = (panel.menuHandle?.value || panel.handle || '').trim();
      const topUrl = promoLink && promoLink !== '#'
        ? promoLink
        : groups[0]?.url ?? '#';

      return {
        id: panel.id,
        resourceId: null,
        tags: [],
        title: topTitle,
        type: 'HTTP',
        url: topUrl,
        items: groups,
      };
    })
    .filter((item) => Boolean(item.title));

  if (!topLevelItems.length) return null;
  return {id: 'metaobject-header-menu', items: topLevelItems};
}

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu, metaMenuPanels} = header;
  const logoUrl = shop.brand?.logo?.image?.url || kalyanLogo;
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const metaMenu = buildMenuFromHeaderMetaobjects(metaMenuPanels);
  const effectiveMenu = metaMenu ?? menu ?? FALLBACK_HEADER_MENU;
  const mobileMenuItems = effectiveMenu.items;
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
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchTerm(q);
    } else if (location.pathname === '/') {
      setSearchTerm('');
    }
  }, [searchParams, location.pathname]);

  useEffect(() => {
    const updateWishlistCount = () => {
      const items = getWishlist();
      setWishlistCount(items.length);
    };

    void loadWishlist().then(updateWishlistCount);

    window.addEventListener('wishlistUpdated', updateWishlistCount);

    return () => {
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
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

  useEffect(() => {
    if (isUserLoggedIn) {
      void loadWishlist();
      return;
    }
    clearWishlistCache();
  }, [isUserLoggedIn]);

  useEffect(() => {
    const formAction = navigation.formAction || '';
    const isLoggingOut =
      navigation.state === 'submitting' && formAction.includes('/account/logout');

    if (isLoggingOut) {
      setIsUserLoggedIn(false);
    }
  }, [navigation.formAction, navigation.state]);

  return (
    <>
      {/* ─── MOBILE HEADER ─── */}
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
            </button>
            <button
              onClick={() => {
                isUserLoggedIn ? setIsWishlistOpen(true) : setIsStoreModalOpen(true);
              }}
              className="group flex flex-col items-center text-[#202020] relative cursor-pointer hover:text-[#650827]"
            >
              <div
                className="bg-[#333] group-hover:bg-[#cf254a] transition-colors xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-6 h-6"
                title="Heart"
                style={{ WebkitMaskImage: `url(${HeartIcon})`, WebkitMaskSize: 'contain', WebkitMaskPosition: 'center', WebkitMaskRepeat: 'no-repeat', maskImage: `url(${HeartIcon})`, maskSize: 'contain', maskPosition: 'center', maskRepeat: 'no-repeat' }}
              />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-2 z-20 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white ring-1 ring-white">
                  {wishlistCount}
                </span>
              )}
              <span className="text-[12px] font-serif">Wishlist</span>
            </button>
            <NavLink
              to="/experience-centre"
              className="group flex flex-col items-center text-[#202020] hover:text-[#650827]"
            >
              <div
                className="bg-[#333] group-hover:bg-[#cf254a] transition-colors xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-6 h-6"
                title="Store"
                style={{ WebkitMaskImage: `url(${StoreIcon})`, WebkitMaskSize: 'contain', WebkitMaskPosition: 'center', WebkitMaskRepeat: 'no-repeat', maskImage: `url(${StoreIcon})`, maskSize: 'contain', maskPosition: 'center', maskRepeat: 'no-repeat' }}
              />
              <span className="text-[12px] font-serif">Store</span>
            </NavLink>
            <button
              onClick={() => {
                isUserLoggedIn
                  ? (window.location.href = '/account')
                  : setIsStoreModalOpen(true);
              }}
              className="group flex flex-col items-center text-[#202020] hover:text-[#650827]"
            >
              <div
                className="bg-[#333] group-hover:bg-[#cf254a] transition-colors xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-6 h-6"
                title="User"
                style={{ WebkitMaskImage: `url(${UserIcon})`, WebkitMaskSize: 'contain', WebkitMaskPosition: 'center', WebkitMaskRepeat: 'no-repeat', maskImage: `url(${UserIcon})`, maskSize: 'contain', maskPosition: 'center', maskRepeat: 'no-repeat' }}
              />
              <span className="text-[12px] font-serif">Profile</span>
            </button>
          </div>
        </div>

        {isMobileSearchOpen ? (
          <form action="/search" method="get">
            <div className="relative">
              <input
                name="q"
                type="search"
                value={searchTerm}
                onChange={(e) => {
                  if (e.target.value.length <= 130) {
                    setSearchTerm(e.target.value);
                  }
                }}
                maxLength={130}
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
                <img
                  src={logoUrl}
                  alt={`${shop.name} logo`}
                  className="h-[86px] mx-auto"
                />
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

      {/* ─── DESKTOP HEADER ─── */}
      {/*
        KEY LAYOUT CHANGE:
        The desktop header is now split into TWO sibling rows inside a single
        bg-[#650827] wrapper:

        Row 1  →  Logo (left)  +  CTAs search/wishlist/store/profile (right)
                  This row uses rem/px sizing so it SCALES normally with browser zoom.

        Row 2  →  Nav menu bar that spans 100 % of the viewport.
                  It uses vw-based font-size + gap so it stays visually stable
                  (does NOT grow/shrink) when the user zooms in or out.
      */}
      <div className="hidden lg:block bg-[#650827]">

        {/* ── Row 1: Logo + CTAs (scales with zoom) ── */}
        <div className="flex justify-between items-start">
          <NavLink
            prefetch="intent"
            to="/"
            end
            className="xl:mt-8 pt-3 lg:mt-4 ml-[5.6vw] xl:mb-[1.4rem] lg:mb-[1.3rem]"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${shop.name} logo`}
                className="mx-auto translate-x-[2px] translate-y-[2px]"
                style={{ width: 110 }}
              />
            ) : (
              <span className="font-serif text-2xl text-white">{shop.name}</span>
            )}
          </NavLink>

          <div className='flex-1 mr-[5.5vw]'>
            <div className=' mb-8'>
              <HeaderCtas
                isLoggedIn={isUserLoggedIn}
                cart={cart}
                wishlistCount={wishlistCount}
                setIsWishlistOpen={setIsWishlistOpen}
                setIsStoreModalOpen={setIsStoreModalOpen}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
            <div className=" bg-[#650827] relative">
              <div className="flex justify-end">
                <div className="w-auto">
                  <HeaderMenu
                    menu={effectiveMenu as any}
                    viewport="desktop"
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: Nav menu (zoom-stable via vw units + 100vw width) ── */}
        {/*
          We break out of any padding with negative margins so the nav always
          touches the left and right edges of the viewport.
          font-size and gap are expressed in vw so zooming the browser does
          NOT reflow or resize the nav items.
        */}
        
      </div>

      <WishlistDrawer open={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <StoreAuthModal open={isStoreModalOpen} onClose={() => setIsStoreModalOpen(false)} />
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
  /*
    Desktop nav className:
    - Uses vw-based font-size (0.72vw) and gap (1vw) so the nav items stay
      at the same visual size regardless of browser zoom level.
    - `whitespace-nowrap` prevents wrapping at any zoom.
  */
  const className =
    viewport === 'mobile'
      ? 'header-menu-mobile flex-col space-y-4'
      : 'header-menu-desktop flex items-center';

  const { close } = useAside();
  const [activeDesktopMenuId, setActiveDesktopMenuId] = useState<string | null>(null);
  const [desktopMenuLeftOffset, setDesktopMenuLeftOffset] = useState(0);
  const [desktopMenuWidth, setDesktopMenuWidth] = useState(0);

  const menuItems = (menu || FALLBACK_HEADER_MENU).items;

  const getItemUrl = (url: string) =>
    url.includes('myshopify.com') ||
      url.includes(publicStoreDomain) ||
      url.includes(primaryDomainUrl)
      ? new URL(url).pathname
      : url;

  const getDisplayTitle = (title: string) => {
    const normalized = title.trim().toUpperCase();

    if (normalized.startsWith('ALL JEWELRY')) {
      return 'ALL JEWELRY';
    }

    if (normalized.startsWith('SHOP FOR')) {
      return 'SHOP FOR';
    }

    if (normalized.startsWith('CATEGORY')) {
      return 'CATEGORY';
    }

    if (normalized.startsWith('CURATED SHOP')) {
      return 'CURATED SHOP';
    }

    return title; // fallback
  };

  const getMetaTagUrl = (
    tags: Array<string> | undefined,
    prefix: 'meta:image:' | 'meta:promo:',
  ) => tags?.find((tag) => tag.startsWith(prefix))?.slice(prefix.length) || null;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const syncViewportWidth = () => setDesktopMenuWidth(window.innerWidth);
    syncViewportWidth();
    window.addEventListener('resize', syncViewportWidth);
    return () => window.removeEventListener('resize', syncViewportWidth);
  }, []);

  return (
    <nav
      className={className}
      role="navigation"
      /*
        Inline styles for the desktop nav so the vw values are applied directly
        and cannot be overridden by Tailwind's rem-based utilities.
        font-size: 0.72vw  ← stays constant on zoom
        gap: 1vw           ← stays constant on zoom
      */
     style={
      viewport === 'desktop'
        ? {
            fontSize: '.83333vw',
            lineHeight: '1.09375vw',
            padding: '.52083vw 0',
            display: 'flex',
            alignItems: 'center',
            gap: '2vw'
          }
        : undefined
    }
    >
      {viewport === 'mobile' && (
        <NavLink end onClick={close} prefetch="intent" style={activeLinkStyle} to="/">
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
          const isMoreMenu = item.title.trim().toLowerCase() === 'more';
          const isPriceRangeMenu = item.title.trim().toLowerCase() === 'price range';
          const isCollectionMenu = item.title.trim().toLowerCase() === 'collection';
          const isMuhuratMenu = item.title.trim().toLowerCase() === 'muhurat';
          const isJewelryMenu = item.title.trim().toLowerCase() === 'jewelry';
          const isNecklaceMenu = item.title.trim().toLowerCase() === 'necklace';
          const isRingsMenu = item.title.trim().toLowerCase() === 'rings';
          const isEarringsMenu = item.title.trim().toLowerCase() === 'earrings';
          const isDiamondMenu = item.title.trim().toLowerCase() === 'diamond';
          const isGoldMenu = item.title.trim().toLowerCase() === 'gold';
          const isOccasionMenu = item.title.trim().toLowerCase() === 'occasion';
          const isJewelryOrOccasionMenu = isJewelryMenu || isOccasionMenu;
          const shouldShowPromoCard = Boolean(viewAllItem);
          const moreCards = isMoreMenu
            ? groupedItems.flatMap((group) =>
                group.items?.length
                  ? group.items.map((subItem) => ({
                      id: subItem.id,
                      title: subItem.title,
                      url: subItem.url,
                    }))
                  : [
                      {
                        id: group.id,
                        title: group.title,
                        url: group.url,
                      },
                    ],
              )
            : [];

          const resolveMenuUrl = (menuUrl?: string, fallback = url) =>
            menuUrl ? getItemUrl(menuUrl) : fallback;

          return (
            <div
              key={item.id}
              className="group relative"
              onMouseEnter={(event) => {
                setActiveDesktopMenuId(item.id);
                setDesktopMenuLeftOffset(
                  event.currentTarget.getBoundingClientRect().left,
                );
                if (typeof window !== 'undefined') {
                  setDesktopMenuWidth(window.innerWidth);
                }
              }}
              onMouseLeave={() => setActiveDesktopMenuId(null)}
            >
              <NavLink
                className="text-white font-serif font-normal tracking-[0.01em] whitespace-nowrap"
                end
                onClick={close}
                prefetch="intent"
                style={activeLinkStyle}
                to={url}
              >
                {item.title}
              </NavLink>

              {/* Dropdown panel */}
              <div
                className={`absolute top-full z-50 pt-2 ${activeDesktopMenuId === item.id ? 'block' : 'hidden'
                  }`}
                style={{
                  left: `${-desktopMenuLeftOffset}px`,
                  width: desktopMenuWidth ? `${desktopMenuWidth}px` : '100vw',
                }}
                onMouseEnter={() => setActiveDesktopMenuId(item.id)}
                onMouseLeave={() => setActiveDesktopMenuId(null)}
              >
                <div className="rounded-b-md bg-white px-8 py-6 text-[#202020] shadow-2xl">
                  {isMoreMenu ? (
                    <div className="mx-auto grid w-full grid-cols-3 gap-6">
                      {moreCards.map((card) => {
                        const normalizedTitle = card.title.trim().toLowerCase();
                        const cardImage = normalizedTitle.includes('brand')
                          ? moreBrandStoryImage
                          : normalizedTitle.includes('collection')
                            ? moreCollectionsImage
                            : moreBlogImage;
                        const cardUrl = normalizedTitle.includes('collection')
                          ? '/our-collections'
                          : resolveMenuUrl(card.url, url);

                        return (
                          <NavLink
                            key={card.id}
                            to={cardUrl}
                            prefetch="intent"
                            onClick={() => setActiveDesktopMenuId(null)}
                            className="block"
                          >
                            <img
                              src={cardImage}
                              alt={card.title}
                              className="h-[275px] w-full rounded-md object-cover"
                            />
                            <span className="mt-2 block text-center text-[20px] font-semibold text-[#202020]">
                              {card.title}
                            </span>
                          </NavLink>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      className={`mx-auto grid w-full gap-8 ${shouldShowPromoCard ? 'grid-cols-[1fr_320px]' : 'grid-cols-1'
                        }`}
                    >
                      <div
                        className={`grid gap-6 ${isJewelryOrOccasionMenu
                          ? 'grid-cols-5'
                          : isPriceRangeMenu
                            ? 'grid-cols-1'
                            : groupedItems.length >= 4 || isMuhuratMenu
                              ? 'grid-cols-4'
                              : groupedItems.length === 3
                                ? 'grid-cols-3'
                                : groupedItems.length === 2
                                  ? 'grid-cols-2'
                                  : 'grid-cols-1'
                          }`}
                      >
                        {groupedItems.map((group) => {
                          const normalizedGroupTitle = group.title.trim().toLowerCase();
                          const isCategory = normalizedGroupTitle.startsWith('category');
                          const items = group.items ?? [];
                          const isSingleCategoryLayout =
                            groupedItems.length === 1 && isCategory;
                          const isPriceRangeGroup = isPriceRangeMenu;
                          const splitIndex = Math.ceil(items.length / 2);
                          const columnA = isCategory ? items.slice(0, splitIndex) : items;
                          const columnB = isCategory ? items.slice(splitIndex) : [];

                          return (
                            <div
                              key={group.id}
                              className={`space-y-2 ${isJewelryOrOccasionMenu && isCategory
                                ? 'col-span-2'
                                : isCategory && isMuhuratMenu
                                  ? 'col-span-2'
                                  : 'col-span-1'
                                }`}
                            >
                              <p className="font-semibold tracking-[0.08em] text-[13px] w-30 underline decoration-[#cf254a] underline-offset-4 mb-5">
                                {getDisplayTitle(group.title)}
                              </p>
                              <div
                                className={getDisplayTitle(group.title) == 'ALL JEWELRY' ? 'space-y-7' : getDisplayTitle(group.title) == 'SHOP FOR'  ? 'space-y-6' : isOccasionMenu ? 'grid grid-cols-1 gap-y-3' : 
                                  isPriceRangeGroup
                                    ? 'grid grid-cols-1 gap-y-3'
                                    : isSingleCategoryLayout
                                      ? 'grid grid-cols-4 gap-x-8 gap-y-4'
                                      : isCategory
                                        ? 'grid grid-cols-2 gap-x-6 gap-y-3'
                                        : 'space-y-3'
                                }
                              >
                                {(isSingleCategoryLayout
                                  ? items
                                  : isPriceRangeGroup
                                    ? [group]
                                    : columnA.length
                                      ? columnA
                                      : [group]
                                ).map((subItem) => {
                                  const subUrl = resolveMenuUrl(
                                    subItem.url,
                                    resolveMenuUrl(group.url),
                                  );
                                  const normalizedSubItemTitle = subItem.title
                                    .trim()
                                    .toLowerCase();
                                  const adminMenuImage = getMetaTagUrl(
                                    subItem.tags,
                                    'meta:image:',
                                  );
                                  const menuImage =  adminMenuImage 
                                    
                                  return (
                                    <NavLink
                                      key={subItem.id}
                                      to={subUrl}
                                      prefetch="intent"
                                      onClick={() => setActiveDesktopMenuId(null)}
                                      className={`text-[13px] uppercase leading-5 text-[#202020] transition-colors hover:text-[#8e0a35] ${menuImage ? 'flex items-center gap-1.5' : 'block'
                                        }`}
                                    >
                                      {menuImage ? (
                                        <img
                                          src={menuImage}
                                          alt={subItem.title}
                                          className={`${isSingleCategoryLayout ? 'h-12 w-12' : getDisplayTitle(group.title) == 'ALL JEWELRY' ? 'h-10 w-10' : getDisplayTitle(group.title) == 'SHOP FOR' ? 'h-8 w-8' : 'h-6 w-6'} object-cover`}
                                        />
                                      ) : null}
                                      {subItem.title}
                                    </NavLink>
                                  );
                                })}
                                {!isSingleCategoryLayout &&
                                  columnB.map((subItem) => {
                                    const subUrl = resolveMenuUrl(
                                      subItem.url,
                                      resolveMenuUrl(group.url),
                                    );
                                    const normalizedSubItemTitle = subItem.title
                                      .trim()
                                      .toLowerCase();
                                    const adminMenuImage = getMetaTagUrl(
                                      subItem.tags,
                                      'meta:image:',
                                    );
                                    const menuImage = adminMenuImage ;
                                      
                                    return (
                                      <NavLink
                                        key={subItem.id}
                                        to={subUrl}
                                        prefetch="intent"
                                        onClick={() => setActiveDesktopMenuId(null)}
                                        className={`text-[13px] uppercase leading-5 text-[#202020] transition-colors hover:text-[#8e0a35] ${menuImage ? 'flex items-center gap-1.5' : 'block'
                                          }`}
                                      >
                                        {menuImage ? (
                                          <img
                                            src={menuImage}
                                            alt={subItem.title}
                                            className={`${isSingleCategoryLayout ? 'h-12 w-12' : getDisplayTitle(group.title) == 'ALL JEWELRY' ? 'h-10 w-10' : getDisplayTitle(group.title) == 'SHOP FOR' ? 'h-8 w-8' : 'h-6 w-6'} object-cover`}
                                          />
                                        ) : null}
                                        {subItem.title}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {shouldShowPromoCard ? (
                        <NavLink
                          to={resolveMenuUrl(viewAllItem?.url, url)}
                          prefetch="intent"
                          onClick={() => setActiveDesktopMenuId(null)}
                          className="flex h-full flex-col"
                        >
                          <img
                            src={
                              getMetaTagUrl(viewAllItem?.tags, 'meta:promo:') 
                            }
                            alt={`${item.title} collection`}
                            className="min-h-[180px] w-full flex-1 rounded-md object-cover"
                          />
                          <span className="mt-3 inline-block self-start text-[13px] font-semibold uppercase tracking-[0.08em] text-[#202020] border-t border-[#cf254a] pt-1">
                            View All Designs
                          </span>
                        </NavLink>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }

        return (
          <NavLink
            className="text-white font-serif font-normal tracking-[0.01em] whitespace-nowrap"
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
  searchTerm,
  setSearchTerm,
}: Pick<HeaderProps, 'cart'> & {
  isLoggedIn: boolean;
  wishlistCount: number;
  setIsWishlistOpen: (isOpen: boolean) => void;
  setIsStoreModalOpen: (isOpen: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
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
    <nav
      className="header-ctas max-w-[33vw] flex items-center justify-between bg-[#e8e4d1] lg:py-4 lg:pt-2 lg:px-4 xl:rounded-b-4xl lg:rounded-b-3xl"
      role="navigation"
    >
      <form
        action="/search"
        method="get"
        className="relative flex-1 mx-1 flex items-center rounded-full"
      >
        <input
          name="q"
          type="search"
          value={searchTerm}
          onChange={(e) => {
            if (e.target.value.length <= 130) {
              setSearchTerm(e.target.value);
            }
          }}
          maxLength={130}
          placeholder="Search entire store here..."
          aria-label="Search entire store"
          className="header-search-input px-4 py-2.5 pr-10 bg-white rounded-full w-full 2xl:h-[35px] xl:h-[30px] lg:h-[25px] font-serif font-normal text-[14px] outline-none placeholder:text-gray-300"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-1 p-2 text-gray-600 hover:text-black font-serif"
        >
          <Search size={18} className='text-gray-400'/>
        </button>
      </form>
      <HeaderMenuMobileToggle />

      <div className="flex items-center xl:gap-5 lg:gap-4">
        <button
          type="button"
          onClick={() => {
            isLoggedIn ? setIsWishlistOpen(true) : setIsStoreModalOpen(true);
          }}
          className="group flex flex-col 2xl:space-x-2 xl:space-x-1.5 lg:space-x-1 text-center transition cursor-pointer hover:text-[#650827]"
        >
          <div className="relative flex justify-center ">
            <div
              className="bg-[#333] group-hover:bg-[#cf254a] transition-colors xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-6 h-6"
              style={{ WebkitMaskImage: `url(${HeartIcon})`, WebkitMaskSize: 'contain', WebkitMaskPosition: 'center', WebkitMaskRepeat: 'no-repeat', maskImage: `url(${HeartIcon})`, maskSize: 'contain', maskPosition: 'center', maskRepeat: 'no-repeat' }}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-3 -right-1 z-20 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-[9px] font-semibold leading-none text-white ring-1 ring-white">
                {wishlistCount}
              </span>
            )}
          </div>
          <p className="text-center text-[#333] 2xl:text-[12px] xl:text-[11px] lg:text-[9px] font-serif">
            Wishlist
          </p>
        </button>

        <NavLink
          to="/experience-centre"
          className="group flex flex-col items-center space-x-2 text-center transition cursor-pointer hover:text-[#cf254a]"
        >
          <div className="flex justify-center ">
            <div
              className="bg-[#333] group-hover:bg-[#cf254a] transition-colors xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-6 h-6"
              style={{ WebkitMaskImage: `url(${StoreIcon})`, WebkitMaskSize: 'contain', WebkitMaskPosition: 'center', WebkitMaskRepeat: 'no-repeat', maskImage: `url(${StoreIcon})`, maskSize: 'contain', maskPosition: 'center', maskRepeat: 'no-repeat' }}
            />
          </div>
          <p className="text-center text-[#333] 2xl:text-[12px] xl:text-[11px] lg:text-[9px] font-serif">
            Store
          </p>
        </NavLink>

        <button
          type="button"
          onClick={() => {
            isLoggedIn
              ? (window.location.href = '/account')
              : setIsStoreModalOpen(true);
          }}
          className="group flex flex-col items-center space-x-2 text-center transition cursor-pointer hover:text-[#cf254a]"
        >
          <div className="">
            <div
              className="bg-[#333] group-hover:bg-[#cf254a] transition-colors xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-6 h-6"
              style={{ WebkitMaskImage: `url(${UserIcon})`, WebkitMaskSize: 'contain', WebkitMaskPosition: 'center', WebkitMaskRepeat: 'no-repeat', maskImage: `url(${UserIcon})`, maskSize: 'contain', maskPosition: 'center', maskRepeat: 'no-repeat' }}
            />
          </div>
          <p className="text-center text-[#333] 2xl:text-[12px] xl:text-[11px] lg:text-[10px] font-serif">
            Profile
          </p>
        </button>
      </div>
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return (
    <button className="header-menu-mobile-toggle reset" onClick={() => open('mobile')}>
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
            { id: '1-1-1', title: 'Gold', type: 'HTTP', url: '/collections/gold', items: [] },
            { id: '1-1-2', title: 'Diamond', type: 'HTTP', url: '/collections/diamond', items: [] },
            { id: '1-1-3', title: 'Rose Gold', type: 'HTTP', url: '/collections/rose-gold', items: [] },
            { id: '1-1-4', title: 'Two Tone', type: 'HTTP', url: '/collections/two-tone', items: [] },
            { id: '1-1-5', title: 'Tri Tone', type: 'HTTP', url: '/collections/tri-tone', items: [] },
          ],
        },
        {
          id: '1-2',
          title: 'Category',
          type: 'HTTP',
          url: '/collections/category',
          items: [
            { id: '1-2-1', title: 'Earrings', type: 'HTTP', url: '/collections/earrings', items: [] },
            { id: '1-2-2', title: 'Pendants', type: 'HTTP', url: '/collections/pendants', items: [] },
            { id: '1-2-3', title: 'Bangles', type: 'HTTP', url: '/collections/bangles', items: [] },
            { id: '1-2-4', title: 'Mangalsutras', type: 'HTTP', url: '/collections/mangalsutras', items: [] },
            { id: '1-2-5', title: 'Maang Tikka', type: 'HTTP', url: '/collections/maang-tikka', items: [] },
            { id: '1-2-6', title: 'Pendant With Chain', type: 'HTTP', url: '/collections/pendant-with-chain', items: [] },
          ],
        },
        {
          id: '1-3',
          title: 'Curated Shop',
          type: 'HTTP',
          url: '/collections/curated-shop',
          items: [
            { id: '1-3-1', title: 'Necklaces', type: 'HTTP', url: '/collections/necklaces', items: [] },
            { id: '1-3-2', title: 'Rings', type: 'HTTP', url: '/collections/rings', items: [] },
            { id: '1-3-3', title: 'Bracelets', type: 'HTTP', url: '/collections/bracelets', items: [] },
            { id: '1-3-4', title: 'Chains', type: 'HTTP', url: '/collections/chains', items: [] },
            { id: '1-3-5', title: 'Anklet', type: 'HTTP', url: '/collections/anklets', items: [] },
            { id: '1-3-6', title: 'Waist Chain', type: 'HTTP', url: '/collections/waist-chain', items: [] },
          ],
        },
        {
          id: '1-4',
          title: 'Shop For',
          type: 'HTTP',
          url: '/collections/shop-for',
          items: [
            { id: '1-4-1', title: 'Bridal Jewelry', type: 'HTTP', url: '/collections/bridal-jewelry', items: [] },
            { id: '1-4-2', title: 'Groom Jewelry', type: 'HTTP', url: '/collections/groom-jewelry', items: [] },
            { id: '1-4-3', title: 'Gifts', type: 'HTTP', url: '/collections/gifts', items: [] },
            { id: '1-4-4', title: 'Women', type: 'HTTP', url: '/collections/women', items: [] },
            { id: '1-4-5', title: 'Men', type: 'HTTP', url: '/collections/men', items: [] },
            { id: '1-4-6', title: 'Kids', type: 'HTTP', url: '/collections/kids', items: [] },
            { id: '1-4-7', title: 'Unisex', type: 'HTTP', url: '/collections/unisex', items: [] },
          ],
        },
      ],
    },
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
    fontWeight: isActive ? '' : undefined,
    color: isPending ? '#ccc' : '#fff',
  };
}