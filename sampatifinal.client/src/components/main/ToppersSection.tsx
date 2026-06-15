// import React from "react";
// import { Link } from "react-router-dom";
// import { Trophy, ArrowRight } from "lucide-react";

// const toppers = [
//   { id: 1, name: "Anjali Sharma", rank: "Rank 1", year: "2025", image: "https://i.pravatar.cc/150?u=1" },
//   { id: 2, name: "Rahul Verma", rank: "Rank 2", year: "2025", image: "https://i.pravatar.cc/150?u=2" },
//   { id: 3, name: "Priya Singh", rank: "Rank 3", year: "2024", image: "https://i.pravatar.cc/150?u=3" },
//   { id: 4, name: "Vikram Mehta", rank: "Rank 4", year: "2024", image: "https://i.pravatar.cc/150?u=4" },
//   { id: 5, name: "Sneha Patel", rank: "Rank 5", year: "2025", image: "https://i.pravatar.cc/150?u=5" },
// ];

// const ToppersSection: React.FC = () => {
//   return (
//     <section className="bg-indigo-950 py-10 overflow-hidden border-b border-slate-500">
//       <div className="w-full mx-auto px-4">

//         {/* HEADER */}
//         <div className="flex items-end justify-between mb-6">

//           <div>
//             <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
//               <Trophy size={12} />
//               Excellence
//             </span>

//             <h2 className="mt-2 text-2xl font-black text-white">
//               Our Toppers
//             </h2>

//             <p className="text-xs text-slate-300 mt-1">
//               Celebrating academic brilliance
//             </p>
//           </div>

//           <Link
//             to="/topperpage"
//             className="hidden md:flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300"
//           >
//             View All <ArrowRight size={14} />
//           </Link>

//         </div>

//         {/* SCROLL CARDS */}
//         <div className="relative overflow-hidden">

//           <div className="flex animate-scroll gap-3">

//             {[...toppers, ...toppers].map((topper, index) => (
//               <div
//                 key={index}
//                 className="w-[170px] flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10"
//               >

//                 {/* IMAGE */}
//                 <div className="h-28 w-full overflow-hidden rounded-xl">
//                   <img
//                     src={topper.image}
//                     alt={topper.name}
//                     className="h-full w-full object-contain"
//                   />
//                 </div>

//                 {/* INFO */}
//                 <div className="mt-3 text-center">
//                   <h3 className="text-xs font-bold text-white">
//                     {topper.name}
//                   </h3>

//                   <p className="text-[10px] text-amber-400">
//                     {topper.rank}
//                   </p>

//                   <p className="text-[10px] text-slate-400">
//                     {topper.year}
//                   </p>
//                 </div>

//               </div>
//             ))}

//           </div>

//         </div>

//         {/* MOBILE BUTTON */}
//         <div className="mt-6 md:hidden">
//           <Link
//             to="/topperpage"
//             className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-2 text-xs font-semibold text-black"
//           >
//             View All Toppers <ArrowRight size={14} />
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default ToppersSection;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Trophy, ArrowRight } from "lucide-react";
// import { getAllToppers, type Topper } from "../../services/toppersService";
// import Loader from "../common/Loader";

// const BASE_URL = "https://localhost:7197";

// const ToppersSection: React.FC = () => {
//   const [toppers, setToppers] = useState<Topper[]>([]);
//   const [loading, setLoading] = useState(true);

//   // FETCH API
//   useEffect(() => {
//     const fetchToppers = async () => {
//       try {
//         const data = await getAllToppers();
//         setToppers(data || []);
//       } catch (error) {
//         console.error("Failed to fetch toppers:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchToppers();
//   }, []);

//   // SAFE IMAGE HANDLER
//   const getImageUrl = (url?: string) => {
//     if (!url) return "";
//     if (url.startsWith("http")) return url;
//     return `${BASE_URL}/${url.replace(/^\//, "")}`;
//   };

//   // ✅ FILTER ONLY "MAIN" DEPARTMENT
//   const mainToppers = toppers.filter((topper) =>
//     topper.departments?.some((d) => d.departmentName === "Main"),
//   );

//   const scrollData = [...mainToppers, ...mainToppers];

//   return (
//     <section className="bg-indigo-950 py-10 overflow-hidden border-b border-slate-800">
//       <div className="w-full mx-auto px-4 sm:px-6">
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
//           <div>
//             <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
//               <Trophy size={12} />
//               Excellence
//             </span>

//             <h2 className="mt-2 text-xl sm:text-2xl font-black text-white">
//               Our Toppers
//             </h2>

//             <p className="text-xs text-slate-300 mt-1">
//               Celebrating academic brilliance
//             </p>
//           </div>

//           {/* DESKTOP BUTTON */}
//           <Link
//             to="/topperpage"
//             className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300"
//           >
//             View All <ArrowRight size={14} />
//           </Link>
//         </div>

