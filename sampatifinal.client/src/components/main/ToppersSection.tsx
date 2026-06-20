// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import { getAllToppers, type Topper } from "../../services/toppersService";
// import Loader from "../../components/common/Loader";

// const API_BASE_URL =
//   window.location.hostname === "localhost"
//     ? "https://localhost:7197"
//     : "https://sampatigroup.stdruraltech.org";

// const ToppersSection: React.FC = () => {
//   const [toppers, setToppers] = useState<Topper[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeId, setActiveId] = useState<number | null>(null);

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

//   const list = [...toppers, ...toppers];

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

//    {/* SCROLL SECTION */}
// <div className="relative w-full -mt-18 overflow-hidden py-8">
//   <div className="flex w-max animate-[scroll_25s_linear_infinite] gap-6 px-4 mx-auto">
//     {loading ? (
//           <div className="h-56 flex items-center justify-center">
//             <Loader text="Loading videos..." />
//           </div>
//         ) : (
//       list.map((item, index) => (
//         <div
//           key={`${item.topperId}-${index}`}
//           onClick={() => setActiveId(activeId === item.topperId ? null : item.topperId)}
//           className="relative w-[180px] h-[240px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 group border border-white/10"
//         >
//           {/* IMAGE - Using object-cover for a more professional look */}
//           <div className="absolute inset-0 bg-slate-900">
//             <img
//               src={`${API_BASE_URL}/${item.imagePath}`}
//               alt={item.name}
//               className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
//             />
//           </div>

//           {/* NAME PLATE - Sleek bottom anchor */}
//           <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
//             <h3 className="text-sm font-semibold text-white tracking-wide">
//               {item.name}
//             </h3>
//           </div>

//           {/* PREMIUM REVEAL OVERLAY - Glassmorphism */}
//           <div
//             className={`absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col justify-center items-center text-center p-6 transition-all duration-500 ease-out 
//             ${activeId === item.topperId ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
//           >
//             <div className="space-y-2">
//               <div className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold border-b border-white/10 pb-2 mb-2">
//                 Rank {item.collegeRank}
//               </div>
//               <div className="text-xs text-white font-medium">{item.yearSemester}</div>
//               <div className="text-[10px] text-slate-400 font-light">{item.batch}</div>
//             </div>
//             {/* Subtle decorative ring */}
//             <div className="absolute inset-2 border border-white/10 rounded-xl pointer-events-none" />
//           </div>
//         </div>
//       ))
//     )}
//   </div>
// </div>

//       {/* VIEW ALL */}
//       <div className="flex justify-center mt-10">
//         <Link
//           to="/topperpage"
//           className="inline-flex items-center gap-2 bg-indigo-950 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg"
//         >
//           View All Achievements <ArrowRight size={12} />
//         </Link>
//       </div>

//       {/* SCROLL ANIMATION */}
//       <style>
//         {`
//           @keyframes scroll {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(-50%); }
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
import Loader from "../../components/common/Loader";

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
    <section className="bg-stone-50 pb-24 overflow-hidden">
      {/* HEADER */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <span className="inline-block text-xs font-black text-amber-500 uppercase tracking-[0.25em] bg-white/10 px-4 py-2 rounded-full">
          Excellence
        </span>

        <h2 className="text-4xl md:text-5xl font-black text-white mt-6">
          Academic Achievers
        </h2>

        <div className="h-1.5 w-24 bg-amber-500 mt-6 mx-auto rounded-full" />

        <p className="mt-6 text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Celebrating the brilliant minds whose dedication, perseverance,
          and academic excellence inspire the next generation of healthcare
          professionals.
        </p>
      </div>

      {/* TOPPERS CAROUSEL */}
      <div className="relative w-full -mt-20 overflow-hidden py-12">
        {loading ? (
          <div className="h-72 flex items-center justify-center">
            <Loader text="Loading achievers..." />
          </div>
        ) : (
          <div className="flex w-max animate-[scroll_35s_linear_infinite] gap-8 px-6">
            {list.map((item, index) => (
              <div
                key={`${item.topperId}-${index}`}
                onClick={() =>
                  setActiveId(
                    activeId === item.topperId ? null : item.topperId
                  )
                }
                className="relative w-[260px] h-[360px] flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 group border border-white/10"
              >
                {/* IMAGE */}
                <div className="absolute inset-0 bg-slate-900">
                  <img
                    src={`${API_BASE_URL}/${item.imagePath}`}
                    alt={item.name}
                    className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* NAME */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <h3 className="text-xl font-black text-white tracking-wide">
                    {item.name}
                  </h3>
                </div>

                {/* DETAILS OVERLAY */}
                <div
                  className={`absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col justify-center items-center text-center p-8 transition-all duration-500 ease-out
                  ${
                    activeId === item.topperId
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="text-sm uppercase tracking-[0.25em] text-amber-400 font-black border-b border-white/10 pb-3">
                      Rank {item.collegeRank}
                    </div>

                    <div className="text-lg text-white font-semibold">
                      {item.yearSemester}
                    </div>

                    <div className="text-sm text-slate-300">
                      {item.batch}
                    </div>
                  </div>

                  <div className="absolute inset-3 border border-white/10 rounded-2xl pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-8">
        <Link
          to="/topperpage"
          className="inline-flex items-center gap-3 bg-indigo-950 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/20"
        >
          View All Achievements
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* SCROLL ANIMATION */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </section>
  );
};

export default ToppersSection;

