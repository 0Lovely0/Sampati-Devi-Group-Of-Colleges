export default function MainFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-extrabold text-white">SAMPATI DEVI</h2>
          <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mt-1">Group of Colleges</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-sm">
            Dedicated to excellence in education and shaping the future of healthcare professionals. 
            Join our growing community today.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h3 className="text-white font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-indigo-400 transition-colors">About Us</a></li>
            <li><a href="/admissions" className="hover:text-indigo-400 transition-colors">Admissions</a></li>
            <li><a href="/events" className="hover:text-indigo-400 transition-colors">Campus Events</a></li>
            <li><a href="/contact" className="hover:text-indigo-400 transition-colors">Contact Support</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-white font-bold mb-4">Contact Info</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>📍 Main Road, Near City Hospital, India</li>
            <li>📞 +91 98765 43210</li>
            <li>📧 info@sampatidevicolleges.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>© 2026 Sampati Devi Group of Colleges. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}