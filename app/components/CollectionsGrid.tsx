import React from "react";
import { Link } from "react-router";
import MUDHRA from '../assets/Mudhra.png'
import nimah from '../assets/Nimah.jpg'
import TEJASVI from '../assets/tejasvi.png'
import Anokhi from '../assets/anokhi.png'
import rang from '../assets/rang.png'
import hera from '../assets/hera.png'
import apoorva from '../assets/apoorva.png'
import ziah from '../assets/ziah.png'
import MudhraText from '../assets/mudhra.svg'
import NimahText from '../assets/nimah.svg'
import TejasviText from '../assets/tejasvi.svg'
import AnokhiText from '../assets/anokhi.svg'
import RangText from '../assets/rang.svg'
import HeraText from '../assets/hera.svg'
import ApoorvaText from '../assets/apoorva.svg'
import ZiahText from '../assets/ziah.svg'


type Collection = {
  label: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
};

const collections: Collection[] = [
  { label: "Mudhra", title: MudhraText , subtitle: "HANDCRAFTED ANTIQUE JEWELLERY", image: MUDHRA, link: "/collections/mudhra" },
  { label: "Nimah", title: NimahText, subtitle: "TIMELESS TEMPLE JEWELLERY", image: nimah, link: "/collections/nimah" },
  { label: "Tejasvi", title: TejasviText, subtitle: "POLKI DIAMONDS", image: TEJASVI, link: "/collections/tejasvi" },
  { label: "Anokhi", title: AnokhiText, subtitle: "UNCUT DIAMOND", image: Anokhi, link: "/collections/anokhi" },
  { label: "Rang", title: RangText, subtitle: "PRECIOUS STONES", image: rang, link: "/collections/rang" },
  { label: "Hera", title: HeraText, subtitle: "EVERYDAY DIAMOND", image: hera, link: "/collections/hera" },
  { label: "Apoorva", title: ApoorvaText, subtitle: "DIAMONDS FOR SPECIAL OCCASIONS", image: apoorva, link: "/collections/apoorva" },
  { label: "Ziah", title: ZiahText, subtitle: "INFINITE SPARKLES", image: ziah, link: "/collections/ziah" },
];

const CollectionsGrid: React.FC<{ isFrom?: string }> = ({ isFrom }) => {
  return (
    <div className={`${isFrom == 'collections' ? 'bg-white' : 'bg-[#f5f5f5]'}  w-full lg:py-16 2xl:px-[5rem] lg:px-[4rem] p-6`}>
      
      {/* Heading */}
      {/* <h2 className="text-5xl text-center font-serif mb-12">
        Explore the collections
      </h2> */}
      {isFrom == 'collections' ? '' : 
        <p className="heading-font text-6xl text-center mb-12">
          Explore the collections
        </p>
    }
      {/* Grid */}
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {collections.map((item, i) => (
          <Link
            key={i}
            to={item.link}
            className="relative group overflow-hidden cursor-pointer rounded-tl-[60px] rounded-br-[60px]"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="lg:w-[40vw] lg:h-[60vh] w-full h-full object-cover"
            />

            {/* Default Text (bottom) */}
            <div className="absolute bottom-6 left-0 w-full text-center flex justify-center  z-10 transition-all duration-500 group-hover:opacity-0">
              {/* Image */}
                <img
                    src={item.title}
                    alt={item.label}
                    className="w-[8vw] h-[8vh] object-cover filter invert"
                />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#b82042] flex flex-col items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
              {/* Image */}
                <img
                    src={item.title}
                    alt={item.label}
                    className="w-[8vw] h-[8vh]  object-cover filter invert"
                />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionsGrid;