import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import featuredAnokhi from '../assets/ANOKHI.jpg';
import featuredRang from '../assets/RANG.jpg';
import featuredMudhra from '../assets/MUDHRA.jpg';
import featuredNimah from '../assets/NIMAH.jpg';
import featuredTejasvi from '../assets/TEJASVI.jpg';

// ─── Types ───────────────────────────────────────────────────────────────────
interface FeaturedItem {
  title: string;
  image: string;
  link: string;
}

const FEATURED: FeaturedItem[] = [
  {title: 'Anokhi Collection', image: featuredAnokhi, link: '/collections/anokhi'},
  {title: 'Rang Collection', image: featuredRang, link: '/collections/rang'},
  {title: 'Mudhra Collection', image: featuredMudhra, link: '/collections/mudhra'},
  {title: 'Nimah Collection', image: featuredNimah, link: '/collections/nimah'},
  {title: 'Tejasvi Collection', image: featuredTejasvi, link: '/collections/tejasvi'},
];

// We duplicate items to create a seamless "infinite" feel
const EXTENDED_FEATURED = [...FEATURED, ...FEATURED, ...FEATURED];

export default function FeaturedCarousel() {
  const total = FEATURED.length;
  // Start at the middle set of items
  const [current, setCurrent] = useState(total);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleNext();
    }, 5000);
  }, [current]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, resetAutoplay]);

  // Handle seamless wrapping
  const handleTransitionEnd = () => {
    if (current >= total * 2) {
      setIsTransitioning(false);
      setCurrent(current - total);
    } else if (current < total) {
      setIsTransitioning(false);
      setCurrent(current + total);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      // Small delay to allow the "jump" without transition, then re-enable
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  const goTo = (index: number) => {
    // index here is the 0-total index, but we need to map it to the current visible set
    const offset = current % total;
    const target = current + (index - offset);
    setIsTransitioning(true);
    setCurrent(target);
    resetAutoplay();
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrent((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrent((prev) => prev - 1);
  };

  const activeIndex = current % total;

  return (
    <section className="w-full py-10 bg-white overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-8 px-4">
        <p className="heading-font text-6xl text-center mb-12">Our Collections</p>
        <p className="mt-2 text-md text-gray-500 mx-auto">
          Inspired by life, crafted like a dream. This isn't just jewellery — it's your story, told in gold.
        </p>
      </div>

      {/* ── DESKTOP sliding track ── */}
      <div className="hidden md:block relative w-full h-[550px]">
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          className={`flex ${isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""}`}
          style={{
            transform: `translateX(calc(50% - ${970 / 2}px - ${current * (970 + 24)}px))`,
            gap: "24px",
            padding: "0 24px",
          }}
        >
          {EXTENDED_FEATURED.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (index === current) return;
                setIsTransitioning(true);
                setCurrent(index);
                resetAutoplay();
              }}
              className={`shrink-0 relative rounded-tl-[160px] rounded-br-[160px] cursor-pointer select-none transition-all duration-1000 ${
                index === current ? "shadow-2xl scale-100" : "scale-95 shadow-md"
              }`}
              style={{
                width: 970,
                height: 500,
                overflow: "hidden",
                opacity: 1, // Full opacity as requested
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {index === current && (
                <Link
                  to={item.link}
                  className="absolute inset-0 z-10"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE carousel ── */}
      <div className="md:hidden px-4">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-tl-[80px] rounded-br-[80px] shadow-lg">
          <img
            src={FEATURED[activeIndex].image}
            alt={FEATURED[activeIndex].title}
            className="h-full w-full object-cover"
          />
          <Link to={FEATURED[activeIndex].link} className="absolute inset-0" />
        </div>
      </div>

      {/* ── Dots ── */}
      <div className="mt-8 flex items-center justify-center gap-4">
        {FEATURED.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group relative flex items-center justify-center"
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              border: "1px solid #999",
              cursor: "pointer",
              background: "transparent",
              transition: "all 0.3s",
              padding: 0,
            }}
          >
            {i === activeIndex && (
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#bf1c47",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}