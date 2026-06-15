import React from "react";
import { Link } from "react-router-dom";

interface Program {
  title: string;
  slug: string;
  duration: string;
  level: string;
  description: string;
  subjects: string[];
}


const programs: Program[] = [
  {
    title: "B.Sc. Nursing",
    slug: "bsc-nursing",
    duration: "4 Years",
    level: "Undergraduate",
    description:
      "Prepare for professional nursing practice in diverse healthcare settings through rigorous clinical training.",
    subjects: ["Anatomy", "Physiology", "Microbiology", "Pharmacology"],
  },
  {
    title: "Post Basic B.Sc. Nursing",
    slug: "post-basic-bsc-nursing",
    duration: "2 Years",
    level: "Undergraduate",
    description:
      "An advanced program for registered nurses to enhance their clinical skills and theoretical knowledge.",
    subjects: ["Maternal Nursing", "Research", "Education", "Administration"],
  },
  {
    title: "Veterinary Pharmacist",
    slug: "veterinary-pharmacist",
    duration: "2 Years",
    level: "Diploma",
    description:
      "Focused on animal health care, drug administration, and supporting veterinary medical services.",
    subjects: ["Animal Anatomy", "Pharmacology", "Drug Dispensing", "Pathology"],
  },
  {
    title: "Pharmacy",
    slug: "pharmacy",
    duration: "2 Years",
    level: "Diploma",
    description:
      "Training in pharmaceutical sciences, drug composition, and patient safety protocols.",
    subjects: ["Pharmaceutics", "Biochemistry", "Hospital Pharmacy", "Jurisprudence"],
  },
  {
    title: "Multipurpose Health Worker",
    slug: "multipurpose-health-worker",
    duration: "2 Years",
    level: "Diploma",
    description:
      "Equipping students with essential skills for community health service, disease prevention, and rural care.",
    subjects: ["Primary Health", "Child Health", "Immunization", "First Aid"],
  },
];

export const ExploreProgramsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 pb-14">
      {/* HEADER */}
      <div className="bg-indigo-950 py-12 px-4 text-center border-b border-slate-800">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
          Our Academic Programs
        </h1>

        <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />

        <p className="text-slate-400 mt-4 text-xs max-w-xl mx-auto leading-relaxed">
          At Sampati Devi Nursing College, we offer rigorous, high-quality
          training designed to shape the future of healthcare.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-4 -mt-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => (
            <Link
              key={program.slug}
              to={`/programs/${program.slug}`} 
              className="group bg-white p-5 rounded-2xl border border-stone-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-slate-900 flex flex-col"
            >
              <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-1 w-fit rounded-md">
                {program.level}
              </span>

              <h3 className="text-lg font-black text-slate-950 mt-3 group-hover:text-amber-600 transition">
                {program.title}
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                {program.duration}
              </p>

              <p className="text-sm text-slate-600 mt-3 flex-grow leading-relaxed">
                {program.description}
              </p>

              <div className="mt-5 border-t border-stone-200 pt-4">
                <h4 className="text-[10px] font-black text-slate-900 uppercase mb-2 tracking-widest">
                  Key Focus Areas
                </h4>

                <ul className="space-y-1">
                  {program.subjects.map((sub) => (
                    <li
                      key={sub}
                      className="flex items-center text-xs text-slate-500"
                    >
                      <span className="w-1.5 h-1.5 bg-amber-500 mr-2 rounded-full" />
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-indigo-950 py-10 px-4 text-center border-t border-slate-800">
        <h2 className="text-xl md:text-2xl font-black text-white mb-2">
          Ready to Start Your Journey?
        </h2>

        <p className="text-slate-400 text-xs max-w-xl mx-auto mb-5 leading-relaxed">
          Our admissions team is here to guide you through the process.
          Applications for the 2026 academic session are now open.
        </p>

        <Link to="/applynow">
          <button className="bg-amber-500 text-slate-950 px-5 py-2 text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg">
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  );
};