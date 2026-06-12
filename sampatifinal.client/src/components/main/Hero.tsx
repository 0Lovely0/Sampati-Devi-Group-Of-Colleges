import React from "react";
import { Link } from "react-router-dom";
import collegeImage from "../../assets/college.png";

const Hero: React.FC = () => {
  return (
    <section>
      <div className="mx-auto w-full overflow-hidden border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-amber-50 px-4 sm:px-6 py-6 sm:py-8 shadow-[0_15px_50px_rgba(15,23,42,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-700">
              Excellence In Education
            </div>

            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-slate-900">
              SAMPATI DEVI
              <br />
              <span className="text-amber-600">Group of Colleges</span>
            </h1>

            <p className="mt-3 mx-auto lg:mx-0 max-w-lg text-sm sm:text-base leading-relaxed text-slate-600">
              Shaping the future of healthcare and professional education
              through quality teaching, experienced faculty, modern
              infrastructure, and career-focused learning.
            </p>

            {/* STATS */}
            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2">
              <div className="rounded-xl bg-white px-3 py-2 border border-slate-100 shadow-sm">
                <p className="text-base sm:text-lg font-black text-amber-600">15+</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500">Programs</p>
              </div>

              <div className="rounded-xl bg-white px-3 py-2 border border-slate-100 shadow-sm">
                <p className="text-base sm:text-lg font-black text-amber-600">5000+</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500">Students</p>
              </div>

              <div className="rounded-xl bg-white px-3 py-2 border border-slate-100 shadow-sm">
                <p className="text-base sm:text-lg font-black text-amber-600">100%</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500">Support</p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <Link
                to="/exploreprogram"
                className="rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition"
              >
                Explore Programs
              </Link>

              <Link
                to="/gallerypage"
                className="rounded-full border border-amber-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-amber-600 hover:text-amber-600 transition"
              >
                View Gallery
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[340px]">
            <img
              src={collegeImage}
              alt="Sampati Devi Group of Colleges"
              className="h-full w-full object-cover rounded-xl"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/10" />

            {/* FLOATING CARD */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-xl border border-white/30 bg-white/80 backdrop-blur-md px-3 py-2 shadow-lg">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Admissions Open
              </p>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Session 2026-27
              </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;