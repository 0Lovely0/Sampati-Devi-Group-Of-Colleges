import React from 'react';

export default function About() {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-teal-900 mb-4">About B.Sc. Nursing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering the next generation of healthcare leaders through academic excellence and clinical precision.
          </p>
        </div>

        {/* Overview Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-teal-800 mb-4">Program Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            The Bachelor of Science in Nursing (B.Sc. Nursing) is a four-year undergraduate program 
            dedicated to bridging the gap between theoretical medical science and practical patient care. 
            Our curriculum is meticulously designed to meet global healthcare standards, ensuring our 
            students emerge as highly skilled professionals ready to handle the complexities of modern medical environments.
          </p>
        </section>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Highlights */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-teal-800 mb-6">Program Highlights</h2>
            <ul className="space-y-4">
              {[
                "4-Year Comprehensive Degree Program",
                "Advanced Clinical Simulation Labs",
                "Integration of Research & Evidence-Based Practice",
                "Soft Skills & Communication Training",
                "Holistic Student Mentorship Programs"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-teal-600 mr-2">✔</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Infrastructure */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-teal-800 mb-6">Learning Infrastructure</h2>
            <ul className="space-y-4">
              {[
                "Fully Equipped Nutrition & Anatomy Labs",
                "Digital Library with International Journals",
                "Smart Classrooms with Interactive Boards",
                "On-campus Multi-specialty Hospital Rotation",
                "Hostel Facilities with 24/7 Medical Support"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-teal-600 mr-2">✦</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Career Section */}
        <section className="bg-teal-900 text-teal-50 p-10 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-white">Career Opportunities</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="border-t-2 border-teal-700 pt-4">
              <h3 className="font-bold text-white">Clinical Nursing</h3>
              <p className="text-sm text-teal-200 mt-2">Work in ICU, OT, or Pediatrics in leading multispecialty hospitals.</p>
            </div>
            <div className="border-t-2 border-teal-700 pt-4">
              <h3 className="font-bold text-white">Public Health</h3>
              <p className="text-sm text-teal-200 mt-2">Become a community health worker or NGO project manager.</p>
            </div>
            <div className="border-t-2 border-teal-700 pt-4">
              <h3 className="font-bold text-white">Education/Research</h3>
              <p className="text-sm text-teal-200 mt-2">Pursue higher studies (M.Sc, PhD) or become a clinical researcher.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}