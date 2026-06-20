import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Image,
  Bell,
  GraduationCap,
  ArrowLeft,
  Menu,
  X,
  Newspaper,
  VideoIcon,
  Handshake,
} from "lucide-react";

import { departments } from "../../data/departments";

export default function ProgramNavbar() {
  const { slug } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const department = departments.find((dept) => dept.slug === slug);

  const theme = department?.theme || {
    primary: "#0F766E",
    accent: "#14B8A6",
  };

  const navItems = [
    { label: "Home", path: `/programs/${slug}`, icon: LayoutDashboard },
    { label: "Faculty", path: `/programs/${slug}/faculty`, icon: Users },
    { label: "Gallery", path: `/programs/${slug}/gallery`, icon: Image },
    { label: "Notices", path: `/programs/${slug}/notices`, icon: Bell },
    { label: "News", path: `/programs/${slug}/news`, icon: Newspaper },
    { label: "Videos", path: `/programs/${slug}/videos`, icon: VideoIcon },
    { label: "Toppers", path: `/programs/${slug}/toppers`, icon: Handshake },
    {
      label: "Admissions",
      // path: `/programs/${slug}/admissions`,
      path: `/adoption`,
      icon: GraduationCap,
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="w-full mx-auto px-4">
        {/* HEADER */}
        <div className="h-16 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
              style={{ backgroundColor: theme.primary }}
            >
              <img
                src="/logo1.ico"
                alt="Department Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h2
                className="font-bold text-sm md:text-2xl truncate"
                style={{ color: theme.primary }}
              >
                {department?.name}
              </h2>

              <p className="text-[15px] text-slate-500 hidden sm:block">
                Department Portal
              </p>
            </div>
          </div>

          {/* DESKTOP BACK BUTTON */}
          <NavLink
            to="/"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
            style={{ backgroundColor: theme.primary }}
          >
            <ArrowLeft size={16} />
            Back to main site
          </NavLink>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-200 active:scale-95 transition"
            style={{ color: theme.primary }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2 py-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.label === "Overview"}
              >
                {({ isActive }) => (
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                    style={
                      isActive
                        ? { backgroundColor: theme.primary, color: "#fff" }
                        : {
                            backgroundColor: "#F8FAFC",
                            color: "#475569",
                            border: "1px solid #E2E8F0",
                          }
                    }
                  >
                    <Icon size={16} />
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* MOBILE MENU OVERLAY */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
            {/* SIDE PANEL */}
            <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto">
              {/* HEADER */}
              <div
                className="flex items-center justify-between px-4 py-4 border-b"
                style={{ borderColor: "#E2E8F0" }}
              >
                <div>
                  <h3 className="font-bold text-slate-900">
                    {department?.name}
                  </h3>
                  <p className="text-xs text-slate-500">Navigation Menu</p>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg border"
                >
                  <X size={18} />
                </button>
              </div>

              {/* NAV ITEMS */}
              <div className="p-3 space-y-2">
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                  <div
                    className="flex items-center gap-3 px-4 py-3 mb-5 rounded-xl text-white font-medium"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <ArrowLeft size={18} />
                    back to main website
                  </div>
                </NavLink>

                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.label === "Overview"}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {({ isActive }) => (
                        <div
                          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all"
                          style={
                            isActive
                              ? {
                                  backgroundColor: theme.primary,
                                  color: "#fff",
                                }
                              : {
                                  backgroundColor: "#F8FAFC",
                                  color: "#475569",
                                  border: "1px solid #E2E8F0",
                                }
                          }
                        >
                          <Icon size={18} />
                          {item.label}
                        </div>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* CLICK OUTSIDE TO CLOSE */}
            <div
              className="w-full h-full"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
