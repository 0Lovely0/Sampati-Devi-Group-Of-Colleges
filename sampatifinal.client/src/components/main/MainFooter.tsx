import { Link } from "react-router-dom";
import { collegeInfo, footerLinks } from "../../data/content";
import { departments } from "../../data/departments";
import { Phone, Mail, MapPin } from "lucide-react";

// Social Icons (inline SVGs)
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || "h-5 w-5"}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || "h-5 w-5"}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.2 4.2 0 0 0 1.84-2.31 8.38 8.38 0 0 1-2.66 1.02 4.18 4.18 0 0 0-7.13 3.81A11.86 11.86 0 0 1 3.15 4.6a4.17 4.17 0 0 0 1.29 5.58 4.15 4.15 0 0 1-1.89-.52v.05a4.18 4.18 0 0 0 3.35 4.1 4.2 4.2 0 0 1-1.88.07 4.18 4.18 0 0 0 3.9 2.9A8.38 8.38 0 0 1 2 19.54a11.82 11.82 0 0 0 6.29 1.84c7.55 0 11.69-6.26 11.69-11.69 0-.18-.01-.36-.02-.54A8.36 8.36 0 0 0 22.46 6z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || "h-5 w-5"}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm5.5-3.6a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || "h-5 w-5"}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);

export default function MainFooter() {
  return (
    <footer className="bg-indigo-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* COLLEGE INFO */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 border border-slate-700">
                <img
                  src="/logo1.ico"
                  alt="Logo"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {collegeInfo.name}
                </h3>
                <p className="text-xs text-amber-500 font-bold uppercase tracking-widest">
                  {collegeInfo.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Established in {collegeInfo.established}, we are committed to
              providing quality healthcare education and producing competent
              professionals.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-amber-500 shrink-0" />
                <span>{collegeInfo.address}</span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                <span>{collegeInfo.phone}</span>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-amber-500 shrink-0" />
                <span className="break-all">{collegeInfo.email}</span>
              </div>
            </div>
          </div>

          {/* ABOUT, DEPARTMENTS, QUICK LINKS */}
          {[
            { title: "About", links: footerLinks.about, isDept: false },
            { title: "Institutes", links: departments, isDept: true },
            { title: "Quick Links", links: footerLinks.quick, isDept: false },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="mb-6 font-bold text-white text-sm uppercase tracking-wider">
                {section.title}
              </h4>

              <ul className="space-y-3">
                {section.links.map((link: any, index: number) => (
                  <li key={link.slug || link.id || link.href || index}>
                    <Link
                      to={
                        section.isDept
                          ? `/programs/${link.slug ?? link.id}`
                          : link.href
                      }
                      className="text-sm hover:text-amber-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      {section.isDept
                        ? link.name || link.shortName || link.label
                        : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-6">
          <p className="text-xs text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} {collegeInfo.name}. All rights
            reserved. |
            <span className="ml-3 text-white text-sm">Designed by Appilogics</span>
          </p>

          <div className="flex gap-6 text-slate-400">
            {[FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-amber-500 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
