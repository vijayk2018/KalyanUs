import { useEffect, useMemo, useRef, useState } from 'react';
import kalyanLogo from '~/assets/kalyanLogo.svg';

// Yellow Gold assets
import yellow1 from '~/assets/Yellow-1.webp';
import yellow2 from '~/assets/Yellow-2.webp';
import yellow4 from '~/assets/Yellow-4.webp';
import yellow41 from '~/assets/Yellow-4_1.webp';
import yellow5 from '~/assets/Yellow-5.webp';

// White Gold assets
import whiteGold1 from '~/assets/White-Gold-1.webp';
import whiteGold3 from '~/assets/White-Gold-3.webp';
import whiteGold31 from '~/assets/White-Gold-3_1.webp';

// Rose Gold assets
import roseGold1 from '~/assets/Rose-Gold-1.webp';
import roseGold2 from '~/assets/Rose-Gold-2.webp';
import roseGold3 from '~/assets/Rose-Gold-3.webp';

// Platinum assets
import platinum1 from '~/assets/Platinum-1.webp';
import platinum3 from '~/assets/Platinum-3.webp';
import platinum4 from '~/assets/Platinum-4.webp';
import platinum4Alt from '~/assets/Platinum-4 (1).webp';
import platinum42 from '~/assets/Platinum-4-2.webp';

// Nav arrows
import leftArrowImg from '~/assets/metal-arrow-left.svg';
import rightArrowImg from '~/assets/metal-arrow-right.svg';

/* ─────────────────────────────────────────────────────────────────────────────
   BgFreeImg — Removes the grey/white background baked into jewellery images
   using Canvas flood-fill from all 4 image edges so the ring appears clean.
   ───────────────────────────────────────────────────────────────────────────── */
type BgFreeImgProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

