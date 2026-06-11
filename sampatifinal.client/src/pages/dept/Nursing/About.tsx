

export default function About() {
  return (
    <div className="bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center border-b border-slate-200 pb-6">
          <span className="inline-block border border-teal-200 bg-teal-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">
            Nursing Program
          </span>

          <h1 className="mt-3 text-3xl md:text-4xl font-black text-teal-900">
            About B.Sc. Nursing
          </h1>

          <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
            Empowering future healthcare professionals through academic
            excellence, practical exposure, and compassionate patient care.
          </p>
        </div>

        {/* Overview */}
        <section className="bg-white border border-slate-200 p-5">
          <h2 className="text-lg font-bold text-teal-800 mb-3">
            Program Overview
          </h2>

          <p className="text-sm text-slate-700 leading-relaxed">
            The Bachelor of Science in Nursing (B.Sc. Nursing) is a four-year
            undergraduate degree focused on developing skilled healthcare
            professionals through a combination of classroom learning,
            laboratory training, and clinical practice. The curriculum is
            designed to prepare students for modern healthcare environments and
            professional nursing responsibilities.
          </p>
        </section>

        {/* Highlights & Infrastructure */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Highlights */}
          <div className="bg-white border border-slate-200 p-5">
            <h2 className="text-lg font-bold text-teal-800 mb-4">
              Program Highlights
            </h2>

            <ul className="space-y-3">
              {[
                "4-Year Comprehensive Degree Program",
                "Advanced Clinical Simulation Labs",
                "Research & Evidence-Based Practice",
                "Communication & Soft Skills Training",
                "Student Mentorship Programs",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-teal-600 mr-2 font-bold">✓</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Infrastructure */}
          <div className="bg-white border border-slate-200 p-5">
            <h2 className="text-lg font-bold text-teal-800 mb-4">
              Learning Infrastructure
            </h2>

            <ul className="space-y-3">
              {[
                "Fully Equipped Nutrition & Anatomy Labs",
                "Digital Library & International Journals",
                "Smart Interactive Classrooms",
                "Multi-specialty Hospital Training",
                "Hostel Facilities & Medical Support",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-teal-600 mr-2 font-bold">•</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Career Opportunities */}
        <section className="bg-teal-900 border border-teal-800 p-6">
          <h2 className="text-lg font-bold text-white mb-5">
            Career Opportunities
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="border-t border-teal-700 pt-3">
              <h3 className="font-semibold text-white text-sm">
                Clinical Nursing
              </h3>

              <p className="text-xs text-teal-200 mt-2 leading-relaxed">
                Opportunities in ICUs, operation theatres, pediatrics, and
                multispecialty hospitals.
              </p>
            </div>

            <div className="border-t border-teal-700 pt-3">
              <h3 className="font-semibold text-white text-sm">
                Public Health
              </h3>

              <p className="text-xs text-teal-200 mt-2 leading-relaxed">
                Work with government health programs, NGOs, and community
                healthcare initiatives.
              </p>
            </div>

            <div className="border-t border-teal-700 pt-3">
              <h3 className="font-semibold text-white text-sm">
                Education & Research
              </h3>

              <p className="text-xs text-teal-200 mt-2 leading-relaxed">
                Pursue M.Sc. Nursing, PhD programs, teaching, or clinical
                research careers.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}