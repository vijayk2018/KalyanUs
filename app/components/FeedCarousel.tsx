import React, { useState } from "react";
import CarousalImage1 from '../assets/1stimage.png'
import CarousalImage2 from '../assets/2ndimage.png'
import CarousalImage3 from '../assets/3rdimage.png'
import CarousalImage4 from '../assets/4thimage.png'
import CarousalImage5 from '../assets/5thimage.png'
import { ChevronLeft, ChevronRight } from "lucide-react";

type Post = {
  image: string;
  href: string;
};

const posts: Post[] = [
  {
    image: CarousalImage3,
    href: 'https://www.instagram.com/p/DDeu2yay0iz/?igsh=MWVucTU5bHp5cm1vMQ%3D%3D',
  },
  {
    image: CarousalImage2,
    href: 'https://www.instagram.com/p/DG5s08DhiDM/?igsh=bjM1dHFpMWRxaGJu',
  },
  {
    image: CarousalImage1,
    href: 'https://www.instagram.com/reel/DIOs962TqEV/?igsh=MThhNzA4c2V1ZnVkYg%3D%3D',
  },
  {
    image: CarousalImage4,
    href: 'https://www.instagram.com/p/DFGLyWcTuPW/?igsh=NGw1MmltdHRnbjRh',
  },
  {
    image: CarousalImage5,
    href: 'https://www.instagram.com/p/DDrjUPUSW_2/?igsh=Y2Yzajcycnlzenpx',
  },
];

const FeedCarousel: React.FC = () => {
  const [index, setIndex] = useState(2); // center start
  const [mobileIndex, setMobileIndex] = useState(0);

  const getPosition = (i: number) => {
    const total = posts.length;

    let diff = i - index;

    // 🔥 circular adjustment
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) return "center";
    if (diff === -1) return "left";
    if (diff === 1) return "right";
    if (diff === -2) return "far-left";
    if (diff === 2) return "far-right";

    return "hidden";
  };

  const BASE_WIDTH = 260; // base width of side images
  const GAP = 285; // horizontal gap between images

  return (
    <div className="w-full py-16 text-center 2xl:px-[5rem] lg:px-[4rem] bg-[#f5f5f5]">
      {/* Heading */}
      {/* <h2 className="text-5xl font-serif mb-2">Fresh Of The feed</h2> */}
      <p className="heading-font text-6xl ">Fresh Of The feed</p>

      {/* Desktop carousel */}
      <div className="relative items-center justify-center hidden lg:flex">
        <button
          onClick={() => setIndex((prev) => (prev - 1 + posts.length) % posts.length)}
          className="absolute 2xl:left-28 lg:left-2 z-20 bg-red-600 text-white p-1 rounded-full"
        >
          <ChevronLeft />
        </button>

        <div className="relative w-full h-[70vh] flex items-center justify-center">
          {posts.map((post, i) => {
            const pos = getPosition(i);
            let translateX = 0;
            let scale = 1;
            let zIndex = 1;

            switch (pos) {
              case "center":
                translateX = 0;
                scale = 1.2;
                zIndex = 10;
                break;
              case "left":
                translateX = -GAP;
                scale = 0.9;
                zIndex = 5;
                break;
              case "right":
                translateX = GAP;
                scale = 0.9;
                zIndex = 5;
                break;
              case "far-left":
                translateX = -260 * 2;
                scale = 0.75;
                break;
              case "far-right":
                translateX = 260 * 2;
                scale = 0.75;
                break;
              default:
                translateX = 0;
            }

            return (
              <div
                key={i}
                className="absolute transition-all duration-500"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  width: `${BASE_WIDTH}px`,
                }}
              >
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-2xl shadow-xl p-3 w-full h-full"
                >
                  <img src={post.image} alt="" className="w-full h-full object-cover rounded-xl" />
                </a>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setIndex((prev) => (prev + 1) % posts.length)}
          className="absolute 2xl:right-28 lg:right-2 z-20 bg-red-600 text-white p-1 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Mobile carousel */}
      <div className="lg:hidden mt-8 px-4">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500"
            style={{transform: `translateX(-${mobileIndex * 100}%)`}}
          >
            {posts.map((post, i) => (
              <div key={i} className="min-w-full">
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-2xl shadow-lg p-3"
                >
                  <img src={post.image} alt="" className="w-full h-full object-cover rounded-xl" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => setMobileIndex((prev) => (prev - 1 + posts.length) % posts.length)}
            className="bg-red-600 text-white p-2 rounded-full"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {posts.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${i === mobileIndex ? 'bg-[#b91c47]' : 'bg-[#d0d0d0]'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setMobileIndex((prev) => (prev + 1) % posts.length)}
            className="bg-red-600 text-white p-2 rounded-full"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCarousel;