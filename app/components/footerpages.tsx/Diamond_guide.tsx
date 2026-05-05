import React, { useEffect, useState } from 'react';
import DiamondguideMain from '~/assets/diamondguide_main.jpg';
import fourCBanner from '~/assets/4C-banner-2-transparent.png';

// Shape Icons
import roundIcon from '~/assets/Round.png';
import princessIcon from '~/assets/Princess.png';
import cushionIcon from '~/assets/Cushion.png';
import pearIcon from '~/assets/Pear.png';
import heartIcon from '~/assets/Heart.png';
import marquiseIcon from '~/assets/Marquise.png';
import emeraldIcon from '~/assets/Emerald.png';
import radiantIcon from '~/assets/Radiant.png';

// Shape Large Images (Ring Images)
import roundImg from '~/assets/Round.jpg';
import princessImg from '~/assets/Princess.jpg';
import cushionImg from '~/assets/Cushion.jpg';
import pearImg from '~/assets/Pear.jpg';
import heartImg from '~/assets/Heart.jpg';
import marquiseImg from '~/assets/Marquise.jpg';
import emeraldImg from '~/assets/Emerald.jpg';
import radiantImg from '~/assets/Radiant.jpg';

// Cut
import shallowCut from '~/assets/Shallow-cut-1.jpg';
import idealCut from '~/assets/Ideal-cut-2.jpg';
import deepCut from '~/assets/Deep-Cut-3.jpg';

// Carat
import ct05 from '~/assets/0.5ct.jpg';
import ct075 from '~/assets/0.75ct.jpg';
import ct10 from '~/assets/1.0ct.jpg';
import ct20 from '~/assets/2.0ct.jpg';
import ct50 from '~/assets/5.0ct.jpg';
import caratLeftImg from '~/assets/CaratLeftImg.jpg';

// Color
import colorDF from '~/assets/D-F.jpg';
import colorGH from '~/assets/G-H.jpg';
import colorIJ from '~/assets/IJ.jpg';
import colorKM from '~/assets/K-M.jpg';
import colorNZ from '~/assets/N-Z.jpg';

// Clarity
import clarityIF from '~/assets/IF.jpg';
import clarityVVS1 from '~/assets/VVS1.jpg';
import clarityVS1 from '~/assets/VS1.jpg';
import clarityVI1 from '~/assets/VI1.jpg';
import clarityL2 from '~/assets/l2.jpg';

// Blogs
import blogOne from '~/assets/blog-one.jpg';
import blogTwo from '~/assets/blog-two.jpg';
import blogThree from '~/assets/blog-three.jpg';

