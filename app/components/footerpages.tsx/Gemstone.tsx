import React from 'react';
import gemstoneHero from '~/assets/gemstone-hero-clean.png';
import hue from '~/assets/hue.jpg';
import tone from '~/assets/tone.jpg';
import saturation from '~/assets/saturation.jpg';
import stone1 from '~/assets/stone1_1.jpg';
import stone2 from '~/assets/stone2_1.jpg';
import stone3 from '~/assets/stone3.jpg';
import stone4 from '~/assets/stone4.jpg';
import stone5 from '~/assets/stone5.jpg';
import stone6 from '~/assets/stone6.jpg';
import stone7 from '~/assets/stone7.jpg';
import stone8 from '~/assets/stone8.jpg';
import stone9 from '~/assets/stone9_1.jpg';
import stone10 from '~/assets/stone10.jpg';
import stone11 from '~/assets/stone11_1.jpg';
import stonePink from '~/assets/stone90_1.jpg';
import pearl from '~/assets/stone89.jpg';
import coral from '~/assets/stone88.jpg';
import cutImage from '~/assets/stone83.jpg';
import showcaseImage from '~/assets/stone84.jpg';
import categoryImage from '~/assets/bw.jpg';

const gemstoneRows = [
  [
    {name: 'Amethyst', image: stone11},
    {name: 'Aquamarine', image: stone10},
    {name: 'Blue Sapphire', image: stone9},
    {name: 'Citrine', image: stone8},
    {name: 'Emerald', image: stone7},
    {name: 'Garnet', image: stone6},
  ],
  [
    {name: 'Ruby', image: stone2},
    {name: 'Tanzanite', image: stone1},
    {name: 'Tourmaline', image: stonePink},
    {name: 'Yellow Sapphire', image: stone5},
    {name: 'Peridot', image: stone4},
    {name: 'Pink sapphire', image: stone3},
  ],
  [
    {name: 'Pearl', image: pearl},
    {name: 'Coral', image: coral},
  ],
];

