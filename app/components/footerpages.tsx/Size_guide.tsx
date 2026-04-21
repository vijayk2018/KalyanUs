import React from 'react';
import ringSizerImage from '~/assets/ezgif.com-gif-maker_86_.webp';
import bangleSizerImage from '~/assets/ezgif.com-gif-maker_87__1.webp';

export default function SizeGuide() {
    return (
        <div className="bg-white min-h-screen pt-10 pb-16 font-sans sm:pt-12 sm:pb-20 md:pt-16 md:pb-24">
            <div className="max-w-[1240px] mx-auto px-4 md:px-8">
                {/* Header - Same as first image */}
                <h1 className="text-[32px] md:text-[40px] font-light text-[#333] mb-8 text-center uppercase tracking-wide">
                    KALYAN SIZE GUIDE
                </h1>

                <h2 className="text-[18px] md:text-[22px] font-light text-[#333] mb-6 text-center uppercase tracking-wide">
                    HOW TO DETERMINE YOUR RING AND BANGLE SIZE?
                </h2>

                {/* Paragraphs - Full center alignment like first image */}
                <div className="max-w-[950px] mx-auto text-[#666] text-[14px] sm:text-[15px] leading-relaxed mb-10 sm:mb-12 md:mb-16 space-y-4 sm:space-y-6 text-center">
                    <p>
                        At Candere, we like to make sure that your online shopping experience is as easy as possible. Whether you are buying a solitaire ring for yourself or a gorgeous eternity bangle for your
                        better half, we understand the importance of getting the size right.
                    </p>
                    <p>
                        To help you find your accurate fit, here&apos;s a downloadable size chart. Simple to understand and easy to use, this will help you to shop with confidence because you know what you are looking for. All you have to do is download our chart and follow the instructions to determine your size.
                    </p>
                </div>

                {/* Cards - Same as yours but slight tweaks for better spacing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-[1000px] mx-auto">

                    {/* Ring Card */}
                    <div className="border border-gray-100 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] p-4 sm:p-5 md:p-6 bg-white transition-shadow hover:shadow-lg">
                        <div className="mb-4">
                            <a href="#" className="text-[#cf2d4c] font-normal text-[15px] hover:underline flex items-center gap-1 justify-center md:justify-start">
                                <span className="uppercase">RING SIZER GUIDE</span>
                                <span>Download</span>
                            </a>
                        </div>
                        <div className="flex justify-center items-center p-2 bg-gray-50 rounded">
                            <img
                                src={ringSizerImage}
                                alt="Ring Sizer Guide"
                                className="max-w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Bangle Card */}
                    <div className="border border-gray-100 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] p-4 sm:p-5 md:p-6 bg-white transition-shadow hover:shadow-lg">
                        <div className="mb-4">
                            <a href="#" className="text-[#cf2d4c] font-normal text-[15px] hover:underline flex items-center gap-1 justify-center md:justify-start">
                                <span className="uppercase">BANGLE SIZER GUIDE</span>
                                <span>Download</span>
                            </a>
                        </div>
                        <div className="flex justify-center items-center p-2 bg-gray-50 rounded">
                            <img
                                src={bangleSizerImage}
                                alt="Bangle Sizer Guide"
                                className="max-w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}