function BgFreeImg({ src, alt, className, style }: BgFreeImgProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setProcessedSrc(null); // reset on src change

    const img = new window.Image();

    img.onload = () => {
      if (!mountedRef.current) return;

      const W = img.naturalWidth;
      const H = img.naturalHeight;

      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      let imageData: ImageData;
      try {
        imageData = ctx.getImageData(0, 0, W, H);
      } catch {
        // Cross-origin safety — just show original
        return;
      }

      const data = imageData.data;

      /* Sample mean background colour from the 4 corner pixels */
      const corners = [0, (W - 1), (H - 1) * W, (H - 1) * W + (W - 1)];
      let bgR = 0, bgG = 0, bgB = 0;
      for (const idx of corners) {
        bgR += data[idx * 4];
        bgG += data[idx * 4 + 1];
        bgB += data[idx * 4 + 2];
      }
      bgR = Math.round(bgR / 4);
      bgG = Math.round(bgG / 4);
      bgB = Math.round(bgB / 4);

      const THRESHOLD = 40; // colour distance tolerance
      const visited = new Uint8Array(W * H);
      const stack: number[] = [];

      const tryPush = (idx: number) => {
        if (idx < 0 || idx >= W * H || visited[idx]) return;
        visited[idx] = 1;
        const pi = idx * 4;
        const dist =
          Math.abs(data[pi] - bgR) +
          Math.abs(data[pi + 1] - bgG) +
          Math.abs(data[pi + 2] - bgB);
        if (dist <= THRESHOLD * 3) {
          data[pi + 3] = 0; // transparent
          stack.push(idx);
        }
      };

      /* Seed from all 4 edges */
      for (let x = 0; x < W; x++) { tryPush(x); tryPush((H - 1) * W + x); }
      for (let y = 0; y < H; y++) { tryPush(y * W); tryPush(y * W + (W - 1)); }

      /* BFS flood fill */
      while (stack.length > 0) {
        const idx = stack.pop()!;
        const x = idx % W;
        const y = Math.floor(idx / W);
        if (x + 1 < W) tryPush(idx + 1);
        if (x - 1 >= 0) tryPush(idx - 1);
        if (y + 1 < H) tryPush(idx + W);
        if (y - 1 >= 0) tryPush(idx - W);
      }

      ctx.putImageData(imageData, 0, 0);
      if (mountedRef.current) setProcessedSrc(canvas.toDataURL('image/png'));
    };

    img.src = src;
    return () => { mountedRef.current = false; };
  }, [src]);

  return (
    <img
      src={processedSrc ?? src}
      alt={alt}
      className={className}
      style={style}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────────────────── */
/**
 * standard    → image LEFT | [subtitle] title description [rightImage] [button]  RIGHT
 * text-only   → centered title + bullets + [tables]
 * dual-info   → title TOP | image LEFT | image RIGHT
 * image-full  → single large image centered (annotations are baked into image)
 */
type SlideLayout = 'standard' | 'text-only' | 'dual-info' | 'image-full';


type CompTableLeft = { rows: [string, string][] };
type CompTableRight = {
  headers: [string, string, string];
  rows: { label: string; values: [string, string, string] }[];
};

type Slide = {
  layout: SlideLayout;
  title?: string;
  subtitle?: string;
  description?: string;
  bullets?: string[];
  leftImage?: string;
  rightImage?: string;
  showBrowseButton?: boolean;
  leftImageClassName?: string;
  tableLeft?: CompTableLeft;
  tableRight?: CompTableRight;
};

/* ─────────────────────────────────────────────────────────────────────────────
   15 SLIDES  (exactly matching staging order)
   ───────────────────────────────────────────────────────────────────────────── */
const slides: Slide[] = [

  /* ── 1. Precious Metal ─────────────────────────────────────────────────── */
  {
    layout: 'standard',
    title: 'PRECIOUS METAL',
    subtitle: 'INTRODUCTION',
    description:
      'Have been the centrepiece for adornments throughout history. Silver and Gold have been admired as jewellery & décor. While Gold takes the spotlight, silver, platinum, palladium are quite popular as well. The history of Gold finds its link to money which in course of time was replaced by currency, as we know of today; the Gold Standard was fixed that determined the value of their currencies in terms of a specified amount of gold.',
    leftImage: yellow1,
    showBrowseButton: true,
  },

  /* ── 2. Gold ───────────────────────────────────────────────────────────── */
  {
    layout: 'standard',
    title: 'GOLD',
    description:
      "The word 'gold' comes from the Old English word \"geolu\" which means yellow. From the very beginning gold attracted civilizations all over the world. It has been treasured as an object of desire and beauty. Due to its golden color it often played an important role in Mythology and is considered a prized possession till date.",
    leftImage: yellow2,
    showBrowseButton: true,
  },

  /* ── 3. Gold Facts  (text-only, 4 bullets) ─────────────────────────────── */
  {
    layout: 'text-only',
    title: 'GOLD FACTS',
    bullets: [
      '49% of the total gold mined is used in manufacture of jewellery, rest being used for industrial purposes. 187,200 tonnes of gold has already been mined and yet it is believed that 80% of the total gold in the world still remains unearthed.',
      "Yellow is the most popular color in gold, even though gold is available in a diverse palette. The use of alloys with 24 karat gold makes it more durable, as gold's malleability makes it very soft, this alloying practice is also used to change its color.",
      '24 karat is pure malleable gold and is not used in jewellery. While 22 karat and 18 karat is most commonly used in India, 14 karat, 10 karat and even 9 karat is used in European and other countries.',
      "Every piece of jewellery is stamped with its purity, hallmarking logo, brand name and jeweller's identification mark, which enables the customer to exchange or sell the product later and also for the jeweller as it helps them recognize their manufacturing.",
    ],
  },

  /* ── 4. Hallmarking  (karat table LEFT | annotated ring RIGHT) ─────────── */
  {
    layout: 'dual-info',
    title: 'WHAT JEWELLERY HALLMARKING DENOTES',
    leftImage: yellow41,
    rightImage: yellow4,
  },

  /* ── 5. Shades of Gold ─────────────────────────────────────────────────── */
  {
    layout: 'standard',
    title: 'SHADES OF GOLD',
    description:
      'Differently colored gold is as pure and real as its yellow counterparts. Pure gold being too soft for jewellery is mixed with alloys to give it the durability it requires. Each metal color lends its color turning its original color to various shades of white, pink, red, green and the like. Nickel and silver are used for white gold, while copper is used for pink and silver for green. The shades of yellow gold can also vary with the alloys used for its various karat weights. The figure shows the various color palettes of gold.',
    leftImage: yellow5,
  },

  /* ── 6. White Gold ─────────────────────────────────────────────────────── */
  {
    layout: 'standard',
    title: 'WHITE GOLD',
    description:
      "The word 'gold' comes from the Old English word \"geolu\" which means yellow. From the very beginning gold attracted civilizations all over the world. It has been treasured as an object of desire and beauty. Due to its golden color it often played an important role in Mythology and is considered a prized possession till date.",
    leftImage: whiteGold1,
    showBrowseButton: true,
  },

  /* ── 7. White Gold Facts  (text-only, 4 bullets) ──────────────────────── */
  {
    layout: 'text-only',
    title: 'WHITE GOLD FACTS',
    bullets: [
      'White gold is a mix of alloys like nickel, palladium, silver and zinc with yellow gold that gives it its white color. The minimum karat weight for white gold is 18k as above this it will not impart its white color, white gold in general is a bit yellowish and so it has to be covered in a layer of rhodium.',
      'White gold karat weight is measured the same way as that of yellow gold, i.e. in both cases 18k would mean 75% gold. It is only the color of the alloys that make a difference.',
      'White gold is the most selling metal after yellow gold, as it is the most popular choice for engagement rings around the world.',
      'A diamond from colorless to light brown color may look better on white gold than diamonds with a yellow tint as the yellow shade is clearly visible against white gold through the naked eye.',
    ],
  },

  /* ── 8. Engagement Rings  (couple LEFT | text + rings image RIGHT) ──────── */
  {
    layout: 'standard',
    title: 'ENGAGEMENT RINGS',
    description:
      'White gold is by far the most popular precious metal for engagement rings. The lustre and elegance of white gold color makes it a favourite for diamond settings, as does its price difference to platinum.',
    leftImage: whiteGold3,    // White-Gold-3.webp  = couple illustration
    rightImage: whiteGold31,  // White-Gold-3_1.webp = diamond engagement rings
    showBrowseButton: true,
  },

  /* ── 9. Rose Gold ──────────────────────────────────────────────────────── */
  {
    layout: 'standard',
    title: 'ROSE GOLD',
    description:
      'Rose first came to popularity in Russia in the 19th Century and so it is often referred to as "Russian Gold". Rose gold is a mixture of yellow gold with copper and silver, copper lending it the reddish tint, therefore there is no such thing as pure rose gold as it cannot be made without use of alloys.',
    leftImage: roseGold1,
    showBrowseButton: true,
  },

  /* ── 10. Rose Gold Facts  (text-only + 3 bullets + composition tables) ─── */
  {
    layout: 'text-only',
    title: 'ROSE GOLD',
    bullets: [
      'Rose Gold, Pink Gold and Red Gold are a few varieties of rose gold, the names differ due to the difference in color intensity.',
      'The more copper used in the mix the more intense the color is, and the less is the purity, for e.g. 18k rose gold will have higher purity than 10k rose gold.',
      'Rose gold is more durable than yellow or white gold, but less than platinum and does not necessarily require rhodium as its color is quite naturally pink.',
    ],
    tableLeft: {
      rows: [
        ['18K Red Gold', '75% Gold and 25% Copper'],
        ['18K Rose Gold', '75% Gold, 22.5% Copper and 2.5% Silver'],
        ['18K Pink Gold', '75% Gold, 20% Copper and 5% Silver'],
      ],
    },
    tableRight: {
      headers: ['18K Yellow Gold', '18K White Gold', '18K Rose Gold'],
      rows: [
        { label: '% Gold', values: ['75%', '75%', '75%'] },
        { label: '% Silver', values: ['10-20%', '18.50%', '2.75%'] },
        { label: '% Copper', values: ['5-15%', '1%', '25.25%'] },
        { label: '% Zinc', values: ['0%', '5.25%', '0%'] },
      ],
    },
  },

  /* ── 11. Rose Hues ─────────────────────────────────────────────────────── */
  {
    layout: 'standard',
    title: 'ROSE HUES',
    description:
      "Rose gold, red gold, pink gold all belong to the same family and has gained huge popularity as the ideal gold color for gifting jewellery, proposals, Valentine's Day, anniversaries etc. Owing to its color, pink gold also complements every skin tone, unlike white gold, which has turned it into the most desirable color amongst the generation today.",
    leftImage: roseGold3,
    showBrowseButton: true,
  },

  /* ── 12. Pt 950 Annotated Ring  (full-image — annotation baked into asset) */
  {
    layout: 'image-full',
    leftImage: platinum3,
  },

  /* ── 13. Platinum ──────────────────────────────────────────────────────── */
  {
    layout: 'standard',
    title: 'PLATINUM',
    description:
      "Platinum is the rarest and heaviest of metals. All of the world's platinum could fit into an average sized swimming pool, as a result it is more expensive than gold. The color of platinum is greyish-white resembles palladium and white gold closely, however, like white gold requires rhodium coating, platinum requires none.",
    leftImage: platinum1,
    showBrowseButton: true,
  },

  /* ── 14. Platinum Facts  (text-only, 3 bullets) ───────────────────────── */
  {
    layout: 'text-only',
    title: 'PLATINUM FACTS',
    bullets: [
      '80% of platinum mined in the world comes from South Africa. Two more deposits are in Columbia and Russia.',
      'Platinum can resist corrosion as a result on scratching and erosion there is no loss of metal, the metal is just displaced.',
      'The melting point of platinum is 1,769°C, and its density is 11% more than gold and about twice the density of silver.',
    ],
  },

  /* ── 15. Weddings Bands  (couple LEFT | text + bands image RIGHT) ──────── */
  {
    layout: 'standard',
    title: 'WEDDINGS BANDS',
    description:
      'Platinum being one of the rarest of metals is considered an epitome of everlasting love and purity; as it exists in its pure form and is not mixed with any other alloy to form jewellery. Wedding bands are the most famous type of jewellery associated with platinum.',
    leftImage: platinum4Alt,
    rightImage: platinum42,
    showBrowseButton: true,
    leftImageClassName: 'max-w-[360px] md:max-w-[410px] max-h-[420px]',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   CATEGORY NAV ANCHORS
   ───────────────────────────────────────────────────────────────────────────── */
const categoryAnchors = [
  { label: 'Yellow Gold', index: 0 },   // slides 1-5
  { label: 'White Gold', index: 5 },   // slides 6-8
  { label: 'Rose Gold', index: 8 },   // slides 9-11
  { label: 'Platinum', index: 11 },  // slides 12-15
];

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */
export default function MetalGuide() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = useMemo(() => {
    let current = categoryAnchors[0].label;
    for (const cat of categoryAnchors) {
      if (activeIndex >= cat.index) current = cat.label;
    }
    return current;
  }, [activeIndex]);

  const nextSlide = () => setActiveIndex((p) => (p + 1) % slides.length);
  const prevSlide = () => setActiveIndex((p) => (p - 1 + slides.length) % slides.length);

  const slide = slides[activeIndex];

  return (
    <section className="w-full bg-white text-[#1d1d1d]">

      {/* ── Top Nav Bar ── */}
      <div className="h-[64px] sm:h-[72px] bg-[#c8284d] px-3 sm:px-4 md:px-8 lg:px-16 flex items-center justify-between">
        <img src={kalyanLogo} alt="Kalyan Jewellers" className="h-7 sm:h-9 w-auto" />
        <div className="md:hidden">
          <label htmlFor="metal-category" className="sr-only">
            Select metal category
          </label>
          <select
            id="metal-category"
            value={activeCategory}
            onChange={(e) => {
              const selected = categoryAnchors.find((item) => item.label === e.target.value);
              if (selected) setActiveIndex(selected.index);
            }}
            className="h-9 rounded bg-white/95 px-2 text-[11px] uppercase tracking-[0.08em] text-[#1d1d1d] outline-none"
          >
            {categoryAnchors.map((item) => (
              <option key={item.label} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.12em] uppercase text-white">
          {categoryAnchors.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveIndex(item.index)}
              className={`transition border-b pb-0.5 ${activeCategory === item.label ? 'border-white' : 'border-transparent'
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Slide Wrapper ── */}
      <div className="relative min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-72px)] flex items-center justify-center px-[4%] sm:px-[5%]">

        {/* ← Prev */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-[1%] z-20 flex h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black items-center justify-center hover:bg-gray-800 transition flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* ══════════ standard ══════════ */}
        {slide.layout === 'standard' && (
          <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">

            {/* Left: image — mix-blend-mode:multiply blends any image background to white */}
            <div className="flex justify-center items-center">
              {slide.leftImage && (
                <img
                  src={slide.leftImage}
                  alt={slide.title ?? 'slide image'}
                  className={`${slide.leftImageClassName ?? 'max-w-[420px] max-h-[460px]'} w-full h-auto object-contain block`}
                  style={{ mixBlendMode: 'multiply' }}
                />
              )}
            </div>

            {/* Right: text content */}
            <div className="flex flex-col items-center text-center">
              {slide.subtitle && (
                <p className="text-[11px] tracking-[0.28em] uppercase text-[#8a8a8a] mb-2">
                  {slide.subtitle}
                </p>
              )}
              {slide.title && (
                <h1 className="text-3xl md:text-4xl uppercase tracking-[0.06em] mb-5 font-light">
                  {slide.title}
                </h1>
              )}
              {slide.description && (
                <p className="text-[#666] text-sm leading-7 max-w-[480px]">{slide.description}</p>
              )}
              {slide.rightImage && (
                <img
                  src={slide.rightImage}
                  alt={`${slide.title ?? ''} detail`}
                  className="mt-5 max-w-[300px] w-full h-auto max-h-[240px] object-contain block"
                  style={{ mixBlendMode: 'multiply' }}
                />
              )}
              {slide.showBrowseButton && (
                <button
                  type="button"
                  className="mt-6 border border-[#1d1d1d] px-8 py-3 text-[11px] tracking-[0.12em] uppercase hover:bg-gray-50 transition"
                >
                  Browse Product
                </button>
              )}
            </div>
          </div>
        )}

        {/* ══════════ text-only ══════════ */}
        {slide.layout === 'text-only' && (
          <div className="w-full max-w-[860px] py-16 mx-auto text-center">
            {slide.title && (
              <h1 className="text-3xl md:text-4xl uppercase tracking-[0.06em] mb-8 font-light">
                {slide.title}
              </h1>
            )}

            {/* Bullets */}
            {slide.bullets && (
              <ul className="text-left space-y-3 mb-8">
                {slide.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[#666] text-sm leading-7">
                    <span className="shrink-0 mt-1">*</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Composition tables — Rose Gold Facts */}
            {(slide.tableLeft || slide.tableRight) && (
              <div className="flex flex-col md:flex-row gap-6 mt-4">

                {/* Left comparison table */}
                {slide.tableLeft && (
                  <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <tbody>
                        {slide.tableLeft.rows.map(([type, comp], i) => (
                          <tr key={i}>
                            <td className="border border-[#ddd] bg-white px-3 py-2 font-medium text-[#333]">
                              {type}
                            </td>
                            <td className="border border-[#ddd] bg-white px-3 py-2 text-[#666]">
                              {comp}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Right alloy breakdown table */}
                {slide.tableRight && (
                  <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr>
                          <th className="border border-[#ddd] bg-[#f9dcdc] px-3 py-2 text-left text-[#333]" />
                          {slide.tableRight.headers.map((h, i) => (
                            <th
                              key={i}
                              className="border border-[#ddd] bg-[#f9dcdc] px-3 py-2 text-[#333] font-medium"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {slide.tableRight.rows.map((row, i) => (
                          <tr key={i}>
                            <td className="border border-[#ddd] bg-white px-3 py-2 font-medium text-[#333]">
                              {row.label}
                            </td>
                            {row.values.map((v, j) => (
                              <td key={j} className="border border-[#ddd] bg-white px-3 py-2 text-[#666]">
                                {v}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════ dual-info ══════════ */}
        {slide.layout === 'dual-info' && (
          <div className="w-full max-w-[1200px] py-12 mx-auto">
            {slide.title && (
              <h1 className="text-2xl md:text-3xl uppercase tracking-[0.06em] mb-8 font-light text-center">
                {slide.title}
              </h1>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <img
                  src={slide.leftImage}
                  alt="left visual"
                  className="max-w-[480px] w-full h-auto object-contain block"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
              <div className="flex justify-center">
                <img
                  src={slide.rightImage}
                  alt="right visual"
                  className="max-w-[480px] w-full h-auto object-contain block"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ══════════ image-full  (Pt 950 annotated ring) ══════════ */}
        {slide.layout === 'image-full' && (
          <div className="w-full max-w-[900px] py-12 mx-auto flex justify-center">
            <img
              src={slide.leftImage}
              alt="platinum ring"
              className="w-full max-w-[700px] h-auto max-h-[560px] object-contain block"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
        )}

        {/* → Next */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 sm:right-[1%] z-20 flex h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black items-center justify-center hover:bg-gray-800 transition flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Slide indicators removed as per request */}
    </section>
  );
}
