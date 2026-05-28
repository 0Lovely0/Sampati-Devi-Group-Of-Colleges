import React, { useState } from 'react';

interface AdoptionOption {
  title: string;
  description: string;
}

const ADOPTION_OPTIONS: AdoptionOption[] = [
  { title: "Academics", description: "Contributions cover tuition fees and other academic expenses. The college committee and management will match 50% of the donated amount." },
  { title: "Food and Hostel", description: "Donations ensure that students have access to nutritious meals and safe accommodation. The college will also cover 50% of these costs." },
  { title: "Lab Expenditures", description: "Donations help provide essential laboratory materials and equipment necessary for practical training. The college will match 50% of the donation for these expenses." }
];

const TIME_SLOTS = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"];

const STUDENTS = ["Priya", "Hemlata", "Sanjana"];

export const AdoptionPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', date: '', time: '', adoptionFor: '', adoptionTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you for your interest in our adoption program!');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-900">Adoption Program</h1>
        <p className="text-lg text-gray-600">Sampati Devi Nursing College has introduced an adoption program to support financially disadvantaged students.</p>
      </section>

      {/* Cards Section */}
      <section className="grid md:grid-cols-3 gap-6">
        {ADOPTION_OPTIONS.map((opt) => (
          <div key={opt.title} className="p-6 border border-blue-100 rounded-xl bg-blue-50 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-blue-800 mb-2">{opt.title}</h3>
            <p className="text-sm text-gray-700">{opt.description}</p>
          </div>
        ))}
      </section>

      {/* Empowerment Note */}
      <blockquote className="border-l-4 border-blue-600 pl-4 py-2 italic text-gray-700">
        "Empowerment Through Education: This program aims to alleviate the financial burden on students. The college’s commitment to covering half of the expenses ensures that the donations have a significant impact."
      </blockquote>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Sampati Devi Adoption Program Details</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Honourable Name" className="p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="tel" placeholder="Phone" className="p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <input type="email" placeholder="Email" className="p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="date" className="p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, date: e.target.value})} />
        </div>

        <div>
          <label className="block mb-2 font-medium">Preferred Time *</label>
          <select className="w-full p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, time: e.target.value})}>
            {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Adopting For *</label>
            <select className="w-full p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, adoptionFor: e.target.value})}>
              <option value="">Select Category</option>
              {ADOPTION_OPTIONS.map(opt => <option key={opt.title} value={opt.title}>{opt.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Select Student *</label>
            <select className="w-full p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, adoptionTime: e.target.value})}>
              <option value="">Choose Student</option>
              {STUDENTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition">
          Send Donation Inquiry
        </button>
      </form>
    </div>
  );
};