import React from "react";
import { Link } from "react-router-dom";
import collegeImage from "../../assets/college.png";

const Hero: React.FC = () => {
  return (
    <section className="bg-stone-50 py-5 sm:py-16">
      <div className="w-full mx-auto px-3 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left space-y-5">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Excellence In Education
            </span>

            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              SAMPATI DEVI <br />
              <span className="text-amber-600">Group of Colleges</span>
            </h1>

            <p className="text-slate-600 text-lg sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              Shaping the future through quality teaching, experienced faculty, and modern infrastructure.
            </p>

            {/* STATS - Compact */}
            <div className="flex justify-center lg:justify-start gap-6 py-2">
              {[
                { label: "Programs", val: "15+" },
                { label: "Students", val: "5K+" },
                { label: "Support", val: "100%" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-black text-slate-900">{s.val}</p>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">{s.label}</p>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center lg:justify-start gap-3 pt-2">
              <Link to="/exploreprogram" className="bg-amber-500 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-amber-600 transition">
                Explore Programs
              </Link>
              <Link to="/gallerypage" className="bg-indigo-950 border border-slate-200 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:border-slate-300 transition">
                View Gallery
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE - Tightened */}
          <div className="hidden lg:block relative h-[300px] lg:h-[350px] w-full rounded-2xl overflow-hidden shadow-xl border border-white">
            <img src={collegeImage} alt="College" className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-lg flex items-center justify-between shadow-sm">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-amber-600 font-bold">Admissions Open</p>
                <p className="text-xs font-bold text-slate-900">Session 2026-27</p>
              </div>
              <div className="bg-slate-900 p-1.5 rounded-md text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;