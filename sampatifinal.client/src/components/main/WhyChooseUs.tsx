// import React from "react";

// const reasons = [
//   {
//     id: 1,
//     title: "Expert Faculty",
//     desc: "Learn from experienced professors and healthcare professionals with strong academic and clinical expertise.",
//     icon: "🎓",
//   },
//   {
//     id: 2,
//     title: "Modern Infrastructure",
//     desc: "Advanced laboratories and smart classrooms designed to enhance learning outcomes.",
//     icon: "🔬",
//   },
//   {
//     id: 3,
//     title: "Placement Support",
//     desc: "Dedicated career guidance and placement assistance with reputed healthcare institutions.",
//     icon: "💼",
//   },
//   {
//     id: 4,
//     title: "Holistic Development",
//     desc: "Academic excellence combined with sports, cultural activities, and personality development.",
//     icon: "🌟",
//   },
// ];

// const WhyChooseUs: React.FC = () => {
//   return (
//     <section className="py-10 bg-slate-50 border-t border-slate-200">
//       <div className="w-full mx-auto px-4 sm:px-6">
//         {/* HEADING */}
//         <div className="text-center mb-8 sm:mb-10">
//           <span className="inline-block border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-700">
//             Why Choose Us
//           </span>

//           <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
//             Why Choose Sampati Devi College?
//           </h2>

//           <div className="w-14 sm:w-16 h-px bg-indigo-600 mx-auto mt-3"></div>

//           <p className="mt-4 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
//             We are committed to preparing future healthcare professionals
//             through quality education, practical training, and a supportive
//             academic environment.
//           </p>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border border-slate-200 rounded-xl overflow-hidden">
//           {reasons.map((item, index) => (
//             <div
//               key={item.id}
//               className={`
//             group p-5 sm:p-6 transition duration-300
//             hover:bg-indigo-950
//             border-slate-200
//             ${index !== reasons.length - 1 ? "border-b sm:border-b lg:border-b-0 lg:border-r" : ""}
//           `}
//             >
//               {/* ICON */}
//               <div className="w-11 h-11 sm:w-12 sm:h-12 border border-slate-200 bg-slate-50 flex items-center justify-center text-xl sm:text-2xl mb-4 group-hover:bg-white/10 group-hover:border-white/20 transition">
//                 {item.icon}
//               </div>

//               {/* TITLE */}
//               <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 group-hover:text-white transition-colors">
//                 {item.title}
//               </h3>

//               {/* DESCRIPTION */}
//               <p className="text-[11px] sm:text-xs leading-relaxed text-slate-600 group-hover:text-slate-300 transition-colors">
//                 {item.desc}
//               </p>

//               {/* LINE */}
//               <div className="mt-4 w-8 h-px bg-indigo-600 group-hover:bg-white transition"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;


import React from "react";

const reasons = [
  {
    id: 1,
    title: "Expert Faculty",
    desc: "Learn from experienced professors and healthcare professionals with strong clinical expertise.",
    icon: "🎓",
  },
  {
    id: 2,
    title: "Modern Infrastructure",
    desc: "Advanced laboratories and smart classrooms designed to enhance learning outcomes.",
    icon: "🔬",
  },
  {
    id: 3,
    title: "Placement Support",
    desc: "Dedicated career guidance and placement assistance with reputed healthcare institutions.",
    icon: "💼",
  },
  {
    id: 4,
    title: "Holistic Growth",
    desc: "Academic excellence combined with sports, cultural activities, and personality development.",
    icon: "🌟",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-stone-50 pb-14">
      {/* HEADER */}
      <div className="bg-indigo-950 py-12 px-4 text-center border-b border-slate-800">
        <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full">
          Why Choose Us
        </span>

        <h2 className="text-3xl md:text-4xl font-black text-white mt-4">
          Excellence in Healthcare Education
        </h2>

        <div className="h-1 w-16 bg-amber-500 mt-4 mx-auto rounded-full" />

        <p className="mt-4 text-slate-400 text-xs max-w-xl mx-auto leading-relaxed">
          We are committed to preparing future healthcare professionals through quality
          education, hands-on clinical training, and a supportive academic environment.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((item) => (
            <div
              key={item.id}
              className="group bg-white p-6 rounded-2xl border border-stone-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-950"
            >
              <div className="text-3xl mb-4">{item.icon}</div>

              <h3 className="text-base font-black text-slate-950 mb-2 group-hover:text-amber-600 transition">
                {item.title}
              </h3>

              <p className="text-xs leading-relaxed text-slate-500">
                {item.desc}
              </p>

              <div className="mt-5 w-8 h-1 bg-stone-200 group-hover:bg-amber-500 transition-all rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;