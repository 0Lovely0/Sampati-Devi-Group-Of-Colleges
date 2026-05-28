import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import LayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard";
import Users from "lucide-react/dist/esm/icons/users";
import Settings from "lucide-react/dist/esm/icons/settings";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ChevronUp from "lucide-react/dist/esm/icons/chevron-up";
import Image from "lucide-react/dist/esm/icons/image";
import Newspaper from "lucide-react/dist/esm/icons/newspaper";
import Bell from "lucide-react/dist/esm/icons/bell";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import Film from "lucide-react/dist/esm/icons/film";
import Layout from "lucide-react/dist/esm/icons/layout";

export default function AdminLayout() {
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-10 flex items-center gap-3 text-indigo-400">
          {/* Yahan src mein apni image ka path daalein */}
          <img
            src="/logo1.ico"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          ADMIN PORTAL
        </h2>

        <nav className="flex-1 space-y-8">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase mb-3 ml-2">
              Overview
            </p>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center justify-between p-3 rounded-xl transition ${isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800"}`
              }
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard size={20} /> Dashboard
              </div>
              {location.pathname === "/dashboard" && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              )}
            </NavLink>
          </div>

          <div>
            <button
              onClick={() => setIsManagementOpen(!isManagementOpen)}
              className="flex items-center justify-between w-full text-xs text-slate-500 font-bold uppercase mb-3 ml-2 hover:text-white transition"
            >
              Management{" "}
              {isManagementOpen ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
            {isManagementOpen && (
              <div className="space-y-1 pl-2 border-l border-slate-700 ml-2">
                <SubNavItem
                  to="/dashboard/users"
                  icon={<Users size={16} />}
                  label="Manage Users"
                />
                <SubNavItem
                  to="/dashboard/banner"
                  icon={<Layout size={16} />}
                  label="Manage Banner"
                />
                <SubNavItem
                  to="/dashboard/news"
                  icon={<Newspaper size={16} />}
                  label="Manage News"
                />
                <SubNavItem
                  to="/dashboard/notice"
                  icon={<Bell size={16} />}
                  label="Manage Notice"
                />
                <SubNavItem
                  to="/dashboard/events"
                  icon={<Calendar size={16} />}
                  label="Manage Events"
                />
                <SubNavItem
                  to="/dashboard/gallery"
                  icon={<Image size={16} />}
                  label="Manage Gallery"
                />
                <SubNavItem
                  to="/dashboard/video"
                  icon={<Film size={16} />}
                  label="Manage Video"
                />
              </div>
            )}
          </div>
        </nav>

        <button className="flex items-center gap-3 p-3 text-red-400 hover:text-red-300 mt-auto">
          <LogOut size={20} /> Logout
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

const SubNavItem = ({ to, label, icon }: any) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 p-2 rounded-lg text-sm transition ${isActive ? "text-indigo-400 bg-slate-800" : "text-slate-400 hover:text-white"}`
    }
  >
    {icon} {label}
  </NavLink>
);
