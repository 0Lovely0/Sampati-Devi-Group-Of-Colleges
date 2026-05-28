import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8 text-center">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-indigo-600">Address</h3>
                <p className="text-slate-600">Sampati Devi Group of Colleges, Mandi, Himachal Pradesh, India</p>
              </div>
              <div>
                <h3 className="font-bold text-indigo-600">Phone</h3>
                <p className="text-slate-600">+91 XXXXXXXXXX</p>
              </div>
              <div>
                <h3 className="font-bold text-indigo-600">Email</h3>
                <p className="text-slate-600">info@sampatidevi.edu.in</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" />
              <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" />
              <textarea placeholder="Your Message" rows={4} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none"></textarea>
              <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;