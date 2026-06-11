import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-indigo-950 py-8 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Contact Us
        </h1>

        <p className="text-sm text-slate-300 max-w-3xl mx-auto">
          Get in touch with Sampati Devi Group of Colleges for admissions,
          academic inquiries, and general information.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Contact Information */}
          <div className="bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-indigo-950 mb-1">
                  Address
                </h3>

                <p className="text-sm text-slate-600">
                  Sampati Devi Group of Colleges,
                  <br />
                  Mandi, Himachal Pradesh, India
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-indigo-950 mb-1">
                  Phone
                </h3>

                <p className="text-sm text-slate-600">+91 XXXXXXXXXX</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-indigo-950 mb-1">
                  Email
                </h3>

                <p className="text-sm text-slate-600">
                  info@sampatidevi.edu.in
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-indigo-950 mb-1">
                  Office Hours
                </h3>

                <p className="text-sm text-slate-600">
                  Monday - Saturday
                  <br />
                  9:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Send a Message
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-700 resize-none"
              />

              <button
                type="submit"
                className="w-full bg-indigo-950 text-white py-2.5 text-sm font-semibold hover:bg-indigo-900 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-4 bg-white border border-slate-200 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Find Us</h2>

          <div className="h-80 w-full overflow-hidden border border-slate-200">
            <iframe
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.8986764643178!2d76.94156071055657!3d31.74596653585484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904e36578e937a1%3A0xa1a440992b133616!2sSampati%20Devi%20Memorial%20Pharmacy%20College!5e0!3m2!1sen!2sin!4v1781161950390!5m2!1sen!2sin"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
