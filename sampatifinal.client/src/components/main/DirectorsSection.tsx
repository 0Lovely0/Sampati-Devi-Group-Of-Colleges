import { useState } from "react";
import { Quote } from "lucide-react";

const directors = [
  {
    name: "Dr. Chander Shekhar Sharma",
    role: "Chairman",
    image: "/D1.avif",
    quote: `
      Education is the foundation upon which the future of our nation is built.
      At Sampati Devi Group of Colleges, our commitment is to provide students
      with an environment that nurtures knowledge, innovation, discipline, and
      ethical values.
    `,
  },
  {
    name: "Mrs. Sunita Sharma",
    role: "Managing Director",
    image: "/D2.avif",
    quote: `
      Our vision is to create an educational ecosystem that promotes excellence,
      creativity, and lifelong learning. We ensure quality education with modern
      learning resources and strong ethical values.
    `,
  },
];

const DirectorCard = ({ director }: { director: (typeof directors)[0] }) => {
  const [expanded, setExpanded] = useState(false);

  const shortText =
    director.quote.replace(/\s+/g, " ").trim().slice(0, 140) + "...";

  return (
    <div className="border border-white/10 bg-white/5 backdrop-blur-md p-3 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-3">

        {/* IMAGE */}
        <div className="flex justify-center sm:justify-start">
          <img
            src={director.image}
            alt={director.name}
            className="h-48 w-36 object-cover border border-white/10"
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <h3 className="text-base font-bold text-white">
            {director.name}
          </h3>

          <p className="text-[11px] uppercase tracking-[0.2em] text-amber-400 font-semibold">
            {director.role}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <Quote size={14} className="text-amber-400" />
            <span className="text-xs text-slate-400">Message</span>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-300">
            {expanded ? director.quote : shortText}
          </p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-xs px-3 py-1 rounded-full border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-black transition"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DirectorMessage = () => {
  return (
    <section className="bg-indigo-950 py-10">
      <div className="w-full mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-6">
          <span className="text-[10px] px-3 py-1 rounded-full bg-white/10 text-amber-400 tracking-[0.25em] uppercase">
            Leadership
          </span>

          <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
            Directors Message
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Visionary leadership guiding the institution.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid lg:grid-cols-2 gap-4">
          {directors.map((director, index) => (
            <DirectorCard key={index} director={director} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DirectorMessage;