import React from 'react';
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
    return (
        <div className="about-page font-serif text-[#333]">
            {/* Hero Section */}
            <section className="relative h-[50vh] w-full overflow-hidden">
                <img
                    src={aboutBanner}
                    alt="A Global Story of Shine"
                    className="h-full w-full object-cover"
                />
            </section>

            {/* About Kalyan Jewellers Section */}
            <section className="pb-20 pt-8 px-6 md:px-12 lg:px-20">
                <div className="grid gap-10 md:grid-cols-5 lg:gap-16">
                    <div className="md:col-span-2 overflow-hidden bg-gray-50">
                        <img
                            src={kalyan3ppls}
                            alt="Kalyan Leadership"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="md:col-span-3 flex flex-col justify-start">
                        <h2 className="text-4xl font-normal text-[#333] mb-10 font-serif leading-tight">
                            About Kalyan Jewellers
                        </h2>
                        <div className="space-y-10 text-[14px] leading-relaxed text-[#555] font-serif">
                            <div>
                                <h3 className="mb-3 text-[19px] font-semibold text-[#333]">Founding Vision</h3>
                                <p>
                                    Kalyan Jewellers was established in 1993 by visionary entrepreneur Mr. T.S. Kalyanaraman, with a mission to redefine jewelry retail in India. Built on the principles of trust, transparency, and customer-first values, the brand quickly grew into one of the country&apos;s most respected and iconic names in the jewelry industry. What began as a single showroom has now evolved into a global presence, with a strong footprint across India, the Middle East, and the USA.
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-3 text-[19px] font-semibold text-[#333]">Celebrating Cultural Diversity</h3>
                                <p>
                                    At Kalyan Jewellers, jewelry is more than a product—it&apos;s a celebration of India&apos;s rich cultural tapestry. Our designs are inspired by the traditions, artistry, and craftsmanship unique to every region, blending them with contemporary aesthetics to cater to modern sensibilities. From intricate bridal collections to everyday elegance, each piece embodies timeless beauty and craftsmanship, making us a part of our customers&apos; most cherished moments.
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-3 text-[19px] font-semibold text-[#333]">Pioneering Excellence</h3>
                                <p>
                                    Kalyan Jewellers has consistently set the standard in the jewelry industry through ethical practices, innovation, and quality assurance. As pioneers in introducing BIS Hallmarked gold and transparency in pricing, we have transformed the way jewelry is purchased in India. Our 4-Level Assurance Certification, which includes rigorous quality checks, transparent pricing, ethically sourced materials, and reliable certifications, ensures that every piece upholds the highest standards. This meticulous attention to detail and commitment to authenticity have solidified our reputation as a trusted brand for generations.
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-3 text-[19px] font-semibold text-[#333]">A Trusted Brand</h3>
                                <p>
                                    With the unwavering trust of millions, Kalyan Jewellers continues to lead the jewelry industry. Our expanding network of showrooms offers a personalized shopping experience, thoughtfully tailored to meet the unique preferences of our customers. Whether celebrating milestones or embracing everyday moments, Kalyan Jewellers adds lasting significance to every experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="bg-gray-50 py-16">
                <div className="px-6 md:px-12 lg:px-20">
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* T.S. Kalyanaraman */}
                        <div className="group flex flex-col bg-white transition-shadow duration-300 hover:shadow-2xl">
                            <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                                <img
                                    src={tsKalyanaraman}
                                    alt="T.S. Kalyanaraman"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-[#333]">T.S. Kalyanaraman</h3>
                                <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
                                    Chief Managing Director
                                </p>
                                <div className="h-40 overflow-hidden relative">
                                    <p className="text-sm leading-relaxed text-[#666]">
                                        Today, when I look around me, business is all about toplines, bottomlines and market capitalisation. But Kalyan entered into business in a pre-independent India to build a better India, as our forefathers believed ethical, fair business will make India self-sufficient and strong. Personally, I believe Kalyan Jewellers&apos; major achievement is the trust we have earned from millions of people across the length and breadth of a huge subcontinent like India...
                                    </p>
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
                                </div>
                                <button className="mt-4 text-sm font-bold text-[#cf2d4c] hover:underline">Read More</button>
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
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-[#333]">Rajesh Kalyanaraman</h3>
                                <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
                                    Executive Director
                                </p>
                                <div className="h-40 overflow-hidden relative">
                                    <p className="text-sm leading-relaxed text-[#666]">
                                        I feel our biggest differentiator is not only the ability to understand local, think local and act local, but at the same time bring in our vast experience and sourcing strength out of operating in multiple markets. Jewellery is a complicated product, because tastes vary even within the same state. What helps us here is the huge variety of products we stock from artisans across the country and even the Arab countries...
                                    </p>
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
                                </div>
                                <button className="mt-4 text-sm font-bold text-[#cf2d4c] hover:underline">Read More</button>
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
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-[#333]">Ramesh Kalyanaraman</h3>
                                <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
                                    Executive Director
                                </p>
                                <div className="h-40 overflow-hidden relative">
                                    <p className="text-sm leading-relaxed text-[#666]">
                                        We have always visualized everything on a large scale. We always enjoyed making the road and never thought of following a trail. Massive marketing campaigns and launches, path-breaking ads which were never-before seen in jewellery advertising, multi-storey large format jewellery showrooms, same-day multi-launch ceremonies and events...
                                    </p>
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
                                </div>
                                <button className="mt-4 text-sm font-bold text-[#cf2d4c] hover:underline">Read More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Vision & Mission Section */}
            < section className="flex flex-col md:flex-row min-h-[600px]" >
                <div className="w-full md:w-1/2 flex items-center justify-center p-12 bg-white">
                    <img src={compassImg} alt="Vision Compass" className="max-w-full h-auto drop-shadow-2xl" />
                </div>
                <div className="w-full md:w-1/2 bg-[#cf254a] text-white p-12 md:p-24 flex flex-col justify-center gap-16">
                    <div className="text-center group">
                        <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full border border-white/30 group-hover:scale-110 transition-transform">
                            <img src={visionIcon} alt="Vision Icon" className="w-10 invert brightness-0" />
                        </div>
                        <h2 className="text-4xl font-bold mb-6 tracking-wide underline underline-offset-8 decoration-white/20">Our Vision</h2>
                        <p className="text-base leading-relaxed max-w-lg mx-auto font-light">
                            &quot;To understand and delight the world, translating everyone&apos;s dream and personality into fine Indian jewellery, and spread the happiness from it to all.&quot;
                        </p>
                    </div>
                    <div className="text-center group">
                        <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full border border-white/30 group-hover:scale-110 transition-transform">
                            <img src={missionIcon} alt="Mission Icon" className="w-10 invert brightness-0" />
                        </div>
                        <h2 className="text-4xl font-bold mb-6 tracking-wide underline underline-offset-8 decoration-white/20">Our Mission</h2>
                        <p className="text-base leading-relaxed max-w-lg mx-auto font-light">
                            &quot;To give every customer much more than what he/she asks for in terms of quality, selection, value for money and customer service, by understanding local tastes and preferences and innovating constantly to eventually provide an unmatched experience in Indian jewellery shopping.&quot;
                        </p>
                    </div>
                </div>
            </section >

            {/* Network Section */}
            <section className="py-24 px-6 md:px-12 lg:px-20">
                <h2 className="text-5xl font-bold text-center mb-20 text-[#333]">Our Network</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="bg-[#f8f5f2] p-10 text-center rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-56 flex items-center justify-center mb-8">
                            <img src={indiaMap} alt="India Map" className="max-h-full hover:scale-105 transition-transform" />
                        </div>
                        <h3 className="text-4xl font-bold text-[#cf2d4c] mb-2">400+</h3>
                        <p className="font-bold text-base mb-4 uppercase tracking-widest text-gray-700">Showroom in India</p>
                        <p className="text-sm text-gray-500 leading-relaxed px-2">
                            We have a strong presence across 21 states and union territories, and our 278-plus network of showrooms cover all major cities.
                        </p>
                    </div>

                    <div className="bg-[#f8f5f2] p-10 text-center rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-56 flex items-center justify-center mb-8">
                            <img src={middleEastMap} alt="Middle East Map" className="max-h-full hover:scale-105 transition-transform" />
                        </div>
                        <h3 className="text-4xl font-bold text-[#cf2d4c] mb-2">36+</h3>
                        <p className="font-bold text-base mb-4 uppercase tracking-widest text-gray-700">Showroom in Middle East</p>
                        <p className="text-sm text-gray-500 leading-relaxed px-2">
                            We have 36 showrooms in the GCC spread across UAE, Qatar, Kuwait and Oman.
                        </p>
                    </div>

                    <div className="bg-[#f8f5f2] p-10 text-center rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-56 flex items-center justify-center mb-8">
                            <img src={usaMap} alt="USA Map" className="max-h-full hover:scale-105 transition-transform" />
                        </div>
                        <h3 className="text-4xl font-bold text-[#cf2d4c] mb-2">02</h3>
                        <p className="font-bold text-base mb-4 uppercase tracking-widest text-gray-700">Showroom in USA</p>
                        <p className="text-sm text-gray-500 leading-relaxed px-2">
                            We have 2 showrooms in the USA (New Jersey and Chicago).
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-24 pt-16 border-t border-gray-100">
                    <div className="text-center px-4 relative after:hidden md:after:block after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-px after:bg-gray-200">
                        <p className="text-4xl font-bold text-[#cf2d4c] mb-1">32 <span className="text-sm font-normal text-gray-500">Years</span></p>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Since Formation</p>
                    </div>
                    <div className="text-center px-4 relative after:hidden md:after:block after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-px after:bg-gray-200">
                        <p className="text-4xl font-bold text-[#cf2d4c] mb-1">1K+ <span className="text-sm font-normal text-gray-500">My Kalyan</span></p>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Grassroots Stores</p>
                    </div>
                    <div className="text-center px-4 relative after:hidden md:after:block after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-px after:bg-gray-200">
                        <p className="text-4xl font-bold text-[#cf2d4c] mb-1">21 <span className="text-sm font-normal text-gray-500">States</span></p>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">&amp; Union Territories in India</p>
                    </div>
                    <div className="text-center px-4 relative after:hidden md:after:block after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-px after:bg-gray-200">
                        <p className="text-4xl font-bold text-[#cf2d4c] mb-1">6</p>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Countries</p>
                    </div>
                    <div className="text-center px-4">
                        <p className="text-4xl font-bold text-[#cf2d4c] mb-1">13K+</p>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Employees</p>
                    </div>
                </div>
            </section >

            {/* Customer Stories Carousel Section */}
            <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-20">
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
