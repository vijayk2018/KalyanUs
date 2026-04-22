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
import menuPriceImage from '../assets/menuPrice.jpg';
import apoorvaMenuImage from '../assets/apoorva.jpeg';
import ziahMenuImage from '../assets/ziah.jpeg';
import heraMenuImage from '../assets/hera.jpeg';
import mudhraMenuImage from '../assets/mudhra.jpg';
import nimahMenuImage from '../assets/nimah.jpg';
import anokhiMenuImage from '../assets/anokhi.jpg';
import rangMenuImage from '../assets/rang.jpg';
import tejasviMenuImage from '../assets/tejasvi.jpeg';
import banglesMenuImage from '../assets/bangles.jpg';
import braceletsMenuImage from '../assets/bracelets.jpg';
import bridalJewelryMenuImage from '../assets/bridalJewelry.jpg';
import chainsMenuImage from '../assets/chains.jpg';
import earringsMenuImage from '../assets/earrings.jpg';
import giftsMenuImage from '../assets/gifts.jpg';
import necklacesMenuImage from '../assets/necklaces.jpg';
import religiousMenuImage from '../assets/religious.jpg';
import ringsMenuImage from '../assets/rings.jpg';
import womenMenuImage from '../assets/Women.jpg';
import goldMenuImage from '../assets/gold.jpg'
import mudhraSideMenuImage  from '../assets/menuMuhurat.jpg'
import menuNecklaceImage from '../assets/menuNecklace.jpg';
import bridalNecklaceMenuImage from '../assets/bridalNecklace.jpg';
import charmNecklaceMenuImage from '../assets/charmNecklace.jpg';
import chokerNecklaceMenuImage from '../assets/chokerNecklace.jpg';
import collarNecklaceMenuImage from '../assets/collarNecklace.jpg';
import delicateNecklaceMenuImage from '../assets/delicateNecklace.jpg';
import designerNecklaceMenuImage from '../assets/designerNecklace.jpg';
import eternityNecklaceMenuImage from '../assets/eternityNecklace.jpg';
import goldNecklaceMenuImage from '../assets/goldNecklace.jpg';
import lariatNecklaceMenuImage from '../assets/lariatNecklace.jpeg';
import longNecklaceMenuImage from '../assets/longNecklace.jpg';
import multiLayerNecklaceMenuImage from '../assets/multiLayerNecklace.jpg';
import pendantNecklaceMenuImage from '../assets/pendantNecklace.jpg';
import diamondNecklaceMenuImage from '../assets/diamondNecklace.jpeg';
import menuRingImage from '../assets/menuRing.jpg';
import adjustableRingMenuImage from '../assets/adjustableRing.jpg';
import broadRingMenuImage from '../assets/broadRing.jpeg';
import cocktailRingMenuImage from '../assets/cocktailRing.jpg';
import classicRingMenuImage from '../assets/classic.jpg';
import casualRingMenuImage from '../assets/casual.jpeg';
import engagementRingMenuImage from '../assets/engagementRing.jpg';
import gapRingMenuImage from '../assets/gapRing.jpeg';
import statementRingMenuImage from '../assets/statementRing.jpg';
import twoFingerRingMenuImage from '../assets/twoFingerRing.jpg';
import vRingMenuImage from '../assets/vRing.jpeg';
import eternityMenuImage from '../assets/eternity.jpg';
import coupleBandsMenuImage from '../assets/coupleBands.jpg';
import weddingBandsMenuImage from '../assets/weddingBands.jpg';
import menuEarringsImage from '../assets/menuEarrings.jpg';
import chandBaliMenuImage from '../assets/chandBali.jpg';
import chandelierMenuImage from '../assets/chandelier.jpg';
import delicateEarringsMenuImage from '../assets/delicateEarrings.jpeg';
import droopsDanglesMenuImage from '../assets/droopsDangles.jpeg';
import earCuffsMenuImage from '../assets/earCuffs.jpg';
import hoopsMenuImage from '../assets/hoops.jpeg';
import jhumkaMenuImage from '../assets/jhumka.jpg';
import longEarringsMenuImage from '../assets/longEarrings.jpeg';
import missMatchMenuImage from '../assets/missMatch.jpeg';
import multiStonesMenuImage from '../assets/multiStones.jpg';
import statementEarringsMenuImage from '../assets/statementEarrings.jpg';
import studMenuImage from '../assets/stud.jpeg';
import menuDiamondImage from '../assets/menuDiamond.jpg';
import banglesDiamondMenuImage from '../assets/bangles.jpeg';
import braceletDiamondMenuImage from '../assets/bracelet.jpeg';
import earringsDiamondMenuImage from '../assets/earrings.jpeg';
import mangalsutraPendantMenuImage from '../assets/mangalsutraPendant.jpeg';
import necklaceDiamondMenuImage from '../assets/necklace.jpeg';
import pendantsDiamondMenuImage from '../assets/pendants.jpeg';
import pendantWithChainDiamondMenuImage from '../assets/pendantWithChain.jpeg';
import ringsDiamondMenuImage from '../assets/rings.jpeg';
import tiePinMenuImage from '../assets/tiePin.jpeg';
import menuGoldImage from '../assets/menuGold.jpg';
import ankletGoldMenuImage from '../assets/ankletGold.jpg';
import bajubandhGoldMenuImage from '../assets/bajubandhGold.jpg';
import banglesGoldMenuImage from '../assets/banglesgold.jpg';
import braceletGoldMenuImage from '../assets/braceletGold.jpg';
import chainsGoldMenuImage from '../assets/chainsGold.jpg';
import earringsGoldMenuImage from '../assets/earringsGold.jpg';
import handsetGoldMenuImage from '../assets/handsetGold.jpg';
import maangTikkaGoldMenuImage from '../assets/maangTikkaGold.jpg';
import mangalsutraGoldMenuImage from '../assets/mangalsutraGold.jpg';
import mugappuGoldMenuImage from '../assets/mugappuGold.jpg';
import necklaceGoldMenuImage from '../assets/necklaceGold.jpg';
import pendantsGoldMenuImage from '../assets/pendantsGold.jpg';
import pendantWithChainGoldMenuImage from '../assets/pendantWithChaingold.jpg';
import religiousGoldMenuImage from '../assets/religiousGold.jpg';
import ringsGoldMenuImage from '../assets/ringsGold.jpg';
import vankiGoldMenuImage from '../assets/vankiGold.jpg';
import waistChainGoldMenuImage from '../assets/waistChainGold.jpg';
import menuOccasionImage from '../assets/menuOccasion.jpg';
import bridalJewelryOccasionMenuImage from '../assets/bridalJewelryOccasion.jpg';
import giftsOccasionMenuImage from '../assets/giftsOccasion.jpg';
import kidsOccasionMenuImage from '../assets/kidsOccasion.jpg';
import menOccasionMenuImage from '../assets/MenOccasion.jpg';
import unisexOccasionMenuImage from '../assets/unisexOccasion.jpg';
import womenOccasionMenuImage from '../assets/womenOccasion.jpg';
import weddingDiamondOccasionMenuImage from '../assets/weddingDiamond.jpeg';
import weddingGoldOccasionMenuImage from '../assets/weddingGoldJewelry.jpg';
import allEngagementRingsOccasionMenuImage from '../assets/allEngagementRings.jpg';
import engagementJewelryForHimOccasionMenuImage from '../assets/engagementJewelryForHim.jpg';
import engagementJewelryForHerOccasionMenuImage from '../assets/engagementJewelryForHer.jpg';
import engagementRingsForMenOccasionMenuImage from '../assets/engagementRingsForMen.jpg';
import engagementRingsForWomenOccasionMenuImage from '../assets/engagementRingsForWomen.jpg';
import partyJewelryForMenOccasionMenuImage from '../assets/partyJewelryForMen.jpg';
import partyJewelryForWomenOccasionMenuImage from '../assets/partyJewelryForWomen.jpeg';
import ankletJewelryMenuImage from '../assets/ankletJewelry.jpg';
import bajubandhJewelryMenuImage from '../assets/bajubandhJewelry.jpg';
import banglesJewelryMenuImage from '../assets/banglesJewelry.jpg';
import braceletsJewelryMenuImage from '../assets/braceletsJewelry.jpeg';
import bridalJewelryJewelryMenuImage from '../assets/bridalJewelryJewelry.jpg';
import chainsJewelryMenuImage from '../assets/chainsJewelry.jpg';
import diamondJewelryMenuImage from '../assets/diamondJewelry.jpeg';
import earringsJewelryMenuImage from '../assets/earringsJewelry.jpeg';
import giftsJewelryMenuImage from '../assets/giftsJewelry.jpg';
import goldJewelryMenuImage from '../assets/goldJewelry.jpg';
import groomJewelryMenuImage from '../assets/groomJewelryJewelry.jpg';
import handsetJewelryMenuImage from '../assets/handsetJewelry.jpg';
import kidsJeweleryMenuImage from '../assets/kidsJewelry.jpg';
import maangTikkaJewelryMenuImage from '../assets/maangTikkaJewelry.jpg';
import mangalsutrasJewelryMenuImage from '../assets/mangalsutrasJewelry.jpg';
import menJewelryMenuImage from '../assets/menJewelry.jpg';
import mugappuJewelryMenuImage from '../assets/mugappuJewelry.jpg';
import necklacesJewelryMenuImage from '../assets/necklacesJewelry.jpeg';
import newArrivalJewelryMenuImage from '../assets/newArrivalJewelry.jpeg';
import pendantWithChainJewelryMenuImage from '../assets/pendantWithChainJewelry.jpg';
import pendantsJewelryMenuImage from '../assets/pendantsJewelry.jpg';
import religiousJewelryMenuImage from '../assets/religiousJewelry.jpg';
import ringsJewelryMenuImage from '../assets/ringsJewelry.jpg';
import roseGoldJewelryMenuImage from '../assets/roseGoldJewelry.jpeg';
import tiePinJewelryMenuImage from '../assets/tiePinJewelry.jpeg';
import triToneJewelryMenuImage from '../assets/triToneJewelry.jpg';
import twoToneJewelryMenuImage from '../assets/twoToneJewelry.jpg';
import unisexJewelryMenuImage from '../assets/unisexJewelry.jpg';
import vankiJewelryMenuImage from '../assets/vankiJewelry.jpg';
import waistChainJewelryMenuImage from '../assets/waistChainJewelry.jpg';
import womenJewelryMenuImage from '../assets/womenJewelry.jpg';
import moreBrandStoryImage from '../assets/moreBrandStory.jpg';
import moreCollectionsImage from '../assets/moreCollections.jpg';
import moreBlogImage from '../assets/blogMainBanner.jpg';
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

