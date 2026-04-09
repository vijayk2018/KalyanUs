import React from "react";
import Essential from '../assets/essential.png'
import Festival from '../assets/Festive.png'
import Party from '../assets/ThePartyEdit.png'
import GiftBox from '../assets/gift.png'

type GiftItem = {
  title: string;
  image: string;
};

const items: GiftItem[] = [
  { title: "Everyday essential", image: Essential },
  { title: "Festive", image: Festival },
  { title: "The Party Edit", image: Party },
];

const GiftSection: React.FC = () => {
  return (
    <div className="w-full bg-[#7a0019] lg:py-24 flex justify-center 2xl:px-[5rem] lg:px-[4rem] p-4 lg:p-6">
      
      {/* Center Container */}
      <div className="w-full bg-[#e6d3c3] rounded-md px-4 lg:px-12 pt-6 lg:pt-12">
        <div className="flex flex-col items-center justify-start pt-4 lg:pt-12">
          {/* Centered Block */}
          <div className="flex flex-col items-start max-w-2xl lg:block hidden">
            {/* Heading */}
            <h2 className="text-5xl font-serif mb-2 text-[#c41e3a]">
              Gift for your favourite ones!
            </h2>

            {/* Paragraph */}
            <p className="text-[#c41e3a] mt-3 font-serif">
              Because your special moments deserves a special gift
            </p>
          </div>
        </div>
        
        <div className="flex flex-col lg:grid lg:grid-cols-5 items-center gap-4">
          {/* Left Image */}
          <div className="flex-1 flex justify-start col-span-2">
            <img
              src={GiftBox}
              alt="Gift"
              className="h-full object-contain"
            />
          </div>

          {/* Centered Block */}
          <div className="flex flex-col items-start max-w-2xl lg:hidden">
            {/* Heading */}
            <h2 className="text-5xl font-serif mb-2 text-[#c41e3a]">
              Gift for your favourite ones!
            </h2>

            {/* Paragraph */}
            <p className="text-[#c41e3a] mt-3 font-serif">
              Because your special moments deserves a special gift
            </p>
          </div>

          {/* Right Content */}
          <div className="flex-1 col-span-3">  

            {/* Cards */}
            <div className="my-8 lg:my-10 flex lg:grid lg:grid-cols-3 gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory">
              {items.map((item, i) => (
                <div key={i} className="flex flex-col items-center min-w-[84%] sm:min-w-[60%] lg:min-w-0 snap-start">
                  
                  {/* Card */}
                  <div className="w-full h-full overflow-hidden lg:rounded-none">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftSection;