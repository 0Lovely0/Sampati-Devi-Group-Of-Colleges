import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-indigo-950 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Our Institution</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          Empowering the next generation of healthcare and technical professionals through excellence and innovation.
        </p>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Intro Section */}
        <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-amber-700 mb-6">Our Legacy & Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to the Sampati Devi Group of Colleges, a premier institution dedicated to excellence in professional education and holistic development. Established with a vision to nurture future leaders, we pride ourselves on providing a supportive learning environment, state-of-the-art facilities, and industry-aligned curricula.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="border-l-4 border-amber-600 pl-4">
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-gray-600">The Sampati Devi Nursing College is seeking to become a statewide recognized institute of Rigorous Academic Performance and teaching learning system that can compete with the best institutes nationwide.</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-gray-600">Sampati Devi Nursing College is committed through its bouquet of academic programs in the field of Nursing to prepare graduates who are able to build up decisive skills in their practice and function of acquaintance equipping then with practice & clinical skill.</p>
            </div>
          </div>
        </section>

        {/* Departments Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-amber-700 mb-10">Our Departments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Nursing", desc: "Comprehensive training focused on patient care and clinical excellence." },
              { title: "Pharmacy", desc: "Rigorous scientific programs in pharmaceutical sciences." },
              { title: "Veterinary", desc: "Dedicated curriculum for specialized animal healthcare." },
              { title: "MPHW", desc: "Practical community health training for field readiness." }
            ].map((dept, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-amber-700">
                <h3 className="text-xl font-bold mb-3">{dept.title}</h3>
                <p className="text-gray-600 text-sm">{dept.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-amber-50 p-8 md:p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-center text-amber-700 mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl mb-4">🎓</div>
              <h4 className="font-bold">Affiliated Degrees</h4>
              <p className="text-sm text-gray-600">Recognized certifications by leading universities.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-4">🏥</div>
              <h4 className="font-bold">Clinical Exposure</h4>
              <p className="text-sm text-gray-600">Hands-on training in government medical facilities.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-4">⚙️</div>
              <h4 className="font-bold">Modern Labs</h4>
              <p className="text-sm text-gray-600">Equipped with the latest technology for practicals.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;