const COLLECTION_MENU_IMAGES: Record<string, string> = {
  apoorva: apoorvaMenuImage,
  ziah: ziahMenuImage,
  hera: heraMenuImage,
  mudhra: mudhraMenuImage,
  nimah: nimahMenuImage,
  anokhi: anokhiMenuImage,
  rang: rangMenuImage,
  tejasvi: tejasviMenuImage,
};

const HEADER_MENU_ITEM_IMAGES: Record<string, string> = {
  bangles: banglesMenuImage,
  bracelets: braceletsMenuImage,
  'bridal jewelry': bridalJewelryMenuImage,
  bridaljewelry: bridalJewelryMenuImage,
  chains: chainsMenuImage,
  earrings: earringsMenuImage,
  gifts: giftsMenuImage,
  necklaces: necklacesMenuImage,
  religious: religiousMenuImage,
  rings: ringsMenuImage,
  women: womenMenuImage,
  gold: goldMenuImage,
  'bridal necklace': bridalNecklaceMenuImage,
  'charm necklace': charmNecklaceMenuImage,
  'choker necklace': chokerNecklaceMenuImage,
  'collar necklace': collarNecklaceMenuImage,
  'diamond necklace': diamondNecklaceMenuImage,
  'delicate necklace': delicateNecklaceMenuImage,
  'designer necklace': designerNecklaceMenuImage,
  'eternity necklace': eternityNecklaceMenuImage,
  'gold necklace': goldNecklaceMenuImage,
  'long necklace': longNecklaceMenuImage,
  'lariat necklace': lariatNecklaceMenuImage,
  'multi layer necklace': multiLayerNecklaceMenuImage,
  multilayernecklace: multiLayerNecklaceMenuImage,
  'pendant necklace': pendantNecklaceMenuImage,
  'adjustable ring': adjustableRingMenuImage,
  'broad ring': broadRingMenuImage,
  casual: casualRingMenuImage,
  classic: classicRingMenuImage,
  eternity: eternityMenuImage,
  'classic ring': classicRingMenuImage,
  'cocktail ring': cocktailRingMenuImage,
  'engagement ring': engagementRingMenuImage,
  'gap ring': gapRingMenuImage,
  'statement ring': statementRingMenuImage,
  'two finger ring': twoFingerRingMenuImage,
  'v ring': vRingMenuImage,
  'couple bands': coupleBandsMenuImage,
  'wedding bands': weddingBandsMenuImage,
  'eternity ring': eternityMenuImage,
  'chand bali': chandBaliMenuImage,
  chandelier: chandelierMenuImage,
  'delicate earrings': delicateEarringsMenuImage,
  'droops and dangles': droopsDanglesMenuImage,
  'drops dangles': droopsDanglesMenuImage,
  'droops dangles': droopsDanglesMenuImage,
  'ear cuffs': earCuffsMenuImage,
  hoops: hoopsMenuImage,
  jhumka: jhumkaMenuImage,
  'long earrings': longEarringsMenuImage,
  missmatch: missMatchMenuImage,
  'miss-match': missMatchMenuImage,
  'multi stones': multiStonesMenuImage,
  'statement earrings': statementEarringsMenuImage,
  stud: studMenuImage,
  bracelet: braceletDiamondMenuImage,
  mangalsutra: mangalsutraPendantMenuImage,
  'mangalsutra pendant': mangalsutraPendantMenuImage,
  pendants: pendantsDiamondMenuImage,
  'tie pin': tiePinMenuImage,
  tiepin: tiePinMenuImage,
};

const DIAMOND_MENU_ITEM_IMAGES: Record<string, string> = {
  bangles: banglesDiamondMenuImage,
  earrings: earringsDiamondMenuImage,
  necklace: necklaceDiamondMenuImage,
  rings: ringsDiamondMenuImage,
  'pendant with chain': pendantWithChainDiamondMenuImage,
};

const GOLD_MENU_ITEM_IMAGES: Record<string, string> = {
  anklet: ankletGoldMenuImage,
  bajubandh: bajubandhGoldMenuImage,
  bangles: banglesGoldMenuImage,
  bracelet: braceletGoldMenuImage,
  chains: chainsGoldMenuImage,
  earrings: earringsGoldMenuImage,
  handset: handsetGoldMenuImage,
  'maang tikka': maangTikkaGoldMenuImage,
  mangalsutra: mangalsutraGoldMenuImage,
  mugappu: mugappuGoldMenuImage,
  necklace: necklaceGoldMenuImage,
  pendants: pendantsGoldMenuImage,
  'pendant with chain': pendantWithChainGoldMenuImage,
  religious: religiousGoldMenuImage,
  rings: ringsGoldMenuImage,
  vanki: vankiGoldMenuImage,
  'waist chain': waistChainGoldMenuImage,
};

const JEWELRY_MENU_ITEM_IMAGES: Record<string, string> = {
  anklet: ankletJewelryMenuImage,
  bajubandh: bajubandhJewelryMenuImage,
  bangles: banglesJewelryMenuImage,
  bracelets: braceletsJewelryMenuImage,
  'bridal jewelry': bridalJewelryJewelryMenuImage,
  chains: chainsJewelryMenuImage,
  diamond: diamondJewelryMenuImage,
  diomand: diamondJewelryMenuImage,
  earrings: earringsJewelryMenuImage,
  gifts: giftsJewelryMenuImage,
  gold: goldJewelryMenuImage,
  'groom jewelry': groomJewelryMenuImage,
  handset: handsetJewelryMenuImage,
  'maang tikka': maangTikkaJewelryMenuImage,
  mangalsutra: mangalsutrasJewelryMenuImage,
  mangalsutras: mangalsutrasJewelryMenuImage,
  men: menJewelryMenuImage,
  kids: kidsJeweleryMenuImage,
  mugappu: mugappuJewelryMenuImage,
  necklaces: necklacesJewelryMenuImage,
  'new arrivals': newArrivalJewelryMenuImage,
  'new arrival': newArrivalJewelryMenuImage,
  'pendant with chain': pendantWithChainJewelryMenuImage,
  pendants: pendantsJewelryMenuImage,
  religious: religiousJewelryMenuImage,
  rings: ringsJewelryMenuImage,
  'rose gold': roseGoldJewelryMenuImage,
  'tie pin': tiePinJewelryMenuImage,
  tritone: triToneJewelryMenuImage,
  'tri tone': triToneJewelryMenuImage,
  twotone: twoToneJewelryMenuImage,
  'two tone': twoToneJewelryMenuImage,
  unisex: unisexJewelryMenuImage,
  vanki: vankiJewelryMenuImage,
  'waist chain': waistChainJewelryMenuImage,
  women: womenJewelryMenuImage,
};

const OCCASION_MENU_ITEM_IMAGES: Record<string, string> = {
  'wedding diamond jewelry': weddingDiamondOccasionMenuImage,
  'wedding gold jewelry': weddingGoldOccasionMenuImage,
  mangalsutras: mangalsutrasJewelryMenuImage,
  'all engagement rings': allEngagementRingsOccasionMenuImage,
  'engagement jewelry for him': engagementJewelryForHimOccasionMenuImage,
  'engagement jewelry for her': engagementJewelryForHerOccasionMenuImage,
  'engagement rings for men': engagementRingsForMenOccasionMenuImage,
  'engagement rings for women': engagementRingsForWomenOccasionMenuImage,
  'party jewelry for men': partyJewelryForMenOccasionMenuImage,
  'party jewelry for women': partyJewelryForWomenOccasionMenuImage,
  'bridal jewelry': bridalJewelryOccasionMenuImage,
  'groom jewelry': groomJewelryMenuImage,
  'groom jewellery': groomJewelryMenuImage,
  'groom jewlery': groomJewelryMenuImage,
  gifts: giftsOccasionMenuImage,
  kids: kidsOccasionMenuImage,
  men: menOccasionMenuImage,
  unisex: unisexOccasionMenuImage,
  women: womenOccasionMenuImage,
};

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
                  {isMoreMenu ? (
                    <div className="mx-auto grid w-full grid-cols-3 gap-6">
                      {groupedItems.map((group) => {
                        const normalizedTitle = group.title.trim().toLowerCase();
                        const cardImage = normalizedTitle.includes('brand')
                          ? moreBrandStoryImage
                          : normalizedTitle.includes('collection')
                            ? moreCollectionsImage
                            : moreBlogImage;
                        const cardUrl = normalizedTitle.includes('collection')
                          ? '/our-collections'
                          : resolveMenuUrl(group.url, url);

                        return (
                          <NavLink key={group.id} to={cardUrl} prefetch="intent" className="block">
                            <img
                              src={cardImage}
                              alt={group.title}
                              className="h-[210px] w-full rounded-md object-cover"
                            />
                            <span className="mt-2 block text-center text-[20px] font-semibold text-[#202020]">
                              {group.title}
                            </span>
                          </NavLink>
                        );
                      })}
                    </div>
                  ) : (
                  <div
                    className={`mx-auto grid w-full gap-8 ${
                      shouldShowPromoCard ? 'grid-cols-[1fr_320px]' : 'grid-cols-1'
                    }`}
                  >
                    <div
                      className={`grid gap-6 ${
                        isPriceRangeMenu
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
                        const normalizedGroupTitle = group.title
                          .trim()
                          .toLowerCase();
                        const isCategory = normalizedGroupTitle === 'category';
                        const isAllJewelryGroup = normalizedGroupTitle === 'all jewelry';
                        const isShopForGroup = normalizedGroupTitle === 'shop for';
                        const items = group.items ?? [];
                        const isSingleCategoryLayout =
                          groupedItems.length === 1 && isCategory;
                        const isPriceRangeGroup = isPriceRangeMenu;
                        const splitIndex = Math.ceil(items.length / 2);
                        const columnA = isCategory
                          ? items.slice(0, splitIndex)
                          : items;
                        const columnB = isCategory ? items.slice(splitIndex) : [];
                        const isAll = isCategory && isAllJewelryGroup && isShopForGroup;

                        return (
                        <div
                          key={group.id}
                          className={`space-y-3 ${
                             isCategory && isMuhuratMenu ? 'col-span-2' : 'col-span-1'
                          }`}
                        >
                          <p className="font-semibold tracking-[0.08em] text-[13px] w-30 underline decoration-[#cf254a] underline-offset-4">
                            {getDisplayTitle(group.title)}
                          </p>
                          <div
                            className={
                              isPriceRangeGroup
                                ? 'grid grid-cols-1 gap-y-3'
                                : isSingleCategoryLayout
                                ? 'grid grid-cols-4 gap-x-8 gap-y-3'
                                : isCategory
                                  ? 'grid grid-cols-2 gap-x-6 gap-y-2'
                                  : 'space-y-2'
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
                              const subUrl = resolveMenuUrl(subItem.url, resolveMenuUrl(group.url));
                              const normalizedSubItemTitle = subItem.title.trim().toLowerCase();
                              const menuImage =
                                (isOccasionMenu &&
                                  OCCASION_MENU_ITEM_IMAGES[normalizedSubItemTitle]) ||
                                (isJewelryMenu &&
                                  JEWELRY_MENU_ITEM_IMAGES[normalizedSubItemTitle]) ||
                                (isGoldMenu &&
                                  GOLD_MENU_ITEM_IMAGES[normalizedSubItemTitle]) ||
                                (isDiamondMenu &&
                                  DIAMOND_MENU_ITEM_IMAGES[normalizedSubItemTitle]) ||
                                (isCollectionMenu &&
                                  COLLECTION_MENU_IMAGES[normalizedSubItemTitle]) ||
                                ((isMuhuratMenu || isJewelryMenu || isNecklaceMenu || isRingsMenu || isEarringsMenu || isDiamondMenu || isOccasionMenu) &&
                                  HEADER_MENU_ITEM_IMAGES[normalizedSubItemTitle]);
                              return (
                                <NavLink
                                  key={subItem.id}
                                  to={subUrl}
                                  prefetch="intent"
                                  className={`text-[13px] uppercase leading-5 text-[#202020] transition-colors hover:text-[#8e0a35] ${
                                    menuImage ? 'flex items-center gap-2' : 'block'
                                  }`}
                                >
                                  {menuImage ? (
                                    <img
                                      src={menuImage}
                                      alt={subItem.title}
                                      className="h-8 w-8  object-cover"
                                    />
                                  ) : null}
                                  {subItem.title}
                                </NavLink>
                              );
                            })}
                            {!isSingleCategoryLayout &&
                              columnB.map((subItem) => {
                              const subUrl = resolveMenuUrl(subItem.url, resolveMenuUrl(group.url));
                              const normalizedSubItemTitle = subItem.title.trim().toLowerCase();
                              const menuImage =
                                (isOccasionMenu &&
                                  OCCASION_MENU_ITEM_IMAGES[normalizedSubItemTitle]) ||
                                (isJewelryMenu &&
                                  JEWELRY_MENU_ITEM_IMAGES[normalizedSubItemTitle]) ||
                                (isGoldMenu &&
                                  GOLD_MENU_ITEM_IMAGES[normalizedSubItemTitle]) ||
                                (isDiamondMenu &&
                                  DIAMOND_MENU_ITEM_IMAGES[normalizedSubItemTitle]) ||
                                (isCollectionMenu &&
                                  COLLECTION_MENU_IMAGES[normalizedSubItemTitle]) ||
                                ((isMuhuratMenu || isJewelryMenu || isNecklaceMenu || isRingsMenu || isEarringsMenu || isDiamondMenu || isOccasionMenu) &&
                                  HEADER_MENU_ITEM_IMAGES[normalizedSubItemTitle]);
                              return (
                                <NavLink
                                  key={subItem.id}
                                  to={subUrl}
                                  prefetch="intent"
                                  className={`text-[13px] uppercase leading-5 text-[#202020] transition-colors hover:text-[#8e0a35] ${
                                    menuImage ? 'flex items-center gap-2' : 'block'
                                  }`}
                                >
                                  {menuImage ? (
                                    <img
                                      src={menuImage}
                                      alt={subItem.title}
                                      className="h-8 w-8  object-cover"
                                    />
                                  ) : null}
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
                          src={
                            isPriceRangeMenu
                              ? menuPriceImage
                              : isCollectionMenu
                                ? moreCollectionsImage
                                : isMuhuratMenu 
                                  ? mudhraSideMenuImage
                                  : isNecklaceMenu
                                    ? menuNecklaceImage
                                    : isRingsMenu
                                      ? menuRingImage
                                      : isEarringsMenu
                                        ? menuEarringsImage
                                        : isDiamondMenu
                                          ? menuDiamondImage
                                          : isGoldMenu
                                            ? menuGoldImage
                                            : isOccasionMenu
                                              ? menuOccasionImage
                                  : jewelryMegaMenuPromo
                          }
                          alt={`${item.title} collection`}
                          className="h-[180px] w-full rounded-md object-cover"
                        />
                        <span className="mt-3 inline-block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#202020] border-t border-[#cf254a] pt-1">
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