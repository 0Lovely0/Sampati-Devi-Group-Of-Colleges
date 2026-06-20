import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-black text-white">Contact Us</h1>
        <div className="h-1 w-20 bg-amber-500 mt-6 mx-auto rounded-full"/>
        <p className="text-slate-400 mt-6 max-w-xl mx-auto text-sm">
          Get in touch with Sampati Devi Group of Colleges for admissions, academic inquiries, and general information.
        </p>
      </div>

      <div className="w-full mx-auto px-4 -mt-15">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* CONTACT INFO */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-sm space-y-8">
            <h2 className="text-xl font-black text-slate-950">General Information</h2>
            <div className="space-y-6">
              {[
                { title: "Address", val: "Sampati Devi Memorial Nursing And Veterinary College Bijni Mandi HP,175001" },
                { title: "Phone", val: "+91 7807377091, +91 9418025164" },
                { title: "Email", val: "sdmnursingcollege@gmail.com" },
                { title: "Office Hours", val: "Mon - Sat | 9:00 AM - 5:00 PM" }
              ].map((item) => (
                <div key={item.title}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">{item.title}</p>
                  <p className="text-slate-950 font-medium">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-950 mb-8">Send a Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
              <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
              <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
              <button type="submit" className="w-full bg-indigo-950 text-white py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* MAP */}
        <div className="mt-8 bg-white p-4 rounded-3xl border border-stone-200 shadow-sm">
          <div className="w-full h-80 rounded-2xl overflow-hidden bg-stone-100">
            <iframe
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.878775432651!2d76.92476567540417!3d31.32832815617062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39048a1c97e7040d%3A0x6e7b7f1e6878b668!2sMandi%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1717654321000!5m2!1sen!2sin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;