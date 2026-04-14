import React, { useState } from 'react';
import aboutBanner from '~/assets/about-banner.jpg';
import kalyan3ppls from '~/assets/kalyan-3ppls-new_2.jpg';
import tsKalyanaraman from '~/assets/kalyanraman_1.png';
import rajeshKalyanaraman from '~/assets/Group_20_2.png';
import rameshKalyanaraman from '~/assets/Group_20_1_1.png';
import compassImg from '~/assets/Vision.png';
import visionIcon from '~/assets/vision_2_.png';
import missionIcon from '~/assets/Vector_Smart_Object.png';
import indiaMap from '~/assets/India-a.png';
import middleEastMap from '~/assets/UAE-a.png';
import usaMap from '~/assets/USA-a.png';

export default function About() {
    const [expandedTS, setExpandedTS] = useState(false);
    const [expandedRajesh, setExpandedRajesh] = useState(false);
    const [expandedRamesh, setExpandedRamesh] = useState(false);

    return (
        <div className="about-page font-serif text-[#333] px-4 sm:px-5 md:px-8 lg:px-[4rem] 2xl:px-[5rem]">
            {/* Hero Section */}
            <section className="relative h-[32vh] sm:h-[40vh] md:h-[50vh] w-full overflow-hidden">
                <img
                    src={aboutBanner}
                    alt="A Global Story of Shine"
                    className="h-full w-full object-cover"
                />
            </section>

            {/* About Kalyan Jewellers Section */}
            <section className="pb-16 sm:pb-20 md:pb-32 lg:pb-40 pt-0">
                <div className="grid gap-10 md:grid-cols-5 lg:gap-16">
                    <div className="md:col-span-2 overflow-hidden bg-gray-50">
                        <img
                            src={kalyan3ppls}
                            alt="Kalyan Leadership"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="md:col-span-3 flex flex-col justify-start">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333] mt-4 sm:mt-6 mb-3 font-serif leading-tight">
                            About Kalyan Jewellers
                        </h2>
                        <div className="space-y-6 sm:space-y-8 md:space-y-10 text-[13px] sm:text-[14px] leading-relaxed font-serif">
                            <div>
                                <h3 className="m-0.5 text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-[#333]">Founding Vision</h3>
                                <p>
                                    Kalyan Jewellers was established in 1993 by visionary entrepreneur Mr. T.S. Kalyanaraman, with a mission to redefine jewelry retail in India. Built on the principles of trust, transparency, and customer-first values, the brand quickly grew into one of the country&apos;s most respected and iconic names in the jewelry industry. What began as a single showroom has now evolved into a global presence, with a strong footprint across India, the Middle East, and the USA.
                                </p>
                            </div>
                            <div>
                                <h3 className="m-0.5 text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-[#333]">Celebrating Cultural Diversity</h3>
                                <p>
                                    At Kalyan Jewellers, jewelry is more than a product—it&apos;s a celebration of India&apos;s rich cultural tapestry. Our designs are inspired by the traditions, artistry, and craftsmanship unique to every region, blending them with contemporary aesthetics to cater to modern sensibilities. From intricate bridal collections to everyday elegance, each piece embodies timeless beauty and craftsmanship, making us a part of our customers&apos; most cherished moments.
                                </p>
                            </div>
                            <div>
                                <h3 className="m-0.5 text-[18px] sm:text-[19px] md:text-[20px] font-semibold text-[#333]">Pioneering Excellence</h3>
                                <p>
                                    Kalyan Jewellers has consistently set the standard in the jewelry industry through ethical practices, innovation, and quality assurance. As pioneers in introducing BIS Hallmarked gold and transparency in pricing, we have transformed the way jewelry is purchased in India. Our 4-Level Assurance Certification, which includes rigorous quality checks, transparent pricing, ethically sourced materials, and reliable certifications, ensures that every piece upholds the highest standards. This meticulous attention to detail and commitment to authenticity have solidified our reputation as a trusted brand for generations.
                                </p>
                            </div>
                            <div>
                                <h3 className="m-0.5 text-[18px] sm:text-[19px] md:text-[20px] font-semibold text-[#333]">A Trusted Brand</h3>
                                <p>
                                    With the unwavering trust of millions, Kalyan Jewellers continues to lead the jewelry industry. Our expanding network of showrooms offers a personalized shopping experience, thoughtfully tailored to meet the unique preferences of our customers. Whether celebrating milestones or embracing everyday moments, Kalyan Jewellers adds lasting significance to every experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="bg-[#f8f5f2] pb-12 sm:pb-14 md:pb-16 pt-0 mt-14 sm:mt-20 md:mt-32">
                <div className="-mt-[4rem] sm:-mt-[6rem] md:-mt-[11rem] relative z-10">
                    <div className="grid gap-8 md:grid-cols-3 items-start">
                        {/* T.S. Kalyanaraman */}
                        <div className="group flex flex-col bg-white transition-shadow duration-300 hover:shadow-2xl">
                            <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                                <img
                                    src={tsKalyanaraman}
                                    alt="T.S. Kalyanaraman"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5 sm:p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-[#333]">T.S. Kalyanaraman</h3>
                                <p className="mt-2 mb-2 text-sm text-[#666] ">
                                    Chief Managing Director
                                </p>
                                <div className={`relative ${expandedTS ? 'h-auto pb-4' : 'h-40 overflow-hidden'}`}>
                                    <div className="text-sm leading-relaxed text-[#666] space-y-4">
                                        <p>
                                            Today, when I look around me, business is all about toplines, bottomlines and market capitalisation. But Kalyan entered into business in a pre-independent India to build a better India, as our forefathers believed ethical, fair business will make India self-sufficient and strong. Personally, I believe Kalyan Jewellers&apos; major achievement is the trust we have earned from millions of people across the length and breadth of a huge subcontinent like India, and abroad in the GCC and USA.
                                        </p>
                                        <p>
                                            We have always believed in fair and transparent business. We have believed that the customer should be understood so well that we know his needs much before he understands them himself. We have believed that an enlightened customer is the best customer. These are the simple principles that have helped us reach where we are today.
                                        </p>
                                        <p>
                                            Today, Kalyan Jewellers has 318 retail stores spread across INDIA, MIDDLE EAST AND USA. Pampered by your unbound love and support and with the blessings of the Almighty, we believe we are in the right path towards the accomplishment of our vision to open stores and serve customers across the world.
                                        </p>
                                    </div>
                                    {!expandedTS && <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>}
                                </div>
                                <button
                                    onClick={() => setExpandedTS(prev => !prev)}
                                    className="mt-4 text-sm font-bold text-[#cf2d4c] hover:underline cursor-pointer"
                                    type="button"
                                >
                                    {expandedTS ? 'Read Less' : 'Read More'}
                                </button>
                            </div>
                        </div>

                        {/* Rajesh Kalyanaraman */}
                        <div className="group flex flex-col bg-white transition-shadow duration-300 hover:shadow-2xl">
                            <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                                <img
                                    src={rajeshKalyanaraman}
                                    alt="Rajesh Kalyanaraman"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5 sm:p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-[#333]">Rajesh Kalyanaraman</h3>
                                {/* <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
                                 */}
                                <p className="mt-2 mb-2 text-sm text-[#666] ">

                                    Executive Director
                                </p>
                                <div className={`relative ${expandedRajesh ? 'h-auto pb-4' : 'h-40 overflow-hidden'}`}>
                                    <div className="text-sm leading-relaxed text-[#666] space-y-4">
                                        <p>
                                            I feel our biggest differentiator is not only the ability to understand local, think local and act local, but at the same time bring in our vast experience and sourcing strength out of operating in multiple markets. Jewellery is a complicated product, because tastes vary even within the same state.
                                        </p>
                                        <p>
                                            What helps us here is the huge variety of products we stock from artisans across the country and even the Arab countries. We carefully and painstakingly select the designs of our products and customise them according to the demands of the consumer demography of each market we step into as India is such a vast country with diverse tastes.
                                        </p>
                                        <p>
                                            We have something for everyone. Highly skilled craftsmen create our products along with stringent quality control measures which creates that perfection in the products we sell.
                                        </p>
                                    </div>
                                    {!expandedRajesh && <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>}
                                </div>
                                <button
                                    onClick={() => setExpandedRajesh(prev => !prev)}
                                    className="mt-4 text-sm font-bold text-[#cf2d4c] hover:underline cursor-pointer"
                                    type="button"
                                >
                                    {expandedRajesh ? 'Read Less' : 'Read More'}
                                </button>
                            </div>
                        </div>

                        {/* Ramesh Kalyanaraman */}
                        <div className="group flex flex-col bg-white transition-shadow duration-300 hover:shadow-2xl">
                            <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                                <img
                                    src={rameshKalyanaraman}
                                    alt="Ramesh Kalyanaraman"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5 sm:p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-[#333]">Ramesh Kalyanaraman</h3>
                                {/* <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400"> */}
                                <p className="mt-2 mb-2 text-sm text-[#666] ">

                                    Executive Director
                                </p>
                                <div className={`relative ${expandedRamesh ? 'h-auto pb-4' : 'h-40 overflow-hidden'}`}>
                                    <div className="text-sm leading-relaxed text-[#666] space-y-4">
                                        <p>
                                            We have always visualized everything on a large scale. We always enjoyed making the road and never thought of following a trail. Massive marketing campaigns and launches, path-breaking ads which were never-before seen in jewellery advertising, multi-storey large format jewellery showrooms, same-day multi-launch ceremonies and events.
                                        </p>
                                        <p>
                                            We have always worked with the best to endorse our brand at all levels, our brand ambassadors come from very respected families in their states, and they are known worldwide among their diaspora.
                                        </p>
                                        <p>
                                            We introduced a lot to jewellery retailing - customer loyalty programs, price tags, customer service centers, corporate tie-ups and many such things. We have always believed in thinking ahead of the customer, in his interest, for his interest.
                                        </p>
                                    </div>
                                    {!expandedRamesh && <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>}
                                </div>
                                <button
                                    onClick={() => setExpandedRamesh(prev => !prev)}
                                    className="mt-4 text-sm font-bold text-[#cf2d4c] hover:underline cursor-pointer"
                                    type="button"
                                >
                                    {expandedRamesh ? 'Read Less' : 'Read More'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Vision & Mission Section */}
            <section className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px] items-stretch">
                <div className="w-full md:w-1/2 flex items-start justify-center bg-white pt-4 pb-12 overflow-hidden">
                    <img src={compassImg} alt="Vision Compass" className="max-w-full h-auto drop-shadow-2xl" />
                </div>
                <div className="w-full md:w-1/2 bg-[#cf254a] text-white p-8 sm:p-10 md:p-16 lg:p-24 flex flex-col justify-center gap-10 sm:gap-12 md:gap-16">
                    <div className="text-center group">
                        <div className="mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-105">
                            <img src={visionIcon} alt="Vision Icon" className="w-7 h-7 object-contain invert brightness-0" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl mb-4 font-serif tracking-wide opacity-90">Our Vision</h2>
                        <p className="text-[15px] leading-relaxed max-w-lg mx-auto font-light opacity-90 px-4">
                            To understand and delight the world, translating everyone&apos;s dream and personality into fine Indian jewellery, and spread the happiness from it to all.
                        </p>
                    </div>
                    <div className="text-center group">
                        <div className="mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-105">
                            <img src={missionIcon} alt="Mission Icon" className="w-7 h-7 object-contain invert brightness-0" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl mb-4 font-serif tracking-wide opacity-90">Our Mission</h2>
                        <p className="text-[15px] leading-relaxed max-w-md mx-auto font-light opacity-90 px-4">
                            To give every customer much more than what he/she asks for in terms of quality, selection, value for money and customer service, by understanding local tastes and preferences and innovating constantly to eventually provide an unmatched experience in Indian jewellery shopping.
                        </p>
                    </div>
                </div>
            </section >

            {/* Network Section */}
            <section className="pt-16 pb-24">
                <h2 className="text-[34px] md:text-[36px] font-normal font-serif text-center mb-10 md:mb-12 text-[#333]">Our Network</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-0 lg:px-8 max-w-[1080px] mx-auto">
                    <div className="bg-[#f8f5f2] p-6 text-center transition-transform hover:-translate-y-1">
                        <div className="h-32 md:h-36 flex items-center justify-center mb-5">
                            <img src={indiaMap} alt="India Map" className="max-h-full object-contain" />
                        </div>
                        <h3 className="text-[34px] md:text-[36px] font-semibold text-[#cf2d4c] mb-1 leading-none">400+</h3>
                        <p className="text-[22px] md:text-[24px] mb-2 text-[#333] leading-tight">Showroom in India</p>
                        <p className="text-[13px] text-[#666] leading-relaxed">
                            We have a strong presence across 21 states and union territories, and our 278-plus network of showrooms cover all major cities.
                        </p>
                    </div>

                    <div className="bg-[#f8f5f2] p-6 text-center transition-transform hover:-translate-y-1">
                        <div className="h-32 md:h-36 flex items-center justify-center mb-5">
                            <img src={middleEastMap} alt="Middle East Map" className="max-h-full object-contain" />
                        </div>
                        <h3 className="text-[34px] md:text-[36px] font-semibold text-[#cf2d4c] mb-1 leading-none">36+</h3>
                        <p className="text-[22px] md:text-[24px] mb-2 text-[#333] leading-tight">Showroom in Middle East</p>
                        <p className="text-[13px] text-[#666] leading-relaxed">
                            We have 36 showrooms in the GCC spread across UAE, Qatar, Kuwait and Oman.
                        </p>
                    </div>

                    <div className="bg-[#f8f5f2] p-6 text-center transition-transform hover:-translate-y-1">
                        <div className="h-32 md:h-36 flex items-center justify-center mb-5">
                            <img src={usaMap} alt="USA Map" className="max-h-full object-contain" />
                        </div>
                        <h3 className="text-[34px] md:text-[36px] font-semibold text-[#cf2d4c] mb-1 leading-none">02</h3>
                        <p className="text-[22px] md:text-[24px] mb-2 text-[#333] leading-tight">Showroom in USA</p>
                        <p className="text-[13px] text-[#666] leading-relaxed">
                            We have 2 showrooms in the USA (New Jersey and Chicago).
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8 mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-100 max-w-[1080px] mx-auto">
                    <div className="text-center px-2 md:px-4 relative after:hidden md:after:block after:absolute after:right-0 after:top-[18%] after:h-[64%] after:w-px after:bg-gray-200">
                        <p className="text-[34px] md:text-[36px] font-medium text-[#cf2d4c] mb-1 leading-none">32 <span className="text-[16px] md:text-[17px] font-normal text-[#333]">Years</span></p>
                        <p className="text-[22px] md:text-[24px] leading-tight text-[#666] font-normal">Since Formation</p>
                    </div>
                    <div className="text-center px-2 md:px-4 relative after:hidden md:after:block after:absolute after:right-0 after:top-[18%] after:h-[64%] after:w-px after:bg-gray-200">
                        <p className="text-[34px] md:text-[36px] font-medium text-[#cf2d4c] mb-1 leading-none">1K+ <span className="text-[16px] md:text-[17px] font-normal text-[#333]">My Kalyan</span></p>
                        <p className="text-[22px] md:text-[24px] leading-tight text-[#666] font-normal">Grassroots Stores</p>
                    </div>
                    <div className="text-center px-2 md:px-4 relative after:hidden md:after:block after:absolute after:right-0 after:top-[18%] after:h-[64%] after:w-px after:bg-gray-200">
                        <p className="text-[34px] md:text-[36px] font-medium text-[#cf2d4c] mb-1 leading-none">21 <span className="text-[16px] md:text-[17px] font-normal text-[#333]">States</span></p>
                        <p className="text-[22px] md:text-[24px] leading-tight text-[#666] font-normal">&amp; Union Territories in India</p>
                    </div>
                    <div className="text-center px-2 md:px-4 relative after:hidden md:after:block after:absolute after:right-0 after:top-[18%] after:h-[64%] after:w-px after:bg-gray-200">
                        <p className="text-[34px] md:text-[36px] font-medium text-[#cf2d4c] mb-1 leading-none">6</p>
                        <p className="text-[22px] md:text-[24px] leading-tight text-[#666] font-normal">Countries</p>
                    </div>
                    <div className="text-center px-2 md:px-4">
                        <p className="text-[34px] md:text-[36px] font-medium text-[#cf2d4c] mb-1 leading-none">13K+</p>
                        <p className="text-[22px] md:text-[24px] leading-tight text-[#666] font-normal">Employees</p>
                    </div>
                </div>
            </section >

            {/* Customer Stories Carousel Section */}
            <section className="bg-gray-50 py-20">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-12">Customer Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 shadow-sm rounded-sm text-center italic text-sm text-gray-600">
                            &quot;It was my first purchase at Kalyan Jewellers. Really impressed with the collection of Mangalsutras. The staff help me find best for me.&quot;
                            <p className="mt-4 font-bold not-italic text-black">- Vidhi</p>
                            <p className="text-[10px] uppercase text-gray-400">Ghaziabad</p>
                        </div>
                        <div className="bg-white p-8 shadow-sm rounded-sm text-center italic text-sm text-gray-600">
                            &quot;You can feel delighted and very happy once you enter into any showroom of Kalyan Jewellers.&quot;
                            <p className="mt-4 font-bold not-italic text-black">- Shubham</p>
                            <p className="text-[10px] uppercase text-gray-400">Varanasi</p>
                        </div>
                        <div className="bg-white p-8 shadow-sm rounded-sm text-center italic text-sm text-gray-600">
                            &quot;Kalyan Jewellers are really providing world class jewelry and designs. Also the gold schemes are really affordable and best.&quot;
                            <p className="mt-4 font-bold not-italic text-black">- Aditi</p>
                            <p className="text-[10px] uppercase text-gray-400">Karnal</p>
                        </div>
                    </div>
                    <div className="flex justify-center gap-2 mt-8">
                        <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>
                </div>
            </section >
        </div >
    );
}
