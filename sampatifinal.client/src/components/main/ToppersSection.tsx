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


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, ArrowRight } from "lucide-react";
import { getAllToppers, type Topper } from "../../services/toppersService";
import Loader from "../common/Loader";

const BASE_URL = "https://localhost:7197";

const ToppersSection: React.FC = () => {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH API
  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const data = await getAllToppers();
        setToppers(data || []);
      } catch (error) {
        console.error("Failed to fetch toppers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToppers();
  }, []);

  // SAFE IMAGE HANDLER
  const getImageUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${BASE_URL}/${url.replace(/^\//, "")}`;
  };

  // ✅ FILTER ONLY "MAIN" DEPARTMENT
  const mainToppers = toppers.filter((topper) =>
    topper.departments?.some(
      (d) => d.departmentName === "Main"
    )
  );

  const scrollData = [...mainToppers, ...mainToppers];

  return (
    <section className="bg-indigo-950 py-10 overflow-hidden border-b border-slate-500">
      <div className="w-full mx-auto px-4">

        {/* HEADER */}
        <div className="flex items-end justify-between mb-6">

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
              <Trophy size={12} />
              Excellence
            </span>

            <h2 className="mt-2 text-2xl font-black text-white">
              Our Toppers
            </h2>

            <p className="text-xs text-slate-300 mt-1">
              Celebrating academic brilliance
            </p>
          </div>

          <Link
            to="/topperpage"
            className="hidden md:flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300"
          >
            View All <ArrowRight size={14} />
          </Link>

        </div>

        {/* LOADING */}
          {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading toppers..." />
          </div>
        ) : (
          <div className="relative overflow-hidden">

            <div className="flex animate-scroll gap-3">

              {scrollData.map((topper, index) => (
                <div
                  key={`${topper.topperId}-${index}`}
                  className="w-[200px] flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10"
                >

                  {/* IMAGE */}
                  <div className="h-38 w-full overflow-hidden rounded-xl">
                    <img
                      src={getImageUrl(topper.imagePath)}
                      alt={topper.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* INFO */}
                  <div className="mt-3 text-center">
                    <h3 className="text-xs font-bold text-white">
                      {topper.name}
                    </h3>

                    {/* <p className="text-[10px] text-amber-400">
                      Rank {topper.rank}
                    </p>

                    <p className="text-[10px] text-slate-400">
                      {topper.collegeName || "College Student"}
                    </p> */}
                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* MOBILE BUTTON */}
        <div className="mt-6 md:hidden">
          <Link
            to="/topperpage"
            className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-2 text-xs font-semibold text-black"
          >
            View All Toppers <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ToppersSection;