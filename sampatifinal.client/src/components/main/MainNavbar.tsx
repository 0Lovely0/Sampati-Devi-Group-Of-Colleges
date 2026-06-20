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
    <button className="flex items-center text-lg font-medium text-slate-300 hover:text-amber-400 transition-colors">
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
        <div className="w-full mx-auto px-6 flex justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm">
              <Mail size={12} /> sdmnursingcollege@gmail.com
            </span>
            <span className="flex items-center gap-1 text-sm">
              <MapPin size={12} /> Bijni, Mandi, HP 175001
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm">
            <Phone size={12} /> +91 7807377091, +91 9418025164
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="w-full mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500 overflow-hidden bg-indigo-950">
            <img
              src="/logo1.ico"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight">
              SAMPATI DEVI
            </h1>
            <p className="text-[15px] text-amber-500 font-bold tracking-widest uppercase">
              Group of Colleges
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className="text-lg font-medium text-slate-300 hover:text-amber-400"
          >
            Home
          </Link>
          {navLinks.map((nav) => (
            <NavDropdown key={nav.name} title={nav.name} links={nav.menu} />
          ))}
          <Link
            to="/applynow"
            className="text-lg font-medium text-slate-300 hover:text-amber-400"
          >
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/adoption"
            className="px-5 py-2 text-lg font-medium text-white border border-slate-700 rounded-full bg-indigo-900 hover:bg-slate-900"
          >
            Adoption
          </Link>
          <Link
            to="/applynow"
            className="px-5 py-2 text-lg font-semibold bg-amber-500 text-slate-950 rounded-full hover:bg-amber-400 transition-all"
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
