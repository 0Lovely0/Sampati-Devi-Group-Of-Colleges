// import React, { useState } from "react";
// import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   LogOut,
//   ChevronDown,
//   ChevronUp,
//   Image,
//   Newspaper,
//   Bell,
//   Calendar,
//   Film,
//   Layout,
//   GraduationCap
// } from "lucide-react";

// export default function AdminLayout() {
//   const [isManagementOpen, setIsManagementOpen] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();a

  
// const handleLogout = () => {
//   localStorage.clear();
//   navigate("/login");
// };

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
//         <h2 className="text-xl font-bold mb-10 flex items-center gap-3 text-indigo-400">
//           {/* Yahan src mein apni image ka path daalein */}
//           <img src="/logo1.ico" alt="Logo" className="w-8 h-8 object-contain" />
//           ADMIN PORTAL
//         </h2>

//         <nav className="flex-1 space-y-8">
//           <div>
//             <p className="text-xs text-slate-500 font-bold uppercase mb-3 ml-2">
//               Overview
//             </p>
//             <NavLink
//               to="/dashboard"
//               end
//               className={({ isActive }) =>
//                 `flex items-center justify-between p-3 rounded-xl transition ${isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800"}`
//               }
//             >
//               <div className="flex items-center gap-3">
//                 <LayoutDashboard size={20} /> Dashboard
//               </div>
//               {location.pathname === "/dashboard" && (
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
//                 </span>
//               )}
//             </NavLink>
//           </div>

//           <div>
//             <button
//               onClick={() => setIsManagementOpen(!isManagementOpen)}
//               className="flex items-center justify-between w-full text-xs text-slate-500 font-bold uppercase mb-3 ml-2 hover:text-white transition"
//             >
//               Management{" "}
//               {isManagementOpen ? (
//                 <ChevronUp size={14} />
//               ) : (
//                 <ChevronDown size={14} />
//               )}
//             </button>
//             {isManagementOpen && (
//               <div className="space-y-1 pl-2 border-l border-slate-700 ml-2">
//                 <SubNavItem
//                   to="/dashboard/users"
//                   icon={<Users size={16} />}
//                   label="Manage Users"
//                 />
//                 <SubNavItem
//                   to="/dashboard/banner"
//                   icon={<Layout size={16} />}
//                   label="Manage Banner"
//                 />
//                 <SubNavItem
//                   to="/dashboard/news"
//                   icon={<Newspaper size={16} />}
//                   label="Manage News"
//                 />
//                 <SubNavItem
//                   to="/dashboard/notice"
//                   icon={<Bell size={16} />}
//                   label="Manage Notice"
//                 />
//                 <SubNavItem
//                   to="/dashboard/events"
//                   icon={<Calendar size={16} />}
//                   label="Manage Events"
//                 />
//                 <SubNavItem
//                   to="/dashboard/toppers"
//                   icon={<GraduationCap size={16} />}
//                   label="Manage Toppers"
//                 />
//                 <SubNavItem
//                   to="/dashboard/facility"
//                   icon={<GraduationCap size={16} />}
//                   label="Manage Facilities"
//                 />
//                 <SubNavItem
//                   to="/dashboard/committee"
//                   icon={<GraduationCap size={16} />}
//                   label="Manage Committee"
//                 />
//                 <SubNavItem
//                   to="/dashboard/gallery"
//                   icon={<Image size={16} />}
//                   label="Manage Gallery"
//                 />
//                 <SubNavItem
//                   to="/dashboard/video"
//                   icon={<Film size={16} />}
//                   label="Manage Video"
//                 />
//               </div>
//             )}
//           </div>
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 p-3 text-red-400 hover:text-red-300 mt-auto"
//         >
//           <LogOut size={20} />
//           Logout
//         </button>
//       </aside>
//       <main className="flex-1 p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// const SubNavItem = ({ to, label, icon }: any) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `flex items-center gap-2 p-2 rounded-lg text-sm transition ${isActive ? "text-indigo-400 bg-slate-800" : "text-slate-400 hover:text-white"}`
//     }
//   >
//     {icon} {label}
//   </NavLink>
// );

import { useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  LogOut,
  ChevronDown,
  ChevronUp,
  Image,
  Newspaper,
  Bell,
  Calendar,
  Film,
  Layout,
  GraduationCap,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout() {
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
  // Show a confirmation dialog
  const isConfirmed = window.confirm("Are you sure you want to logout?");
  
  if (isConfirmed) {
    localStorage.clear();
    navigate("/login");
  }
};

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-74 bg-slate-900 text-white p-6 flex flex-col transition-transform duration-300 ease-in-out overflow-hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-bold flex items-center gap-3 text-indigo-400">
            <img src="/logo1.ico" alt="Logo" className="w-8 h-8 object-contain" />
            Admin Pannel
          </h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-8 overflow-hidden">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase mb-3 ml-2">Overview</p>
            <NavLink
              to="/dashboard"
              end
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between p-3 rounded-xl transition ${isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800"}`
              }
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard size={20} /> Dashboard
              </div>
            </NavLink>
          </div>

          <div>
            <button
              onClick={() => setIsManagementOpen(!isManagementOpen)}
              className="flex items-center justify-between w-full text-xs text-slate-500 font-bold uppercase mb-3 ml-2 hover:text-white transition"
            >
              Management {isManagementOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {isManagementOpen && (
              <div className="space-y-1 pl-2 border-l border-slate-700 ml-2">
                {[
                  { to: "/dashboard/users", icon: <Users size={16} />, label: "Users" },
                  { to: "/dashboard/banner", icon: <Layout size={16} />, label: "Banner" },
                  { to: "/dashboard/news", icon: <Newspaper size={16} />, label: "News" },
                  { to: "/dashboard/notice", icon: <Bell size={16} />, label: "Notice" },
                  { to: "/dashboard/events", icon: <Calendar size={16} />, label: "Events" },
                  { to: "/dashboard/toppers", icon: <GraduationCap size={16} />, label: "Toppers" },
                  { to: "/dashboard/facility", icon: <GraduationCap size={16} />, label: "Facilities" },
                  { to: "/dashboard/committee", icon: <GraduationCap size={16} />, label: "Committee" },
                  { to: "/dashboard/gallery", icon: <Image size={16} />, label: "Gallery" },
                  { to: "/dashboard/video", icon: <Film size={16} />, label: "Video" },
                ].map((item) => (
                  <SubNavItem key={item.to} {...item} onClick={() => setIsSidebarOpen(false)} />
                ))}
              </div>
            )}
          </div>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 text-red-400 hover:text-red-300 mt-auto"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white p-4 shadow-sm flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="font-semibold text-slate-700">Admin Portal</span>
        </header>
        
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

const SubNavItem = ({ to, label, icon, onClick }: any) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-2 p-2 rounded-lg text-sm transition ${isActive ? "text-indigo-400 bg-slate-800" : "text-slate-400 hover:text-white"}`
    }
  >
    {icon} {label}
  </NavLink>
);
