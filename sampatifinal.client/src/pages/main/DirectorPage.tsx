// import React from "react";
// import directorImg1 from "../../assets/D1.jpg";
// import directorImg2 from "../../assets/D2.jpg";
// import { Quote } from "lucide-react";

// const DirectorPage: React.FC = () => {
//   return (
//     <section className="w-full min-h-screen bg-white">

//       {/* HEADER */}
//       <div className="w-full bg-indigo-950 border-b border-slate-200 py-12 sm:py-16 md:py-20 px-4 text-center">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
//           Director Message
//         </h1>

//         <p className="mt-2 text-sm sm:text-lg text-white/90">
//           Leadership • Vision • Excellence in Medical Education
//         </p>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="w-full grid grid-cols-1 md:grid-cols-3">

//         {/* LEFT SIDE */}
//         <div className="bg-white border-b md:border-b-0 md:border-r border-slate-200 p-4 sm:p-6 space-y-6">

//           {/* Director 1 */}
//           <div className="border border-slate-200 p-4 rounded-lg">
//             <img
//               src={directorImg1}
//               alt="Director 1"
//               className="w-full h-56 sm:h-64 md:h-72 object-contain"
//             />

//             <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">
//               Dr. Chander Shekhar Sharma
//             </h3>

//             <p className="text-xs text-amber-700 font-semibold uppercase tracking-widest">
//               Chairman
//             </p>
//           </div>

//           {/* Director 2 */}
//           <div className="border border-slate-200 p-4 rounded-lg">
//             <img
//               src={directorImg2}
//               alt="Director 2"
//               className="w-full h-56 sm:h-64 md:h-72 object-contain"
//             />

//             <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">
//               Mrs. Sunita Sharma
//             </h3>

//             <p className="text-xs text-amber-700 font-semibold uppercase tracking-widest">
//               Managing Director
//             </p>
//           </div>

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="md:col-span-2 p-4 sm:p-6 md:p-10">

//           <div className="flex items-center gap-3 mb-6">
//             <Quote className="text-amber-400" size={22} />
//             <h2 className="text-lg sm:text-xl font-bold">
//               Director’s Message
//             </h2>
//           </div>

//           <p className="text-sm sm:text-base leading-6 sm:leading-7 text-slate-700">
//             The Academic excellence has become a way of life with all of us at
//             SAMPATI DEVI MEMORIAL NURSING COLLEGE MANDI.
//             <br /><br />
//             In line with our tradition of introducing high quality,
//             career-oriented programmes, it is indeed a great pleasure to
//             announce the setting up of the institution with its B.Sc. Nursing
//             programme.
//             <br /><br />
//             Through its pioneering efforts, the college aims to create leaders
//             in the nursing profession by providing innovative programmes that
//             meet global healthcare standards.
//             <br /><br />
//             I welcome you and wish you success in all your future endeavors.
//           </p>

//           {/* SIGN BOX (optional improvement) */}
//           <div className="mt-10 border-t border-slate-200 pt-6">
//             <p className="text-sm font-semibold text-slate-900">
//               Director Office
//             </p>
//             <p className="text-xs text-slate-500">
//               Sampati Devi Group of Colleges
//             </p>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default DirectorPage;


// import React from "react";
// import directorImg1 from "../../assets/D1.jpg";
// import directorImg2 from "../../assets/D2.jpg";
// import { Quote } from "lucide-react";

// const DirectorPage: React.FC = () => {
//   return (
//     <section className="bg-stone-50 pb-14">
//       {/* HEADER */}
//       <div className="bg-indigo-950 py-12 px-4 text-center border-b border-slate-800">
//         <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full">
//           Leadership
//         </span>

//         <h1 className="text-3xl md:text-4xl font-black text-white mt-4">
//           Director's Message
//         </h1>

//         <div className="h-1 w-16 bg-amber-500 mt-4 mx-auto rounded-full" />

//         <p className="mt-4 text-slate-400 text-xs max-w-xl mx-auto italic">
//           "Leadership • Vision • Excellence in Medical Education"
//         </p>
//       </div>

//       {/* CONTENT */}
//       <div className="w-full mx-auto px-4 -mt-10">
//         <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col md:flex-row">

