import React from 'react';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Phone from 'lucide-react/dist/esm/icons/phone';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';

const AdmissionEnquiry = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Left Side: Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Start Your Journey With Us</h1>
            <p className="text-slate-600 text-lg">
              Have questions about our courses, admission process, or campus life? 
              Fill out the form and our counselors will get back to you shortly.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-slate-700">
              <div className="bg-indigo-50 p-3 rounded-full text-indigo-600"><Phone size={20}/></div>
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700">
              <div className="bg-indigo-50 p-3 rounded-full text-indigo-600"><Mail size={20}/></div>
              <span>admissions@sampatidevicolleges.com</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700">
              <div className="bg-indigo-50 p-3 rounded-full text-indigo-600"><MapPin size={20}/></div>
              <span>Near City Hospital, Main Road, India</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-indigo-500" />
              <input type="text" placeholder="Last Name" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-indigo-500" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-indigo-500" />
            <input type="tel" placeholder="Phone Number" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-indigo-500" />
            <select className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none text-slate-500">
              <option>Select Course Interested In</option>
              <option>B.Sc. Nursing</option>
              <option>Pharmacy</option>
              <option>Veterinary Pharmacist</option>
            </select>
            <textarea placeholder="Your Message" rows={4} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-indigo-500"></textarea>
            
            <button className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmissionEnquiry;