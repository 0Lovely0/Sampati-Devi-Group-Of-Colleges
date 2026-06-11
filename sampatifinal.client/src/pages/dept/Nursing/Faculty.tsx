

const facultyData = [
  {
    name: "Dr. Anjali Sharma",
    designation: "Head of Department",
    education: "PhD, M.Sc Nursing",
    expertise: "Critical Care & Emergency Nursing",
    bio: "With over 15 years of clinical experience, Dr. Sharma specializes in trauma life support and nursing administration.",
    research: "Patient outcome analysis in ICU settings.",
    email: "anjali.s@college.edu",
    image: "/images/faculty/anjali.jpg",
  },
  {
    name: "Prof. Rajesh Kumar",
    designation: "Senior Professor",
    education: "M.Sc Nursing (Pediatrics)",
    expertise: "Child Health & Developmental Care",
    bio: "Dedicated to improving pediatric care standards with focus on neonatal wellness and family-centered nursing.",
    research: "Early intervention strategies for developmental delays.",
    email: "rajesh.k@college.edu",
    image: "/images/faculty/rajesh.jpg",
  },
  {
    name: "Ms. Sunita Verma",
    designation: "Assistant Professor",
    education: "M.Sc Nursing (OBG)",
    expertise: "Maternal & Newborn Health",
    bio: "Experienced educator and clinician specializing in maternal healthcare and reproductive wellness.",
    research: "Post-partum care and mental health awareness.",
    email: "sunita.v@college.edu",
    image: "/images/faculty/sunita.jpg",
  },
];

export default function Faculty() {
  return (
    <div className="bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 border-b border-slate-200 pb-6">
          <span className="inline-block border border-teal-200 bg-teal-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">
            Department Faculty
          </span>

          <h1 className="mt-3 text-3xl md:text-4xl font-black text-teal-900">
            Our Faculty
          </h1>

          <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
            Meet our experienced educators, researchers, and healthcare
            professionals dedicated to nursing excellence.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {facultyData.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 p-5 flex flex-col"
            >
              {/* Faculty Image */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 overflow-hidden border border-slate-300 bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="mt-3 text-lg font-bold text-teal-900 text-center">
                  {member.name}
                </h3>

                <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 text-center">
                  {member.designation}
                </p>
              </div>

              {/* Bio */}
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {member.bio}
              </p>

              {/* Details */}
              <div className="mt-4 border border-slate-200 bg-slate-50 p-3 text-sm space-y-2">
                <div>
                  <span className="font-semibold text-slate-800">
                    Education:
                  </span>
                  <p className="text-slate-600">{member.education}</p>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">
                    Expertise:
                  </span>
                  <p className="text-slate-600">{member.expertise}</p>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">
                    Research:
                  </span>
                  <p className="text-slate-600">{member.research}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <a
                  href={`mailto:${member.email}`}
                  className="text-sm font-semibold text-teal-700 hover:text-teal-900"
                >
                  Contact Faculty →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Research Section */}
        <div className="mt-8 bg-teal-900 border border-teal-800 p-6 text-center">
          <h3 className="text-lg font-bold text-white mb-3">
            Student Research Opportunities
          </h3>

          <p className="text-sm text-teal-100 max-w-2xl mx-auto leading-relaxed">
            Faculty members actively supervise research projects in clinical
            nursing, public health, maternal care, and patient safety. Students
            interested in research may contact the department office for
            guidance and participation opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}