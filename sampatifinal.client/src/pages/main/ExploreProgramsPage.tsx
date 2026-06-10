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
    subjects: [
      "Animal Anatomy",
      "Pharmacology",
      "Drug Dispensing",
      "Pathology",
    ],
  },
  {
    title: "Pharmacy",
    slug: "pharmacy",
    duration: "2 Years",
    level: "Diploma",
    description:
      "Training in pharmaceutical sciences, drug composition, and patient safety protocols.",
    subjects: [
      "Pharmaceutics",
      "Biochemistry",
      "Hospital Pharmacy",
      "Jurisprudence",
    ],
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
    <div className="w-full mx-auto">
      {/* Header */}
      <header className="mb-8 text-center bg-indigo-950 p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Our Academic Programs
        </h1>
        <p className="text-sm md:text-base text-white max-w-2xl mx-auto">
          At Sampati Devi Nursing College, we offer rigorous, high-quality
          training designed to shape the future of healthcare.
        </p>
      </header>

      {/* Program Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((program) => (
          <Link
            key={program.slug}
           to={`/dept/${program.slug}`}
            className="bg-white p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            <div className="mb-3">
              <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide bg-amber-50 px-2 py-1">
                {program.level}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              {program.title}
            </h3>

            <p className="text-sm text-slate-500 mb-3">{program.duration}</p>

            <p className="text-sm text-slate-700 mb-4 flex-grow">
              {program.description}
            </p>

            <div className="border-t border-slate-200 pt-3">
              <h4 className="text-xs font-semibold text-slate-900 uppercase mb-2">
                Key Focus Areas
              </h4>

              <ul className="space-y-1">
                {program.subjects.map((sub) => (
                  <li
                    key={sub}
                    className="flex items-center text-slate-600 text-xs"
                  >
                    <span className="w-1 h-1 bg-amber-600 mr-2"></span>
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-10 bg-indigo-900 p-6 text-center text-white">
        <h2 className="text-xl font-bold mb-2">Ready to Start Your Journey?</h2>

        <p className="text-sm text-indigo-200 mb-4 max-w-xl mx-auto">
          Our admissions team is here to guide you through the process.
          Applications for the 2026 academic session are now open.
        </p>

        <Link to="/applynow">
          <button className="bg-white text-indigo-900 px-4 py-2 text-sm font-semibold hover:bg-indigo-50 transition-colors">
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  );
};
