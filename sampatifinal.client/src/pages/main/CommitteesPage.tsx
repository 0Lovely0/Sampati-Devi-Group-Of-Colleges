import React, { useState } from "react";

type Member = {
  name: string;
  image: string;
};

type Committee = {
  name: string;
  members: Member[];
};

const committees: Committee[] = [
  {
    name: "Anti-Ragging Committee",
    members: [
      { name: "Dr. Chander Shekhar Sharma", image: "/Chander Shekhar Sahrma.png" },
      { name: "Mrs. Sunita Sharma", image: "/mam.png" },
      { name: "Dr. Neha", image: "/Principal.png" },
    ],
  },
  {
    name: "Disciplinary Committee",
    members: [
      { name: "Miss Kritika", image: "/Miss Kritika.png" },
      { name: "Triveni", image: "/Triveni.png" },
      { name: "Yeshika", image: "/Yeshika.png" },
      { name: "Simran", image: "/Simran.png" },
      { name: "Sonal", image: "/Sonal.png" },
      { name: "Harshlata", image: "/Harshlata.png" },
    ],
  },
  {
    name: "Grievance Redressal Committee",
    members: [
      { name: "Dr. Chander Shekhar Sharma", image: "/Chander Shekhar Sahrma.png" },
      { name: "Dr. Neha", image: "/Principal.png" },
    ],
  },
];

const CommitteesPage: React.FC = () => {
  const [selected, setSelected] = useState(committees[0].name);

  const activeCommittee = committees.find((c) => c.name === selected);

  return (
    <section className="w-full min-h-screen bg-white">

      {/* HEADER */}
      <div className="w-full bg-indigo-950 py-10 sm:py-14 text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          College Committees
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 mt-2">
          Select a committee to view its members
        </p>
      </div>

      {/* DROPDOWN */}
      <div className="w-full px-4 sm:px-6 lg:px-10 mt-6">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white text-sm px-3 py-2 border border-slate-300 rounded-md shadow-sm"
        >
          {committees.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* MEMBERS GRID */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

          {activeCommittee?.members.map((member, index) => (
            <div
              key={index}
              className="border border-slate-200 bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-32 sm:h-36 object-contain rounded-md"
              />

              <p className="text-[11px] sm:text-xs mt-2 text-center font-medium text-slate-700">
                {member.name}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default CommitteesPage;