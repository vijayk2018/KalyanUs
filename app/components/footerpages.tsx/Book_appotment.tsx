import React from 'react';
import { Link } from 'react-router';
import storeImg from '~/assets/kalyan_iselin_store1.jpeg';
import { MapPin, Phone, MessageSquare, Map as MapIcon, ChevronRight } from 'lucide-react';

export default function BookAppointment() {
    return (
        <div className="bg-white min-h-screen font-serif py-12 px-4 md:px-8 lg:px-[5rem] 2xl:px-[4rem]">
            {/* Breadcrumb - Precisely left-aligned with the card */}
            <div className="w-full mb-32 text-[12px] flex items-center gap-2.5 text-[#888]">
                <Link to="/" className="hover:text-[#cf2d4c]">Home</Link>
                <span>|</span>
                <span className="text-[#333] font-medium">Experience Centre</span>
            </div>

            {/* Main Content Card - Spread wide to match header items */}
            <div className="w-full bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] overflow-hidden rounded-sm border border-gray-100 mb-4">
                <div className="flex flex-col lg:flex-row items-stretch lg:h-[450px]">
                    {/* Left Section - Full Image */}
                    <div className="lg:w-[48%] relative overflow-hidden flex h-[350px] lg:h-full">
                        <img
                            src={storeImg}
                            alt="Kalyan Jewellers Store Interior"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Section - Content Area */}
                    <div className="lg:w-[52%] flex flex-col h-full bg-white">
                        {/* 1. Map (Top Layer) */}
                        <div className="h-[240px] w-full relative bg-[#f0f0f0] border-b border-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?auto=format&fit=crop&q=80&w=1000"
                                alt="Map Placeholder"
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute top-4 left-4 flex shadow-sm rounded-sm overflow-hidden text-[10px] font-bold">
                                <button className="bg-white px-5 py-2 border-r border-gray-100 text-gray-900 border-b-2 border-b-[#cf2d4c]">Map</button>
                                <button className="bg-white/95 px-5 py-2 text-gray-500 hover:bg-white transition-colors">Satellite</button>
                            </div>
                            {/* Map Pin */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <MapPin size={32} className="text-[#cf2d4c] drop-shadow-lg" fill="#cf2d4c" fillOpacity={0.2} strokeWidth={2} />
                            </div>
                        </div>

                        {/* 2. Info Grid (Bottom Layer) */}
                        <div className="flex flex-1 items-stretch">
                            {/* Addresses block */}
                            <div className="w-[58%] h-full p-6 flex flex-col border-r border-gray-100">
                                <div className="flex-grow space-y-4">
                                    <div className="pb-3 border-b border-gray-50">
                                        <h3 className="text-[17px] font-extrabold text-[#222] mb-1.5 leading-tight tracking-tight">Kalyan Jewellers (New Jersey)</h3>
                                        <p className="text-[14px] text-gray-500 font-serif leading-none">
                                            1337-1339 Oak Tree Road, Iselin New Jersey - 08830
                                        </p>
                                    </div>
                                    <div className="pb-1">
                                        <h3 className="text-[17px] font-extrabold text-[#222] mb-1.5 leading-tight tracking-tight">Kalyan Jewellers (Chicago)</h3>
                                        <p className="text-[14px] text-gray-500 font-serif leading-none">
                                            2858 West Devon Ave, Chicago, IL 60659
                                        </p>
                                    </div>
                                </div>
                                <button className="w-full bg-[#cf2d4c] text-white py-4 px-6 rounded-sm text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-[#b0223d] transition-all duration-300 mt-4 shadow-sm active:scale-[0.98]">
                                    View Design
                                </button>
                            </div>

                            {/* Buttons sidebar */}
                            <div className="w-[42%] h-full p-6 flex flex-col gap-3.5 bg-white justify-center">
                                <button className="w-full bg-[#cf2d4c] text-white py-3.5 px-4 rounded-sm text-[11px] font-bold uppercase tracking-wider hover:bg-[#b0223d] transition-all shadow-md">
                                    Book an Appointment
                                </button>

                                <button className="w-full bg-[#fdfdfd] border border-gray-100 text-[#cf2d4c] py-3.5 px-4 rounded-sm text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:bg-gray-50">
                                    <MapIcon size={16} />
                                    Get Directions
                                </button>

                                <div className="space-y-3 mt-1">
                                    <button className="w-full bg-white border border-gray-200 text-[#444] py-2.5 px-4 rounded-sm text-[10px] font-medium uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                                        CALL: +1 (732) 379-4395
                                    </button>

                                    <button className="w-full bg-white border border-gray-200 text-[#444] py-2.5 px-4 rounded-sm text-[10px] font-medium uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                                        CALL: +1 (872) 241-4142
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
