import React from 'react';

const directors = [
  {
    name: "Dr. Anjali Sharma",
    role: "Managing Director",
    quote: "Education is the most powerful weapon which you can use to change the world. At Sampati Devi, we nurture innovators.",
    image: "https://i.pravatar.cc/300?u=director1",
    credentials: "PhD in Nursing Education, 20+ Years Experience"
  },
  {
    name: "Dr. Rajesh Verma",
    role: "Academic Director",
    quote: "Our mission is to bridge the gap between theoretical knowledge and practical healthcare excellence.",
    image: "https://i.pravatar.cc/300?u=director2",
    credentials: "M.D. Healthcare Management, Former Hospital Admin"
  }
];

export const DirectorsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Directors of Sampati Devi</h2>
          <p className="text-slate-600 text-lg">Meet the visionaries guiding our college toward excellence.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {directors.map((director, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-8 items-center hover:border-indigo-200 transition-all">
              {/* Image */}
              <div className="flex-shrink-0">
                <img 
                  src={director.image} 
                  alt={director.name} 
                  className="w-40 h-40 rounded-2xl object-cover shadow-lg"
                />
              </div>

              {/* Info */}
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900">{director.name}</h3>
                <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-4">{director.role}</p>
                <p className="text-slate-600 italic mb-4">"{director.quote}"</p>
                <div className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full inline-block">
                  {director.credentials}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};