
import { Mail, Phone, MapPin } from "lucide-react";

const AdmissionEnquiry = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-teal-900 mb-3">
              Start Your Journey With Us
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Have questions about courses, admission process, or campus life?
              Fill the form and our team will contact you shortly.
            </p>
          </div>

          <div className="space-y-4">

            <div className="flex items-center gap-3 text-slate-700 text-sm">
              <div className="bg-teal-50 p-2 text-teal-700">
                <Phone size={18} />
              </div>
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700 text-sm">
              <div className="bg-teal-50 p-2 text-teal-700">
                <Mail size={18} />
              </div>
              <span>admissions@sampatidevicolleges.com</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700 text-sm">
              <div className="bg-teal-50 p-2 text-teal-700">
                <MapPin size={18} />
              </div>
              <span>Near City Hospital, Main Road, India</span>
            </div>

          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-6 md:p-8 border border-slate-200 shadow-sm">

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 bg-slate-50 border border-slate-200 text-sm outline-none focus:border-teal-600"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 bg-slate-50 border border-slate-200 text-sm outline-none focus:border-teal-600"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 bg-slate-50 border border-slate-200 text-sm outline-none focus:border-teal-600"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 bg-slate-50 border border-slate-200 text-sm outline-none focus:border-teal-600"
            />

            <select className="w-full p-3 bg-slate-50 border border-slate-200 text-sm text-slate-500 outline-none focus:border-teal-600">
              <option>Select Course Interested In</option>
              <option>B.Sc. Nursing</option>
              <option>Pharmacy</option>
              <option>Veterinary Pharmacist</option>
            </select>

            <textarea
              placeholder="Your Message"
              rows={3}
              className="w-full p-3 bg-slate-50 border border-slate-200 text-sm outline-none focus:border-teal-600"
            ></textarea>

            <button className="w-full bg-teal-700 text-white py-3 text-sm font-semibold hover:bg-teal-800 transition">
              Submit Enquiry
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AdmissionEnquiry;