//           {/* LEFT SIDE */}
//           <div className="md:w-1/3 bg-stone-50 p-6 border-b md:border-b-0 md:border-r border-stone-200 space-y-6">

//             {/* Chairman */}
//             <div className="space-y-3">
//               <img
//                 src={directorImg1}
//                 alt="Chairman"
//                 className="w-full aspect-square object-contain rounded-xl shadow-sm"
//               />
//               <div>
//                 <h3 className="text-base font-black text-slate-950">
//                   Dr. Chander Shekhar Sharma
//                 </h3>
//                 <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mt-1">
//                   Chairman
//                 </p>
//               </div>
//             </div>

//             {/* Director */}
//             <div className="space-y-3">
//               <img
//                 src={directorImg2}
//                 alt="Director"
//                 className="w-full aspect-square object-contain rounded-xl shadow-sm"
//               />
//               <div>
//                 <h3 className="text-base font-black text-slate-950">
//                   Mrs. Sunita Sharma
//                 </h3>
//                 <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mt-1">
//                   Managing Director
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="md:w-2/3 p-6 md:p-8">
//             <Quote className="text-amber-500 mb-4" size={24} />

//             <div className="space-y-4 text-slate-600 leading-relaxed text-xs md:text-sm">

//               <p>
//                 Academic excellence has become a way of life for all of us at{" "}
//                 <span className="font-bold text-slate-950">
//                   SAMPATI DEVI MEMORIAL NURSING COLLEGE MANDI.
//                 </span>
//               </p>

//               <p>
//                 In line with our tradition of introducing high-quality, career-oriented
//                 programmes, it is indeed a great pleasure to announce the setting up of the
//                 institution with its B.Sc. Nursing programme.
//               </p>

//               <p>
//                 The Academic excellence has become a way of life with all of us at SAMPATI DEVI MEMORIAL NURSING COLLEGE MANDI. In line with our tradition of introducing high quality, career-orientedprogrammes, it is indeed a great pleasure to announce the setting up of the SAMPATI DEVI MEMORIAL NURSING COLLEGEMANDI with its B.Sc. Nursing programme. Through its pioneering efforts, the SAMPATI DEVI MEMORIAL NURSING COLLEGE MANDI aims to create leaders in the nursing profession by providing unique, innovative programmes that are responsive to the market need, keeping in mind the rapid advances in the health care sector in India as well as abroad. I am confident that the SAMPATI DEVI MEMORIAL NURSING COLLEGEMANDI will create a benchmark in nursing education in India as also overseas by ensuring a steady flow of trained professionals who meet the international standards in terms of quality of education and service provided. I welcome you to the SAMPATI DEVI MEMORIAL NURSING COLLEGE MANDI and wish you success in all your future endeavors.
//               </p>

//               <p className="font-semibold text-slate-950">
//                 I welcome you and wish you success in all your future endeavors.
//               </p>
//             </div>

//             <div className="mt-8 pt-6 border-t border-stone-200">
//               <p className="text-xs font-black text-slate-950">Director Office</p>
//               <p className="text-[10px] text-stone-500">
//                 Sampati Devi Group of Colleges
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default DirectorPage;



import React from "react";
import directorImg1 from "../../assets/D1.jpg";
import directorImg2 from "../../assets/D2.jpg";
import {
  Quote,
  GraduationCap,
  HeartHandshake,
  Landmark,
} from "lucide-react";

