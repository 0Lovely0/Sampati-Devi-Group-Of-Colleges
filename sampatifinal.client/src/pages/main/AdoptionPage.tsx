// import React, { useState } from 'react';

// interface AdoptionOption {
//   title: string;
//   description: string;
// }

// const ADOPTION_OPTIONS: AdoptionOption[] = [
//   { title: "Academics", description: "Contributions cover tuition fees and other academic expenses. The college committee and management will match 50% of the donated amount." },
//   { title: "Food and Hostel", description: "Donations ensure that students have access to nutritious meals and safe accommodation. The college will also cover 50% of these costs." },
//   { title: "Lab Expenditures", description: "Donations help provide essential laboratory materials and equipment necessary for practical training. The college will match 50% of the donation for these expenses." }
// ];

// const TIME_SLOTS = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"];

// const STUDENTS = ["Priya", "Hemlata", "Sanjana"];

// export const AdoptionPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '', phone: '', email: '', date: '', time: '', adoptionFor: '', adoptionTime: ''
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form Submitted:', formData);
//     alert('Thank you for your interest in our adoption program!');
//   };

//   return (
//   <div className="bg-slate-50 min-h-screen">
//     {/* Header */}
//     <div className="bg-indigo-950 py-8 px-4 text-center">
//       <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
//         Adoption Program
//       </h1>

//       <p className="text-sm text-slate-300 max-w-3xl mx-auto">
//         Support financially disadvantaged students and contribute towards
//         their educational journey at Sampati Devi Nursing College.
//       </p>
//     </div>

//     <div className="w-full mx-auto px-4 py-6 space-y-6">
//       {/* Adoption Options */}
//       <section className="grid md:grid-cols-3 gap-4">
//         {ADOPTION_OPTIONS.map((opt) => (
//           <div
//             key={opt.title}
//             className="bg-white border border-slate-200 p-4 shadow-sm"
//           >
//             <h3 className="text-base font-semibold text-indigo-900 mb-2">
//               {opt.title}
//             </h3>

//             <p className="text-sm text-slate-600 leading-relaxed">
//               {opt.description}
//             </p>
//           </div>
//         ))}
//       </section>

//       {/* Note */}
//       <div className="border-l-4 border-indigo-900 bg-white p-4 text-sm text-slate-700 italic shadow-sm">
//         "Empowerment Through Education: This program aims to reduce the
//         financial burden on students. The college's commitment to covering
//         half of the expenses ensures that every contribution creates a
//         meaningful impact."
//       </div>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white border border-slate-200 shadow-sm p-5 space-y-5"
//       >
//         <h2 className="text-lg font-semibold text-indigo-900 border-b border-slate-200 pb-2">
//           Sampati Devi Adoption Program Details
//         </h2>

//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Honourable Name"
//             required
//             className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//             onChange={(e) =>
//               setFormData({ ...formData, name: e.target.value })
//             }
//           />

//           <input
//             type="tel"
//             placeholder="Phone Number"
//             required
//             className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//             onChange={(e) =>
//               setFormData({ ...formData, phone: e.target.value })
//             }
//           />

//           <input
//             type="email"
//             placeholder="Email Address"
//             required
//             className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />

//           <input
//             type="date"
//             required
//             className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//             onChange={(e) =>
//               setFormData({ ...formData, date: e.target.value })
//             }
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Preferred Time *
//           </label>

//           <select
//             required
//             className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//             onChange={(e) =>
//               setFormData({ ...formData, time: e.target.value })
//             }
//           >
//             <option value="">Select Time</option>

//             {TIME_SLOTS.map((t) => (
//               <option key={t} value={t}>
//                 {t}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Adopting For *
//             </label>

//             <select
//               required
//               className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   adoptionFor: e.target.value,
//                 })
//               }
//             >
//               <option value="">Select Category</option>

//               {ADOPTION_OPTIONS.map((opt) => (
//                 <option key={opt.title} value={opt.title}>
//                   {opt.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Select Student *
//             </label>

//             <select
//               required
//               className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   adoptionTime: e.target.value,
//                 })
//               }
//             >
//               <option value="">Choose Student</option>

//               {STUDENTS.map((student) => (
//                 <option key={student} value={student}>
//                   {student}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-950 text-white py-2.5 text-sm font-semibold hover:bg-indigo-900 transition"
//         >
//           Send Donation Inquiry
//         </button>
//       </form>
//     </div>
//   </div>
// )};


import React, { useState } from 'react';

interface AdoptionOption {
  title: string;
  description: string;
  icon: string;
}

const ADOPTION_OPTIONS: AdoptionOption[] = [
  { title: "Academics", description: "Contributions cover tuition fees and other academic expenses. The college matches 50% of the donated amount.", icon: "🎓" },
  { title: "Food and Hostel", description: "Donations ensure access to nutritious meals and safe accommodation. The college covers 50% of these costs.", icon: "🏠" },
  { title: "Lab Expenditures", description: "Provides essential laboratory materials and equipment for practical training. The college matches 50% of the donation.", icon: "🔬" }
];

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];
const STUDENTS = ["Priya", "Hemlata", "Sanjana"];

export const AdoptionPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', date: '', time: '', adoptionFor: '', student: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest in our adoption program!');
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-black text-white">Adoption Program</h1>
        <div className="h-1 w-20 bg-amber-500 mt-6 mx-auto rounded-full" />
        <p className="text-slate-400 mt-6 max-w-xl mx-auto text-sm">
          Support financially disadvantaged students and contribute towards their educational journey at Sampati Devi Nursing College.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* ADOPTION OPTIONS */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {ADOPTION_OPTIONS.map((opt) => (
            <div key={opt.title} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
              <div className="text-4xl mb-4">{opt.icon}</div>
              <h3 className="text-lg font-black text-slate-950 mb-3">{opt.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{opt.description}</p>
            </div>
          ))}
        </section>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-sm max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-slate-950 mb-8">Donation Inquiry</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input type="tel" placeholder="Phone Number" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="date" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({...formData, date: e.target.value})} />
            
            <select required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({...formData, time: e.target.value})}>
              <option value="">Preferred Time</option>
              {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({...formData, adoptionFor: e.target.value})}>
              <option value="">Adoption Category</option>
              {ADOPTION_OPTIONS.map(opt => <option key={opt.title} value={opt.title}>{opt.title}</option>)}
            </select>
          </div>

          <select required className="w-full mt-6 px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" onChange={(e) => setFormData({...formData, student: e.target.value})}>
            <option value="">Select Student</option>
            {STUDENTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <button type="submit" className="w-full mt-8 bg-indigo-950 text-white py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg">
            Send Donation Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};