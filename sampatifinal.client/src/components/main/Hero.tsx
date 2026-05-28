import React from 'react';
import collegeImage from '../../assets/college.png';

const Hero: React.FC = () => {
  return (
    <section className=" py-16 px-6 bg-slate-50 rounded-2xl border-b-1 border-gray-400">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Info Section */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            SAMPATI DEVI <br />
            <span className="text-indigo-600">Group of Colleges</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Shaping the future of healthcare and professional education. 
            Experience a world-class campus, dedicated faculty, and 
            industry-aligned programs designed for your success.
          </p>
          <div className="flex gap-4">
            <button className="bg-indigo-700 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-800 transition shadow-lg">
              Explore Programs
            </button>
            <button className="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-full font-bold hover:border-indigo-600 transition">
              View Gallery
            </button>
          </div>
        </div>

        {/* Right: Static Image Section (Replaces Swiper) */}
        <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={collegeImage} 
            alt="Sampati Devi Group of Colleges Campus" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;