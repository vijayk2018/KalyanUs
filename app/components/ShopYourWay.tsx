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
  <div className="bg-[#f5f5f5] pt-12 pb-8 text-center lg:pt-20 lg:pb-12">
    {/* <h2 className="text-5xl font-serif mb-2">Shop Your Way</h2> */}
    <p className="heading-font text-6xl mb-2">Shop Your Way</p>
    <p className="text-gray-500 font-serif">Your Next Look Start Here</p>
  </div>

  {/* SPLIT BACKGROUND SECTION */}
  <div className="relative bg-[#f5f5f5]">

    {/* RED HALF BACKGROUND */}
    <div className="absolute bottom-0 left-0 w-full h-[55%] bg-[#800027]"></div>

    {/* CONTENT */}
    <div className="relative z-10 flex justify-center gap-4 px-6 pb-24 lg:flex-wrap lg:gap-[12rem] lg:pb-32 xl:gap-[14rem]">

      {categories.map((item) => (
        <Link
          key={item.id}
          to={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center relative"
        >

          {/* CARD IMAGE */}
          <div className={`h-[170px] w-[110px] overflow-hidden rounded-tl-[24px] rounded-tr-[70px] rounded-bl-[48px] rounded-br-[18px] shadow-lg md:h-[250px] md:w-[190px] lg:h-[420px] lg:w-[300px] lg:rounded-tl-[32px] lg:rounded-tr-[150px] lg:rounded-bl-[88px] lg:rounded-br-[28px] ${item.id === 2 ? 'mt-10 lg:mt-0' : 'mt-16 lg:mt-0'} `}>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* FLOATING PRODUCT IMAGE */}
          <div className={`flex w-[110px] items-end justify-between gap-2 md:w-[190px] lg:w-[300px] ${item.id === 2 ? '-mt-8 lg:-mt-8' : '-mt-4 lg:-mt-7'}`}>
  
            {/* PRODUCT IMAGE */}
            <img
              src={item.productImage}
              alt="product"
              className={`${item.id === 2 ? 'w-16 lg:w-32' : 'w-20 lg:w-44'} shrink-0 object-contain`}
            />

            {/* TITLE */}
            <p className={`flex-1 whitespace-nowrap text-center font-serif font-semibold text-white lg:text-lg ${item.id === 2 ? 'mb-2 lg:mb-12.5 lg:ml-18' : 'mb-2 lg:mb-1 lg:ml-2'}`}>
              {item.title}
            </p>

          </div>

        </Link>
      ))}

    </div>

    {/* BUTTON */}
    <div className="relative z-10 flex justify-center pb-6">
      <a className="absolute bg-[#BF1C47] text-white px-8 py-2 rounded-md font-semibold font-serif cursor-pointer" href="/collections/kj-us-sub-category" target="_blank" rel="noopener noreferrer">
        VIEW ALL
      </a>
    </div>

  </div>
</div>
  );
};

export default ShopYourWay;