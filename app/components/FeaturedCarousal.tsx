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

// ─── Sample data (replace with your real FEATURED array) ─────────────────────
const FEATURED: FeaturedItem[] = [
  {title: 'Anokhi Collection', image: featuredAnokhi, link: '/collections/anokhi'},
  {title: 'Rang Collection', image: featuredRang, link: '/collections/rang'},
  {title: 'Mudhra Collection', image: featuredMudhra, link: '/collections/mudhra'},
  {title: 'Nimah Collection', image: featuredNimah, link: '/collections/nimah'},
  {title: 'Tejasvi Collection', image: featuredTejasvi, link: '/collections/tejasvi'},
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function wrap(index: number, length: number) {
  return ((index % length) + length) % length;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = FEATURED.length;
  const prev = wrap(current - 1, total);
  const next = wrap(current + 1, total);

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((prevCurrent) => wrap(prevCurrent + 1, total));
    }, 4000);
  }, [total]);

  const goto = useCallback((index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setCurrent(index);
    if (animationRef.current) clearTimeout(animationRef.current);
    animationRef.current = setTimeout(() => setAnimating(false), 400);
    resetAutoplay();
  }, [animating, current, resetAutoplay]);

  const goPrev = () => goto(wrap(current - 1, total));
  const goNext = () => goto(wrap(current + 1, total));

  // Auto-play
  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [current, resetAutoplay]);

  return (
    <section className="w-full py-10 bg-white">
      {/* Heading */}
      <div className="text-center mb-8 px-4">
        <p className="heading-font text-6xl text-center mb-12">Our Collections</p>
        <p className="mt-2 text-md text-gray-500 mx-auto">
          Inspired by life, crafted like a dream. This isn't just jewellery — it's your story, told in gold.
        </p>
      </div>

      {/* ── DESKTOP carousel ── */}
      <div className="hidden md:block relative w-full overflow-hidden">
        {/*
          Layout: [prev-peek] [center-main] [next-peek]
          The outer container clips the side images so only a partial edge shows.
        */}
        <div
          className="flex items-center justify-center"
          style={{ gap: "24px" }}
        >
          {/* LEFT PEEK — clips on the left, only right portion visible */}
          <div
            className="shrink-0 cursor-pointer rounded-tl-[160px] rounded-br-[160px] select-none"
            style={{
              width: 970,
              height: 500,
              overflow: "hidden",
            }}
            onClick={goPrev}
            aria-label="Previous collection"
          >
            <img
              src={FEATURED[prev].image}
              alt={FEATURED[prev].title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.4s ease",
                opacity: animating ? 0.7 : 1,
              }}
            />
          </div>

          {/* CENTER MAIN */}
          <Link
            to={FEATURED[current].link}
            className="shrink-0 block relative rounded-tl-[160px] rounded-br-[160px] cursor-pointer select-none"
            style={{
              width: 970,
              height: 500,
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
              transition: "box-shadow 0.3s",
            }}
          >
            <img
              src={FEATURED[current].image}
              alt={FEATURED[current].title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.4s ease",
                opacity: animating ? 0.7 : 1,
              }}
            />
           
          </Link>

          {/* RIGHT PEEK — clips on the right, only left portion visible */}
          <div
            className="shrink-0 cursor-pointer rounded-tl-[160px] rounded-br-[160px] select-none"
            style={{
              width: 970,
              height: 500,
              overflow: "hidden",
            }}
            onClick={goNext}
            aria-label="Next collection"
          >
            <img
              src={FEATURED[next].image}
              alt={FEATURED[next].title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.4s ease",
                opacity: animating ? 0.7 : 1,
              }}
            />
          </div>
        </div>
      </div>

      {/* ── MOBILE carousel ── */}
      <div className="md:hidden mx-4 overflow-hidden rounded-tl-3xl rounded-br-3xl shadow-lg">
        <Link to={FEATURED[current].link}>
          <img
            src={FEATURED[current].image}
            alt={FEATURED[current].title}
            className="w-full h-64 object-cover"
            style={{ transition: "opacity 0.4s", opacity: animating ? 0.7 : 1 }}
          />
        </Link>
      </div>

      {/* ── Dots + arrows ── */}
       <div className="mt-5 flex items-center justify-center gap-3">
        {FEATURED.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => goto(i)}
            aria-label={`Go to ${item.title}`}
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: i === current ? "2px solid #bf1c47" : "2px solid #aaaaaa",
              cursor: "pointer",
              background: i === current ? "#bf1c47" : "transparent",
              transition: "all 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}