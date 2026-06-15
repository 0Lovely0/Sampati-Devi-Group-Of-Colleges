// const About = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
      
//       {/* HERO SECTION */}
//       <div className="w-full bg-indigo-950 text-white py-12 sm:py-16 px-4 text-center">
//         <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
//           About Our Institution
//         </h1>

//         <p className="text-sm sm:text-base md:text-xl max-w-3xl mx-auto opacity-90">
//           Empowering the next generation of healthcare and technical professionals through excellence and innovation.
//         </p>
//       </div>

//       {/* MAIN WRAPPER */}
//       <div className="w-full px-4 sm:px-6 lg:px-10 py-10 space-y-10">

//         {/* INTRO SECTION */}
//         <section className="bg-white w-full p-5 sm:p-8 md:p-12 rounded-2xl shadow-lg">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-700 mb-5">
//             Our Legacy & Vision
//           </h2>

//           <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6">
//             Welcome to the Sampati Devi Group of Colleges, a premier institution dedicated to excellence in professional education and holistic development. Established with a vision to nurture future leaders, we pride ourselves on providing a supportive learning environment, state-of-the-art facilities, and industry-aligned curricula.
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <div className="border-l-4 border-amber-600 pl-4">
//               <h3 className="text-lg sm:text-xl font-bold mb-2">Our Vision</h3>
//               <p className="text-sm sm:text-base text-gray-600">
//                 The Sampati Devi Nursing College is seeking to become a statewide recognized institute of rigorous academic performance and teaching-learning system that can compete with the best institutes nationwide.
//               </p>
//             </div>

//             <div className="border-l-4 border-amber-500 pl-4">
//               <h3 className="text-lg sm:text-xl font-bold mb-2">Our Mission</h3>
//               <p className="text-sm sm:text-base text-gray-600">
//                 Sampati Devi Nursing College is committed through its academic programs in nursing to prepare graduates with strong clinical and practical skills for real-world healthcare environments.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* DEPARTMENTS */}
//         <section className="w-full">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-amber-700 mb-8">
//             Our Departments
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {[
//               { title: "Nursing", desc: "Comprehensive training focused on patient care and clinical excellence." },
//               { title: "Pharmacy", desc: "Rigorous scientific programs in pharmaceutical sciences." },
//               { title: "Veterinary", desc: "Dedicated curriculum for specialized animal healthcare." },
//               { title: "MPHW", desc: "Practical community health training for field readiness." }
//             ].map((dept, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition border-t-4 border-amber-700"
//               >
//                 <h3 className="text-lg sm:text-xl font-bold mb-2">
//                   {dept.title}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   {dept.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* WHY CHOOSE US */}
//         <section className="w-full bg-amber-50 p-6 sm:p-10 md:p-12 rounded-2xl">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-amber-700 mb-8">
//             Why Choose Us?
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
//             <div className="p-4">
//               <div className="text-3xl sm:text-4xl mb-3">🎓</div>
//               <h4 className="font-bold text-sm sm:text-base">Affiliated Degrees</h4>
//               <p className="text-xs sm:text-sm text-gray-600">
//                 Recognized certifications by leading universities.
//               </p>
//             </div>

//             <div className="p-4">
//               <div className="text-3xl sm:text-4xl mb-3">🏥</div>
//               <h4 className="font-bold text-sm sm:text-base">Clinical Exposure</h4>
//               <p className="text-xs sm:text-sm text-gray-600">
//                 Hands-on training in government medical facilities.
//               </p>
//             </div>

//             <div className="p-4">
//               <div className="text-3xl sm:text-4xl mb-3">⚙️</div>
//               <h4 className="font-bold text-sm sm:text-base">Modern Labs</h4>
//               <p className="text-xs sm:text-sm text-gray-600">
//                 Equipped with the latest technology for practicals.
//               </p>
//             </div>
//           </div>
//         </section>

//       </div>
//     </div>
//   );
// };

// export default About;




const About = () => {
  return (
    <div className="bg-stone-50 min-h-screen w-full">

      {/* HERO (SMALLER) */}
      <div className="bg-indigo-950 py-14 px-4 text-center border-b border-slate-800">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
          About Our Institution
        </h1>

        <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />

        <p className="text-slate-400 mt-5 max-w-xl mx-auto text-xs md:text-sm leading-relaxed">
          Empowering the next generation of healthcare and technical professionals
          through excellence, innovation, and clinical precision.
        </p>
      </div>

      <div className="w-full mx-auto px-4 py-14 space-y-14">

        {/* LEGACY & VISION (COMPACT) */}
        <section className="bg-white p-6 md:p-10 rounded-2xl border border-stone-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950 mb-5">
            Our Legacy & Vision
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-3xl">
            Welcome to the Sampati Devi Group of Colleges. Established with a vision to nurture future leaders,
            we provide a supportive learning environment and industry-aligned education.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-amber-500">
              <h3 className="text-base font-black text-slate-950 mb-2">
                Vision
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To become a recognized institute of academic excellence with strong teaching systems.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-slate-950">
              <h3 className="text-base font-black text-slate-950 mb-2">
                Mission
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To prepare graduates with strong clinical and practical healthcare skills.
              </p>
            </div>
          </div>
        </section>

        {/* DEPARTMENTS (SMALL CARDS) */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-950">
              Our Departments
            </h2>
            <div className="h-1 w-14 bg-amber-500 mt-3 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Nursing", desc: "Patient care & clinical excellence." },
              { title: "Pharmacy", desc: "Pharmaceutical sciences." },
              { title: "Veterinary", desc: "Animal healthcare studies." },
              { title: "MPHW", desc: "Community health training." }
            ].map((dept, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
              >
                <h3 className="text-base font-black text-slate-950 mb-1">
                  {dept.title}
                </h3>
                <p className="text-xs text-slate-500">{dept.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US (SMALL DARK BLOCK) */}
        <section className="bg-indigo-950 p-8 rounded-2xl text-white">
          <h2 className="text-2xl font-black text-center mb-10">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "🎓", title: "Affiliated Degrees", desc: "Recognized certifications." },
              { icon: "🏥", title: "Clinical Exposure", desc: "Hands-on training experience." },
              { icon: "⚙️", title: "Modern Labs", desc: "Advanced learning facilities." }
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-3xl">{item.icon}</div>
                <h4 className="font-black text-base">{item.title}</h4>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;