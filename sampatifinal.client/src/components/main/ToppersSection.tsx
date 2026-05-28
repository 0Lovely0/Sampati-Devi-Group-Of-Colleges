import React from 'react';

const toppers = [
  { id: 1, name: "Anjali Sharma", rank: "Rank 1", year: "2025", image: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Rahul Verma", rank: "Rank 2", year: "2025", image: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Priya Singh", rank: "Rank 3", year: "2024", image: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Vikram Mehta", rank: "Rank 4", year: "2024", image: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "Sneha Patel", rank: "Rank 5", year: "2025", image: "https://i.pravatar.cc/150?u=5" },
];

const ToppersSection: React.FC = () => {
  return (
    <section className="py-10 bg-white overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900">Our Toppers</h2>
        <p className="text-slate-500 mt-2">Celebrating excellence and dedication of our students.</p>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex animate-scroll gap-8 px-8">
          {/* Duplicate array for seamless infinite scroll */}
          {[...toppers, ...toppers].map((topper, index) => (
            <div 
              key={index} 
              className="group relative w-64 flex-shrink-0 cursor-pointer"
            >
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 transition-all duration-300 group-hover:shadow-indigo-200 group-hover:scale-105">
                <img src={topper.image} alt={topper.name} className="w-full h-80 object-cover" />
                
                {/* Overlay Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <h3 className="font-bold text-lg">{topper.name}</h3>
                  <p className="text-indigo-300 font-semibold">{topper.rank}</p>
                  <p className="text-xs opacity-75">Batch of {topper.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToppersSection;