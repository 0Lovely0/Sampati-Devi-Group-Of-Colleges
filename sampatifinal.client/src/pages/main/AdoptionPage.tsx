import React, { useState, useEffect } from "react";
import adoption from "../../assets/adoption.png";
import {
  getAllStudents,
  type AdoptStudent,
} from "../../services/adoptionStudentService";

import { createDonationInquiry } from "../../services/donationInquiryService";
interface AdoptionOption {
  title: string;
  description: string;
  icon: string;
}

const ADOPTION_OPTIONS: AdoptionOption[] = [
  {
    title: "Academics",
    description:
      "Contributions cover tuition fees and other academic expenses. The college matches 50% of the donated amount.",
    icon: "🎓",
  },
  {
    title: "Food and Hostel",
    description:
      "Donations ensure access to nutritious meals and safe accommodation. The college covers 50% of these costs.",
    icon: "🏠",
  },
  {
    title: "Lab Expenditures",
    description:
      "Provides essential laboratory materials and equipment for practical training. The college matches 50% of the donation.",
    icon: "🔬",
  },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export const AdoptionPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    adoptionFor: "",
    student: "",
  });

  const [students, setStudents] = useState<AdoptStudent[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoadingStudents(false);
    }
  };

  const getImageUrl = (photoUrl: string) => {
    const API_BASE_URL =
      window.location.hostname === "localhost"
        ? "https://localhost:7197"
        : "https://sampatigroup.stdruraltech.org";

    return photoUrl.startsWith("http")
      ? photoUrl
      : `${API_BASE_URL}/${photoUrl}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const selectedStudent = students.find(
        (student) => student.studentId === Number(formData.student),
      );

      await createDonationInquiry({
        honorableName: formData.name,
        phone: formData.phone,
        email: formData.email,
      meetingDate: `${formData.date}T00:00:00`,
        meetingTime: formData.time,
        adoptionFor: formData.adoptionFor,
        studentId: Number(formData.student),
        studentName: selectedStudent?.studentName || "",
      });

      alert("Donation inquiry submitted successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        adoptionFor: "",
        student: "",
      });
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
      alert("Failed to submit donation inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-black text-white">
          Adoption Program
        </h1>
        <div className="h-1 w-20 bg-amber-500 mt-6 mx-auto rounded-full" />
        <p className="text-slate-400 mt-6 max-w-xl mx-auto text-sm">
          Support financially disadvantaged students and contribute towards
          their educational journey at Sampati Devi Nursing College.
        </p>
      </div>
      {/* ABOUT ADOPTION PROGRAM */}
      <section className="w-full mx-auto px-4 py-12 -mt-25">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* LEFT SIDE - MAIN TEXT */}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-black text-slate-950 mb-6">
                Adoption Program
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                Sampati Devi Nursing College has introduced an adoption program
                to support financially disadvantaged students. Donors can choose
                from three specific areas to make their contributions.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    Academics
                  </h3>
                  <p className="text-slate-600">
                    Contributions cover tuition fees and other academic
                    expenses. The college committee and management will match
                    50% of the donated amount.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    Food and Hostel
                  </h3>
                  <p className="text-slate-600">
                    Donations ensure that students have access to nutritious
                    meals and safe accommodation. The college will also cover
                    50% of these costs.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    Lab Expenditures
                  </h3>
                  <p className="text-slate-600">
                    Donations help provide essential laboratory materials and
                    equipment necessary for practical training. The college will
                    match 50% of the donation for these expenses.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - IMAGE */}
            <div className="p-8 md:p-12 flex items-center">
              <img
                src={adoption}
                alt="Adoption Program"
                className="w-full h-[420px] object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* 🔽 BOTTOM FULL WIDTH TEXT */}
          <div className="px-8 md:px-12 pb-10 -mt-6">
            <p className="text-slate-600 leading-relaxed">
              This program aims to alleviate the financial burden on students
              and ensure they receive a comprehensive education and living
              experience. The college's commitment to covering half of the
              expenses ensures that the donations have a significant impact.
            </p>
          </div>
        </div>
      </section>
      <div className="w-full mx-auto px-4">
        {/* ADOPTION OPTIONS */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {ADOPTION_OPTIONS.map((opt) => (
            <div
              key={opt.title}
              className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm"
            >
              <div className="text-4xl mb-4">{opt.icon}</div>
              <h3 className="text-lg font-black text-slate-950 mb-3">
                {opt.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {opt.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-950">
              Students Seeking Support
            </h2>

            <p className="text-slate-600 mt-2">
              Choose a student and help shape their future through your
              contribution.
            </p>
          </div>

          {loadingStudents ? (
            <div className="text-center py-10">
              <p className="text-slate-500">Loading students...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {students.map((student) => (
                <div
                  key={student.studentId}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={getImageUrl(student.photoUrl)}
                    alt={student.studentName}
                    className="w-full h-56 object-contain"
                  />

                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold text-slate-950">
                      {student.studentName}
                    </h3>

                    <p className="text-slate-500 text-xs mt-1">
                      {student.course}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-sm mx-auto"
        >
          <h2 className="text-2xl font-black text-slate-950 mb-8">
            Donation Inquiry
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Honourable Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Honourable Name
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={formData.name}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                value={formData.phone}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email Address"
                value={formData.email}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Prefered Meeting Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Prefered Meeting Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={formData.date}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Time
              </label>

              <select
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              >
                <option value="">Select Time</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Adopting For */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Adopting For <span className="text-red-500">Required</span>
              </label>

              <select
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                value={formData.adoptionFor}
                onChange={(e) =>
                  setFormData({ ...formData, adoptionFor: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {ADOPTION_OPTIONS.map((opt) => (
                  <option key={opt.title} value={opt.title}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Selection */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Students
            </label>

            <select
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
              value={formData.student}
              onChange={(e) =>
                setFormData({ ...formData, student: e.target.value })
              }
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.studentId} value={student.studentId}>
                  {student.studentName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-8 bg-indigo-950 text-white py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Send Donation Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};
