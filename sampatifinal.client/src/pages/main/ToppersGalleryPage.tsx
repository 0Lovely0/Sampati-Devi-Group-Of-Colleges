// import React, { useState } from 'react';

// // Extended data set for the gallery
// const allToppers = [
//   { id: 1, name: "Anjali Sharma", rank: "Rank 1", year: "2025", image: "https://i.pravatar.cc/150?u=1" },
//   { id: 2, name: "Rahul Verma", rank: "Rank 2", year: "2025", image: "https://i.pravatar.cc/150?u=2" },
//   { id: 3, name: "Sneha Patel", rank: "Rank 3", year: "2025", image: "https://i.pravatar.cc/150?u=5" },
//   { id: 4, name: "Priya Singh", rank: "Rank 1", year: "2024", image: "https://i.pravatar.cc/150?u=3" },
//   { id: 5, name: "Vikram Mehta", rank: "Rank 2", year: "2024", image: "https://i.pravatar.cc/150?u=4" },
//   { id: 6, name: "Amit Kumar", rank: "Rank 3", year: "2024", image: "https://i.pravatar.cc/150?u=6" },
// ];

// const years = ["All", "2025", "2024"];

// export const ToppersGalleryPage: React.FC = () => {
//   const [selectedYear, setSelectedYear] = useState("All");

//   const filteredToppers = selectedYear === "All"
//     ? allToppers
//     : allToppers.filter(t => t.year === selectedYear);

//   return (
//     <div className="w-full mx-auto p-6 py-16">
//       {/* Header */}
//       <header className="text-center mb-16">
//         <h1 className="text-5xl font-extrabold text-slate-900 mb-4">Academic Excellence</h1>
//         <p className="text-xl text-slate-600">Celebrating the brilliance of our top-performing students over the years.</p>
//       </header>

//       {/* Filter Tabs */}
//       <div className="flex justify-center gap-4 mb-12">
//         {years.map((year) => (
//           <button
//             key={year}
//             onClick={() => setSelectedYear(year)}
//             className={`px-8 py-3 rounded-full font-bold transition-all ${
//               selectedYear === year
//                 ? "bg-indigo-600 text-white shadow-lg"
//                 : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
//             }`}
//           >
//             {year === "All" ? "All Batches" : `Batch ${year}`}
//           </button>
//         ))}
//       </div>

//       {/* Toppers Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {filteredToppers.map((topper) => (
//           <div key={topper.id} className="group bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
//             <div className="relative rounded-2xl overflow-hidden mb-4">
//               <img src={topper.image} alt={topper.name} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" />
//               <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
//                 {topper.rank}
//               </div>
//             </div>
//             <h3 className="font-bold text-slate-900 text-lg">{topper.name}</h3>
//             <p className="text-slate-500 text-sm">Batch of {topper.year}</p>
//           </div>
//         ))}
//       </div>

//       {filteredToppers.length === 0 && (
//         <div className="text-center py-20 text-slate-400">No records found for this year.</div>
//       )}
//     </div>
//   );
// };

// import React, { useEffect, useState } from "react";
// import { getAllToppers, type Topper } from "../../services/toppersService";
// import Loader from "../../components/common/Loader";

// const BASE_URL =
//   window.location.hostname === "localhost"
//     ? "https://localhost:7197"
//     : "https://sampatigroup.stdruraltech.org";

// export const ToppersGalleryPage: React.FC = () => {
//   const [toppers, setToppers] = useState<Topper[]>([]);
//   const [selectedTopper, setSelectedTopper] = useState<Topper | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
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

//     fetchData();
//   }, []);

//   const getImageUrl = (path?: string) => {
//     if (!path) return "/placeholder.jpg";
//     return `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
//   };

//   const mainOnlyToppers = toppers.filter((t) =>
//     t.departments?.some(
//       (d) => d.departmentName?.trim().toLowerCase() === "main"
//     )
//   );

//   return (
//     <div className="bg-slate-50 min-h-screen">

//       {/* HEADER */}
//       <div className="bg-indigo-950 py-8 px-4 text-center">
//         <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
//           Toppers Gallery
//         </h1>
//         <p className="text-sm text-slate-300">
//           Explore academic achievers
//         </p>
//       </div>

//       <div className="w-full mx-auto px-2 py-2">

//         {/* LOADING */}
//         {loading ? (
//           <div className="h-64 flex items-center justify-center">
//             <Loader text="Loading toppers..." />
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">

//             {mainOnlyToppers.map((topper) => (
//               <div
//                 key={topper.topperId}
//                 onClick={() => setSelectedTopper(topper)}
//                 className="group relative overflow-hidden border border-slate-200 bg-white shadow-sm cursor-pointer rounded-xl"
//               >

//                 {/* IMAGE */}
//                 <div className="h-46">
//                   <img
//                     src={getImageUrl(topper.imagePath)}
//                     alt={topper.name}
//                     className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
//                   />
//                 </div>

//                 {/* 🔥 ALWAYS VISIBLE NAME (BELOW IMAGE) */}
//                 <div className="p-2 text-center border-t border-slate-100">
//                   <h3 className="text-sm font-semibold text-slate-900 truncate">
//                     {topper.name}
//                   </h3>
//                 </div>

//                 {/* 🔥 HOVER OVERLAY (ALL DETAILS) */}
//                 <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">

//                   <div className="text-white text-sm font-bold mb-1">
//                     {topper.name}
//                   </div>

//                   <div className="text-[11px] text-slate-200 space-y-1">
//                     <p>📘 Batch: {topper.batch}</p>
//                     <p>🎓 Year: {topper.yearSemester}</p>
//                     <p>🏆 College Rank: {topper.collegeRank}</p>
//                     <p>🌍 University Rank: {topper.universityRank}</p>
//                     <p>📊 Percentile: {topper.percentile}%</p>
//                   </div>

//                   <div className="mt-2 text-[10px] text-amber-300">
//                     Click to view full
//                   </div>

//                 </div>

//               </div>
//             ))}

//           </div>
//         )}
//       </div>

//       {/* MODAL */}
//       {selectedTopper && (
//         <div
//           className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//           onClick={() => setSelectedTopper(null)}
//         >
//           <div
//             className="max-w-4xl w-full bg-white"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={getImageUrl(selectedTopper.imagePath)}
//               className="w-full max-h-[75vh] object-contain"
//             />

//             <div className="border-t p-4 text-center space-y-1">
//               <p className="font-semibold text-slate-900">
//                 {selectedTopper.name}
//               </p>

//               <p className="text-xs text-slate-500">
//                 Batch: {selectedTopper.batch} | Year: {selectedTopper.yearSemester}
//               </p>

//               <p className="text-xs text-slate-500">
//                 College Rank: {selectedTopper.collegeRank} | University Rank:{" "}
//                 {selectedTopper.universityRank}
//               </p>

//               <p className="text-xs text-slate-500">
//                 Percentile: {selectedTopper.percentile}%
//               </p>
//             </div>

//             <button
//               onClick={() => setSelectedTopper(null)}
//               className="w-full border-t py-2 text-sm hover:bg-slate-100"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



import React, { useEffect, useState } from "react";
import { getAllToppers, type Topper } from "../../services/toppersService";
import Loader from "../../components/common/Loader";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

export const ToppersGalleryPage: React.FC = () => {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [selected, setSelected] = useState<Topper | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const getImageUrl = (path?: string) =>
    !path
      ? "/placeholder.jpg"
      : `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const mainOnly = toppers.filter((t) =>
    t.departments?.some(
      (d) => d.departmentName?.trim().toLowerCase() === "main"
    )
  );

  return (
    <div className="min-h-screen bg-stone-50 pb-20">

      {/* HEADER */}
      <div className="bg-indigo-950 py-16 px-4 text-center border-b border-slate-800">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
          Toppers Gallery
        </h1>
        <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />
        <p className="text-slate-400 mt-4 max-w-xl mx-auto text-xs">
          Celebrating our brightest academic achievers.
        </p>
      </div>

      {/* GRID (SMALL + COMPACT) */}
      <div className="w-full mx-auto px-3 -mt-10">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading profiles..." />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {mainOnly.map((t) => (
              <div
                key={t.topperId}
                onClick={() => setSelected(t)}
                className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {/* IMAGE (smaller height) */}
                <div className=" h-44 overflow-hidden">
                  <img
                    src={getImageUrl(t.imagePath)}
                    alt={t.name}
                    className="w-full h-full object-contain transition duration-700 group-hover:scale-105"
                  />
                </div>

                {/* TEXT (compact) */}
                <div className="p-3 text-center">
                  <h3 className="text-xs font-black text-slate-950 truncate">
                    {t.name}
                  </h3>

                  <p className="text-[9px] text-amber-600 font-bold uppercase tracking-widest mt-1">
                    Rank: {t.collegeRank}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL (COMPACT) */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-indigo-950/95 p-3 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md px-3 py-1 text-[10px] font-black text-white rounded-full uppercase tracking-widest transition"
            >
              Close
            </button>

            <img
              src={getImageUrl(selected.imagePath)}
              alt={selected.name}
              className="w-full h-64 object-contain bg-stone-100"
            />

            <div className="p-5">
              <h2 className="text-xl font-black text-slate-950">
                {selected.name}
              </h2>

              <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
                <div>
                  <p className="text-[9px] text-stone-500 font-bold uppercase">
                    Batch
                  </p>
                  <p className="font-bold text-slate-900">
                    {selected.batch}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-stone-500 font-bold uppercase">
                    Year/Sem
                  </p>
                  <p className="font-bold text-slate-900">
                    {selected.yearSemester}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-stone-500 font-bold uppercase">
                    Rank
                  </p>
                  <p className="font-bold text-slate-900">
                    {selected.collegeRank}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-stone-500 font-bold uppercase">
                    Percentile
                  </p>
                  <p className="font-bold text-slate-900">
                    {selected.percentile}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};