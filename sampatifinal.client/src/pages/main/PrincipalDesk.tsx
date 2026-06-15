// import React from "react";
// import principalImg from "../../assets/principal.jpg";
// import { Quote, BookOpen, Heart, Stethoscope } from "lucide-react";
// import { Link } from "react-router-dom";

// const PrincipalDesk: React.FC = () => {
//   return (
//     <section className="min-h-screen w-full bg-white overflow-x-hidden">

//       {/* HEADER */}
//       <div className="w-full bg-indigo-950 border-b border-slate-200 py-12 sm:py-16 lg:py-20 px-4 text-center">
//         <span className="inline-block bg-amber-100 px-4 py-1 text-[10px] sm:text-xs font-semibold tracking-widest text-amber-700">
//           PRINCIPAL’S DESK
//         </span>

//         <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
//           Message from the Principal
//         </h1>

//         <p className="mt-2 text-sm sm:text-base lg:text-lg text-white/90">
//           Leadership • Vision • Excellence in Nursing Education
//         </p>
//       </div>

//       {/* MAIN GRID */}
//       <div className="w-full grid grid-cols-1 md:grid-cols-3">

//         {/* LEFT SIDE */}
//         <div className="bg-white border-b md:border-b-0 md:border-r border-slate-200 p-5 sm:p-6">

//           <img
//             src={principalImg}
//             alt="Principal"
//             className="h-60 sm:h-72 w-full object-contain"
//           />

//           <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">
//             Dr. Neha Sharma
//           </h3>

//           <p className="text-[10px] sm:text-xs text-amber-700 font-semibold uppercase tracking-widest">
//             Principal
//           </p>

//           {/* HIGHLIGHTS */}
//           <div className="mt-6 space-y-4">

//             <div className="border border-slate-200 p-4 rounded-lg">
//               <BookOpen className="text-amber-700 mb-2" size={18} />
//               <h4 className="text-sm font-semibold text-slate-900">
//                 Academic Excellence
//               </h4>
//               <p className="text-xs text-slate-500">
//                 Strong curriculum with modern education standards.
//               </p>
//             </div>

//             <div className="border border-slate-200 p-4 rounded-lg">
//               <Heart className="text-amber-700 mb-2" size={18} />
//               <h4 className="text-sm font-semibold text-slate-900">
//                 Compassionate Care
//               </h4>
//               <p className="text-xs text-slate-500">
//                 Focus on patient-centered nursing approach.
//               </p>
//             </div>

//             <div className="border border-slate-200 p-4 rounded-lg">
//               <Stethoscope className="text-amber-700 mb-2" size={18} />
//               <h4 className="text-sm font-semibold text-slate-900">
//                 Clinical Training
//               </h4>
//               <p className="text-xs text-slate-500">
//                 Real hospital exposure for practical learning.
//               </p>
//             </div>

//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="md:col-span-2 bg-white p-5 sm:p-8 lg:p-10">

//           <div className="flex items-center gap-3 mb-6">
//             <Quote className="text-amber-400" size={22} />
//             <h2 className="text-lg sm:text-xl font-bold">
//               Principal’s Message
//             </h2>
//           </div>

//           <p className="text-sm sm:text-base leading-6 sm:leading-7 text-slate-700">
//             Welcome to Sampati Devi Nursing College, where we are dedicated to
//             fostering excellence in nursing education. Our college is committed
//             to providing a nurturing and supportive environment that empowers
//             students to become compassionate and skilled healthcare
//             professionals. With a blend of rigorous academic programs, hands-on
//             clinical experience, and state-of-the-art facilities, we prepare our
//             students to meet the evolving demands of the healthcare industry.
//             Join us in our mission to improve health and well-being through
//             exceptional nursing care.
//           </p>

//           {/* VISION */}
//           <div className="mt-8 border border-slate-200 p-5 rounded-lg bg-slate-50">
//             <h3 className="text-amber-700 font-semibold mb-2">
//               Our Vision
//             </h3>
//             <p className="text-sm text-slate-700">
//               To become a center of excellence in nursing education by producing
//               highly skilled, ethical, and globally competent healthcare professionals.
//             </p>
//           </div>

//           {/* CTA */}
//           <div className="mt-8 flex flex-col sm:flex-row gap-3">
//             <Link to="/applynow">
//               <button className="w-full sm:w-auto bg-amber-500 px-5 py-2 text-sm font-semibold text-black hover:bg-amber-400 transition">
//                 Admission Enquiry
//               </button>
//             </Link>

//             <Link to="/contact">
//               <button className="w-full sm:w-auto border border-amber-300 px-5 py-2 text-sm font-semibold hover:bg-amber-200 hover:text-amber-800 transition">
//                 Contact College
//               </button>
//             </Link>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default PrincipalDesk;

import React from "react";
import principalImg from "../../assets/principal.jpg";
import { Quote, BookOpen, Heart, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const PrincipalDesk: React.FC = () => {
  return (
    <section className="bg-stone-50 pb-14">
      {/* HEADER */}
      <div className="bg-indigo-950 py-12 px-4 text-center border-b border-slate-800">
        <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full">
          Principal's Desk
        </span>

        <h1 className="text-3xl md:text-4xl font-black text-white mt-4">
          Message from the Principal
        </h1>

        <div className="h-1 w-16 bg-amber-500 mt-4 mx-auto rounded-full" />

        <p className="mt-4 text-slate-400 text-xs max-w-xl mx-auto italic">
          "Leadership • Vision • Excellence in Nursing Education"
        </p>
      </div>

      {/* CONTENT */}
      <div className="w-full mx-auto px-4 -mt-10">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col md:flex-row">

          {/* LEFT SIDE */}
          <div className="md:w-1/3 bg-stone-50 p-6 border-b md:border-b-0 md:border-r border-stone-200">
            <img
              src={principalImg}
              alt="Principal"
              className="w-full aspect-square object-contain rounded-xl shadow-sm"
            />

            <div className="mt-4">
              <h3 className="text-lg font-black text-slate-950">
                Dr. Neha Sharma
              </h3>
              <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mt-1">
                Principal
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { icon: BookOpen, title: "Academic Excellence" },
                { icon: Heart, title: "Compassionate Care" },
                { icon: Stethoscope, title: "Clinical Training" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-stone-100"
                >
                  <item.icon className="text-amber-500" size={14} />
                  <span className="text-[11px] font-bold text-slate-900">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:w-2/3 p-6 md:p-8">
            <Quote className="text-amber-500 mb-4" size={24} />

            <p className="text-slate-600 leading-relaxed text-xs md:text-sm">
              Welcome to Sampati Devi Nursing College, where we are dedicated to
              fostering excellence in nursing education. Our college is committed
              to providing a nurturing environment that empowers students to
              become compassionate and skilled healthcare professionals. With a
              blend of rigorous academic programs, hands-on clinical experience,
              and state-of-the-art facilities, we prepare our students to meet the
              evolving demands of the healthcare industry.
            </p>

            <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-stone-100">
              <h4 className="text-xs font-black text-slate-950 mb-1">
                Our Vision
              </h4>
              <p className="text-xs text-slate-500 italic">
                "To become a center of excellence in nursing education by producing
                highly skilled, ethical, and globally competent healthcare
                professionals."
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/applynow"
                className="bg-indigo-950 text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition"
              >
                Admission Enquiry
              </Link>

              <Link
                to="/contact"
                className="border border-stone-300 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-stone-100 transition"
              >
                Contact College
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalDesk;