import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Stethoscope, ArrowRight } from 'lucide-react';

export default function NursingFooter() {
  return (
    <footer className="bg-teal-950 text-teal-100 pt-16 pb-8 border-t-4 border-teal-600">
      <div className="container mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Branding / About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Stethoscope size={28} />
              <h3 className="font-bold text-2xl">Nursing Dept</h3>
            </div>
            <p className="text-sm text-teal-300 leading-relaxed">
              Dedicated to nurturing compassionate healthcare professionals. 
              Excellence in nursing education, clinical practice, and research.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-2">Academic Links</h3>
            <ul className="space-y-3 text-sm text-teal-300">
              <li><Link to="#" className="flex items-center gap-2 hover:text-white transition-colors"><ArrowRight size={14}/> Clinical Postings</Link></li>
              <li><Link to="#" className="flex items-center gap-2 hover:text-white transition-colors"><ArrowRight size={14}/> Course Curriculum</Link></li>
              <li><Link to="#" className="flex items-center gap-2 hover:text-white transition-colors"><ArrowRight size={14}/> Library Resources</Link></li>
              <li><Link to="#" className="flex items-center gap-2 hover:text-white transition-colors"><ArrowRight size={14}/> Student Portal</Link></li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-2">Contact Us</h3>
            <div className="space-y-3 text-sm text-teal-300">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-teal-500 shrink-0" />
                <span>Sampati Devi College, Near City Hospital, Main Road, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-teal-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-teal-500" />
                <span>info@sampatidevi.com</span>
              </div>
            </div>
          </div>

          {/* 4. Follow & Connect */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-2">Stay Connected</h3>
            <p className="text-sm text-teal-300">Follow us for updates on clinical events and campus life.</p>
            <div className="flex gap-4">
              <a href="#" className="bg-teal-900 p-3 rounded-full hover:bg-teal-600 transition-all"><MapPin size={18}/></a>
              <a href="#" className="bg-teal-900 p-3 rounded-full hover:bg-teal-600 transition-all"><Stethoscope size={18}/></a>
              <a href="#" className="bg-teal-900 p-3 rounded-full hover:bg-teal-600 transition-all"><ArrowRight size={18}/></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-teal-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-teal-500">
          <p>&copy; {new Date().getFullYear()} Sampati Devi Group of Colleges. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}