//         {/* LOADING */}
//         {loading ? (
//           <div className="h-64 flex items-center justify-center">
//             <Loader text="Loading toppers..." />
//           </div>
//         ) : (
//           <div className="relative overflow-hidden">
//             {/* SCROLL ROW */}
//             <div className="flex gap-3 sm:gap-4 animate-scroll">
//               {scrollData.map((topper, index) => (
//                 <div
//                   key={`${topper.topperId}-${index}`}
//                   className="
//                 flex-shrink-0
//                 w-[160px] sm:w-[180px] md:w-[200px]
//                 rounded-2xl
//                 border border-white/10
//                 bg-white/5
//                 backdrop-blur-sm
//                 p-3
//                 transition
//                 hover:-translate-y-1 hover:bg-white/10
//               "
//                 >
//                   {/* IMAGE */}
//                   <div className="h-32 sm:h-36 w-full overflow-hidden rounded-xl bg-white/10">
//                     <img
//                       src={getImageUrl(topper.imagePath)}
//                       alt={topper.name}
//                       className="h-full w-full object-cover transition duration-500 hover:scale-105"
//                     />
//                   </div>

//                   {/* INFO */}
//                   <div className="mt-3 text-center">
//                     <h3 className="text-[11px] sm:text-xs font-bold text-white line-clamp-1">
//                       {topper.name}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* MOBILE BUTTON */}
//         <div className="mt-6 md:hidden">
//           <Link
//             to="/topperpage"
//             className="flex items-center justify-center gap-2 rounded-full bg-amber-500 py-2 text-xs font-semibold text-black"
//           >
//             View All Toppers <ArrowRight size={14} />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ToppersSection;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Trophy, ArrowRight } from "lucide-react";

// import { getAllToppers, type Topper } from "../../services/toppersService";

// const API_BASE_URL =
//   window.location.hostname === "localhost"
//     ? "https://localhost:7197"
//     : "https://sampatigroup.stdruraltech.org";

// const ToppersSection: React.FC = () => {
//   const [toppers, setToppers] = useState<Topper[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchToppers = async () => {
//     try {
//       setLoading(true);
//       const data = await getAllToppers();
//       setToppers(data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchToppers();
//   }, []);

//   if (loading) {
//     return (
//       <section className="bg-indigo-950 py-10 border-b border-slate-500">
//         <div className="text-center text-white text-sm">
//           Loading toppers...
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-indigo-950 py-10 overflow-hidden border-b border-slate-500">
//       <div className="w-full mx-auto px-4">

//         {/* HEADER */}
//         <div className="flex items-end justify-between mb-6">
//           <div>
//             <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
//               <Trophy size={12} />
//               Excellence
//             </span>

//             <h2 className="mt-2 text-2xl font-black text-white">
//               Our Toppers
//             </h2>

//             <p className="text-xs text-slate-300 mt-1">
//               Celebrating academic brilliance
//             </p>
//           </div>

//           <Link
//             to="/topperpage"
//             className="hidden md:flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300"
//           >
//             View All <ArrowRight size={14} />
//           </Link>
//         </div>

//         {/* INFINITE SCROLL */}
//         <div className="relative overflow-hidden">
//           <div className="flex w-max animate-marquee gap-3">
//             {[...toppers, ...toppers].map((topper, index) => (
//               <div
//                 key={`${topper.topperId}-${index}`}
//                 className="w-[170px] flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10"
//               >
//                 {/* IMAGE */}
//                 <div className="h-28 w-full overflow-hidden rounded-xl">
//                   <img
//                     src={`${API_BASE_URL}/${topper.imagePath}`}
//                     alt={topper.name}
//                     className="h-full w-full object-contain"
//                   />
//                 </div>

//                 {/* INFO */}
//                 <div className="mt-3 text-center">
//                   <h3 className="text-xs font-bold text-white">
//                     {topper.name}
//                   </h3>

//                   <p className="text-[10px] text-amber-400">
//                     Rank: {topper.collegeRank}
//                   </p>

//                   <p className="text-[10px] text-slate-400">
//                     {topper.yearSemester} • {topper.batch}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* MOBILE BUTTON */}
//         <div className="mt-6 md:hidden">
//           <Link
//             to="/topperpage"
//             className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-2 text-xs font-semibold text-black"
//           >
//             View All Toppers <ArrowRight size={14} />
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default ToppersSection;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import { getAllToppers, type Topper } from "../../services/toppersService";

// const API_BASE_URL =
//   window.location.hostname === "localhost"
//     ? "https://localhost:7197"
//     : "https://sampatigroup.stdruraltech.org";

// const ToppersSection: React.FC = () => {
//   const [toppers, setToppers] = useState<Topper[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchToppers = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllToppers();
//         setToppers(data || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchToppers();
//   }, []);

//   const list = [...toppers, ...toppers]; // loop effect

//   return (
//     <section className="bg-stone-50 pb-14 overflow-hidden">

//       {/* HEADER */}
//       <div className="bg-indigo-950 py-12 px-4 text-center border-b border-slate-800">
//         <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full">
//           Excellence
//         </span>

//         <h2 className="text-3xl md:text-4xl font-black text-white mt-4">
//           Academic Achievers
//         </h2>

//         <div className="h-1 w-16 bg-amber-500 mt-4 mx-auto rounded-full" />

//         <p className="mt-4 text-slate-400 text-xs max-w-xl mx-auto">
//           Celebrating the brilliant minds leading our institution.
//         </p>
//       </div>

//       {/* AUTO SCROLL WRAPPER */}
//       <div className="relative w-full mt-10 overflow-hidden">

//         <div className="flex w-max animate-[scroll_25s_linear_infinite] gap-3 px-4">

//           {loading ? (
//             <div className="text-slate-500 text-sm">Loading toppers...</div>
//           ) : (
//             list.map((item, index) => (
//               <div
//                 key={`${item.topperId}-${index}`}
//                 className="w-[160px] flex-shrink-0 bg-white p-3 rounded-xl border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
//               >
//                 <div className="h-40 w-full overflow-hidden rounded-lg bg-stone-100 mb-3">
//                   <img
//                     src={`${API_BASE_URL}/${item.imagePath}`}
//                     alt={item.name}
//                     className="h-full w-full object-contain"
//                   />
//                 </div>

//                 <h3 className="text-sm font-black text-slate-950 truncate">
//                   {item.name}
//                 </h3>

//                 <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-1">
//                   Rank: {item.collegeRank}
//                 </p>

//                 <p className="text-[10px] text-slate-500 mt-1">
//                   {item.yearSemester} • {item.batch}
//                 </p>

//                 <div className="mt-4 w-6 h-1 bg-stone-200 rounded-full" />
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* VIEW ALL BUTTON */}
//       <div className="flex justify-center mt-10">
//         <Link
//           to="/topperpage"
//           className="inline-flex items-center gap-2 bg-indigo-950 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg"
//         >
//           View All Achievements <ArrowRight size={12} />
//         </Link>
//       </div>

//       {/* ANIMATION */}
//       <style>
//         {`
//           @keyframes scroll {
//             0% {
//               transform: translateX(0);
//             }
//             100% {
//               transform: translateX(-50%);
//             }
//           }
//         `}
//       </style>

//     </section>
//   );
// };

// export default ToppersSection;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getAllToppers, type Topper } from "../../services/toppersService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const ToppersSection: React.FC = () => {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        setLoading(true);
        const data = await getAllToppers();
        setToppers(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchToppers();
  }, []);

  const list = [...toppers, ...toppers];

  return (
    <section className="bg-stone-50 pb-14 overflow-hidden">

      {/* HEADER */}
      <div className="bg-indigo-950 py-12 px-4 text-center border-b border-slate-800">
        <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full">
          Excellence
        </span>

        <h2 className="text-3xl md:text-4xl font-black text-white mt-4">
          Academic Achievers
        </h2>

        <div className="h-1 w-16 bg-amber-500 mt-4 mx-auto rounded-full" />

        <p className="mt-4 text-slate-400 text-xs max-w-xl mx-auto">
          Celebrating the brilliant minds leading our institution.
        </p>
      </div>

      {/* SCROLL SECTION */}
      <div className="relative w-full -mt-10 overflow-hidden">

        <div className="flex w-max animate-[scroll_25s_linear_infinite] gap-3 px-4">

          {loading ? (
            <div className="text-slate-500 text-sm">Loading toppers...</div>
          ) : (
            list.map((item, index) => (
              <div
                key={`${item.topperId}-${index}`}
                onClick={() =>
                  setActiveId(activeId === item.topperId ? null : item.topperId)
                }
                className="relative w-[160px] flex-shrink-0 rounded-xl overflow-hidden group cursor-pointer"
              >

                {/* IMAGE */}
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={`${API_BASE_URL}/${item.imagePath}`}
                    alt={item.name}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* NAME ONLY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <h3 className="text-xs font-black text-white truncate">
                    {item.name}
                  </h3>
                </div>

                {/* HOVER + CLICK DETAILS */}
                <div
                  className={`absolute inset-0 bg-indigo-950/90 text-white flex flex-col justify-center items-center text-center px-3 transition-all duration-300
                  ${
                    activeId === item.topperId
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                    Rank: {item.collegeRank}
                  </p>

                  <p className="text-[10px] text-slate-200 mt-2">
                    {item.yearSemester}
                  </p>

                  <p className="text-[10px] text-slate-300">
                    {item.batch}
                  </p>
                </div>

              </div>
            ))
          )}

        </div>
      </div>

      {/* VIEW ALL */}
      <div className="flex justify-center mt-10">
        <Link
          to="/topperpage"
          className="inline-flex items-center gap-2 bg-indigo-950 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg"
        >
          View All Achievements <ArrowRight size={12} />
        </Link>
      </div>

      {/* SCROLL ANIMATION */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

    </section>
  );
};

export default ToppersSection;