export default function DiamondGuide() {
    const [cutSlider, setCutSlider] = useState(0);
    const [caratSlider, setCaratSlider] = useState(0);
    const [colorSlider, setColorSlider] = useState(0);
    const [claritySlider, setClaritySlider] = useState(0);
    const [selectedShape, setSelectedShape] = useState(0);
    const [activeTab, setActiveTab] = useState('');

    const shapes = [
        {
            name: 'Round Solitaire', icon: roundIcon, image: roundImg,
            desc: "The round brilliant cut is the most popular diamond shape, representing approximately 75% of all diamonds sold. Due to the mechanics of its shape, the round diamond is generally superior to fancy shapes at reflecting light, maximizing potential brightness."
        },
        {
            name: 'Princess', icon: princessIcon, image: princessImg,
            desc: "One of the most popular fancy cut shapes, the princess cut is traditional and elegant. Its unique square shape and brilliant facets make it a perfect choice for engagement rings that stand out with modern brilliance."
        },
        {
            name: 'Cushion', icon: cushionIcon, image: cushionImg,
            desc: "The cushion cut is an antique style of cut that has been around for centuries. It combines a square cut with rounded corners, much like a pillow (hence the name). It's known for its incredible fire and romantic appeal."
        },
        {
            name: 'Pear', icon: pearIcon, image: pearImg,
            desc: "Shaped like a raindrop, they're unique and attractive and perfect if you're looking for a distinctive jewel. The most popular way to wear a pear shape is to position the pointed top towards your fingertips, while the rounded bottom faces your hand."
        },
        {
            name: 'Heart', icon: heartIcon, image: heartImg,
            desc: "Fundamentally a pear shaped diamond with a cleft on top, a heart shaped diamond is a popular symbol of love. It is remarkably similar to a pear shaped diamond in terms of design and facets."
        },
        {
            name: 'Marquise', icon: marquiseIcon, image: marquiseImg,
            desc: "The shape of a marquise diamond can maximize carat weight, giving you a much larger-looking diamond. This brilliant-cut diamond is curved on the sides and comes to a point on each end."
        },
        {
            name: 'Emerald', icon: emeraldIcon, image: emeraldImg,
            desc: "The emerald cut diamond is a step cut that highlights the clarity of the diamond. Its flat surface and long, rectangular facets create a unique mirror-like effect, offering a hall-of-mirrors look."
        },
        {
            name: 'Radiant', icon: radiantIcon, image: radiantImg,
            desc: "Radiant cut diamonds feature a vibrant and lively brilliance. This shape combines the elegance of the emerald shape with the brilliance of the round cut, featuring trimmed corners for extra durability."
        }
    ];

    const cutData = [
        { label: 'Shallow Cut', image: shallowCut },
        { label: 'Ideal Cut', image: idealCut },
        { label: 'Deep Cut', image: deepCut }
    ];

    const caratData = [
        { label: '0.50 CT', mm: '5.0 mm', image: ct05 },
        { label: '0.75 CT', mm: '5.7 mm', image: ct075 },
        { label: '1.00 CT', mm: '6.4 mm', image: ct10 },
        { label: '2.00 CT', mm: '8.1 mm', image: ct20 },
        { label: '5.00 CT', mm: '11.0 mm', image: ct50 }
    ];

    const colorData = [
        { label: 'D-F', sub: 'COLORLESS', image: colorDF, desc: 'Colourless diamonds with a very slight difference in levels that can only be detected by a trained eye' },
        { label: 'G-H', sub: 'NEAR COLORLESS', image: colorGH, desc: 'Nearly colourless diamonds that have only the slightest traces of colour' },
        { label: 'I-J', sub: 'FAINT', image: colorIJ, desc: 'Colourless diamonds that have only the slightest traces of colour' },
        { label: 'K-M', sub: 'VERY LIGHT', image: colorKM, desc: 'Diamonds with a very faintly visible yellow tint that can be seen by the naked eye. Get this diamond set in yellow gold to camouflage the flaw' },
        { label: 'N-Z', sub: 'LIGHT', image: colorNZ, desc: 'Diamonds ranging from light brown tint to prominently brown, offering a variety of shades and price points compared to colorless and nearly colorless diamonds.' }
    ];

    const clarityData = [
        { label: 'FL-IF', sub: 'FLAWLESS', image: clarityIF, desc: 'This is an internally flawless diamond' },
        { label: 'VVS1-VVS2', sub: 'VVS', image: clarityVVS1, desc: 'These are very very slight inclusions difficult to see even under 10X magnification' },
        { label: 'VS1-VS2', sub: 'VS', image: clarityVS1, desc: 'These are very slight inclusions visible with effort under 10X magnification' },
        { label: 'SI1-SI2', sub: 'SI', image: clarityVI1, desc: 'These are slight inclusions that are visible at a 10X magnification and are large enough to affect the diamond\'s brilliance' },
        { label: 'I1-I3', sub: 'I', image: clarityL2, desc: 'These inclusions are easy to locate as they occupy a large part of the diamond' }
    ];

    const navItems = [
        { name: 'DIAMOND SHAPE', id: 'shapes' },
        { name: 'DIAMOND CUT', id: 'cut' },
        { name: 'DIAMOND CARAT', id: 'carat' },
        { name: 'DIAMOND COLOR', id: 'color' },
        { name: 'DIAMOND CLARITY', id: 'clarity' }
    ];

    useEffect(() => {
        const sections = navItems
            .map((item) => ({ ...item, element: document.getElementById(item.id) }))
            .filter((item): item is { name: string; id: string; element: HTMLElement } => Boolean(item.element));

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleEntries.length) {
                    const currentId = visibleEntries[0].target.id;
                    const currentTab = navItems.find((item) => item.id === currentId);
                    if (currentTab) {
                        setActiveTab((prev) => (prev === currentTab.name ? prev : currentTab.name));
                    }
                }
            },
            {
                root: null,
                rootMargin: '-30% 0px -45% 0px',
                threshold: [0.2, 0.35, 0.5, 0.7]
            }
        );

        sections.forEach((section) => observer.observe(section.element));
        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string, name: string) => {
        setActiveTab(name);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = window.innerWidth < 768 ? -120 : -140;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    /* User requirement: ~5% left + 5% right margin (90% width) */
    const contentMax = 'w-[94%] sm:w-[92%] md:w-[90%] max-w-none mx-auto';

    return (
        <div className="bg-white min-h-screen text-[#252627] overflow-x-clip font-sans">
            {/* HERO SECTION */}
            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[480px] lg:h-[600px] xl:h-[650px] overflow-hidden">
                <img
                    src={DiamondguideMain}
                    alt="Diamond Education"
                    className="w-full h-full object-cover object-[center_45%]"
                />
                <div className="absolute inset-0 bg-black/10">
                    <div className={`${contentMax} h-full flex items-center justify-end`}>
                        <div className="text-right translate-y-[-10px] md:translate-y-[-14px]">
                            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-2 drop-shadow-md tracking-wide">
                                DIAMOND EDUCATION
                            </h1>
                            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-sans font-normal opacity-95 tracking-wide">
                                All You need to know about Diamond
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* STICKY NAV — pill buttons (image 1) */}
            <div className="sticky top-0 bg-white z-50">
                <div className={`${contentMax} flex items-stretch justify-between gap-2 sm:gap-3 md:gap-4 overflow-x-auto no-scrollbar py-3 sm:py-4 md:py-5`}>
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            type="button"
                            onClick={() => scrollToSection(item.id, item.name)}
                            className={`shrink-0 flex items-center justify-center rounded-[24px] px-[62px] py-[12px] font-[Lato,sans-serif] text-[16px] font-semibold leading-[24px] tracking-[0.15px] uppercase text-center whitespace-nowrap shadow-[3px_3px_12px_0_rgba(0,0,0,0.08)] transition-all duration-700 ease-in-out mb-0 ${activeTab === item.name
                                ? 'bg-[#BF1C47] text-white'
                                : 'bg-white text-[#4e4b66]'
                                }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`${contentMax} py-12 sm:py-[3.75rem] md:py-[4.5rem] lg:py-[5.25rem]`}>

                {/* 4 C'S */}
              <section className="mb-[4.5rem] sm:mb-[5.25rem] md:mb-24 lg:mb-[7.5rem] flex flex-col md:flex-row md:items-center gap-1.5 md:gap-[0.47rem] lg:gap-[0.56rem]">

  {/* Image */}
  <div className="w-full md:w-1/2 shrink-0 flex justify-center md:justify-start md:pl-[calc(18.75%+0.9375rem)] lg:pl-[calc(18.75%+1.125rem)]">
    <img
      src={fourCBanner}
      alt="The 4 C's"
      className="w-[150px] sm:w-[190px] md:w-[245px] lg:w-[286px] h-auto object-contain"
    />
  </div>

  {/* Text */}
  <div className="w-full md:w-1/2 md:min-w-0 flex flex-col justify-center items-center md:items-start text-center md:text-left">
    
    <h2 className="text-[33px] font-[Cormorant] font-medium leading-[51px] text-[#242330] tracking-normal">
      The 4 C&apos;s of a Diamond
    </h2>

    {/* <p className="mt-3 font-[lato,sans-serif] font-normal text-[18px] leading-[1.56] tracking-[0.5px] text-[#4e4b66] max-w-[640px]">
      A comprehensive guide to diamond characteristics that will help you purchase the right brilliance at the right price.
    </p> */}
    <p className="mt-3 font-[lato,sans-serif] font-normal text-[18px] leading-[1.56] tracking-[0.5px] text-[#4e4b66] max-w-[640px] md:max-w-[720px] lg:max-w-[780px]">
  A comprehensive guide to diamond characteristics that will help you purchase the right brilliance at the right price.
</p>

  </div>
</section>

                {/* SHAPES SECTION */}
                <section id="shapes" className="mb-12 sm:mb-16 md:mb-20">
                    {/* <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold mb-8 md:mb-10 text-neutral-800">
                        Shapes
                    </h3> */}
                    <h3 className="text-[#242330] text-left font-cormorant text-[22px] sm:text-[24px] md:text-[26px] leading-[32px] md:leading-[41px] mt-[40px] md:mt-[56px] mb-[12px] md:mb-[16px] font-semibold">
    Shapes
</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-3 md:gap-4 w-full mb-12 md:mb-16">
                        {shapes.map((shape, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedShape(idx)}
                                className={`group flex flex-col items-center justify-center cursor-pointer transition-all rounded-lg border bg-white px-1.5 py-3 sm:py-3.5 md:px-2 shadow-[0_2px_10px_rgba(0,0,0,0.06)] min-h-[92px] sm:min-h-[102px] ${selectedShape === idx
                                    ? 'border-gray-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.08)]'
                                    : 'border-gray-200/90 hover:border-gray-300 hover:shadow'
                                    }`}
                            >
                                <img
                                    src={shape.icon}
                                    alt={shape.name}
                                    className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto mb-2 object-contain flex-1 max-h-[56px] sm:max-h-[62px] md:max-h-[68px]"
                                />
                                <span className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors text-center leading-tight ${selectedShape === idx ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-600'
                                    }`}>
                                    {idx === 0 ? 'Round' : shape.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-14 lg:gap-16">
                        <div className="md:w-1/2 order-2 md:order-1" key={`shape-text-${selectedShape}`}>
                            {/* <h4 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-5 md:mb-6 text-neutral-800 slide-in-left">
                                {shapes[selectedShape].name}
                            </h4> */}
                            <h4 className="text-[#4e4b66] text-left font-cormorant text-[22px] sm:text-[24px] md:text-[26px] leading-[32px] md:leading-[41px] font-semibold mb-0 slide-in-left">
    {shapes[selectedShape].name}
</h4>
                            {/* <p className="font-serif text-black text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] slide-in-left">
                                {shapes[selectedShape].desc}
                            </p>
                           */}
                           <p className="text-[#4e4b66] text-justify font-lato text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] md:leading-[24px] tracking-[0.1px] font-normal slide-in-left">
    {shapes[selectedShape].desc}
</p>
                        </div>
                        <div className="md:w-1/2 flex justify-center md:justify-end order-1 md:order-2 mb-8 md:mb-0 slide-in-left" key={`shape-image-${selectedShape}`}>
                            <img
                                src={shapes[selectedShape].image}
                                alt={shapes[selectedShape].name}
                                className="w-full h-auto object-contain max-w-[min(100%,560px)] md:max-w-[min(100%,640px)] md:min-h-[400px] lg:min-h-[450px]"
                            />
                        </div>
                    </div>
                </section>

                {/* CUT — large diagram (no fixed-height cage) */}
                <section id="cut" className="mb-12 sm:mb-16 md:mb-20 flex flex-col md:flex-row md:items-start gap-10 md:gap-14 lg:gap-16">
                    <div className="md:w-1/2 w-full">
                        {/* <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-black tracking-[0.12em] uppercase">
                            CUT
                        </h3> */}
                        <h3 className="text-[#242330] font-cormorant text-[20px] sm:text-[22px] md:text-[23px] leading-[30px] md:leading-[37px] mt-[40px] md:mt-[60px] mb-0 uppercase font-semibold">
    CUT
</h3>
                        {/* <p className="text-black text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] mb-2 md:mb-3 font-normal">
                            The cut is a diamond&apos;s most crucial &apos;C&apos;. A lot depends on the cut since a diamond&apos;s cut can increase or decrease its value. The precision and craftsmanship of a cut makes all the difference in the brilliance of a diamond.
                        </p> */}
                        <p className="text-[#4e4b66] text-justify font-lato text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] md:leading-[24px] tracking-[0.1px] font-normal mb-[1rem]">
    The cut is a diamond&apos;s most crucial &apos;C&apos;. A lot depends on the cut since a diamond&apos;s cut can increase or decrease its value. The precision and craftsmanship of a cut makes all the difference in the brilliance of a diamond.
</p>
                        {/* <p className="text-black text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] font-normal"> */}
                        <p className="text-[#4e4b66] text-justify font-lato text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] md:leading-[24px] tracking-[0.1px] font-normal mb-[1rem]">
                            In an ideal cut or perfectly cut diamond the light is reflected back to the observer from the top of the stone emitting maximum brilliance.
                        </p>
                    </div>
                    <div className="md:w-1/2 w-full flex flex-col items-center">
                        <div className="w-full flex justify-center mb-8 md:mb-10">
                            <img
                                src={cutData[cutSlider].image}
                                alt={cutData[cutSlider].label}
                                className="w-full h-auto object-contain max-w-[min(100%,390px)] md:max-w-[min(100%,480px)] md:max-h-[400px] lg:max-h-[450px] transition-opacity duration-500"
                            />
                        </div>
                        <div className="w-full mt-auto">
                            <div className="flex justify-between mb-4 px-1 md:px-2">
                                {cutData.map((d, i) => (
                                    <div key={i} className={`text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-[0.14em] uppercase ${cutSlider === i ? 'text-[#BF1C47]' : 'text-gray-400'}`}>
                                        {d.label.replace(/\s+/g, ' ')}
                                    </div>
                                ))}
                            </div>
                            <input
                                type="range" min="0" max="2" value={cutSlider}
                                onChange={(e) => setCutSlider(Number(e.target.value))}
                                className="w-full h-[6px] bg-gray-200 rounded-full appearance-none cursor-pointer range-accent"
                            />
                        </div>
                    </div>
                </section>

                {/* CARAT */}
                <section id="carat" className="mb-12 sm:mb-16 md:mb-20 flex flex-col md:flex-row md:items-start gap-10 md:gap-14 lg:gap-16">
                    <div className="md:w-1/2 w-full">
                        {/* <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-black tracking-[0.12em] uppercase">
                            CARAT
                        </h3> */}
                        <h3 className="text-[#242330] font-cormorant text-[20px] sm:text-[22px] md:text-[23px] leading-[30px] md:leading-[37px] mt-[40px] md:mt-[60px] mb-0 uppercase font-semibold">
    CARAT
</h3>
                        {/* <p className="text-black text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] mb-2 md:mb-3 font-normal">
                            The Carat Weight of a diamond is a huge contributing factor and the most visible feature that is considered when comparing its price. A slight difference in weight can make a significant difference in price.
                        </p>
                        <p className="text-black text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] font-normal">
                            &quot;Carat&quot; (ct.) is a measurement unit representing the weight of a diamond; the price of a diamond is directly proportional to its weight. The cut off weights are 0.50ct, 0.75ct, 1.00ct so on and so forth.
                        </p> */}
                        <p className="text-[#4e4b66] text-justify font-lato text-[16px] leading-[24px] tracking-[0.1px] font-normal mb-[1rem]">
  The Carat Weight of a diamond is a huge contributing factor and the most visible feature that is considered when comparing its price. A slight difference in weight can make a significant difference in price. "Carat" (ct.) is a measurement unit representing the weight of a diamond, the price of a diamond is directly proportional to its weight. The cut off weights are 0.50ct, 0.75ct, 1.00ct so on and so forth.
</p>

                        <div className="mt-8 sm:mt-10 hidden md:block">
                            <img
                                src={caratLeftImg}
                                alt="Carat size comparison"
                                className="w-full max-w-[600px] lg:max-w-[650px] h-auto object-contain shadow-sm rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full flex flex-col items-center">
                        <div className="w-full flex justify-center mb-8 md:mb-10">
                            <img
                                src={caratData[caratSlider].image}
                                alt={caratData[caratSlider].label}
                                className="w-full h-auto object-contain max-w-[min(100%,576px)] md:max-w-[min(100%,680px)] md:max-h-[450px] transition-opacity duration-500"
                            />
                        </div>
                        <div className="w-full mt-auto">
                            <div className="flex justify-between mb-3 px-1 sm:px-4">
                                {caratData.map((d, i) => (
                                    <div key={i} className="text-center">
                                        <div className={`text-[11px] sm:text-[12px] font-bold ${caratSlider === i ? 'text-[#BF1C47]' : 'text-gray-400'}`}>
                                            {d.label.split(' ')[0]}ct
                                        </div>
                                        <div className={`text-[10px] sm:text-[11px] mt-0.5 ${caratSlider === i ? 'text-[#4b4b4b]' : 'text-gray-500'}`}>
                                            {d.mm}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <input
                                type="range" min="0" max="4" value={caratSlider}
                                onChange={(e) => setCaratSlider(Number(e.target.value))}
                                className="w-full h-[6px] bg-gray-200 rounded-full appearance-none cursor-pointer range-accent"
                            />
                        </div>
                    </div>
                </section>

                {/* COLOR */}
                <section id="color" className="mb-12 sm:mb-16 md:mb-20 flex flex-col md:flex-row md:items-start gap-10 md:gap-14 lg:gap-16">
                    <div className="md:w-1/2 w-full">
                        {/* <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-black tracking-[0.12em] uppercase">
                            COLOR
                        </h3> */}
                        <h3 className="text-[#242330] font-cormorant text-[20px] sm:text-[22px] md:text-[23px] leading-[30px] md:leading-[37px] mt-[40px] md:mt-[60px] mb-0 uppercase font-semibold">
    COLOR
</h3>
                       
                        {/* <p className="text-black text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] font-normal">
                            A <p className="text-black text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] mb-2 md:mb-3 font-normal">
                            Diamond colors really go the far distance beyond the literal &quot;color&quot;. There are some dazzling diamonds carrying a higher price tag. While these are limitedly in-demand gems retaining a completely colorless feature.
                        </p> typical diamond is completely colorless with loose or zero hues. That&apos;s why colors on a diamond are completely and absolutely terrible. Any type freely ensures a completely representable choice.
                        </p> */}
                        <p className="text-[#4e4b66] text-justify font-lato text-[16px] leading-[24px] tracking-[0.1px] font-normal mb-[1rem]">
Diamonds are not always as colourless as they look to the naked eye. The more colour that the diamond lacks, the higher is its price. While most diamonds exhibit a yellow or brown tinge, a completely colourless variety will allow more light to pass through it emitting maximum brilliance. Since the diamond is shaped like a prism, it acts in the same way. That’s why colour in a diamond acts as a filter and diminishes its fire. A truly colourless diamond will emit a spectrum of colours.

                    </p>
                    </div>
                    <div className="md:w-1/2 w-full flex flex-col items-center">
                        <div className="w-full flex justify-center mb-8 md:mb-10">
                            <img
                                src={colorData[colorSlider].image}
                                alt={colorData[colorSlider].label}
                                className="w-full h-auto object-contain max-w-[min(100%,230px)] md:max-w-[min(100%,280px)] md:max-h-[230px] lg:max-h-[260px]"
                            />
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between mb-4 gap-1 px-0.5">
                                {colorData.map((d, i) => (
                                    <div key={i} className={`text-[10px] sm:text-[11px] md:text-[12px] font-bold text-center flex-1 tracking-wider uppercase ${colorSlider === i ? 'text-[#BF1C47]' : 'text-gray-400'}`}>
                                        {d.label}
                                    </div>
                                ))}
                            </div>
                            <input
                                type="range" min="0" max="4" value={colorSlider}
                                onChange={(e) => setColorSlider(Number(e.target.value))}
                                className="w-full h-[6px] bg-gray-200 rounded-full appearance-none cursor-pointer range-accent"
                            />
                        </div>
                        <p className="w-full text-center text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-[1.6] font-normal diamond-desc mt-6 md:mt-8">
                            {colorData[colorSlider].desc}
                        </p>
                    </div>
                </section>

                {/* CLARITY */}
                <section id="clarity" className="mb-12 sm:mb-16 md:mb-20 flex flex-col md:flex-row md:items-start gap-10 md:gap-14 lg:gap-16">
                    <div className="md:w-1/2 w-full">
                        {/* <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-black tracking-[0.12em] uppercase">
                            CLARITY
                        </h3> */}
                        <h3 className="text-[#242330] font-cormorant text-[20px] sm:text-[22px] md:text-[23px] leading-[30px] md:leading-[37px] mt-[40px] md:mt-[60px] mb-0 uppercase font-semibold">
    CLARITY
</h3>
                        {/* <p className="text-black text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] mb-2 md:mb-3 font-normal">
                            In reality, a completely clear or flawless Diamond is basically impossible to find and is extremely rare and an abnormal inclusion that usually develops in a creation.
                        </p>
                        <p className="text-black text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] font-normal">
                            Although simple location of ordinary typical mineral elements inside a diamond&apos;s pretty internal structure is normal, there is literally a visible minimal imperfection in any flawless or absolutely clear literal diamond.
                        </p> */}
                        <p className="text-[#4e4b66] text-justify font-lato text-[16px] leading-[24px] tracking-[0.1px] font-normal mb-[1rem]">
  Like all things natural, diamonds too are flawed. Diamonds like all other minerals and gemstones are born with several inclusions that develop during their formation. Although almost invisible to the naked eye, inclusions do decide a diamond’s price. Internal characteristics are known as inclusions while external characteristics are known as blemishes. The list of diamond inclusions include crystal, needles and cloud, whereas chips, scratches, nicks, abrasions, bruises, polishing marks and naturals are considered to be diamond blemishes.
                    </p></div>
                    <div className="md:w-1/2 w-full flex flex-col items-center">
                        <div className="w-full flex justify-center mb-8 md:mb-10">
                            <img
                                src={clarityData[claritySlider].image}
                                alt={clarityData[claritySlider].label}
                                className="w-full h-auto object-contain max-w-[min(100%,576px)] md:max-w-[min(100%,680px)] md:max-h-[450px]"
                            />
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between mb-4 gap-0.5 px-0.5">
                                {clarityData.map((d, i) => (
                                    <div key={i} className={`text-[9px] sm:text-[10px] md:text-[11px] font-bold text-center flex-1 tracking-wide uppercase leading-tight ${claritySlider === i ? 'text-[#BF1C47]' : 'text-gray-400'}`}>
                                        {d.label}
                                    </div>
                                ))}
                            </div>
                            <input
                                type="range" min="0" max="4" value={claritySlider}
                                onChange={(e) => setClaritySlider(Number(e.target.value))}
                                className="w-full h-[6px] bg-gray-200 rounded-full appearance-none cursor-pointer range-accent"
                            />
                        </div>
                        <p className="w-full text-center text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-[1.6] font-normal diamond-desc mt-6 md:mt-8">
                            {clarityData[claritySlider].desc}
                        </p>
                    </div>
                </section>

                {/* BLOG SECTION — Matching Staging */}
                <div className="mt-24 md:mt-32 pt-14 pb-20 border-t border-gray-100">
                    <div className="px-4 sm:px-6 md:px-0">
                        {/* <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-serif text-center mb-12 text-black font-normal tracking-tight">
                            Checkout Out Our Latest Blogs
                        </h2> */}
                        <h2 className="pt-[6px] md:pt-[9px] pb-[12px] md:pb-[16px] text-center text-[#242330] font-cormorant text-[22px] sm:text-[24px] md:text-[26px] leading-[32px] md:leading-[41px] font-semibold mb-0">
    Checkout Out Our Latest Blogs
</h2>
                        
                        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"> */}
                        <div className="w-[96%] max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[24px]">
                            
                            <article className="flex w-full max-w-[515px] bg-white rounded-[8px] shadow-[0px_3px_12px_rgba(0,0,0,0.08)] p-6 gap-6">

    {/* Image */}
   
<div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden flex-shrink-0 bg-white">
    <img src={blogOne} alt="" className="w-full h-full object-cover" />
</div>
    {/* Content */}
    <div className="flex-1 flex flex-col min-w-0">

        {/* Title */}
        <h4 className="text-[#242330] text-justify font-lato text-[16px] leading-[24px] tracking-[0.15px] font-semibold mb-0">
            5 Genius Hacks for the Ultimate Jewellery
        </h4>

        {/* Description */}
        <p className="text-[#4e4b66] text-justify font-lato text-[12px] leading-[18px] tracking-[0.2px] mt-2 line-clamp-3">
           Jewellery is fun, fashionable and fabulous. But you know what else jewellery is? Difficult to put on at times which {" "}
           <a
  href="#top"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="text-[#008696] font-lato text-[12px] leading-[18px] tracking-[0.2px] font-bold cursor-pointer"
>
  Read More
</a>
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mt-auto pt-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex-shrink-0" />
            <div>
                <p className="text-[10px] font-bold text-black">Azra</p>
                <p className="text-[9px] text-gray-400 uppercase">December 15, 2026</p>
            </div>
        </div>

    </div>
</article>

                            {/* Blog 2 */}
                           
                            <article className="flex w-full max-w-[515px] bg-white rounded-[8px] shadow-[0px_3px_12px_rgba(0,0,0,0.08)] p-6 gap-6">

    {/* Image */}
    {/* <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0 bg-white">
        <img src={blogTwo} alt="" className="w-full h-full object-cover" />
    </div> */}
    <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden flex-shrink-0 bg-white">
    <img src={blogTwo} alt="" className="w-full h-full object-cover" />
</div>

    {/* Content */}
    <div className="flex-1 flex flex-col min-w-0">

        {/* Title */}
        <h4 className="text-[#242330] text-justify font-lato text-[16px] leading-[24px] tracking-[0.15px] font-semibold mb-0">
            An Ultimate Guide to Buying Solitaires
        </h4>

        {/* Description */}
        <p className="text-[#4e4b66] text-justify font-lato text-[12px] leading-[18px] tracking-[0.2px] mt-2 line-clamp-3">
           You may have seen it in movies or read it in books. That perfect moment when a man gets on his knee holding {" "}
        <a
  href="#top"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="text-[#008696] font-lato text-[12px] leading-[18px] tracking-[0.2px] font-bold cursor-pointer"
>
  Read More
</a>
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mt-auto pt-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex-shrink-0" />
            <div>
                <p className="text-[10px] font-bold text-black">Azra</p>
                <p className="text-[9px] text-gray-400 uppercase">March 18, 2026</p>
            </div>
        </div>

    </div>
</article>

                            {/* Blog 3 */}
                            
                            <article className="flex w-full max-w-[515px] bg-white rounded-[8px] shadow-[0px_3px_12px_rgba(0,0,0,0.08)] p-6 gap-6">

    {/* Image */}
    {/* <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0 bg-white">
        <img src={blogThree} alt="" className="w-full h-full object-cover" />
    </div> */}
    <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden flex-shrink-0 bg-white">
    <img src={blogThree} alt="" className="w-full h-full object-cover" />
</div>

    {/* Content */}
    <div className="flex-1 flex flex-col min-w-0">

        {/* Title */}
        <h4 className="text-[#242330] text-justify font-lato text-[16px] leading-[24px] tracking-[0.15px] font-semibold mb-0">
            Waves Diamond Stackable Solitaire Rings
        </h4>

        {/* Description */}
        <p className="text-[#4e4b66] text-justify font-lato text-[12px] leading-[18px] tracking-[0.2px] mt-2 line-clamp-3">
A solitaire is not only a timeless symbol of love, but also an undeniably elegant piece of jewellery. Whether you're {" "}
            <a
  href="#top"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="text-[#008696] font-lato text-[12px] leading-[18px] tracking-[0.2px] font-bold cursor-pointer"
>
  Read More
</a>
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mt-auto pt-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex-shrink-0" />
            <div>
                <p className="text-[10px] font-bold text-black">Azra</p>
                <p className="text-[9px] text-gray-400 uppercase">March 20, 2026</p>
            </div>
        </div>

    </div>
</article>
                        </div>
                        <div className="mt-16 flex justify-center">
                            <button
                                type="button"
                                className="bg-[#BF1C47] text-white px-10 md:px-14 py-3.5 rounded-md text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-[#9a1539] transition-colors shadow-sm"
                            >
                                CONTINUE SHOPPING
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                body {
                    color: #333;
                    font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 1.42857143;
                    font-size: 1.4rem;
                }
                .diamond-desc {
                    font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 1.6;
                    color: #4b4b4b;
                }
                .slide-in-left {
                    animation: slideInLeft 1s ease-out;
                }
                .range-accent::-webkit-slider-thumb {
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    background: #BF1C47;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 4px solid white;
                    box-shadow: 0 0 15px rgba(191,28,71,0.3);
                }
                .range-accent::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    background: #BF1C47;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 3px solid white;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
}