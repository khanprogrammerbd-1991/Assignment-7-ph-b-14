
import React from 'react';

const Hero = () => {
  const todayBanglaDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="bg-gradient-to-br from-[#0A3D2E] via-[#0E5A42] to-[#0A3D2E] text-white py-12 sm:py-16 border-b border-[#165B46]">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <span className="inline-block text-xs sm:text-sm text-[#9FE1CB] bg-[#15694F]/60 border border-[#288B6B] px-3.5 py-1.5 rounded-full font-medium">
            📅 {todayBanglaDate}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            আজকে বাজারের দাম <span className="text-[#5DCAA5]">একনজরে</span>
          </h1>

          <p className="text-[#CFECE2] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            চাল, ডাল, তেল ও সবজির বাজার ভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন ও সর্বোচ্চ দাম পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <a
              href="#সব-পণ্য"
              className="inline-block rounded-xl px-6 py-3 bg-[#1D9E75] hover:bg-[#178562] text-white font-semibold shadow-lg transition-all"
            >
              সব পন্য দেখুন ↓
            </a>
          </div>
        </div>

        {/* Right Column: Hero Visual Emoji Box */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="bg-[#072B20]/60 p-6 rounded-2xl border border-[#1E6E55] shadow-xl text-center">
            
              <img src='/public/bazar-hero.png'/>
           
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;