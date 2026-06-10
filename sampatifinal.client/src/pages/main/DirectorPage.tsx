import React from "react";
import directorImg1 from "/D1.avif";
import directorImg2 from "/D2.avif";
import { Quote } from "lucide-react";

const DirectorPage: React.FC = () => {
  return (
    <section className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="border-b border-slate-200 py-20 text-center bg-indigo-950">
        <h1 className="text-4xl font-bold text-white">
          Director Message
        </h1>
        <p className="mt-2 text-lg text-white/90">
          Leadership • Vision • Excellence in Medical Education
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid md:grid-cols-3">

        {/* LEFT: DIRECTORS */}
        <div className="border-r border-slate-200 p-6 space-y-6 bg-white">

          {/* Director 1 */}
          <div className="border border-slate-200 p-4">
            <img
              src={directorImg1}
              alt="Director"
              className="h-72 w-full object-contain"
            />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Dr. Chander Shekhar Sharma
            </h3>

            <p className="text-xs text-amber-700 font-semibold">
              Chairman
            </p>
          </div>

          {/* Director 2 */}
          <div className="border border-slate-200 p-4">
            <img
              src={directorImg2}
              alt="Director"
              className="h-72 w-full object-contain"
            />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Mrs. Sunita Sharma
            </h3>

            <p className="text-xs text-amber-700 font-semibold">
              Managing Director
            </p>
          </div>

        </div>

        {/* RIGHT: MESSAGE */}
        <div className="md:col-span-2 bg-white p-10">

          <div className="flex items-center gap-3 mb-6">
            <Quote className="text-amber-400" size={22} />
            <h2 className="text-xl font-bold">
              Director’s Message
            </h2>
          </div>

          <p className="text-sm leading-7">
            The Academic excellence has become a way of life with all of us at
            SAMPATI DEVI MEMORIAL NURSING COLLEGE MANDI. In line with our
            tradition of introducing high quality, career-oriented programmes,
            it is indeed a great pleasure to announce the setting up of the
            SAMPATI DEVI MEMORIAL NURSING COLLEGE MANDI with its B.Sc. Nursing
            programme.
            <br /><br />
            Through its pioneering efforts, the SAMPATI DEVI MEMORIAL NURSING
            COLLEGE MANDI aims to create leaders in the nursing profession by
            providing unique, innovative programmes that are responsive to the
            market need, keeping in mind the rapid advances in the health care
            sector in India as well as abroad.
            <br /><br />
            I am confident that the SAMPATI DEVI MEMORIAL NURSING COLLEGE MANDI
            will create a benchmark in nursing education in India as also
            overseas by ensuring a steady flow of trained professionals who meet
            international standards in terms of quality of education and service.
            <br /><br />
            I welcome you to the SAMPATI DEVI MEMORIAL NURSING COLLEGE MANDI
            and wish you success in all your future endeavors.
          </p>

          {/* FOOT SIGN */}
          {/* <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-white font-semibold">
              Dr. Chander Shekhar Sharma
            </p>
            <p className="text-sm text-slate-400">Chairman</p>
          </div> */}

        </div>
      </div>
    </section>
  );
};

export default DirectorPage;