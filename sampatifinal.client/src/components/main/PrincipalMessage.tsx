// import React, { useState } from 'react';
// import principalImg from '../../assets/principal.avif'; 

// const PrincipalMessage: React.FC = () => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <section className="bg-slate-50 py-20 px-6">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-start">
        
//         {/* Left: Image & Info */}
//         <div className="md:col-span-4">
//           <div className="sticky top-24">
//             <div className="relative group">
//               <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[6/7] ring-4 ring-white shadow-indigo-100">
//                 <img src={principalImg} alt="Principal" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
//               </div>
//             </div>
            
//             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 mt-8 text-center">
//               <h3 className="text-2xl font-bold text-slate-900">Dr. Rajesh Kumar</h3>
//               <p className="text-indigo-600 font-semibold mb-6 uppercase tracking-wider text-xs">Principal, SDGC</p>
              
//               <div className="text-slate-600 space-y-3 text-sm text-left border-t border-slate-100 pt-6">
//                 <p className="font-bold text-slate-900 uppercase text-[10px] tracking-widest">Key Qualifications</p>
//                 <p>• Ph.D. in Healthcare Management</p>
//                 <p>• M.Sc. Nursing (Gold Medalist)</p>
//                 <p>• 20+ Years Leadership Experience</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right: Message */}
//         <div className="md:col-span-8 flex flex-col pt-4">
//           <div className="flex items-center gap-3 mb-6">
//             <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Principal's Desk</span>
//             <div className="h-px flex-grow bg-slate-200"></div>
//           </div>
          
//           <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
//             Leading with <span className="text-indigo-600 italic">Vision</span> & Compassion
//           </h2>
          
//           <div className="relative">
//             {/* Decorative Quote */}
//             <span className="absolute -left-4 -top-4 text-7xl text-indigo-100 font-serif">“</span>
            
//             <div className="prose prose-lg text-slate-600 max-w-none relative z-10">
//               <p className="leading-relaxed text-xl">
//                 Welcome to Sampati Devi Group of Colleges. It is my privilege to lead an institution dedicated to the pursuit of excellence in healthcare and professional development.
//               </p>
              
//               <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
//                 <p className="mt-6">
//                   Our curriculum is meticulously designed to bridge the gap between classroom theory and clinical reality. We believe that true education goes beyond textbooks; it is about equipping students with the critical thinking skills to face the complexities of modern healthcare.
//                 </p>
//                 <p className="mt-4">
//                   We invite you to explore our campus, engage with our dedicated faculty, and become a part of our mission to set new benchmarks in education.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <button 
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="mt-10 w-fit flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-indigo-200"
//           >
//             {isExpanded ? 'Show Less' : 'Continue Reading'}
//             <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PrincipalMessage;

import React, { useState } from 'react';
import principalImg from '../../assets/principal.avif'; 

const PrincipalMessage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Image & Profile Card */}
        <div className="md:col-span-4 space-y-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
            <img 
              src={principalImg} 
              alt="Principal" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold">Dr. Rajesh Kumar</h3>
              <p className="text-indigo-300 text-sm font-semibold uppercase tracking-wider">Principal, SDGC</p>
            </div>
          </div>

          {/* <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-4">Key Qualifications</h4>
            <ul className="space-y-4 text-slate-700 text-sm">
              <li className="flex items-center gap-3"><span className="text-indigo-600">✦</span> Ph.D. in Healthcare Management</li>
              <li className="flex items-center gap-3"><span className="text-indigo-600">✦</span> M.Sc. Nursing (Gold Medalist)</li>
              <li className="flex items-center gap-3"><span className="text-indigo-600">✦</span> 20+ Years Leadership Experience</li>
            </ul>
          </div> */}
        </div>

        {/* Right Column: Message */}
        <div className="md:col-span-8 flex flex-col justify-center">
          <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block">Message from the Desk</span>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
            Education is the catalyst for <span className="text-indigo-600">meaningful change</span>.
          </h2>
          
          <div className="text-slate-600 text-lg leading-relaxed space-y-6">
            <p>
              Welcome to Sampati Devi Group of Colleges. My philosophy has always been that a college should not just be a center for information, but a hub of transformation. We strive to mold students into not just professionals, but compassionate human beings.
            </p>
            
            <div className={`space-y-6 transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-60'}`}>
              <p>
                Our pedagogy focuses on "Learning by Doing." By bridging the gap between theoretical knowledge and real-world clinical application, we ensure our graduates are prepared to lead in an ever-evolving healthcare landscape.
              </p>
              {isExpanded && (
                <p className="animate-in fade-in slide-in-from-top-4 duration-500">
                  We are building an ecosystem where curiosity is encouraged, innovation is rewarded, and ethical standards are never compromised. I invite you to join us on this journey of discovery and excellence.
                </p>
              )}
            </div>
          </div>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-10 flex items-center gap-3 text-indigo-600 font-bold hover:gap-5 transition-all duration-300"
          >
            {isExpanded ? 'Read Less' : 'Read Full Message'} <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;