const DirectorPage: React.FC = () => {
  return (
    <section className="bg-stone-50 pb-24 overflow-hidden">
      {/* HERO */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <span className="inline-block text-xs font-black text-amber-500 uppercase tracking-[0.25em] bg-white/10 px-4 py-2 rounded-full">
          Leadership
        </span>

        <h1 className="text-4xl md:text-5xl font-black text-white mt-6">
          Director's Message
        </h1>

        <div className="h-1.5 w-24 bg-amber-500 mt-5 mx-auto rounded-full" />

        <p className="mt-6 text-slate-400 text-lg max-w-3xl mx-auto italic leading-relaxed">
          "Leadership • Vision • Excellence in Medical Education"
        </p>
      </div>

      {/* CONTENT */}
      <div className="w-full mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* LEFT PANEL */}
            <div className="lg:col-span-2 bg-gradient-to-b from-stone-50 to-white p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-stone-200">
              <div className="space-y-8">
                {/* Chairman */}
                <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm hover:shadow-lg transition-all duration-300">
                  <img
                    src={directorImg1}
                    alt="Chairman"
                    className="w-full h-[320px] object-contain rounded-2xl"
                  />

                  <div className="mt-5 text-center">
                    <h3 className="text-2xl font-black text-slate-950">
                      Dr. Chander Shekhar Sharma
                    </h3>

                    <p className="text-xs font-black text-amber-600 uppercase tracking-[0.25em] mt-2">
                      Chairman
                    </p>
                  </div>
                </div>

                {/* Managing Director */}
                <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm hover:shadow-lg transition-all duration-300">
                  <img
                    src={directorImg2}
                    alt="Managing Director"
                    className="w-full h-[320px] object-contain rounded-2xl"
                  />

                  <div className="mt-5 text-center">
                    <h3 className="text-2xl font-black text-slate-950">
                      Mrs. Sunita Sharma
                    </h3>

                    <p className="text-xs font-black text-amber-600 uppercase tracking-[0.25em] mt-2">
                      Managing Director
                    </p>
                  </div>
                </div>
              </div>

              {/* Leadership Values */}
              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: GraduationCap,
                    title: "Academic Excellence",
                  },
                  {
                    icon: HeartHandshake,
                    title: "Student Success",
                  },
                  {
                    icon: Landmark,
                    title: "Institutional Growth",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-2xl border border-stone-200 flex items-center gap-4 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                      <item.icon
                        size={22}
                        className="text-amber-600"
                      />
                    </div>

                    <h4 className="font-black text-slate-950">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="lg:col-span-3 p-8 md:p-12">
              <Quote
                className="text-amber-500 mb-6"
                size={42}
                strokeWidth={1.8}
              />

              <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-8">
                A Message From Our Leadership
              </h2>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Academic excellence has become a way of life for all of
                  us at{" "}
                  <span className="font-black text-slate-950">
                    Sampati Devi Memorial Nursing College, Mandi.
                  </span>
                </p>

                <p>
                  In line with our tradition of introducing
                  high-quality, career-oriented programs, it gives us
                  immense pleasure to establish this institution with
                  its B.Sc. Nursing program, dedicated to shaping the
                  future of healthcare education.
                </p>

                <p>
                  Through pioneering efforts and a student-centered
                  approach, the college aims to create future leaders
                  in the nursing profession by offering innovative
                  academic programs that respond to evolving healthcare
                  needs both nationally and internationally.
                </p>

                <p>
                  Our vision is to provide a learning environment that
                  encourages intellectual growth, professional ethics,
                  clinical competence, and lifelong learning. We are
                  committed to producing graduates who can contribute
                  effectively to healthcare systems across India and
                  abroad.
                </p>

                <p>
                  We are confident that Sampati Devi Memorial Nursing
                  College will establish a benchmark in nursing
                  education by ensuring a continuous flow of highly
                  trained professionals who meet global standards of
                  healthcare education and service.
                </p>

                <p className="font-semibold text-slate-950 text-xl">
                  We welcome you to our institution and wish you
                  success in all your future endeavors.
                </p>
              </div>

              {/* Vision Card */}
              <div className="mt-10 bg-stone-50 rounded-3xl border border-stone-200 p-8">
                <h3 className="text-2xl font-black text-slate-950 mb-4">
                  Leadership Vision
                </h3>

                <p className="text-slate-600 text-lg italic leading-relaxed">
                  "To create a premier institution recognized for
                  excellence in nursing education, innovation,
                  research, and healthcare leadership while preparing
                  students to serve society with professionalism,
                  compassion, and integrity."
                </p>
              </div>

              {/* Signature */}
              <div className="mt-12 pt-8 border-t border-stone-200">
                <h4 className="text-2xl font-black text-slate-950">
                  Director Office
                </h4>

                <p className="text-amber-600 font-bold mt-2">
                  Sampati Devi Group of Colleges
                </p>

                <p className="text-slate-500 mt-2">
                  Committed to academic excellence, innovation,
                  and student success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorPage;

