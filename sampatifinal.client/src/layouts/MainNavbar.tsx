// import React from "react";

// const institutes = [
//   "B.Sc. Nursing",
//   "Post Basic B.Sc. Nursing",
//   "Veterinary Pharmacist",
//   "Pharmacy",
//   "Multipurpose Health Worker",
// ];

// const Navbar: React.FC = () => {
//   return (
//     <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
//       {/* Top Bar */}
//       <div className="bg-slate-900 text-slate-400 text-[11px] font-medium py-2 px-6 flex justify-between items-center">
//         <div className="flex gap-6">
//           <span>📧 info@sampatidevicolleges.com</span>
//           <span className="hidden sm:inline">📍 Near City Hospital, Main Road, India</span>
//         </div>
//         <span>📞 +91 98765 43210</span>
//       </div>

//       {/* Main Navbar */}
//       <nav className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-8">
        
//         {/* Left: Logo & Name */}
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-100">
//             <img src="./logo1.ico" alt="Logo" className="w-full h-full object-cover" />
//           </div>
//           <div className="flex flex-col">
//             <span className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">SAMPATI DEVI</span>
//             <span className="text-[9px] font-bold text-indigo-600 tracking-[0.2em] uppercase">Group of Colleges</span>
//           </div>
//         </div>

//         {/* Center: Tabs */}
//         <div className="hidden md:flex justify-center items-center gap-8 text-lg font-bold text-slate-700">
//           <a href="/About" className="hover:text-indigo-600 transition-colors">About</a>
//           <a href="/events" className="hover:text-indigo-600 transition-colors">Events</a>
//           <div className="relative group cursor-pointer">
//             <span className="hover:text-indigo-600 transition-colors flex items-center gap-1">Institutes ▾</span>
//             <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//               <div className="bg-white p-3 w-64 rounded-2xl shadow-2xl border border-slate-100">
//                 {institutes.map((inst) => (
//                   <a key={inst} href="#" className="block px-4 py-3 hover:bg-indigo-50 text-slate-700 rounded-xl transition-colors text-sm font-medium">
//                     {inst}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <a href="/contact" className="hover:text-indigo-600 transition-colors">Contact</a>
//         </div>

//         {/* Right: Buttons */}
//         <div className="hidden md:flex items-center gap-3">
//           <button className="bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200 transition-all active:scale-95">
//             Adoption Program
//           </button>
//           <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200 transition-all active:scale-95">
//             Apply Now
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { departments } from "../data/departments"; // Make sure this path is correct

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-400 text-[11px] font-medium py-2 px-6 flex justify-between items-center">
        <div className="flex gap-6">
          <span>📧 info@sampatidevicolleges.com</span>
          <span className="hidden sm:inline">📍 Near City Hospital, Main Road, India</span>
        </div>
        <span>📞 +91 98765 43210</span>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-8">
        
        {/* Left: Logo & Name */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-100">
            <img src="/logo1.ico" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">SAMPATI DEVI</span>
            <span className="text-[9px] font-bold text-indigo-600 tracking-[0.2em] uppercase">Group of Colleges</span>
          </div>
        </Link>

        {/* Center: Tabs */}
        <div className="hidden md:flex justify-center items-center gap-8 text-md font-bold text-slate-700">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors">About</Link>
          
          <div className="relative group cursor-pointer">
            <span className="hover:text-indigo-600 transition-colors flex items-center gap-1">Institutes ▾</span>
            {/* Dropdown */}
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white p-3 w-64 rounded-2xl shadow-2xl border border-slate-100">
                {departments.map((inst) => (
                  <Link 
                    key={inst.slug} 
                    to={`/dept/${inst.slug}`}
                    className="block px-4 py-3 hover:bg-indigo-50 text-slate-700 rounded-xl transition-colors text-sm font-bold"
                  >
                    {inst.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
        </div>

        {/* Right: Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="bg-black text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-slate-800 transition-all">
            Adoption
          </button>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
            Apply Now
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
