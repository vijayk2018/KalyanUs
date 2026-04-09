import React from "react";
import DiamondGuide from '../assets/diamondguide.png';
import MetalGuide from '../assets/metalguide.png';
import GemstoneGuide from '../assets/gemstoneguide.png';
import SizeGuide from '../assets/sizeguide.png';

type Guide = {
  id: number;
  title: string;
  image: string;
};

const guides: Guide[] = [
  {
    id: 1,
    title: "DIAMOND GUIDE",
    image: DiamondGuide,
  },
  {
    id: 2,
    title: "METAL GUIDE",
    image: MetalGuide,
  },
  {
    id: 3,
    title: "GEMSTONE GUIDE",
    image: GemstoneGuide,
  },
  {
    id: 4,
    title: "SIZE GUIDE",
    image: SizeGuide,
  },
];

const JewelleryGuides: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-full py-16 2xl:px-[5rem] lg:px-[4rem] bg-[#f5f5f5]">
      <div className="w-full flex flex-col">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif mb-2">
            Jewellery Guides
          </h2>
          <p className="text-gray-500 font-serif">
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
                  <button className="bg-[#BF1C47] text-white text-sm px-4 py-2 rounded-md font-serif tracking-wide">
                    READ MORE
                  </button>
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
              className="bg-white rounded-2xl shadow-md pl-6 py-6 flex items-center justify-between hover:shadow-lg transition"
            >
              
              {/* LEFT CONTENT */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4 font-serif">
                  {item.title}
                </h3>

                <button className="bg-[#BF1C47] text-white text-sm px-4 py-2 rounded-md font-serif">
                  READ MORE
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain"
              />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default JewelleryGuides;