export default function Gemstone() {
  return (
    <div className="w-full bg-[#f4f7fa] text-[#1f1f1f]">
      <section className="relative w-full overflow-hidden" style={{aspectRatio: '1024 / 283'}}>
        <img
          src={gemstoneHero}
          alt="Gemstone education banner"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="flex w-full max-w-[680px] flex-col items-center text-center">
            <p className="font-serif text-[12px] tracking-[0.2em] text-[#3f3f3f] sm:text-[20px] sm:tracking-[0.28em] md:text-[23px]">
              GEMSTONE EDUCATION
            </p>
            <div className="mt-[4px] sm:mt-[6px] h-px w-[140px] sm:w-[220px] bg-[#3f3f3f]/60" />
            <p className="mt-2 sm:mt-3 font-serif text-[11px] font-semibold tracking-[0.06em] text-[#3f3f3f] sm:text-[20px] md:text-[23px]">
              WHAT ARE GEMSTONES?
            </p>
            <p className="mt-2 sm:mt-3 text-[8px] leading-[1.35] text-[#3f3f3f]/80 sm:text-[14px] sm:leading-[1.6] md:text-[16px]">
              Gemstones are basically rocks and minerals found under the earth. Their characteristics, such as lustre, inclusions, color,
              transparency and aesthetic value make them attractive, hence their usage in jewellery and related adornments.
            </p>
            <button
              type="button"
              className="mt-2 sm:mt-4 border border-[#3f3f3f]/50 px-4 py-1.5 sm:px-8 sm:py-3 text-[9px] text-[#3f3f3f]/80 hover:bg-black/5 sm:text-[16px]"
            >
              Read More
            </button>
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-[5%] py-10">
        <h2 className="text-center text-[22px] sm:text-[28px] md:text-[38px] font-light tracking-[0.03em] text-[#2a2a2a]">WHAT ARE BIRTHSTONES?</h2>
        <p className="mx-auto mt-3 max-w-[1400px] text-center text-[12px] sm:text-[15px] md:text-[20px] leading-[1.55] sm:leading-[1.65] text-[#555]">
          Birthstones are gemstones that have been associated each with one month of the year representing a person's birth month or zodiac.
          Some gemstones are said to represent the nine planets and are labelled as Astrological stones. Either of which is allegedly said
          to aid in various issues of health, fortune, love and luck as they reduce or enhance the effects of planets on the individual.
          However there is no clear proof of this. Astro-gems are associated with 9 planets and have a substitute each however Birthstones
          are assigned to the months, where is it possible to have more than one birthstone for a given month.
        </p>

        <div className="mt-10 space-y-8">
          {gemstoneRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid gap-y-2 ${
                rowIndex < 2 ? 'mx-auto max-w-[1500px] grid-cols-2 sm:grid-cols-3 md:grid-cols-6' : 'mx-auto max-w-[520px] grid-cols-2'
              }`}
            >
              {row.map((gem) => (
                <div key={gem.name} className="flex flex-col items-center text-center">
                  <img src={gem.image} alt={gem.name} className="h-[88px] w-[88px] sm:h-[110px] sm:w-[110px] md:h-[130px] md:w-[130px] rounded-full object-cover" />
                  <p className="mt-2 text-[12px] sm:text-[15px] md:text-[18px] text-[#444]">{gem.name}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#dff0ef] px-[5%] py-10">
        <div className="w-full">
          <h2 className="mb-6 sm:mb-8 text-center text-[24px] sm:text-[28px] md:text-[34px] font-light tracking-[0.06em] text-[#2a2a2a]">
            GEMSTONE COLOR:
          </h2>

          <div className="grid grid-cols-1 gap-x-6 sm:gap-x-10 gap-y-8 sm:gap-y-10 md:grid-cols-3">
            <div className="text-center">
              <p className="text-[14px] tracking-[0.18em] text-[#2a2a2a]">HUE</p>
              <div className="mx-auto mt-2 h-px w-full max-w-[520px] border-t border-dotted border-[#2a2a2a]/60" />
              <img src={hue} alt="Gemstone hue" className="mx-auto mt-4 w-full max-w-[520px] object-contain" />
              <p className="mx-auto mt-4 max-w-[520px] text-[11px] leading-5 text-[#2a2a2a]/80">
                <span className="font-medium text-[#2a2a2a]">HUE:</span> Hue is the predominant color of the gemstone. The basic colors of
                the spectrum account for hue.
              </p>
            </div>

            <div className="text-center">
              <p className="text-[14px] tracking-[0.18em] text-[#2a2a2a]">TONE</p>
              <div className="mx-auto mt-2 h-px w-full max-w-[520px] border-t border-dotted border-[#2a2a2a]/60" />
              <img src={tone} alt="Gemstone tone" className="mx-auto mt-4 w-full max-w-[520px] object-contain" />
              <p className="mx-auto mt-4 max-w-[520px] text-[11px] leading-5 text-[#2a2a2a]/80">
                <span className="font-medium text-[#2a2a2a]">TONE:</span> The types of shades available in a stone are its tone. For
                instance, a dark blue gemstone can be ink-blue, royal- blue, pale-blue, greyish-blue, purplish-blue, blue-black so on and
                so forth.
              </p>
            </div>

            <div className="text-center">
              <p className="text-[14px] tracking-[0.18em] text-[#2a2a2a]">SATURATION</p>
              <div className="mx-auto mt-2 h-px w-full max-w-[520px] border-t border-dotted border-[#2a2a2a]/60" />
              <img src={saturation} alt="Gemstone saturation" className="mx-auto mt-4 w-full max-w-[520px] object-contain" />
              <p className="mx-auto mt-4 max-w-[520px] text-[11px] leading-5 text-[#2a2a2a]/80">
                <span className="font-medium text-[#2a2a2a]">SATURATION:</span> The intensity of the gemstone color is its saturation.
                Saturations can sometimes increase or decrease the price of a gemstone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid w-full grid-cols-1 bg-white md:grid-cols-2 md:gap-0">
        <div className="relative">
          <img src={showcaseImage} alt="Gemstone clarity" className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-[10%] mx-auto flex max-w-[520px] flex-col items-center px-6 text-center text-white">
              <p className="text-[21px] tracking-[0.22em]">GEMSTONE CLARITY</p>
              <p className="mt-4 text-[17px] leading-7 text-white/85">
                Gemstones have naturally occurring inclusions in the form of cloud or crystals, these can often help you determine the
                authenticity of a stone. In some cases these inclusions can become part of the gemstones beauty like in case of turquoise
                or lapis lazuli.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-start px-6 py-10 sm:px-10">
          <img src={cutImage} alt="Gemstone cut" className="w-full max-w-[720px] object-contain" />
          <h3 className="mt-8 text-center text-[24px] tracking-[0.28em] text-[#2a2a2a]">GEMSTONE CUT</h3>
          <p className="mx-auto mt-5 max-w-[650px] text-center text-[17px] leading-7 text-[#2a2a2a]/75">
            For any precious or semi - precious stone the superiority of one stone over the other depends fairly on its cut and ability to
            reflect and refract light. In case of transparent and translucent gemstones this is an important factor. For opaque stones,
            light does not penetrate the stone, hence the symmetry, visible facets and overall polish of the gemstone measure is quality
            and selling price.
          </p>
        </div>
      </section>

      <section className="w-full bg-black">
        <div className="w-full bg-[radial-gradient(circle_at_center,#4a4a4a_0%,#1d1d1d_55%,#050505_100%)] px-[5%] py-8 text-white">
          <h3 className="text-center text-[22px] sm:text-[28px] md:text-[34px] font-light tracking-[0.08em]">GEMSTONE SIZE</h3>
          <p className="mx-auto mt-3 max-w-[1450px] text-center text-[12px] sm:text-[14px] md:text-[18px] leading-[1.55] sm:leading-[1.65] text-white/85">
            Like any jewellery products, a larger piece costs higher than a smaller one. The size increases the density of the stone which
            is directly proportional to the cost and value of the gemstone. The gemstone's size is usually measured visually in millimetres
            and its weight is measured in carats. In India gemstones are measures in 'rati' , a Sanskrit word describing the weight of
            gemstones. One rati is equal to 0.91carats (1 Rati = 0.91ct).
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {[
              {image: stone10, alt: 'Diamond size'},
              {image: pearl, alt: 'Pearl size'},
              {image: stone7, alt: 'Emerald size'},
            ].map((item) => (
              <div key={item.alt} className="flex flex-col items-center">
                <div className="flex h-[78px] sm:h-[88px] md:h-[98px] w-full max-w-[300px] items-start justify-center border border-white/30">
                  <p className="mt-3 text-[20px] sm:text-[24px] md:text-[30px] tracking-[0.06em] text-white/95">1 carat</p>
                </div>
                <img src={item.image} alt={item.alt} className="-mt-2 h-[95px] w-[95px] sm:h-[108px] sm:w-[108px] md:h-[120px] md:w-[120px] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-[5px] grid w-full grid-cols-1 bg-white pb-16 md:grid-cols-2">
        <div>
          <img src={categoryImage} alt="Gemstone category" className="h-full w-full object-cover" />
        </div>
        <div className="flex items-center justify-center px-8 py-10 sm:px-12">
          <div className="max-w-[760px] text-center">
            <h3 className="text-[19px] sm:text-[22px] md:text-[26px] font-normal tracking-[0.05em] text-[#2a2a2a]">PRECIOUS GEMSTONES:</h3>
            <p className="mt-4 text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[1.65] text-[#666]">
              Gemstones falling under two categories, precious and semi-precious. Let us find out the range of precious gemstones and why
              they are called so. During different times in history pearls were considered most precious, although it lost its importance
              with the increase of cultured pearls and gradual disappearance of naturally occurring pearls. Alexandrite too is a
              precious/semi-precious stone for its color changing properties and rarity; its importance remains undecided. Tanzanites are
              also extremely rare gemstones as they are available in only one place on earth; Mt.Kilimanjaro. Anyhow, irrespective of these
              interesting facts technically there are only 4 precious gemstones; Ruby, Sapphire, Emerald and Diamond.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
