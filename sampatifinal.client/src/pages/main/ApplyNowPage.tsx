import React, { useState } from "react";
import { createApplyNow } from "../../services/admissionEnquiryService";

const COURSES = [
  { name: "B.Sc Nursing" },
  { name: "Post Basic B.Sc Nursing" },
  { name: "Veterinary Pharmacist" },
  { name: "Pharmacy" },
  { name: "Multipurpose Health Worker" },
  { name: "Scope Admissions" },
];

export const ApplyNowPage: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    email: "",
    course: "",
    mode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!formData.fatherName.trim()) {
      alert("Father Name is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      alert("Enter valid email");
      return;
    }

    if (!formData.course) {
      alert("Please select a course");
      return;
    }

    if (!formData.mode) {
      alert("Please select study mode");
      return;
    }

    try {
      setSubmitting(true);

      await createApplyNow({
        formType: "AdmissionEnquiry",
        name: formData.name,
        fatherName: formData.fatherName,
        mobileNumber: formData.mobile,
        email: formData.email,
        course: formData.course, // course name
        preferredMode: "Hostelite",
      });

      alert("Admission enquiry submitted successfully!");

      setFormData({
        name: "",
        fatherName: "",
        mobile: "",
        email: "",
        course: "",
        mode: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit enquiry");
    } finally {
      setSubmitting(false);
    }
  };

  const [scopeForm, setScopeForm] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    email: "",
    course: "",
    mode: "",
  });

  const handleScopeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createApplyNow({
        formType: "ScopeAdmission",
        name: scopeForm.name,
        fatherName: scopeForm.fatherName,
        mobileNumber: scopeForm.mobile,
        email: scopeForm.email,
        course: scopeForm.course,
        preferredMode: scopeForm.mode,
      });

      alert("Scope Admission submitted successfully");

      setScopeForm({
        name: "",
        fatherName: "",
        mobile: "",
        email: "",
        course: "",
        mode: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit");
    }
  };

  const [counselingForm, setCounselingForm] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    email: "",
    educationLevel: "",
    mode: "",
  });

  const handleCounselingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createApplyNow({
        formType: "FreeCounseling",
        name: counselingForm.name,
        fatherName: counselingForm.fatherName,
        mobileNumber: counselingForm.mobile,
        email: counselingForm.email,
        educationLevel: counselingForm.educationLevel,
        preferredMode: counselingForm.mode,
      });

      alert("Counseling request submitted successfully");

      setCounselingForm({
        name: "",
        fatherName: "",
        mobile: "",
        email: "",
        educationLevel: "",
        mode: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit");
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-black text-white">
          Admission Enquiry
        </h1>
        <div className="h-1 w-20 bg-amber-500 mt-6 mx-auto rounded-full" />
        <p className="text-slate-400 mt-6 max-w-6xl mx-auto text-lg">
          Sampati Devi College of Nursing is now accepting applications for the
          upcoming academic session. Renowned for its comprehensive nursing
          programs and state-of-the-art facilities, the college offers a
          nurturing environment for aspiring healthcare professionals.
          Prospective students are encouraged to apply early to secure their
          place and take the first step towards a rewarding career in nursing.
        </p>
      </div>

      {/* FORM */}
      <div className="w-full mx-auto px-4 -mt-15 mb-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Father's Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Father&apos;s Name
              </label>
              <input
                type="text"
                required
                value={formData.fatherName}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, fatherName: e.target.value })
                }
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                value={formData.mobile}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-semibold mb-2">Course</label>
              <select
                required
                value={formData.course}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
              >
                <option value="">Choose a course</option>
                {COURSES.map((course) => (
                  <option key={course.name} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-8">
              <label className="block text-sm font-semibold mb-3">
                Preferred Mode of Studies{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mode"
                    value="1"
                    checked={formData.mode === "1"}
                    onChange={(e) =>
                      setFormData({ ...formData, mode: e.target.value })
                    }
                  />
                  Hostelite
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mode"
                    value="2"
                    checked={formData.mode === "2"}
                    onChange={(e) =>
                      setFormData({ ...formData, mode: e.target.value })
                    }
                  />
                  Day Scholar
                </label>
              </div>
            </div>
          </div>

          {/* MODE OF STUDY */}

          {/* NOTE */}
          <p className="text-sm text-slate-500 mt-6">
            Eligibility Criteria: +2 (Medical with 45%)
          </p>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-8 bg-indigo-950 text-white py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* SCOPE ADMISSIONS SECTION */}
      <div className="w-full mx-auto mt-10 mb-20">
        <div className="bg-white shadow-sm overflow-hidden">
          {/* HEADER (SEPARATE SECTION) */}
          <div className="bg-indigo-950 py-16 px-4 text-center border-b border-slate-800">
            <h1 className="text-4xl md:text-5xl font-black text-white">
              Scope Admissions
            </h1>

            <div className="h-1 w-20 bg-amber-500 mt-6 mx-auto rounded-full" />

            <p className="text-slate-400 mt-6 max-w-6xl mx-auto text-lg leading-relaxed">
              The Sampati Devi Group of Colleges offers a diverse range of
              undergraduate and postgraduate programs. Admissions are based on a
              combination of academic merit and entrance exams, specific to the
              program of interest. Prospective students need to fill out an
              online application form available on the college's official
              website and submit the required documents. Important dates and
              deadlines are provided in the admissions section of the site. For
              detailed information, applicants can contact the admissions office
              directly via phone or email, ensuring they meet all eligibility
              criteria and follow the necessary steps for a successful
              application.
            </p>
          </div>

          {/* CONTENT WRAPPER */}
          <div className="p-4">
            {/* FORM TITLE */}
            {/* <h3 className="text-xl font-bold text-slate-900 mb-6">
              Scope Admission Form
            </h3> */}

            {/* FORM */}
            <form
              onSubmit={handleScopeSubmit}
              className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-sm -mt-18"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={scopeForm.name}
                    onChange={(e) =>
                      setScopeForm({ ...scopeForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-stone-200"
                  />
                </div>

                {/* Father Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    value={scopeForm.fatherName}
                    onChange={(e) =>
                      setScopeForm({ ...scopeForm, fatherName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-stone-200"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    value={scopeForm.mobile}
                    onChange={(e) =>
                      setScopeForm({ ...scopeForm, mobile: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-stone-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={scopeForm.email}
                    onChange={(e) =>
                      setScopeForm({ ...scopeForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-stone-200"
                  />
                </div>

                {/* Course */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Course
                  </label>
                  <select
                    value={scopeForm.course}
                    onChange={(e) =>
                      setScopeForm({ ...scopeForm, course: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-stone-200"
                  >
                    <option value="">Choose a course</option>
                    <option>B.A./Diploma in Yoga</option>
                    <option>B.Sc / Fire Safety Management</option>
                    <option>B.Com / Diploma in Ayurved Pharmacy</option>
                    <option>BBA / Accounts</option>
                    <option>M.A. / Hotel Management</option>
                    <option>MBA / M.Phil (All Subjects)</option>
                    <option>M.Sc / Ph.D (All Subjects)</option>
                    <option>MCA / Diploma</option>
                    <option>M.Com / B.Tech</option>
                  </select>
                </div>

                {/* Mode */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Preferred Mode
                  </label>

                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="scopeMode"
                        value="Attending"
                        checked={scopeForm.mode === "Attending"}
                        onChange={(e) =>
                          setScopeForm({ ...scopeForm, mode: e.target.value })
                        }
                      />
                      Attending
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="scopeMode"
                        value="Distance Studies"
                        checked={scopeForm.mode === "Distance Studies"}
                        onChange={(e) =>
                          setScopeForm({ ...scopeForm, mode: e.target.value })
                        }
                      />
                      Distance Studies
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-8 bg-indigo-950 text-white py-4 rounded-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* FREE COUNSELING SECTION */}
        <div className="w-full mx-auto mt-10">
          <div className="bg-white shadow-sm overflow-hidden">
            {/* HEADER */}
            <div className="bg-indigo-950 py-16 px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-black text-white">
                Free Counseling
              </h1>

              <div className="h-1 w-20 bg-amber-500 mt-6 mx-auto rounded-full" />

              <p className="text-slate-400 mt-6 max-w-6xl mx-auto text-lg leading-relaxed">
                The Sampati Devi Group of Colleges provides free counseling
                sessions to assist prospective students and their families in
                making informed decisions about their education. These sessions
                cover various aspects of the admissions process, program
                selection, eligibility criteria, and career prospects.
                Experienced counselors offer personalized guidance to help
                students understand their options and choose the best path for
                their academic and professional goals. For more details or to
                schedule a counseling session, interested individuals can visit
                the college's official website or contact the admissions office
                directly.
              </p>
            </div>

            {/* FORM */}
            <div className="px-4 pb-12 -mt-15">
              <form
                onSubmit={handleCounselingSubmit}
                className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={counselingForm.name}
                      onChange={(e) =>
                        setCounselingForm({
                          ...counselingForm,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  {/* Father Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      value={counselingForm.fatherName}
                      onChange={(e) =>
                        setCounselingForm({
                          ...counselingForm,
                          fatherName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-stone-200"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={counselingForm.mobile}
                      onChange={(e) =>
                        setCounselingForm({
                          ...counselingForm,
                          mobile: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-stone-200"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={counselingForm.email}
                      onChange={(e) =>
                        setCounselingForm({
                          ...counselingForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-stone-200"
                    />
                  </div>

                  {/* Education Level */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Education Level
                    </label>

                    <select
                      value={counselingForm.educationLevel}
                      onChange={(e) =>
                        setCounselingForm({
                          ...counselingForm,
                          educationLevel: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-stone-200"
                    >
                      <option value="">Select</option>
                      <option value="Matric">Matric</option>
                      <option value="10+2">10+2</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Post Graduate">Post Graduate</option>
                    </select>
                  </div>

                  {/* Mode */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Preferred Mode
                    </label>

                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="counselingMode"
                          value="Online"
                          checked={counselingForm.mode === "Online"}
                          onChange={(e) =>
                            setCounselingForm({
                              ...counselingForm,
                              mode: e.target.value,
                            })
                          }
                        />
                        Online
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="counselingMode"
                          value="Offline"
                          checked={counselingForm.mode === "Offline"}
                          onChange={(e) =>
                            setCounselingForm({
                              ...counselingForm,
                              mode: e.target.value,
                            })
                          }
                        />
                        Offline
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 bg-indigo-950 text-white py-4 rounded-full"
                >
                  Submit
                </button>
              </form>
            </div>
            {/* INFO SECTION */}
            <div className="p-8 md:p-12 text-slate-600 space-y-4 text-sm leading-relaxed">
              <p>
                <b>General Admissions Information to Look For:</b>
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <b>Eligibility Criteria:</b> Qualifications and requirements
                  for programs.
                </li>
                <li>
                  <b>Application Process:</b> Online forms, documents, and fees.
                </li>
                <li>
                  <b>Important Dates:</b> Deadlines and exam schedules.
                </li>
                <li>
                  <b>Entrance Exams:</b> If required for admission.
                </li>
                <li>
                  <b>Contact Details:</b> Email and phone support for admission
                  help.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
