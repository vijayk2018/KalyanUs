import React from "react";
import { Link } from "react-router";
import ForHimModel from '../assets/ForHimModel-1.png'
import ForHim from '../assets/forHim.png'
import ForHerModel from '../assets/ForHermodel.png'
import ForHer from '../assets/EarringForHer.png'
import ForLilOneModel from '../assets/Kidsmodel.png'
import ForLilOne from '../assets/Kids.png'

type Category = {
  id: number;
  title: string;
  image: string;
  productImage: string;
  link: string;
};

const categories: Category[] = [
  {
    id: 1,
    title: "For Him",
    image: ForHimModel,
    productImage: ForHim,
    link: "/collections/for-him",
  },
  {
    id: 2,
    title: "For Her",
    image: ForHerModel,
    productImage: ForHer,
    link: "/collections/for-her",
  },
  {
    id: 3,
    title: "For Lil' one",
    image: ForLilOneModel,
    productImage: ForLilOne,
    link: "/collections/lil-one",
  },
];

const ShopYourWay: React.FC = () => {
  return (
    <div className="w-full">

  {/* TOP SECTION */}
  <div className="bg-[#f5f5f5] lg:py-16 text-center">
    {/* <h2 className="text-5xl font-serif mb-2">Shop Your Way</h2> */}
    <p className="heading-font text-6xl mb-2">Shop Your Way</p>
    <p className="text-gray-900 font-serif">Your Next Look Start Here</p>
  </div>

  {/* SPLIT BACKGROUND SECTION */}
  <div className="relative bg-[#f5f5f5]">

    {/* RED HALF BACKGROUND */}
    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#800027]"></div>

    {/* CONTENT */}
    <div className="relative z-10 flex justify-center lg:gap-[8rem] gap-4 pb-20 lg:flex-wrap">

      {categories.map((item) => (
        <Link
          key={item.id}
          to={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center relative"
        >

          {/* CARD IMAGE */}
          <div className={`lg:w-[260px] lg:h-[360px] md:w-[180px] md:h-[230px] w-[100px] h-[150px] overflow-hidden rounded-[40px] shadow-lg bg-white ${item.id === 2 ? 'mt-15 lg:mt-0' : 'mt-25 lg:mt-0'} `}>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* FLOATING PRODUCT IMAGE */}
          <div className={`flex flex-col lg:items-center justify-center gap-4 ${item.id === 2 ? '-mt-7' : '-mt-3'}`}>
  
            {/* PRODUCT IMAGE */}
            <img
              src={item.productImage}
              alt="product"
              className={`${item.id === 2 ? 'lg:w-30 w-15' : 'lg:w-40 w-20'} object-contain`}
            />

            {/* TITLE */}
            <p className={`text-white font-medium whitespace-nowrap font-serif ${item.id === 2 ? 'lg:ml-20 lg:-mt-6' : ''}`}>
              {item.title}
            </p>

          </div>

        </Link>
      ))}

    </div>

    {/* BUTTON */}
    <div className="relative z-10 flex justify-center pb-6">
      <button className="absolute bg-[#BF1C47] text-white px-8 py-2 rounded-md font-semibold font-serif">
        VIEW ALL
      </button>
    </div>

  </div>
</div>
  );
};

export default ShopYourWay;