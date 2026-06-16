// import React, { useState } from 'react';

// const COURSES = ["B.Sc Nursing", "GNM", "ANM", "Post Basic B.Sc Nursing"];

// export const ApplyNowPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     course: '',
//     dob: '',
//     address: '',
//     qualification: ''
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Application Submitted:', formData);
//     alert('Application submitted successfully! Our admissions team will contact you shortly.');
//   };

//   return (
//   <div className="bg-slate-50 min-h-screen">
//     {/* Header */}
//     <div className="bg-indigo-950 py-8 px-4 text-center">
//       <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
//         Apply for Admission
//       </h1>

//       <p className="text-sm text-slate-300 max-w-3xl mx-auto">
//         Join Sampati Devi Nursing College and begin your journey toward a
//         successful career in healthcare.
//       </p>
//     </div>

//     {/* Form Section */}
//     <div className="max-w-5xl mx-auto px-4 py-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white border border-slate-200 shadow-sm p-5 space-y-5"
//       >
//         <div className="grid md:grid-cols-2 gap-5">
//           {/* Personal Details */}
//           <div className="space-y-3">
//             <h3 className="text-base font-semibold text-indigo-900 border-b border-slate-200 pb-2">
//               Personal Information
//             </h3>

//             <input
//               type="text"
//               placeholder="Full Name"
//               required
//               className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//               onChange={(e) =>
//                 setFormData({ ...formData, fullName: e.target.value })
//               }
//             />

//             <input
//               type="date"
//               required
//               className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//               onChange={(e) =>
//                 setFormData({ ...formData, dob: e.target.value })
//               }
//             />

//             <input
//               type="email"
//               placeholder="Email Address"
//               required
//               className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//             />

//             <input
//               type="tel"
//               placeholder="Phone Number"
//               required
//               className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//             />
//           </div>

//           {/* Academic Details */}
//           <div className="space-y-3">
//             <h3 className="text-base font-semibold text-indigo-900 border-b border-slate-200 pb-2">
//               Academic Details
//             </h3>

//             <select
//               required
//               className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//               onChange={(e) =>
//                 setFormData({ ...formData, course: e.target.value })
//               }
//             >
//               <option value="">Select Desired Course</option>

//               {COURSES.map((course) => (
//                 <option key={course} value={course}>
//                   {course}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="text"
//               placeholder="Highest Qualification"
//               required
//               className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   qualification: e.target.value,
//                 })
//               }
//             />

//             <textarea
//               placeholder="Current Address"
//               required
//               className="w-full border border-slate-300 px-3 py-2 text-sm h-24 resize-none outline-none focus:border-indigo-700"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   address: e.target.value,
//                 })
//               }
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-950 text-white py-2.5 text-sm font-semibold hover:bg-indigo-900 transition"
//         >
//           Submit Application
//         </button>
//       </form>
//     </div>
//   </div>
// )};


import React, { useState } from 'react';

const COURSES = ["B.Sc Nursing", "Post Basic B.Sc Nursing", "Veterinary Pharmacist", "Pharmacy","Multipurpose Health Worker", "Scope Admissions"];

export const ApplyNowPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', course: '', dob: '', address: '', qualification: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Application submitted successfully! Our admissions team will contact you shortly.');
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-black text-white">Apply for Admission</h1>
        <div className="h-1 w-20 bg-amber-500 mt-6 mx-auto rounded-full" />
        <p className="text-slate-400 mt-6 max-w-xl mx-auto text-sm">
          Join Sampati Devi Nursing College and begin your journey toward a successful career in healthcare.
        </p>
      </div>

      {/* FORM SECTION */}
      <div className="w-full mx-auto px-4 -mt-12 mb-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-950">Personal Information</h3>
              <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              <input type="date" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
              <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input type="tel" placeholder="Phone Number" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>

            {/* Academic Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-950">Academic Details</h3>
              <select required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({ ...formData, course: e.target.value })}>
                <option value="">Select Desired Course</option>
                {COURSES.map((course) => <option key={course} value={course}>{course}</option>)}
              </select>
              <input type="text" placeholder="Highest Qualification" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} />
              <textarea placeholder="Current Address" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none h-[116px] resize-none" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-10 bg-indigo-950 text-white py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};