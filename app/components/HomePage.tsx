import React, { useEffect, useMemo, useState } from "react";
import {useLocation} from 'react-router';
// import Banner1 from '../assets/banner1.png'
// import Banner2 from '../assets/banner2.jpg'
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import ShopByCategory from "./ShopByCategory";
import CollectionsGrid from "./CollectionsGrid";
import GiftSection from "./GiftSection";
import FeedCarousel from "./FeedCarousel";
import TrendingCarousel from "./TrendingCarousel";
import ShopYourWay from "./ShopYourWay";
import JewelleryGuides from "./JewelleryGuides";
import KeepInTouch from "./KeepInTouch";
type Media = {
  id: string;
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

type MediaItem = {
  media1: Media | null;
  media2: Media | null;
  media3: string | null;
  media4: string | null;
  collections: {
    id: string;
    title: string;
    handle: string;
    image: {
      url: string;
      altText: string | null;
    } | null;
  }[];
};

type CarouselItem = {
  image: string;
  text: string;
};


const textItems = [
  "Shop 100% Natural, Certified Diamonds",
  "Shop 100% Natural, Certified Diamonds",
  "Shop 100% Natural, Certified Diamonds",
  "Shop 100% Natural, Certified Diamonds",
];

const TextCarousel: React.FC = () => {
  return (
    <div className="w-full py-2 overflow-hidden bg-[#FCF5EE] flex items-center">
      <div className="flex w-max animate-text-scroll">
        {[...textItems, ...textItems].map((text, i) => (
          <div
            key={i}
            className="px-[20rem] whitespace-nowrap text-lg font-semibold text-black"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

const ROTATION_INTERVAL = 3000;

type HomePageProps = MediaItem;

const HomePage: React.FC<HomePageProps> = ({
  media1,
  media2,
  media3,
  media4,
  collections,
}) => {
  const location = useLocation();
  const [index, setIndex] = useState(0);
  const items: CarouselItem[] = useMemo(
    () =>
      [
        media1?.url ?? null,
        media2?.url ?? null,
        media3,
        media4,
      ]
        .filter((m): m is string => Boolean(m))
        .map((url) => ({
          image: url,
          text: "Shop 100% Natural, Certified Diamonds",
        })),
    [media1, media2, media3, media4],
  );

  // Auto rotate
  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    if (location.hash !== '#shop-by-category') return;
    const section = document.getElementById('shop-by-category');
    if (!section) return;
    section.scrollIntoView({behavior: 'smooth', block: 'start'});
  }, [location.hash]);

  const getImageIndex = (i: number) => {
    return (index + i) % items.length; // clockwise
  };

  const getTextIndex = (i: number) => {
    return (index - i + items.length) % items.length; // anti-clockwise
  };

  return (
    <>
    <div className="relative w-full lg:h-[80vh] md:h-[40vh] h-[20vh] flex items-center justify-center overflow-hidden">
      
        {/* IMAGE CAROUSEL (CLOCKWISE) */}
        <div className="absolute w-full h-full flex items-center justify-center">
            {items.map((_, i) => {
                const item = items[getImageIndex(i)];

                const isVideo = item.image.includes("youtube.com") || item.image.includes("youtube-nocookie.com");

                return isVideo ? (
                <iframe
                    key={i}
                    src={item.image}
                    title={`carousel-video-${i}`}   // ✅ unique title
                    className="absolute w-full h-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                ) : (
                <img
                    key={i}
                    src={item.image}
                    alt=""
                    className="absolute w-full h-full object-cover rounded-xl shadow-lg transition-all duration-700"
                />
                );
            })}
        </div>
        {/* CONTROLS */}
        <div className="absolute top-1/2 left-0 w-full flex justify-between px-6 -translate-y-1/2">
        <button
            onClick={() =>
            items.length > 0
              ? setIndex((prev) => (prev - 1 + items.length) % items.length)
              : null
            }
            disabled={items.length === 0}
            className="lg:p-4 p-2 border-2 border-white text-white rounded-full "
        >
            <BiLeftArrow />
        </button>

        <button
            onClick={() =>
              items.length > 0
                ? setIndex((prev) => (prev + 1) % items.length)
                : null
            }
            disabled={items.length === 0}
            className="lg:p-4 p-2 border-2 border-white text-white rounded-full"
        >
            <BiRightArrow />
        </button>
        </div>
 
    </div>
    {/* Carousal Text */}
    <div className="w-full bg-[#FCF5EE]">
        <TextCarousel />
    </div>
    <ShopByCategory categories={collections} />
    <CollectionsGrid />
    <GiftSection />
    <FeedCarousel />
    <TrendingCarousel />
    <ShopYourWay />
    <JewelleryGuides />
    <KeepInTouch />
    </>
  );
};

export default HomePage;