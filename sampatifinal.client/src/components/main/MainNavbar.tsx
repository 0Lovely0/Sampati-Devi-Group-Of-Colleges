import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { departments } from "../../data/departments";

interface NavDropdownProps {
  title: string;
  links: {
    name: string;
    path: string;
  }[];
}

const NavDropdown = ({ title, links }: NavDropdownProps) => (
  <div className="relative group h-full flex items-center">
    <button className="flex items-center h-full text-[14px] xl:text-[15px] font-semibold text-slate-700 hover:text-amber-600 transition-colors">
      {title}

      <ChevronDown
        size={16}
        className="ml-1 transition-transform duration-300 group-hover:rotate-180"
      />
    </button>

    <div
      className="
        absolute
        left-1/2
        top-full
        -translate-x-1/2
        pt-3
        opacity-0
        invisible
        translate-y-2
        group-hover:opacity-100
        group-hover:visible
        group-hover:translate-y-0
        transition-all
        duration-300
        z-50
      "
    >
      <div className="bg-white border border-slate-200 shadow-xl min-w-[280px] overflow-hidden">
        {links.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block px-5 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
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

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setOpenSection(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const aboutMenu = [
    { name: "About Us", path: "/about" },
    { name: "Principal Message", path: "/principaldesk" },
    { name: "Director's Message", path: "/directorpage" },
    { name: "Committee", path: "/committee" },
  ];

  const mediaMenu = [
    { name: "Gallery", path: "/gallerypage" },
    { name: "Videos", path: "/videogallerypage" },
    { name: "Events", path: "/events" },
  ];

  const instituteMenu = departments.map((dept) => ({
    name: dept.name,
    path: `/dept/${dept.slug}`,
  }));

  return (
    <header className="sticky top-0 z-50 bg-white" ref={menuRef}>
      {/* Top Bar */}
      <div className="bg-slate-950 text-white">
        <div className="w-full mx-auto px-4 sm:px-6 py-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="truncate">📧 sdmnursingcollege@gmail.com</span>

              <span className="hidden xl:block">
                📍 Bijni, Mandi, Himachal Pradesh 175001
              </span>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3">
                <Link
                to="/login"
                className="px-3 py-1 bg-white/5 border border-white/5 text-white/5 text-xs font-medium transition-all duration-300 hover:bg-amber-600 hover:border-amber-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/30" 
              >
                Admin Login
              </Link>
              <span>📞 +91 70182 26132</span>

            
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="w-full mx-auto px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 border border-slate-200 overflow-hidden bg-indigo-950">
              <img
                src="/logo1.ico"
                alt="College Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h2 className="font-black text-sm sm:text-base lg:text-lg text-slate-900 truncate">
                SAMPATI DEVI
              </h2>

              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-600 truncate">
                Group of Colleges
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            <Link
              to="/"
              className="font-semibold text-slate-700 hover:text-amber-600 transition"
            >
              Home
            </Link>

            <NavDropdown title="About" links={aboutMenu} />

            <NavDropdown title="Institutes" links={instituteMenu} />

            <NavDropdown title="Media" links={mediaMenu} />

            <Link
              to="/contact"
              className="font-semibold text-slate-700 hover:text-amber-600 transition"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/adoption"
              className="px-4 py-2 bg-slate-950 text-white text-sm font-medium hover:bg-slate-800 transition"
            >
              Adoption
            </Link>

            <Link
              to="/applynow"
              className="px-5 py-2 bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-700"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile & Tablet Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="p-5">
              <Link
                to="/"
                className="block py-3 font-semibold border-b"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* About */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection("about")}
                  className="w-full flex justify-between items-center py-3 font-semibold"
                >
                  About
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      openSection === "about" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSection === "about" && (
                  <div className="pb-3 pl-4">
                    {aboutMenu.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2 text-slate-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Institutes */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection("institutes")}
                  className="w-full flex justify-between items-center py-3 font-semibold"
                >
                  Institutes
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      openSection === "institutes" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSection === "institutes" && (
                  <div className="pb-3 pl-4 max-h-72 overflow-y-auto">
                    {instituteMenu.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2 text-slate-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Media */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection("media")}
                  className="w-full flex justify-between items-center py-3 font-semibold"
                >
                  Media
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      openSection === "media" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSection === "media" && (
                  <div className="pb-3 pl-4">
                    {mediaMenu.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2 text-slate-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="block py-3 font-semibold border-b"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <Link
                  to="/adoption"
                  className="text-center py-3 bg-slate-900 text-white font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Adoption
                </Link>

                <Link
                  to="/applynow"
                  className="text-center py-3 bg-amber-500 text-black font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
