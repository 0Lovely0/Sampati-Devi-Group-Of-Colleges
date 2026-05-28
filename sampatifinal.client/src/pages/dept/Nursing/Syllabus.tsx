import React from 'react';

const syllabusData = [
  {
    year: "First Year",
    subjects: ["Anatomy", "Physiology", "Nutrition", "Biochemistry", "Nursing Foundations", "Psychology"],
    fileUrl: "/docs/syllabus/nursing-yr1.pdf"
  },
  {
    year: "Second Year",
    subjects: ["Sociology", "Pharmacology", "Pathology", "Genetics", "Medical-Surgical Nursing I", "Community Health Nursing I"],
    fileUrl: "/docs/syllabus/nursing-yr2.pdf"
  },
  {
    year: "Third Year",
    subjects: ["Medical-Surgical Nursing II", "Child Health Nursing", "Mental Health Nursing", "Nursing Research & Statistics"],
    fileUrl: "/docs/syllabus/nursing-yr3.pdf"
  },
  {
    year: "Fourth Year",
    subjects: ["Midwifery & Obstetrical Nursing", "Community Health Nursing II", "Nursing Management", "Educational Technology"],
    fileUrl: "/docs/syllabus/nursing-yr4.pdf"
  }
];

export default function Syllabus() {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-teal-900 mb-4">Course Syllabus</h1>
          <p className="text-gray-600">Download the detailed curriculum for each year of the B.Sc. Nursing program.</p>
        </div>

        <div className="space-y-6">
          {syllabusData.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-teal-800 mb-3">{item.year}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.subjects.map((sub, i) => (
                    <span key={i} className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
              
              <a 
                href={item.fileUrl} 
                download 
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center shrink-0"
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}