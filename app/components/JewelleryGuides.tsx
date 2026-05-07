import React from "react";
import { Link } from "react-router";
import DiamondGuide from '../assets/diamondguide.png';
import MetalGuide from '../assets/metalguide.png';
import GemstoneGuide from '../assets/gemstoneguide.png';
import SizeGuide from '../assets/sizeguide.png';

type Guide = {
  id: number;
  title: string;
  image: string;
};

const guides: (Guide & { link: string })[] = [
  {
    id: 1,
    title: "DIAMOND GUIDE",
    image: DiamondGuide,
    link: "/diamond-guide",
  },
  {
    id: 2,
    title: "METAL GUIDE",
    image: MetalGuide,
    link: "/metal-guide",
  },
  {
    id: 3,
    title: "GEMSTONE GUIDE",
    image: GemstoneGuide,
    link: "/gemstone-guide",
  },
  {
    id: 4,
    title: "SIZE GUIDE",
    image: SizeGuide,
    link: "/size-guide",
  },
];

const guideImageClass: Record<number, string> = {
  1: "h-24 w-24 right-0",
  2: "h-24 w-24 right-0",
  3: "h-24 w-20 right-0",
  4: "h-28 w-24 right-0",
};

const JewelleryGuides: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-full py-25 2xl:px-[5rem] lg:px-[4rem] bg-[#f5f5f5]">
      <div className="w-full flex flex-col">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="heading-font text-6xl">
            Jewellery Guides
          </h2>
          <p className="text-black font-helvetica-light py-3">
            These designs match your interest
          </p>
        </div>

        {/* MOBILE: Horizontal cards */}
        <div className="lg:hidden px-6">
          <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory no-scrollbar">
            {guides.map((item) => (
              <div
                key={item.id}
                className="snap-start min-w-[88%] md:min-w-[60vw] bg-white rounded-2xl shadow-md pl-6 py-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4 font-serif text-[32px] leading-[0.95]">
                    {item.title}
                  </h3>
                  <Link to={item.link} target="_blank" rel="noopener noreferrer">
                    <button className="bg-[#BF1C47] text-white text-sm px-4 py-2 rounded-md font-serif tracking-wide">
                      READ MORE
                    </button>
                  </Link>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP: Existing grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 mx-auto">
          {guides.map((item) => (
            <div
              key={item.id}
              className="relative h-[122px] w-[280px] overflow-hidden rounded-2xl bg-white p-5 pr-24 shadow-md transition-all duration-300 ease-out hover:shadow-xl"
            >

              {/* LEFT CONTENT */}
              <div className="relative z-10">
                <h3 className="mb-4 whitespace-nowrap font-serif text-[18px] font-semibold text-gray-800">
                  {item.title}
                </h3>

                <Link to={item.link} target="_blank" rel="noopener noreferrer">
                  <button className="rounded-md bg-[#BF1C47] px-2 py-2 font-serif text-[13px] leading-none text-white font-bold">
                    READ MORE
                  </button>
                </Link>
              </div>

              {/* RIGHT IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className={`absolute top-1/2 -translate-y-1/2 object-contain ${guideImageClass[item.id]}`}
              />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default JewelleryGuides;