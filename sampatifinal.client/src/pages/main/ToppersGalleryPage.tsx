import React, { useState } from 'react';

// Extended data set for the gallery
const allToppers = [
  { id: 1, name: "Anjali Sharma", rank: "Rank 1", year: "2025", image: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Rahul Verma", rank: "Rank 2", year: "2025", image: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Sneha Patel", rank: "Rank 3", year: "2025", image: "https://i.pravatar.cc/150?u=5" },
  { id: 4, name: "Priya Singh", rank: "Rank 1", year: "2024", image: "https://i.pravatar.cc/150?u=3" },
  { id: 5, name: "Vikram Mehta", rank: "Rank 2", year: "2024", image: "https://i.pravatar.cc/150?u=4" },
  { id: 6, name: "Amit Kumar", rank: "Rank 3", year: "2024", image: "https://i.pravatar.cc/150?u=6" },
];

const years = ["All", "2025", "2024"];

export const ToppersGalleryPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("All");

  const filteredToppers = selectedYear === "All" 
    ? allToppers 
    : allToppers.filter(t => t.year === selectedYear);

  return (
    <div className="max-w-7xl mx-auto p-6 py-16">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4">Academic Excellence</h1>
        <p className="text-xl text-slate-600">Celebrating the brilliance of our top-performing students over the years.</p>
      </header>

      {/* Filter Tabs */}
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

      {/* Toppers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredToppers.map((topper) => (
          <div key={topper.id} className="group bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative rounded-2xl overflow-hidden mb-4">
              <img src={topper.image} alt={topper.name} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
                {topper.rank}
              </div>
            </div>
            <h3 className="font-bold text-slate-900 text-lg">{topper.name}</h3>
            <p className="text-slate-500 text-sm">Batch of {topper.year}</p>
          </div>
        ))}
      </div>

      {filteredToppers.length === 0 && (
        <div className="text-center py-20 text-slate-400">No records found for this year.</div>
      )}
    </div>
  );
};