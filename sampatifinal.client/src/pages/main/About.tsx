
const About = () => {
  return (
    <div className="bg-stone-50 min-h-screen w-full pb-24">
      {/* HERO */}
      <div className="bg-indigo-950 py-24 px-4 text-center border-b border-slate-800">
        <span className="inline-block text-xs font-black text-amber-500 uppercase tracking-[0.25em] bg-white/10 px-4 py-2 rounded-full">
          About Us
        </span>

        <h1 className="text-4xl md:text-6xl font-black text-white mt-6 mb-6">
          About Our Institution
        </h1>

        <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full" />

        <p className="text-slate-400 mt-8 max-w-3xl mx-auto text-lg leading-relaxed">
          Empowering the next generation of healthcare and technical
          professionals through excellence, innovation, academic rigor,
          and clinical precision.
        </p>
      </div>

      <div className="w-full mx-auto px-6 -mt-12 space-y-20">
        {/* LEGACY & VISION */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-6">
            Our Legacy & Vision
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-4xl">
            Welcome to the Sampati Devi Group of Colleges. Established
            with a vision to nurture future leaders, we provide a
            supportive learning environment, industry-aligned education,
            and practical exposure that prepares students for successful
            professional careers.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-stone-50 p-8 rounded-2xl border-l-4 border-amber-500">
              <h3 className="text-2xl font-black text-slate-950 mb-4">
                Vision
              </h3>

              <p className="text-base text-slate-600 leading-relaxed">
                The Sampati Devi Nursing College seeks to become a
                statewide recognized institute of rigorous academic
                performance and an advanced teaching-learning system
                capable of competing with the finest institutions across
                the nation.
              </p>
            </div>

            <div className="bg-stone-50 p-8 rounded-2xl border-l-4 border-slate-950">
              <h3 className="text-2xl font-black text-slate-950 mb-4">
                Mission
              </h3>

              <p className="text-base text-slate-600 leading-relaxed">
                Sampati Devi Nursing College is committed through its
                diverse academic programs in Nursing to prepare graduates
                who develop decisive skills, professional competence,
                clinical expertise, and ethical values for successful
                healthcare practice.
              </p>
            </div>
          </div>
        </section>

        {/* DEPARTMENTS */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-950">
              Our Departments
            </h2>

            <div className="h-1.5 w-24 bg-amber-500 mt-4 mx-auto rounded-full" />

            <p className="mt-5 text-slate-500 text-lg max-w-2xl mx-auto">
              Diverse programs designed to create highly skilled
              professionals in healthcare and allied sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {[
              {
                title: "B.Sc. Nursing",
                desc: "Patient care, clinical excellence, and advanced nursing education.",
              },
              {
                title: "Post Basic B.Sc. Nursing",
                desc: "Professional advancement and specialized nursing training.",
              },
              {
                title: "Pharmacy",
                desc: "Comprehensive pharmaceutical sciences and research.",
              },
              {
                title: "Veterinary",
                desc: "Animal healthcare, treatment, and welfare studies.",
              },
              {
                title: "MPHW",
                desc: "Community health and public healthcare training.",
              },
            ].map((dept, idx) => (
              <div
                key={idx}
                className="bg-indigo-950 p-4 text-center rounded-3xl border border-stone-200 shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 hover:bg-amber-600"
              >
                <h3 className="text-xl  text-white mb-3">
                  {dept.title}
                </h3>

                {/* <p className="text-base text-slate-600 leading-relaxed">
                  {dept.desc}
                </p> */}
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-indigo-950 rounded-3xl p-12 md:p-16 text-white">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black">
              Why Choose Us?
            </h2>

            <div className="h-1.5 w-24 bg-amber-500 mt-5 mx-auto rounded-full" />

            <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto">
              Discover what makes our institution a preferred destination
              for healthcare and technical education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "🎓",
                title: "Affiliated Degrees",
                desc: "Recognized qualifications and certifications that enhance career opportunities.",
              },
              {
                icon: "🏥",
                title: "Clinical Exposure",
                desc: "Hands-on practical training and real-world healthcare experience.",
              },
              {
                icon: "⚙️",
                title: "Modern Laboratories",
                desc: "State-of-the-art facilities equipped with the latest technology.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-center bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-6xl mb-6">{item.icon}</div>

                <h4 className="font-black text-2xl mb-4">
                  {item.title}
                </h4>

                <p className="text-slate-300 text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

