import React from "react";
import { CalendarDays, MapPin } from "lucide-react";
import StoreImage from '../assets/storeimg.png';
import BookAppointment from '../assets/bookAppointment.png';
import GetDirection from '../assets/tracker.png';

const KeepInTouch: React.FC = () => {
  return (
    <div className="w-full lg:pt-16 text-center bg-[#f5f5f5]">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100 relative">
        {/* RED HALF BACKGROUND */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#800027]"></div>
        {/* LEFT IMAGE */}
        <div className="w-full h-full relative lg:mt-0 mt-20">
          <img
            src={StoreImage}
            alt="store"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="flex flex-col justify-center px-10 lg:py-12 lg:mt-0 mt-25">
          <div className="relative z-10 mx-auto flex w-full max-w-[560px] flex-col items-start text-left lg:-translate-x-16 lg:text-black text-white">
            {/* Heading */}
            <p
              className="mb-5 text-[36px] font-light leading-tight tracking-normal"
              style={{fontFamily: '"Helvetica Neue LT Std 45 Light", sans-serif'}}
            >
              Keep in Touch with us
            </p>

            {/* Paragraph */}
            <p
              className="text-[14px] font-light leading-[1.35] tracking-normal"
              style={{fontFamily: '"Helvetica Neue LT Std 45 Light", sans-serif'}}
            >
              We’re always here to guide you every step of the way. Whether it’s new collections, special
              <br />
              offers, or personalized assistance, we’re just a click away. Let’s stay connected!
            </p>
          </div>

          {/* BOTTOM RED SECTION */}
          <div className="relative  text-white lg:py-16 py-3 mt-8">



            {/* CONTENT */}
            <div className="relative z-10 mx-auto flex w-full max-w-[560px] translate-y-15 justify-center gap-7 lg:-translate-x-16">

              {/* BOOK APPOINTMENT */}
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 ml-[-80px]" onClick={() => window.open('/experience-centre', '_blank')}>
                <img src={BookAppointment} alt="Book Appointment" className="lg:w-20 lg:h-20 h-8 w-8 fill-white" />
                <p className="text-sm tracking-wide font-medium font-serif"style={{fontFamily: '"Helvetica Neue LT Std 45 Light", sans-serif'}}>BOOK APPOINTMENT</p>
              </div>

              {/* GET DIRECTION */}
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80" onClick={() => window.open('/experience-centre', '_blank')}>
                <img src={GetDirection} alt="Get Direction" className="lg:w-20 lg:h-20 h-8 w-8 text-white fill-white" />
                <p className="text-sm tracking-wide font-medium font-serif"style={{fontFamily: '"Helvetica Neue LT Std 45 Light", sans-serif'}}>GET DIRECTION</p>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default KeepInTouch;