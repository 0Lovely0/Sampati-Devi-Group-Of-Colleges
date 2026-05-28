import React from 'react';

// Extended data structure
const facultyData = [
  {
    name: "Dr. Anjali Sharma",
    designation: "Head of Department",
    education: "PhD, M.Sc Nursing",
    expertise: "Critical Care & Emergency Nursing",
    bio: "With over 15 years of clinical experience, Dr. Sharma specializes in trauma life support and nursing administration.",
    research: "Patient outcome analysis in ICU settings.",
    email: "anjali.s@college.edu",
    image: "/images/faculty/anjali.jpg"
  },
  {
    name: "Prof. Rajesh Kumar",
    designation: "Senior Professor",
    education: "M.Sc Nursing (Pediatrics)",
    expertise: "Child Health & Developmental Care",
    bio: "Dedicated to improving pediatric care standards, Prof. Kumar focuses on neonatal wellness and family-centered nursing.",
    research: "Early intervention strategies for developmental delays.",
    email: "rajesh.k@college.edu",
    image: "/images/faculty/rajesh.jpg"
  },
  {
    name: "Ms. Sunita Verma",
    designation: "Assistant Professor",
    education: "M.Sc Nursing (OBG)",
    expertise: "Maternal & Newborn Health",
    bio: "An advocate for maternal health, Ms. Verma brings extensive experience from clinical practice in reproductive health.",
    research: "Post-partum care and mental health awareness.",
    email: "sunita.v@college.edu",
    image: "/images/faculty/sunita.jpg"
  }
];

export default function Faculty() {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-teal-900 mb-6">Our Distinguished Faculty</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our department is led by a team of seasoned clinicians, researchers, and educators dedicated 
            to excellence in nursing education and patient care.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyData.map((member, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300">
              {/* Image & Header */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-teal-100 rounded-full mb-4 overflow-hidden border-4 border-teal-50 shadow-inner">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-teal-900 text-center">{member.name}</h3>
                <p className="text-teal-700 font-semibold text-sm uppercase tracking-wider">{member.designation}</p>
              </div>

              {/* Detailed Info */}
              <div className="space-y-4 flex-grow">
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                
                <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                  <p><strong>Education:</strong> {member.education}</p>
                  <p><strong>Expertise:</strong> {member.expertise}</p>
                  <p><strong>Research:</strong> {member.research}</p>
                </div>
              </div>

              {/* Footer Action */}
              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <a href={`mailto:${member.email}`} className="text-teal-600 font-bold hover:text-teal-800 text-sm">
                  Contact Faculty →
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Info Section */}
        <div className="mt-16 bg-teal-900 rounded-3xl p-10 text-center text-teal-50">
          <h3 className="text-2xl font-bold text-white mb-4">Interested in Research?</h3>
          <p className="max-w-xl mx-auto opacity-90">
            Our faculty are actively looking for motivated students to assist with ongoing clinical 
            research projects. Reach out to the HOD office to learn more about current opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}