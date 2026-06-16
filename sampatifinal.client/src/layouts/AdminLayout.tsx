import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, LogOut, ChevronDown, ChevronUp, Image, Newspaper,
  Bell, Calendar, Film, Layout, GraduationCap, Menu, X, Home
} from "lucide-react";

export default function AdminLayout() {
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="h-screen w-full flex bg-stone-50">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-indigo-950 text-white flex flex-col h-screen transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        
        {/* LOGO */}
        <div className="flex items-center justify-between px-6 py-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-1.5 rounded-lg text-slate-950">
              <LayoutDashboard size={20} />
            </div>
            <h2 className="text-sm font-black uppercase tracking-widest">Admin Panel</h2>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 hover:bg-white/10 rounded-lg"><X size={20} /></button>
        </div>

        {/* NAV */}
      <nav className="no-scrollbar flex-1 overflow-y-auto px-4 py-6 space-y-2">
          <NavLink to="/dashboard" end className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${isActive ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <div className="pt-4">
            <button onClick={() => setIsManagementOpen(!isManagementOpen)} className="flex items-center justify-between w-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition">
              Management {isManagementOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {isManagementOpen && (
              <div className="mt-2 space-y-1">
                <SubNavItem to="/dashboard/banner" icon={<Layout size={16} />} label="Banner" />
                <SubNavItem to="/dashboard/news" icon={<Newspaper size={16} />} label="News" />
                <SubNavItem to="/dashboard/notice" icon={<Bell size={16} />} label="Notice" />
                <SubNavItem to="/dashboard/events" icon={<Calendar size={16} />} label="Events" />
                <SubNavItem to="/dashboard/toppers" icon={<GraduationCap size={16} />} label="Toppers" />
                <SubNavItem to="/dashboard/placements" icon={<GraduationCap size={16} />} label="Placement" />
                <SubNavItem to="/dashboard/committee" icon={<GraduationCap size={16} />} label="committee" />
                <SubNavItem to="/dashboard/facility" icon={<GraduationCap size={16} />} label="Facilities" />
                <SubNavItem to="/dashboard/gallery" icon={<Image size={16} />} label="Gallery" />
                <SubNavItem to="/dashboard/video" icon={<Film size={16} />} label="Video" />
              </div>
            )}
          </div>
        </nav>

        {/* FOOTER ACTIONS */}
        <div className="border-t border-white/10 p-6 space-y-3">
          <button onClick={() => window.location.href = "/"} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition">
            <Home size={16} /> Website
          </button>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase tracking-widest transition">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="lg:hidden flex items-center justify-between bg-white px-6 py-4 border-b border-stone-200">
          <button onClick={() => setIsSidebarOpen(true)}><Menu size={22} /></button>
          <span className="font-black text-sm uppercase tracking-widest">Dashboard</span>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

const SubNavItem = ({ to, label, icon }: any) => (
  <NavLink to={to} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${isActive ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
    {icon} {label}
  </NavLink>
);