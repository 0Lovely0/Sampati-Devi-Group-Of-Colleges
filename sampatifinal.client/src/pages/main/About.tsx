const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
      
      {/* HERO SECTION */}
      <div className="w-full bg-indigo-950 text-white py-12 sm:py-16 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
          About Our Institution
        </h1>

        <p className="text-sm sm:text-base md:text-xl max-w-3xl mx-auto opacity-90">
          Empowering the next generation of healthcare and technical professionals through excellence and innovation.
        </p>
      </div>

      {/* MAIN WRAPPER */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 space-y-10">

        {/* INTRO SECTION */}
        <section className="bg-white w-full p-5 sm:p-8 md:p-12 rounded-2xl shadow-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-700 mb-5">
            Our Legacy & Vision
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to the Sampati Devi Group of Colleges, a premier institution dedicated to excellence in professional education and holistic development. Established with a vision to nurture future leaders, we pride ourselves on providing a supportive learning environment, state-of-the-art facilities, and industry-aligned curricula.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="border-l-4 border-amber-600 pl-4">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-sm sm:text-base text-gray-600">
                The Sampati Devi Nursing College is seeking to become a statewide recognized institute of rigorous academic performance and teaching-learning system that can compete with the best institutes nationwide.
              </p>
            </div>

            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Sampati Devi Nursing College is committed through its academic programs in nursing to prepare graduates with strong clinical and practical skills for real-world healthcare environments.
              </p>
            </div>
          </div>
        </section>

        {/* DEPARTMENTS */}
        <section className="w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-amber-700 mb-8">
            Our Departments
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Nursing", desc: "Comprehensive training focused on patient care and clinical excellence." },
              { title: "Pharmacy", desc: "Rigorous scientific programs in pharmaceutical sciences." },
              { title: "Veterinary", desc: "Dedicated curriculum for specialized animal healthcare." },
              { title: "MPHW", desc: "Practical community health training for field readiness." }
            ].map((dept, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition border-t-4 border-amber-700"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {dept.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {dept.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="w-full bg-amber-50 p-6 sm:p-10 md:p-12 rounded-2xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-amber-700 mb-8">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl mb-3">🎓</div>
              <h4 className="font-bold text-sm sm:text-base">Affiliated Degrees</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Recognized certifications by leading universities.
              </p>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl mb-3">🏥</div>
              <h4 className="font-bold text-sm sm:text-base">Clinical Exposure</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Hands-on training in government medical facilities.
              </p>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl mb-3">⚙️</div>
              <h4 className="font-bold text-sm sm:text-base">Modern Labs</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Equipped with the latest technology for practicals.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;