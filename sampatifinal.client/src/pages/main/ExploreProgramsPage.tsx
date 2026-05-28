import React from 'react';
import { Link } from 'react-router-dom';

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
    description: "Prepare for professional nursing practice in diverse healthcare settings through rigorous clinical training.",
    subjects: ["Anatomy", "Physiology", "Microbiology", "Pharmacology"]
  },
  {
    title: "Post Basic B.Sc. Nursing",
    slug: "post-basic-bsc-nursing",
    duration: "2 Years",
    level: "Undergraduate",
    description: "An advanced program for registered nurses to enhance their clinical skills and theoretical knowledge.",
    subjects: ["Maternal Nursing", "Research", "Education", "Administration"]
  },
  {
    title: "Veterinary Pharmacist",
    slug: "veterinary-pharmacist",
    duration: "2 Years",
    level: "Diploma",
    description: "Focused on animal health care, drug administration, and supporting veterinary medical services.",
    subjects: ["Animal Anatomy", "Pharmacology", "Drug Dispensing", "Pathology"]
  },
  {
    title: "Pharmacy",
    slug: "pharmacy",
    duration: "2 Years",
    level: "Diploma",
    description: "Training in pharmaceutical sciences, drug composition, and patient safety protocols.",
    subjects: ["Pharmaceutics", "Biochemistry", "Hospital Pharmacy", "Jurisprudence"]
  },
  {
    title: "Multipurpose Health Worker",
    slug: "multipurpose-health-worker",
    duration: "2 Years",
    level: "Diploma",
    description: "Equipping students with essential skills for community health service, disease prevention, and rural care.",
    subjects: ["Primary Health", "Child Health", "Immunization", "First Aid"]
  }
];

export const ExploreProgramsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 py-16">
      {/* Header */}
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Our Academic Programs</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          At Sampati Devi Nursing College, we offer rigorous, high-quality training designed to shape the future of healthcare.
        </p>
      </header>

      {/* Program Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <Link 
            key={program.slug} 
            to={`/program/${program.slug}`}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] flex flex-col"
          >
            <div className="mb-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
                {program.level}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{program.title}</h3>
            <p className="text-slate-500 font-medium mb-4">{program.duration}</p>
            <p className="text-slate-700 mb-6 flex-grow">{program.description}</p>
            
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase mb-3">Key Focus Areas:</h4>
              <ul className="space-y-2">
                {program.subjects.map((sub) => (
                  <li key={sub} className="flex items-center text-slate-600 text-sm">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Call to Action */}
      <div className="mt-20 bg-indigo-900 rounded-[2rem] p-10 md:p-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-indigo-200 mb-8 max-w-xl mx-auto">
          Our admissions team is here to guide you through the process. Applications for the 2026 academic session are now open.
        </p>
        <Link to="/applynow">
          <button className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-xl">
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  );
};