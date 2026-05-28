import React, { useState } from 'react';

const COURSES = ["B.Sc Nursing", "GNM", "ANM", "Post Basic B.Sc Nursing"];

export const ApplyNowPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    dob: '',
    address: '',
    qualification: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application Submitted:', formData);
    alert('Application submitted successfully! Our admissions team will contact you shortly.');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Apply for Admission</h1>
        <p className="text-gray-600">Join Sampati Devi Nursing College. Start your journey toward a rewarding career in healthcare by filling out the application below.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-800">Personal Information</h3>
            <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
            <input type="date" className="w-full p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, dob: e.target.value})} />
            <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>

          {/* Academic Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-800">Academic Details</h3>
            <select className="w-full p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, course: e.target.value})}>
              <option value="">Select Desired Course</option>
              {COURSES.map(course => <option key={course} value={course}>{course}</option>)}
            </select>
            <input type="text" placeholder="Highest Qualification (e.g., 12th Grade)" className="w-full p-3 border rounded-lg" required onChange={(e) => setFormData({...formData, qualification: e.target.value})} />
            <textarea placeholder="Current Address" className="w-full p-3 border rounded-lg h-24" required onChange={(e) => setFormData({...formData, address: e.target.value})} />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition transform hover:scale-[1.01]">
          Submit Application
        </button>
      </form>
    </div>
  );
};