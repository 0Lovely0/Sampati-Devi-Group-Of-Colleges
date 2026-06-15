// import React, { useState } from "react";

// type Member = {
//   name: string;
//   image: string;
// };

// type Committee = {
//   name: string;
//   members: Member[];
// };

// const committees: Committee[] = [
//   {
//     name: "Anti-Ragging Committee",
//     members: [
//       { name: "Dr. Chander Shekhar Sharma", image: "/Chander Shekhar Sahrma.png" },
//       { name: "Mrs. Sunita Sharma", image: "/mam.png" },
//       { name: "Dr. Neha", image: "/Principal.png" },
//     ],
//   },
//   {
//     name: "Disciplinary Committee",
//     members: [
//       { name: "Miss Kritika", image: "/Miss Kritika.png" },
//       { name: "Triveni", image: "/Triveni.png" },
//       { name: "Yeshika", image: "/Yeshika.png" },
//       { name: "Simran", image: "/Simran.png" },
//       { name: "Sonal", image: "/Sonal.png" },
//       { name: "Harshlata", image: "/Harshlata.png" },
//     ],
//   },
//   {
//     name: "Grievance Redressal Committee",
//     members: [
//       { name: "Dr. Chander Shekhar Sharma", image: "/Chander Shekhar Sahrma.png" },
//       { name: "Dr. Neha", image: "/Principal.png" },
//     ],
//   },
// ];

// const CommitteesPage: React.FC = () => {
//   const [selected, setSelected] = useState(committees[0].name);

//   const activeCommittee = committees.find((c) => c.name === selected);

//   return (
//     <section className="w-full min-h-screen bg-white">

//       {/* HEADER */}
//       <div className="w-full bg-indigo-950 py-10 sm:py-14 text-center px-4">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
//           College Committees
//         </h1>

//         <p className="text-sm sm:text-lg text-slate-300 mt-2">
//           Select a committee to view its members
//         </p>
//       </div>

//       {/* DROPDOWN */}
//       <div className="w-full px-4 sm:px-6 lg:px-10 mt-6">
//         <select
//           value={selected}
//           onChange={(e) => setSelected(e.target.value)}
//           className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white text-sm px-3 py-2 border border-slate-300 rounded-md shadow-sm"
//         >
//           {committees.map((c) => (
//             <option key={c.name} value={c.name}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* MEMBERS GRID */}
//       <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

//           {activeCommittee?.members.map((member, index) => (
//             <div
//               key={index}
//               className="border border-slate-200 bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition"
//             >
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-full h-32 sm:h-36 object-contain rounded-md"
//               />

//               <p className="text-[11px] sm:text-xs mt-2 text-center font-medium text-slate-700">
//                 {member.name}
//               </p>
//             </div>
//           ))}

//         </div>
//       </div>
//     </section>
//   );
// };

// export default CommitteesPage;


// import React, { useEffect, useState } from "react";
// import {
//   getCommitteeDropdown,
//   getAllCommitteeMembers,
// } from "../../services/committeeService";

// type DropdownDto = {
//   value: number;
//   label: string;
// };

// type Member = {
//   name: string;
//   position: string;
//   image: string;
// };

// const API_BASE_URL =
//   window.location.hostname === "localhost"
//     ? "https://localhost:7197"
//     : "https://sampatigroup.stdruraltech.org";

// const getImageUrl = (path?: string) => {
//   if (!path) return "/placeholder.png";
//   if (path.startsWith("http")) return path;
//   return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
// };

// const CommitteesPage: React.FC = () => {
//   const [committees, setCommittees] = useState<DropdownDto[]>([]);
//   const [selectedId, setSelectedId] = useState<number | null>(null);
//   const [members, setMembers] = useState<Member[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   useEffect(() => {
//     const fetchDropdown = async () => {
//       try {
//         const res = await getCommitteeDropdown();
//         setCommittees(res);

//         if (res.length > 0) setSelectedId(res[0].value);
//       } finally {
//         setInitialLoading(false);
//       }
//     };

//     fetchDropdown();
//   }, []);

//   useEffect(() => {
//     const fetchMembers = async () => {
//       if (!selectedId) return;

//       try {
//         setLoading(true);

//         const res = await getAllCommitteeMembers();

//         const filtered = res
//           .filter((x) => x.committeeMasterId === selectedId)
//           .map((x) => ({
//             name: x.memberName,
//             position: x.positionName,
//             image: x.memberImage,
//           }));

//         setMembers(filtered);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMembers();
//   }, [selectedId]);

//   if (initialLoading) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
//         <div className="animate-pulse text-indigo-600 text-lg font-medium">
//           Loading Committees...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">

//       {/* HEADER */}
//       <div className="relative overflow-hidden bg-indigo-950 text-white py-14 text-center shadow-xl">
//         <h1 className="text-4xl font-extrabold tracking-wide">
//           College Committees
//         </h1>
//         <p className="text-indigo-200 mt-2 text-sm">
//           Explore our academic & administrative committees
//         </p>

//         <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
//         <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
//       </div>

//       {/* DROPDOWN */}
//       <div className="flex justify-center mt-8 px-4">
//         <div className="relative w-full sm:w-1/2 md:w-1/3">
//           <select
//             value={selectedId ?? ""}
//             onChange={(e) => setSelectedId(Number(e.target.value))}
//             className="w-full appearance-none px-4 py-3 rounded-xl border border-indigo-200 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
//           >
//             {committees.map((c) => (
//               <option key={c.value} value={c.value}>
//                 {c.label}
//               </option>
//             ))}
//           </select>

//           {/* dropdown arrow */}
//           <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
//             ▼
//           </div>
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="px-6 py-10 w-full mx-auto">
//         {loading ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="animate-pulse bg-white rounded-2xl p-4 shadow"
//               >
//                 <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
//                 <div className="h-3 bg-gray-200 mt-4 rounded w-3/4 mx-auto"></div>
//                 <div className="h-2 bg-gray-200 mt-2 rounded w-1/2 mx-auto"></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
//             {members.map((m, i) => (
//               <div
//                 key={i}
//                 className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
//               >
//                 {/* IMAGE */}
//                 <div className="flex justify-center">
//                   <img
//                     src={getImageUrl(m.image)}
//                     alt={m.name}
//                     className="w-24 h-34 object-cover border-4 border-indigo-100 group-hover:scale-105 transition"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = "/placeholder.png";
//                     }}
//                   />
//                 </div>

//                 {/* NAME */}
//                 <h3 className="text-center mt-4 font-semibold text-gray-800">
//                   {m.name}
//                 </h3>

//                 {/* POSITION BADGE */}
//                 <div className="flex justify-center mt-2">
//                   <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
//                     {m.position}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CommitteesPage;


import React, { useEffect, useState } from "react";
import { getCommitteeDropdown, getAllCommitteeMembers } from "../../services/committeeService";
import Loader from "../../components/common/Loader";

type DropdownDto = { value: number; label: string; };
type Member = { name: string; position: string; image: string; };

const API_BASE_URL = window.location.hostname === "localhost" ? "https://localhost:7197" : "https://sampatigroup.stdruraltech.org";
const getImageUrl = (path?: string) => (!path ? "/placeholder.jpg" : `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`);

const CommitteesPage: React.FC = () => {
  const [committees, setCommittees] = useState<DropdownDto[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchDropdown = async () => {
      try {
        const res = await getCommitteeDropdown();
        setCommittees(res);
        if (res.length > 0) setSelectedId(res[0].value);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchDropdown();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedId) return;
      try {
        setLoading(true);
        const res = await getAllCommitteeMembers();
        const filtered = res.filter((x) => x.committeeMasterId === selectedId).map((x) => ({
          name: x.memberName,
          position: x.positionName,
          image: x.memberImage,
        }));
        setMembers(filtered);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [selectedId]);

  if (initialLoading) return <div className="h-screen flex items-center justify-center bg-stone-50"><Loader text="Loading Committees..." /></div>;

  return (
    <section className="bg-stone-50 pb-20">
      {/* HEADER */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-black text-white">College Committees</h1>
        <div className="h-1 w-20 bg-amber-500 mt-6 mx-auto rounded-full" />
        <p className="text-slate-400 mt-6 text-sm">Explore our academic & administrative leadership teams.</p>
      </div>

      <div className="w-full mx-auto px-4 -mt-12">
        {/* DROPDOWN */}
        <div className="flex justify-center mb-12">
          <select
            value={selectedId ?? ""}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            className="w-full sm:w-80 bg-white border border-stone-200 px-6 py-4 rounded-full shadow-lg text-sm font-black text-slate-950 focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
          >
            {committees.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader text="Updating Members..." /></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {members.map((m, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm transition hover:shadow-xl hover:-translate-y-2 group text-center">
                <img
                  src={getImageUrl(m.image)}
                  alt={m.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-stone-100 mb-4 group-hover:border-amber-500 transition"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
                />
                <h3 className="text-sm font-black text-slate-950 mb-1">{m.name}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{m.position}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommitteesPage;