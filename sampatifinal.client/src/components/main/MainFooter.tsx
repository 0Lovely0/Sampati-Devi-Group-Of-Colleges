// import { Link } from "react-router-dom";
// import { collegeInfo, footerLinks, departments } from "../../data/content";
// import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

// // Social Icons
// const FacebookIcon = () => (
//   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//     <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
//   </svg>
// );

// const TwitterIcon = () => (
//   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//   </svg>
// );

// const InstagramIcon = () => (
//   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//     <path d="M12.315 2c2.43 0 2.784.013 3.808.06..." />
//   </svg>
// );

// const YoutubeIcon = () => (
//   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//     <path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768..." />
//   </svg>
// );

// export default function MainFooter() {
//   return (
//     <footer className="bg-indigo-950 text-white border-t border-white/10">
//       <div className="container-main px-4 sm:px-6 py-10">
//         <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
//           {/* COLLEGE INFO */}
//           <div className="lg:col-span-2 space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10">
//                 <img
//                   src="/logo1.ico"
//                   alt="College Logo"
//                   className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
//                 />
//               </div>

//               <div>
//                 <h3 className="text-base sm:text-xl font-bold">
//                   {collegeInfo.name}
//                 </h3>
//                 <p className="text-[11px] sm:text-xs text-slate-300">
//                   {collegeInfo.tagline}
//                 </p>
//               </div>
//             </div>

//             <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
//               Established in {collegeInfo.established}, we are committed to
//               providing quality healthcare education and producing competent
//               professionals.
//             </p>

//             <div className="space-y-2 text-xs sm:text-sm text-slate-300">
//               <div className="flex gap-2 items-start">
//                 <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
//                 <span>{collegeInfo.address}</span>
//               </div>

//               <div className="flex gap-2 items-center">
//                 <Phone className="h-4 w-4 text-amber-400" />
//                 <span>{collegeInfo.phone}</span>
//               </div>

//               <div className="flex gap-2 items-center">
//                 <Mail className="h-4 w-4 text-amber-400" />
//                 <span className="break-all">{collegeInfo.email}</span>
//               </div>
//             </div>
//           </div>

//           {/* ABOUT */}
//           <div>
//             <h4 className="mb-4 font-semibold text-amber-400 text-sm sm:text-base">
//               About
//             </h4>

//             <ul className="space-y-2">
//               {footerLinks.about.map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     to={link.href}
//                     className="text-xs sm:text-sm text-slate-300 hover:text-white transition"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* DEPARTMENTS */}
//           <div>
//             <h4 className="mb-4 font-semibold text-amber-400 text-sm sm:text-base">
//               Departments
//             </h4>

//             <ul className="space-y-2">
//               {departments.map((dept) => (
//                 <li key={dept.id}>
//                   <Link
//                     to={`/department/${dept.id}`}
//                     className="text-xs sm:text-sm text-slate-300 hover:text-white transition"
//                   >
//                     {dept.shortName}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* QUICK LINKS */}
//           <div>
//             <h4 className="mb-4 font-semibold text-amber-400 text-sm sm:text-base">
//               Quick Links
//             </h4>

//             <ul className="space-y-2 mb-5">
//               {footerLinks.quick.map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     to={link.href}
//                     className="text-xs sm:text-sm text-slate-300 hover:text-white transition"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             <Link
//               to="/applynow"
//               className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-4 py-2 text-xs sm:text-sm font-semibold text-black hover:bg-amber-400 transition"
//             >
//               Apply Now <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM BAR */}
//       <div className="border-t border-white/10">
//         <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4">
//           <p className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left">
//             © {new Date().getFullYear()} {collegeInfo.name}. All rights
//             reserved.
//           </p>

//           <div className="flex gap-5 text-slate-300">
//             <div className="hover:text-white cursor-pointer transition">
//               <FacebookIcon />
//             </div>
//             <div className="hover:text-white cursor-pointer transition">
//               <TwitterIcon />
//             </div>
//             <div className="hover:text-white cursor-pointer transition">
//               <InstagramIcon />
//             </div>
//             <div className="hover:text-white cursor-pointer transition">
//               <YoutubeIcon />
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


import { Link } from "react-router-dom";
import { collegeInfo, footerLinks, departments } from "../../data/content";
import { Phone, Mail, MapPin } from "lucide-react";

// Social Icons (inline SVGs)
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className || "h-5 w-5"} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className || "h-5 w-5"} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.2 4.2 0 0 0 1.84-2.31 8.38 8.38 0 0 1-2.66 1.02 4.18 4.18 0 0 0-7.13 3.81A11.86 11.86 0 0 1 3.15 4.6a4.17 4.17 0 0 0 1.29 5.58 4.15 4.15 0 0 1-1.89-.52v.05a4.18 4.18 0 0 0 3.35 4.1 4.2 4.2 0 0 1-1.88.07 4.18 4.18 0 0 0 3.9 2.9A8.38 8.38 0 0 1 2 19.54a11.82 11.82 0 0 0 6.29 1.84c7.55 0 11.69-6.26 11.69-11.69 0-.18-.01-.36-.02-.54A8.36 8.36 0 0 0 22.46 6z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className || "h-5 w-5"} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm5.5-3.6a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className || "h-5 w-5"} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
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
                <img src="/logo1.ico" alt="Logo" className="h-8 w-8 object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{collegeInfo.name}</h3>
                <p className="text-xs text-amber-500 font-bold uppercase tracking-widest">{collegeInfo.tagline}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Established in {collegeInfo.established}, we are committed to providing quality healthcare education and producing competent professionals.
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
            { title: "Departments", links: departments, isDept: true },
            { title: "Quick Links", links: footerLinks.quick, isDept: false },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="mb-6 font-bold text-white text-sm uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link: any) => (
                  <li key={link.id || link.href}>
                    <Link
                      to={section.isDept ? `/programs/${link.id}` : link.href}
                      className="text-sm hover:text-amber-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      {section.isDept ? link.shortName : link.label}
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
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {collegeInfo.name}. All rights reserved.
          </p>

          <div className="flex gap-6 text-slate-400">
            {[FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon].map((Icon, idx) => (
              <a key={idx} href="#" className="hover:text-amber-500 transition-colors">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}