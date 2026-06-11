import { Link } from "react-router-dom";
import { collegeInfo, footerLinks, departments } from "../../data/content";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

// Social Icons
const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.315 2c2.43 0 2.784.013 3.808.06..." />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768..." />
  </svg>
);

export default function MainFooter() {
  return (
    <footer className="bg-indigo-950 text-white border-t border-white/10">
      {/* MAIN */}
      <div className="container-main px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* COLLEGE INFO */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <img
                  src="/logo1.ico"
                  alt="College Logo"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {collegeInfo.name}
                </h3>
                <p className="text-xs text-slate-300">{collegeInfo.tagline}</p>
              </div>
            </div>

            <p className="mb-4 text-sm text-slate-300 leading-relaxed">
              Established in {collegeInfo.established}, we are committed to
              providing quality healthcare education and producing competent
              professionals.
            </p>

            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex gap-2">
                <MapPin className="h-4 w-4 text-amber-400" />
                {collegeInfo.address}
              </div>
              <div className="flex gap-2">
                <Phone className="h-4 w-4 text-amber-400" />
                {collegeInfo.phone}
              </div>
              <div className="flex gap-2">
                <Mail className="h-4 w-4 text-amber-400" />
                {collegeInfo.email}
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="mb-4 font-semibold text-amber-400">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-sm text-slate-300 hover:text-white"
                    to={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DEPARTMENTS */}
          <div>
            <h4 className="mb-4 font-semibold text-amber-400">Departments</h4>
            <ul className="space-y-2">
              {departments.map((dept) => (
                <li key={dept.id}>
                  <Link
                    className="text-sm text-slate-300 hover:text-white"
                    to={`/department/${dept.id}`}
                  >
                    {dept.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="mb-4 font-semibold text-amber-400">Quick Links</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.quick.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-sm text-slate-300 hover:text-white"
                    to={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="container-main flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} {collegeInfo.name}. All rights
            reserved.
          </p>

          <div className="flex gap-4 text-slate-300">
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
            <YoutubeIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}
