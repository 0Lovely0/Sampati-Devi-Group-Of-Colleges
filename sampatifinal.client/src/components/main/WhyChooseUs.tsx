import React from 'react';

const reasons = [
  { 
    id: 1, 
    title: "Expert Faculty", 
    desc: "Learn from industry-leading professors and healthcare professionals with decades of experience.",
    icon: "🎓" 
  },
  { 
    id: 2, 
    title: "Modern Infrastructure", 
    desc: "State-of-the-art laboratories and digital classrooms designed for immersive learning.",
    icon: "🔬" 
  },
  { 
    id: 3, 
    title: "Placement Support", 
    desc: "Robust career counseling and partnerships with top-tier hospitals and institutions.",
    icon: "💼" 
  },
  { 
    id: 4, 
    title: "Holistic Development", 
    desc: "We focus on extracurriculars, sports, and soft-skills training alongside academics.",
    icon: "🌟" 
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Why Choose Sampati Devi College?</h2>
          <p className="text-slate-600 text-lg max-w-2xl">
            We are committed to excellence, shaping the future of healthcare professionals through innovation, integrity, and practical experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item) => (
            <div 
              key={item.id} 
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 group"
            >
              <div className="text-4xl mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;