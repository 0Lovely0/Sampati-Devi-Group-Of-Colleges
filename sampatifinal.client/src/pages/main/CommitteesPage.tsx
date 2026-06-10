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
  {
    name: "Library Committee",
    members: [
      { name: "Miss Varuni", image: "/Miss Varuni.png" },
      { name: "Hemlata", image: "/Hemlata.png" },
      { name: "Lata Sharma", image: "/Lata Sharma.png" },
      { name: "Poonam", image: "/Poonam.png" },
      { name: "Geetanjali", image: "/Geetanjali.png" },
    ],
  },
  {
    name: "Cultural Committee",
    members: [
      { name: "Miss Aanchal", image: "/Miss Aanchal.png" },
      { name: "Vartika", image: "/Vertika.png" },
      { name: "Renu", image: "/Renu.png" },
      { name: "Riya", image: "/Riya.png" },
      { name: "Riya", image: "/Riya 2.png" },
    ],
  },
  {
    name: "SNA Committee",
    members: [
      { name: "Miss Himani", image: "/Miss Himani.png" },
      { name: "Sanjana Thakur", image: "/Sanjana Thakur.png" },
      { name: "Neha", image: "/Neha.png" },
      { name: "Shrutkritika", image: "/Shrutkritika.png" },
      { name: "Tanuja", image: "/Tanuja.png" },
    ],
  },
  {
    name: "Health And Hygiene Committee",
    members: [
      { name: "Miss Kritika", image: "/Miss Kritika.png" },
      { name: "Banita", image: "/Banita.png" },
      { name: "Rashmi", image: "/Rashmi.png" },
      { name: "Tanisha", image: "/Tanisha.png" },
      { name: "Palak", image: "/Palak.png" },
    ],
  },
  {
    name: "Examination Committee",
    members: [
      { name: "Dr. Neha", image: "/Principal.png" },
      { name: "Ms. Pallavi", image: "/Ms Pallavi.png" },
    ],
  },
  {
    name: "Placement And Career Guidance Committee",
    members: [
      { name: "Dr. Chander Shekhar Sharma", image: "/Chander Shekhar Sahrma.png" },
    ],
  },
  {
    name: "Hostel Committee",
    members: [
      { name: "Miss Anjali", image: "/Miss Anjali.png" },
      { name: "Sapna", image: "/Sapna.png" },
      { name: "Miss Pooja", image: "/Miss Pooja.png" },
      { name: "Poonam", image: "/Poonam 2.png" },
      { name: "Komal", image: "/Komal.png" },
      { name: "Pooja", image: "/Pooja.png" },
      { name: "Sonika", image: "/Sonika.png" },
    ],
  },
];

const CommitteesPage: React.FC = () => {
  const [selected, setSelected] = useState(committees[0].name);

  const activeCommittee = committees.find((c) => c.name === selected);

  return (
    <section className="min-h-screen bg-white ">

      {/* HEADER */}
      <div className="w-full mx-auto mb-6 bg-indigo-950 py-10">
        <h1 className="text-4xl font-bold text-center text-white">College Committees</h1>
        <p className="text-lg text-slate-300 mt-1 text-center">
          Select a committee to view its members
        </p>
      </div>

      {/* SELECT DROPDOWN */}
      <div className="w-full mx-auto mb-8 px-10">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full bg-white text-black text-xs px-3 py-2 border border-slate-500"
        >
          {committees.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* MEMBERS GRID */}
      <div className="w-full mx-auto grid grid-cols-3 md:grid-cols-5 gap-4 px-10">

        {activeCommittee?.members.map((member, index) => (
          <div
            key={index}
            className="border border-slate-500 bg-white/5 p-2"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-58 object-cover"
            />
            <p className="text-[11px] mt-2 ">
              {member.name}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default CommitteesPage;