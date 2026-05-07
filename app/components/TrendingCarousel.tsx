<<<<<<< HEAD
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react"; 
=======
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
>>>>>>> 9e0a683eb627b5885d6ecca725b3d5601aeefd75
import { Link } from "react-router";
import CarousalImage1 from '../assets/car1.jpg'
import CarousalImage2 from '../assets/car2.jpg'
import CarousalImage3 from '../assets/car3.jpg'
import CarousalImage4 from '../assets/car4.jpg'
import CarousalImage5 from '../assets/car5.jpg'
import CarousalImage6 from '../assets/car6.jpg'
import CarousalImage7 from '../assets/car7.jpg'

type Product = {
  id: number;
  name: string;
  image: string;
};

const products: Product[] = [
  { id: 1, name: "Authentic Heritage Green and Red Stones Long Gold Jhumka 22 Karat", image: CarousalImage1, },
  { id: 2, name: "Aesthetic Inspi Emerald and Ruby Stones Traditional Gold Bangle 22 Karat", image: CarousalImage2, },
  { id: 3, name: "Divine Heritage Gold Filigree Collar Necklace 22 Karat", image: CarousalImage3, },
  { id: 4, name: "Regal Bloom Red Vintage Gold Medallion Pendant 22 Karat", image: CarousalImage4, },
  { id: 5, name: "Laxmi Goddess Motif Traditional Gold Necklace 22 Karat", image: CarousalImage5, },
  { id: 6, name: "Krishna's Melody Red And Green Stones Antique Gold Earrings 22 Karat", image: CarousalImage6, },
  { id: 7, name: "Ornament Gold Arm Vanki 22 Karat", image: CarousalImage7, },
];

const toProductHandle = (name: string) =>
  name
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const TrendingCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const total = products.length;

  // Move next
  const next = () => setIndex((prev) => (prev + 1) % total);

  // Move previous
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(2); // mobile
      } else {
        setItemsToShow(4); // desktop
      }
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Always get 4 items, wrapping around if necessary
  const visibleItems = Array.from({ length: itemsToShow }, (_, i) => {
    return products[(index + i) % total];
  });

  return (
    <div className="flex items-center justify-between  w-full lg:py-16 2xl:px-[5rem] lg:px-[4rem] bg-[#f5f5f5]">
      <div className="grid lg:grid-cols-5 gap-10 items-center">
        {/* LEFT - CAROUSEL */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-6">
            {/* LEFT ARROW */}
            <button onClick={prev} className="text-2xl">
              <ChevronLeft className="text-gray-400" size={28} />
            </button>

            {/* ITEMS */}
            <div className="flex items-start gap-8">
              {visibleItems.map((item, i) => {
                const isCenter = i === 1 || i === 2; // middle two images emphasized
                return (
                  <Link
                    key={item.id}
                    to={`/products/${toProductHandle(item.name)}`}
                    className={`group flex flex-col items-center transition-all duration-300 hover:opacity-100 ${
                      isCenter ? "opacity-100 scale-100" : "opacity-40 scale-90"
                    }`}
                  >
                    <div className="relative flex h-56 w-56 items-center justify-center bg-white lg:h-48 lg:w-48 2xl:h-64 2xl:w-64">
                      <ArrowUpRight
                        className="absolute right-1 top-2 z-10 text-black opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        size={18}
                        strokeWidth={1.8}
                      />
                      <img
                        src={item.image}
                        alt={item.name}
                        className="2xl:w-64 2xl:h-64 lg:w-48 lg:h-48 w-56 h-56 object-contain"
                      />
                    </div>
                    <p
                      className="mt-2 w-40 whitespace-normal text-left text-[0.9375vw] font-light normal-case leading-[1.14583vw] text-black hover:underline 2xl:w-56"
                      style={{fontFamily: '"Helvetica Neue LT Std 45 Light", sans-serif'}}
                    >
                      {item.name}
                    </p>
                  </Link>
                );
              })}
            </div>

            {/* RIGHT ARROW */}
            <button onClick={next} className="text-2xl">
              <ChevronRight className="text-gray-400" size={28} />
            </button>
          </div>
        </div>

        {/* RIGHT - TEXT SECTION */}
        <div className="lg:col-span-1 md:text-center lg:text-left p-6 lg:p-0">
          {/* <h2 className="text-4xl font-serif mb-4 lg:block hidden">
            Trending <br /> Collections
          </h2> */}
          {/* <h2 className="text-4xl font-serif mb-4 lg:hidden">
            Trending Collections
          </h2> */}

          <p className="heading-font mb-4 text-6xl">
            Trending Collections
          </p>

<<<<<<< HEAD
          <p className="text-gray-600 mb-6 font-serif">
            Explore this season&apos;s trending collection.
=======
          <p className="text-black mb-6 font-helvetica-light">
            Explore this season's trending collection.
>>>>>>> 9e0a683eb627b5885d6ecca725b3d5601aeefd75
          </p>
          <Link
            to="/collections/trending-collections"
            className="inline-block bg-red-600 text-white px-6 py-3"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingCarousel;
