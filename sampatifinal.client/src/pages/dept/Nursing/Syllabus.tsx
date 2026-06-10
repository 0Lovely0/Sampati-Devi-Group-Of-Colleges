import React from "react";

const syllabusData = [
  {
    year: "First Year",
    subjects: [
      "Anatomy",
      "Physiology",
      "Nutrition",
      "Biochemistry",
      "Nursing Foundations",
      "Psychology",
    ],
    fileUrl: "/docs/syllabus/nursing-yr1.pdf",
  },
  {
    year: "Second Year",
    subjects: [
      "Sociology",
      "Pharmacology",
      "Pathology",
      "Genetics",
      "Medical-Surgical Nursing I",
      "Community Health Nursing I",
    ],
    fileUrl: "/docs/syllabus/nursing-yr2.pdf",
  },
  {
    year: "Third Year",
    subjects: [
      "Medical-Surgical Nursing II",
      "Child Health Nursing",
      "Mental Health Nursing",
      "Nursing Research & Statistics",
    ],
    fileUrl: "/docs/syllabus/nursing-yr3.pdf",
  },
  {
    year: "Fourth Year",
    subjects: [
      "Midwifery & Obstetrical Nursing",
      "Community Health Nursing II",
      "Nursing Management",
      "Educational Technology",
    ],
    fileUrl: "/docs/syllabus/nursing-yr4.pdf",
  },
];

export default function Syllabus() {
  return (
    <div className="bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center border-b border-slate-200 pb-6 mb-8">
          <span className="inline-block border border-teal-200 bg-teal-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">
            Academic Curriculum
          </span>

          <h1 className="mt-3 text-3xl md:text-4xl font-black text-teal-900">
            Course Syllabus
          </h1>

          <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
            Download the detailed syllabus and curriculum structure for each
            academic year of the B.Sc. Nursing program.
          </p>
        </div>

        {/* Syllabus List */}
        <div className="space-y-4">
          {syllabusData.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-teal-800 mb-3">
                    {item.year}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {item.subjects.map((subject, i) => (
                      <span
                        key={i}
                        className="border border-slate-300 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right */}
                <div className="shrink-0">
                  <a
                    href={item.fileUrl}
                    download
                    className="inline-flex items-center border border-teal-700 bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 transition-colors"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-6 border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> The syllabus may be updated periodically as
            per university and regulatory guidelines. Students are advised to
            download the latest version before each academic session.
          </p>
        </div>
      </div>
    </div>
  );
}