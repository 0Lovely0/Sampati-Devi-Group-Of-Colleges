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
//     <div className="max-w-7xl mx-auto p-6 py-16">
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

import React, { useEffect, useState } from "react";
import { getAllToppers, type Topper } from "../../services/toppersService";
import Loader from "../../components/common/Loader"

const BASE_URL = "https://localhost:7197";

const years = ["All", "2025", "2024"];

export const ToppersGalleryPage: React.FC = () => {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [loading, setLoading] = useState(true);

  // FETCH API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllToppers();
        setToppers(data || []);
      } catch (error) {
        console.error("Failed to fetch toppers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // SAFE IMAGE HANDLER
  const getImageUrl = (url?: string) => {
    if (!url) return "";

    if (url.startsWith("http")) return url;

    return `${BASE_URL}/${url.replace(/^\//, "")}`;
  };

  // ✅ FILTER ONLY MAIN DEPARTMENT
  const mainToppers = toppers.filter((t) =>
    t.departments?.some((d) => d.departmentName === "Main"),
  );

  // YEAR FILTER (still works)
  const filteredToppers =
    selectedYear === "All"
      ? mainToppers
      : mainToppers.filter(
          (t) =>
            t.collegeName?.includes(selectedYear) ||
            t.schoolDetails?.includes(selectedYear),
        );

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <header className="bg-indigo-950 text-white py-6 px-4 md:px-8 mb-10">
        <div className="text-center space-y-1">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            Academic Excellence
          </h1>

          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
            Celebrating the brilliance of our top-performing students
          </p>
        </div>
      </header>

      {/* Filter Tabs  */}
      <div className="flex justify-center gap-4 mb-12">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              selectedYear === year
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {year === "All" ? "All Batches" : `Batch ${year}`}
          </button>
        ))}
      </div>

      {/* LOADING */}
         {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading facilities..." />
          </div>
        ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
            {filteredToppers.map((topper) => (
              <div
                key={topper.topperId}
                className="group bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="relative rounded-xl overflow-hidden mb-2">
                  <img
                    src={getImageUrl(topper.imagePath)}
                    alt={topper.name}
                    className="w-full aspect-square object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[10px] font-bold text-indigo-700 shadow-sm">
                    Rank {topper.rank}
                  </div>
                </div>

                {/* INFO */}
                <h3 className="font-semibold text-slate-900 text-sm">
                  {topper.name}
                </h3>

                <p className="text-slate-500 text-xs">
                  {topper.collegeName || "Top Performer"}
                </p>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredToppers.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              No records found for this year.
            </div>
          )}
        </>
      )}
    </div>
  );
};
