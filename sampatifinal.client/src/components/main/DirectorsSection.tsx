// import React, { useState } from "react";
// import { Quote } from "lucide-react";
// import directorImg1 from "../../assets/D1.jpg";
// import directorImg2 from "../../assets/D2.jpg";
// import principalImg from "../../assets/principal.jpg";

// const leaders = [
//   {
//     name: "Dr. Chander Shekhar Sharma",
//     role: "Chairman",
//     image: directorImg1,
//     quote: "Education is the foundation upon which the future of our nation is built. At Sampati Devi Group of Colleges, our commitment is to provide students with an environment that nurtures knowledge, innovation, discipline, and ethical values.",
//   },
//   {
//     name: "Mrs. Sunita Sharma",
//     role: "Managing Director",
//     image: directorImg2,
//     quote: "Our vision is to create an educational ecosystem that promotes excellence, creativity, and lifelong learning. We ensure quality education with modern learning resources and strong ethical values.",
//   },
//   {
//     name: "Principal Name", // Replace with actual name
//     role: "Principal",
//     image: principalImg,
//     quote: "Welcome to Sampati Devi Group of Colleges. Our mission is to develop skilled, ethical, and responsible professionals. We focus on academic excellence combined with real-world exposure for student success, empowering students with confidence and leadership skills.",
//   },
// ];

// const LeaderCard = ({ leader }: { leader: (typeof leaders)[0] }) => {
//   const [expanded, setExpanded] = useState(false);
//   const shortText = leader.quote.slice(0, 120) + "...";

//   return (
//     <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-amber-500/30 hover:bg-slate-900">
//       <div className="flex flex-col sm:flex-row gap-6">
//         <div className="shrink-0 flex justify-center sm:justify-start">
//           <img
//             src={leader.image}
//             alt={leader.name}
//             className="h-32 w-28 object-cover rounded-lg border border-slate-800 shadow-xl"
//           />
//         </div>
//         <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
//           <h3 className="text-base font-bold text-white">{leader.name}</h3>
//           <p className="text-[9px] uppercase tracking-[0.2em] text-amber-500 font-bold mt-1">
//             {leader.role}
//           </p>
//           <div className="mt-4 flex items-start gap-2 text-slate-400">
//             <Quote className="shrink-0 text-amber-500/40" size={14} />
//             <p className="text-[11px] leading-relaxed italic">
//               {expanded ? leader.quote : shortText}
//             </p>
//           </div>
//           <button
//             onClick={() => setExpanded(!expanded)}
//             className="mt-4 w-fit mx-auto sm:mx-0 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-700 text-slate-400 hover:border-amber-500/50 hover:text-amber-500 transition-all"
//           >
//             {expanded ? "Read Less" : "Read Full Message"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LeadershipPage: React.FC = () => {
//   return (
//     <section className="bg-indigo-950 py-16">
//       <div className="w-full mx-auto px-4">
//         {/* HEADER */}
//         <div className="text-center mb-12">
//           <span className="text-[9px] font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 tracking-[0.25em] uppercase border border-amber-500/10">
//             Leadership
//           </span>
//           <h2 className="text-3xl font-black text-white mt-4">Message from our Leaders</h2>
//           <div className="w-16 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
//         </div>

//         {/* CARDS GRID */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           {leaders.map((leader, index) => (
//             <LeaderCard key={index} leader={leader} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LeadershipPage;


import React, { useState } from "react";
import { Quote } from "lucide-react";
import directorImg1 from "../../assets/D1.jpg";
import directorImg2 from "../../assets/D2.jpg";
import principalImg from "../../assets/principal.jpg";

const leaders = [
  {
    name: "Dr. Chander Shekhar Sharma",
    role: "Chairman",
    image: directorImg1,
    quote:
      "Education is the foundation upon which the future of our nation is built. At Sampati Devi Group of Colleges, our commitment is to provide students with an environment that nurtures knowledge, innovation, discipline, and ethical values.",
  },
  {
    name: "Mrs. Sunita Sharma",
    role: "Managing Director",
    image: directorImg2,
    quote:
      "Our vision is to create an educational ecosystem that promotes excellence, creativity, and lifelong learning. We ensure quality education with modern learning resources and strong ethical values.",
  },
  {
    name: "Principal Name",
    role: "Principal",
    image: principalImg,
    quote:
      "Welcome to Sampati Devi Group of Colleges. Our mission is to develop skilled, ethical, and responsible professionals. We focus on academic excellence combined with real-world exposure for student success, empowering students with confidence and leadership skills.",
  },
];

const LeaderCard = ({ leader }: { leader: (typeof leaders)[0] }) => {
  const [expanded, setExpanded] = useState(false);

  const shortText =
    leader.quote.length > 140
      ? leader.quote.slice(0, 140) + "..."
      : leader.quote;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 min-h-[450px] transition-all duration-300 hover:border-amber-500/40 hover:bg-slate-900 hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex flex-col items-center text-center h-full">
        {/* Image */}
        <img
          src={leader.image}
          alt={leader.name}
          className="h-44 w-36 object-cover rounded-2xl border border-slate-700 shadow-xl mb-6"
        />

        {/* Name */}
        <h3 className="text-xl font-bold text-white">
          {leader.name}
        </h3>

        {/* Role */}
        <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-bold mt-2">
          {leader.role}
        </p>

        {/* Quote */}
        <div className="mt-6 flex items-start gap-3 text-slate-300">
          <Quote
            className="shrink-0 text-amber-500/60 mt-1"
            size={20}
          />
          <p className="text-sm leading-7 italic text-left">
            {expanded ? leader.quote : shortText}
          </p>
        </div>

        {/* Button */}
        <button
  onClick={() => setExpanded(!expanded)}
  className="mx-auto mt-auto flex items-center justify-center text-center text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-slate-700 text-slate-300 hover:border-amber-500 hover:text-amber-500 transition-all"
>
  {expanded ? "Read Less" : "Read Full Message"}
</button>
      </div>
    </div>
  );
};

const LeadershipPage: React.FC = () => {
  return (
    <section className="bg-indigo-950 py-24">
      <div className="w-full mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 tracking-[0.25em] uppercase border border-amber-500/20">
            Leadership
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-white mt-6">
            Message from our Leaders
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-slate-400 text-lg leading-relaxed">
            Meet the visionaries guiding Sampati Devi Group of Colleges with
            dedication, integrity, and a commitment to academic excellence.
          </p>

          <div className="w-24 h-1.5 bg-amber-500 mx-auto mt-8 rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <LeaderCard key={index} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipPage;