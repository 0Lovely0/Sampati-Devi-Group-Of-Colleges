// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { ChevronDown, Menu, X } from "lucide-react";
// import { departments } from "../../data/departments";

// interface NavDropdownProps {
//   title: string;
//   links: {
//     name: string;
//     path: string;
//   }[];
// }

// const NavDropdown = ({ title, links }: NavDropdownProps) => (
//   <div className="relative group h-full flex items-center">
//     <button className="flex items-center h-full text-[14px] xl:text-[15px] font-semibold text-slate-700 hover:text-amber-600 transition-colors">
//       {title}

//       <ChevronDown
//         size={16}
//         className="ml-1 transition-transform duration-300 group-hover:rotate-180"
//       />
//     </button>

//     <div
//       className="
//         absolute
//         left-1/2
//         top-full
//         -translate-x-1/2
//         pt-3
//         opacity-0
//         invisible
//         translate-y-2
//         group-hover:opacity-100
//         group-hover:visible
//         group-hover:translate-y-0
//         transition-all
//         duration-300
//         z-50
//       "
//     >
//       <div className="bg-white border border-slate-200 shadow-xl min-w-[280px] overflow-hidden">
//         {links.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className="block px-5 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
//           >
//             {item.name}
//           </Link>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const Navbar: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openSection, setOpenSection] = useState<string | null>(null);

//   const menuRef = useRef<HTMLDivElement>(null);

//   const toggleSection = (section: string) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsMenuOpen(false);
//         setOpenSection(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const aboutMenu = [
//     { name: "About Us", path: "/about" },
//     { name: "Principal Message", path: "/principaldesk" },
//     { name: "Director's Message", path: "/directorpage" },
//     { name: "Committee", path: "/committee" },
//   ];

//   const mediaMenu = [
//     { name: "Gallery", path: "/gallerypage" },
//     { name: "Videos", path: "/videogallerypage" },
//     { name: "Events", path: "/events" },
//   ];

//   const instituteMenu = departments.map((dept) => ({
//     name: dept.name,
//     path: `/programs/${dept.slug}`,
//   }));

//   return (
//    <header className="sticky top-0 z-50 bg-white" ref={menuRef}>

//   {/* Top Bar */}
//   <div className="bg-indigo-950 text-white text-[11px] sm:text-xs">
//     <div className="w-full mx-auto px-4 sm:px-6 py-2">

//       <div className="flex items-center justify-between gap-3 overflow-x-auto">

//         {/* LEFT SIDE - ALWAYS SINGLE LINE */}
//         <div className="flex items-center gap-4 text-slate-200 whitespace-nowrap">

//           <span className="flex items-center gap-1">
//             📧 sdmnursingcollege@gmail.com
//           </span>

//           <span className="hidden md:flex items-center gap-1">
//             📍 Bijni, Mandi, Himachal Pradesh 175001
//           </span>

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-3 text-slate-200 whitespace-nowrap">
//           <span className="flex items-center gap-1">
//             📞 +91 70182 26132
//           </span>
//         </div>

//       </div>
//     </div>
//   </div>

//       {/* Main Navbar */}
//       <nav className="bg-white border-b border-slate-200 shadow-sm">
//         <div className="w-full mx-auto px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 sm:gap-3">
//             <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex-shrink-0 border border-slate-200 overflow-hidden bg-indigo-950  rounded-xl">
//               <img
//                 src="/logo1.ico"
//                 alt="College Logo"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="min-w-0">
//               <h2 className="font-black text-xs sm:text-sm lg:text-lg text-slate-900">
//                 SAMPATI DEVI
//               </h2>

//               <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-600">
//                 Group of Colleges
//               </p>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
//             <Link
//               to="/"
//               className="font-semibold text-slate-700 hover:text-amber-600 transition"
//             >
//               Home
//             </Link>

//             <NavDropdown title="About" links={aboutMenu} />

//             <NavDropdown title="Institutes" links={instituteMenu} />

//             <NavDropdown title="Media" links={mediaMenu} />

//             <Link
//               to="/contact"
//               className="font-semibold text-slate-700 hover:text-amber-600 transition"
//             >
//               Contact
//             </Link>
//           </div>

//           {/* Desktop Buttons */}
//           <div className="hidden lg:flex items-center gap-3">
//             <Link
//               to="/adoption"
//               className="px-4 py-2 bg-indigo-950 text-white text-sm font-medium hover:bg-indigo-950 transition rounded-xl"
//             >
//               Adoption
//             </Link>

//             <Link
//               to="/applynow"
//               className="px-5 py-2 bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition rounded-xl"
//             >
//               Apply Now
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden p-2 text-slate-700"
//           >
//             {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>

//         {/* Mobile & Tablet Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden border-t bg-white max-h-[80vh] overflow-y-auto">
//             <div className="p-4 space-y-2">
//               <Link
//                 to="/"
//                 className="block py-3 font-semibold border-b"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Home
//               </Link>

//               {/* About */}
//               <div className="border-b">
//                 <button
//                   onClick={() => toggleSection("about")}
//                   className="w-full flex justify-between items-center py-3 font-semibold"
//                 >
//                   About
//                   <ChevronDown
//                     size={18}
//                     className={`transition-transform ${
//                       openSection === "about" ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {openSection === "about" && (
//                   <div className="pb-3 pl-4">
//                     {aboutMenu.map((item) => (
//                       <Link
//                         key={item.path}
//                         to={item.path}
//                         className="block py-2 text-slate-600"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         {item.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Institutes */}
//               <div className="border-b">
//                 <button
//                   onClick={() => toggleSection("institutes")}
//                   className="w-full flex justify-between items-center py-3 font-semibold"
//                 >
//                   Institutes
//                   <ChevronDown
//                     size={18}
//                     className={`transition-transform ${
//                       openSection === "institutes" ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {openSection === "institutes" && (
//                   <div className="pb-3 pl-4 max-h-72 overflow-y-auto">
//                     {instituteMenu.map((item) => (
//                       <Link
//                         key={item.path}
//                         to={item.path}
//                         className="block py-2 text-slate-600"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         {item.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Media */}
//               <div className="border-b">
//                 <button
//                   onClick={() => toggleSection("media")}
//                   className="w-full flex justify-between items-center py-3 font-semibold"
//                 >
//                   Media
//                   <ChevronDown
//                     size={18}
//                     className={`transition-transform ${
//                       openSection === "media" ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {openSection === "media" && (
//                   <div className="pb-3 pl-4">
//                     {mediaMenu.map((item) => (
//                       <Link
//                         key={item.path}
//                         to={item.path}
//                         className="block py-2 text-slate-600"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         {item.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <Link
//                 to="/contact"
//                 className="block py-3 font-semibold border-b"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Contact
//               </Link>

//               {/* Mobile Buttons */}
//               <div className="grid grid-cols-2 gap-3 mt-5 text-center py-3 rounded-md text-sm font-semibold">
//                 <Link
//                   to="/adoption"
//                   className="text-center py-3 bg-slate-900 text-white font-medium rounded-xl"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Adoption
//                 </Link>

//                 <Link
//                   to="/applynow"
//                   className="text-center py-3 bg-amber-500 text-black font-semibold rounded-xl"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Apply Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Mail, MapPin, Phone } from "lucide-react";
import { departments } from "../../data/departments";

interface NavDropdownProps {
  title: string;
  links: { name: string; path: string }[];
}

const NavDropdown = ({ title, links }: NavDropdownProps) => (
  <div className="relative group h-full flex items-center">
    <button className="flex items-center text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">
      {title}
      <ChevronDown
        size={16}
        className="ml-1 group-hover:rotate-180 transition-transform duration-300"
      />
    </button>
    <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      <div className="bg-slate-900 border border-slate-700 shadow-2xl min-w-[200px] rounded-xl overflow-hidden backdrop-blur-md">
        {links.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block px-5 py-3 text-sm text-slate-300 hover:bg-indigo-950 hover:text-amber-400 transition-all"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleSection = (section: string) =>
    setOpenSection(openSection === section ? null : section);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    {
      name: "About",
      menu: [
        { name: "About Us", path: "/about" },
        { name: "Principal Message", path: "/principaldesk" },
        { name: "Director's Message", path: "/directorpage" },
        { name: "Committee", path: "/committee" },
      ],
    },
    {
      name: "Institutes",
      menu: departments.map((d) => ({
        name: d.name,
        path: `/programs/${d.slug}`,
      })),
    },
    {
      name: "Media",
      menu: [
        { name: "Gallery", path: "/gallerypage" },
        { name: "Videos", path: "/videogallerypage" },
        { name: "Events", path: "/events" },
      ],
    },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full bg-indigo-950/95 backdrop-blur-lg border-b border-slate-800"
      ref={menuRef}
    >
      {/* Top Bar */}
      <div className="bg-amber-500 text-slate-950 text-[11px] font-bold py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Mail size={12} /> sdmnursingcollege@gmail.com
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} /> Bijni, Mandi, HP 175001
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Phone size={12} /> +91 70182 26132
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500 overflow-hidden bg-indigo-950">
            <img
              src="/logo1.ico"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight">
              SAMPATI DEVI
            </h1>
            <p className="text-[10px] text-amber-500 font-bold tracking-widest uppercase">
              Group of Colleges
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-slate-300 hover:text-amber-400"
          >
            Home
          </Link>
          {navLinks.map((nav) => (
            <NavDropdown key={nav.name} title={nav.name} links={nav.menu} />
          ))}
          <Link
            to="/contact"
            className="text-sm font-medium text-slate-300 hover:text-amber-400"
          >
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/adoption"
            className="px-5 py-2 text-sm font-medium text-white border border-slate-700 rounded-full hover:bg-slate-900"
          >
            Adoption
          </Link>
          <Link
            to="/applynow"
            className="px-5 py-2 text-sm font-semibold bg-amber-500 text-slate-950 rounded-full hover:bg-amber-400 transition-all"
          >
            Apply Now
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
{isMenuOpen && (
  <div className="lg:hidden bg-indigo-950 border-t border-slate-800 absolute w-full h-[calc(100vh-80px)] overflow-y-auto p-3 z-40">
    <div className="flex flex-col gap-6">

      {navLinks.map((nav) => (
        <div key={nav.name} className="border-b border-slate-800 pb-2">
          <button
            onClick={() => toggleSection(nav.name)}
            className="flex justify-between w-full text-slate-200 font-semibold py-2"
          >
            {nav.name}
            <ChevronDown
              size={18}
              className={`transition-transform ${
                openSection === nav.name ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === nav.name && (
            <div className="flex flex-col gap-2 pt-2">
              {nav.menu.map((m) => (
                <Link
                  key={m.path}
                  to={m.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 pl-4 text-sm text-slate-400 hover:text-amber-400"
                >
                  {m.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

     
      <div>
        <Link
          to="/contact"
          onClick={() => setIsMenuOpen(false)}
          className="w-full text-center text-white"
        >
          Contact
        </Link>
      </div>

      {/* Mobile Action Buttons - Now explicitly placed and clickable */}
      <div className="flex flex-col gap-3 mt-4">
        <Link
          to="/adoption"
          onClick={() => setIsMenuOpen(false)}
          className="w-full text-center py-3 bg-slate-500 text-white font-medium rounded-xl hover:bg-slate-700 transition"
        >
          Adoption
        </Link>
        <Link
          to="/applynow"
          onClick={() => setIsMenuOpen(false)}
          className="w-full text-center py-3 bg-amber-500 text-slate-950 font-semibold rounded-xl hover:bg-amber-400 transition"
        >
          Apply Now
        </Link>
      </div>
    </div>
  </div>
)}
    </header>
   
  );
};

export default Navbar;
