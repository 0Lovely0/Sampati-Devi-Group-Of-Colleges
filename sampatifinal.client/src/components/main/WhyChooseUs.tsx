import React from "react";

const reasons = [
  {
    id: 1,
    title: "Expert Faculty",
    desc: "Learn from experienced professors and healthcare professionals with strong academic and clinical expertise.",
    icon: "🎓",
  },
  {
    id: 2,
    title: "Modern Infrastructure",
    desc: "Advanced laboratories and smart classrooms designed to enhance learning outcomes.",
    icon: "🔬",
  },
  {
    id: 3,
    title: "Placement Support",
    desc: "Dedicated career guidance and placement assistance with reputed healthcare institutions.",
    icon: "💼",
  },
  {
    id: 4,
    title: "Holistic Development",
    desc: "Academic excellence combined with sports, cultural activities, and personality development.",
    icon: "🌟",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-10 bg-slate-50 border-t border-slate-200">
      <div className="w-full mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-block border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-2xl md:text-3xl font-black text-slate-900">
            Why Choose Sampati Devi College?
          </h2>

          <div className="w-16 h-px bg-indigo-600 mx-auto mt-3"></div>

          <p className="mt-4 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We are committed to preparing future healthcare professionals
            through quality education, practical training, and a supportive
            academic environment.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-slate-200 bg-white">
          {reasons.map((item, index) => (
            <div
              key={item.id}
              className={`p-5 transition-all duration-300 hover:bg-indigo-950 group
              ${
                index !== reasons.length - 1
                  ? "border-b md:border-b lg:border-b-0 lg:border-r border-slate-200"
                  : ""
              }`}
            >
              <div className="w-12 h-12 border border-slate-200 bg-slate-50 flex items-center justify-center text-2xl mb-4 group-hover:bg-white/10 group-hover:border-white/20">
                {item.icon}
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-white transition-colors">
                {item.title}
              </h3>

              <p className="text-xs leading-relaxed text-slate-600 group-hover:text-slate-300 transition-colors">
                {item.desc}
              </p>

              <div className="mt-4 w-8 h-px bg-indigo-600 group-hover:bg-white"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;