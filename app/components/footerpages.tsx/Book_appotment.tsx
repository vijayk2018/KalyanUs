import React, {type FormEvent, useState} from 'react';
import { Link } from 'react-router';
import storeImg from '~/assets/kalyan_iselin_store1.jpeg';
import { MapPin, Map as MapIcon, X } from 'lucide-react';

const DIRECTIONS_URL =
  'https://www.google.com//maps/place/Kalyan+Jewellers/@40.5736499,-74.324300,20z/data=!4m6!3m5!1s0x89c3b78ee9083fa9:0xd904594a7f6e5ac4!8m2!3d40.5736499!4d-74.324300!16s%2Fg%2F11y8j5w1bx?entry=ttu&g_ep=EgoyMDI1MDEwNi4xIKXMDSoASAFQAw%3D%3D';

export default function BookAppointment() {
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleAppointmentSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsAppointmentModalOpen(false);
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <div className="bg-white min-h-screen font-serif py-8 px-4 sm:py-10 md:py-12 md:px-8 lg:px-[5rem] 2xl:px-[4rem]">
            {/* Breadcrumb - Precisely left-aligned with the card */}
            <div className="w-full mb-12 flex items-center gap-2 text-[11px] text-[#888] sm:mb-16 md:mb-24 md:text-[12px]">
                <Link to="/" className="hover:text-[#cf2d4c]">Home</Link>
                <span>|</span>
                <span className="text-[#333] font-medium">Experience Centre</span>
            </div>

            {/* Main Content Card - Spread wide to match header items */}
            <div className="mb-4 w-full overflow-hidden rounded-sm border border-gray-100 bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col lg:flex-row items-stretch">
                    {/* Left Section - Full Image */}
                    <div className="relative flex h-[260px] overflow-hidden sm:h-[320px] lg:h-auto lg:w-[48%]">
                        <img
                            src={storeImg}
                            alt="Kalyan Jewellers Store Interior"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Section - Content Area */}
                    <div className="flex h-full flex-col bg-white lg:w-[52%]">
                        {/* 1. Map (Top Layer) */}
                        <div className="relative h-[220px] w-full border-b border-gray-100 bg-[#f0f0f0] sm:h-[240px]">
                            <img
                                src="https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?auto=format&fit=crop&q=80&w=1000"
                                alt="Map Placeholder"
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute left-3 top-3 flex overflow-hidden rounded-sm text-[10px] font-bold shadow-sm sm:left-4 sm:top-4">
                                <button className="border-r border-gray-100 border-b-2 border-b-[#cf2d4c] bg-white px-4 py-2 text-gray-900 sm:px-5">Map</button>
                                <button className="bg-white/95 px-4 py-2 text-gray-500 transition-colors hover:bg-white sm:px-5">Satellite</button>
                            </div>
                            {/* Map Pin */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <MapPin size={32} className="text-[#cf2d4c] drop-shadow-lg" fill="#cf2d4c" fillOpacity={0.2} strokeWidth={2} />
                            </div>
                        </div>

                        {/* 2. Info Grid (Bottom Layer) */}
                        <div className="flex flex-1 flex-col items-stretch md:flex-row">
                            {/* Addresses block */}
                            <div className="h-full w-full border-b border-gray-100 p-4 sm:p-6 md:w-[58%] md:border-b-0 md:border-r">
                                <div className="flex-grow space-y-4">
                                    <div className="pb-3 border-b border-gray-50">
                                        <h3 className="mb-1.5 text-[15px] font-extrabold leading-tight tracking-tight text-[#222] sm:text-[17px]">Kalyan Jewellers (New Jersey)</h3>
                                        <p className="font-serif text-[13px] leading-snug text-gray-500 sm:text-[14px]">
                                            1337-1339 Oak Tree Road, Iselin New Jersey - 08830
                                        </p>
                                    </div>
                                    <div className="pb-1">
                                        <h3 className="mb-1.5 text-[15px] font-extrabold leading-tight tracking-tight text-[#222] sm:text-[17px]">Kalyan Jewellers (Chicago)</h3>
                                        <p className="font-serif text-[13px] leading-snug text-gray-500 sm:text-[14px]">
                                            2858 West Devon Ave, Chicago, IL 60659
                                        </p>
                                    </div>
                                </div>
                                <button className="mt-4 w-full rounded-sm bg-[#cf2d4c] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-sm transition-all duration-300 hover:bg-[#b0223d] active:scale-[0.98] sm:px-6 sm:py-4 sm:text-[13px]">
                                    View Design
                                </button>
                            </div>

                            {/* Buttons sidebar */}
                            <div className="h-full w-full bg-white p-4 sm:p-6 md:w-[42%]">
                                <div className="flex flex-col justify-center gap-3.5">
                                <button
                                    type="button"
                                    onClick={() => setIsAppointmentModalOpen(true)}
                                    className="w-full rounded-sm bg-[#cf2d4c] px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#b0223d] sm:py-3.5 sm:text-[11px]"
                                >
                                    Book an Appointment
                                </button>

                                <a
                                    href={DIRECTIONS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-2 rounded-sm border border-gray-100 bg-[#fdfdfd] px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[#cf2d4c] transition-all hover:bg-gray-50 sm:py-3.5 sm:text-[11px]"
                                >
                                    <MapIcon size={16} />
                                    Get Directions
                                </a>

                                <div className="space-y-3 mt-1">
                                    <button className="flex w-full items-center justify-center gap-2 rounded-sm border border-gray-200 bg-white px-4 py-2.5 text-[9px] font-medium uppercase tracking-widest text-[#444] transition-all hover:bg-gray-50 sm:text-[10px]">
                                        CALL: +1 (732) 379-4395
                                    </button>

                                    <button className="flex w-full items-center justify-center gap-2 rounded-sm border border-gray-200 bg-white px-4 py-2.5 text-[9px] font-medium uppercase tracking-widest text-[#444] transition-all hover:bg-gray-50 sm:text-[10px]">
                                        CALL: +1 (872) 241-4142
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isAppointmentModalOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4"
                    onClick={() => setIsAppointmentModalOpen(false)}
                >
                    <div
                        className="w-full max-w-[420px] bg-[#f1f1f1] p-6 shadow-xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                            <h2 className="text-[26px] font-light text-gray-800">Book Appointment</h2>
                            <button
                                type="button"
                                onClick={() => setIsAppointmentModalOpen(false)}
                                className="rounded p-1 text-gray-600 hover:bg-gray-100 hover:text-black"
                                aria-label="Close book appointment form"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <p className="mb-4 text-xs text-gray-600">
                            Need assistance or have questions? We&apos;re here to help! Fill out the details below, and we&apos;ll get back to you as soon as possible.
                        </p>

                        <form className="space-y-3" onSubmit={handleAppointmentSubmit}>
                            <div>
                                <label className="mb-1 block text-sm text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="w-full border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="w-full border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">Phone</label>
                                <div className="flex items-center border border-[#CCCCCC] bg-white px-3 py-2">
                                    <span className="mr-2 text-sm text-gray-600">+1</span>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                        className="w-full text-sm focus:outline-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-2 w-full bg-[#cf2d4c] py-2 text-sm font-semibold text-white hover:bg-[#b0223d]"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
