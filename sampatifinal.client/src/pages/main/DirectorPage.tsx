import React from "react";
import directorImg1 from "../../assets/D1.jpg";
import directorImg2 from "../../assets/D2.jpg";
import { Quote } from "lucide-react";

const DirectorPage: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-white">

      {/* HEADER */}
      <div className="w-full bg-indigo-950 border-b border-slate-200 py-12 sm:py-16 md:py-20 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Director Message
        </h1>

        <p className="mt-2 text-sm sm:text-lg text-white/90">
          Leadership • Vision • Excellence in Medical Education
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3">

        {/* LEFT SIDE */}
        <div className="bg-white border-b md:border-b-0 md:border-r border-slate-200 p-4 sm:p-6 space-y-6">

          {/* Director 1 */}
          <div className="border border-slate-200 p-4 rounded-lg">
            <img
              src={directorImg1}
              alt="Director 1"
              className="w-full h-56 sm:h-64 md:h-72 object-contain"
            />

            <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">
              Dr. Chander Shekhar Sharma
            </h3>

            <p className="text-xs text-amber-700 font-semibold uppercase tracking-widest">
              Chairman
            </p>
          </div>

          {/* Director 2 */}
          <div className="border border-slate-200 p-4 rounded-lg">
            <img
              src={directorImg2}
              alt="Director 2"
              className="w-full h-56 sm:h-64 md:h-72 object-contain"
            />

            <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">
              Mrs. Sunita Sharma
            </h3>

            <p className="text-xs text-amber-700 font-semibold uppercase tracking-widest">
              Managing Director
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2 p-4 sm:p-6 md:p-10">

          <div className="flex items-center gap-3 mb-6">
            <Quote className="text-amber-400" size={22} />
            <h2 className="text-lg sm:text-xl font-bold">
              Director’s Message
            </h2>
          </div>

          <p className="text-sm sm:text-base leading-6 sm:leading-7 text-slate-700">
            The Academic excellence has become a way of life with all of us at
            SAMPATI DEVI MEMORIAL NURSING COLLEGE MANDI.
            <br /><br />
            In line with our tradition of introducing high quality,
            career-oriented programmes, it is indeed a great pleasure to
            announce the setting up of the institution with its B.Sc. Nursing
            programme.
            <br /><br />
            Through its pioneering efforts, the college aims to create leaders
            in the nursing profession by providing innovative programmes that
            meet global healthcare standards.
            <br /><br />
            I welcome you and wish you success in all your future endeavors.
          </p>

          {/* SIGN BOX (optional improvement) */}
          <div className="mt-10 border-t border-slate-200 pt-6">
            <p className="text-sm font-semibold text-slate-900">
              Director Office
            </p>
            <p className="text-xs text-slate-500">
              Sampati Devi Group of Colleges
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DirectorPage;