// import React from "react";
// import { Link } from "react-router-dom";
// import { Bell, Sparkles, ArrowRight } from "lucide-react";

// const notices = [
//   { id: 1, date: "May 25", title: "Semester Exam Form Filling Deadline" },
//   { id: 2, date: "May 22", title: "Campus Recruitment Drive - 2026 Batch" },
//   { id: 3, date: "May 20", title: "Holiday Announcement: Summer Break" },
//   { id: 4, date: "May 18", title: "Workshop on Advanced Nursing Skills" },
//   { id: 5, date: "May 15", title: "Library Membership Renewal Process" },
//   { id: 6, date: "May 12", title: "Annual Sports Day Registration Open" },
// ];

// // duplicate for smooth infinite scroll
// const scrollingNotices = [...notices, ...notices];

// const NoticeBoard: React.FC = () => {
//   return (
//     <section className="bg-gradient-to-br from-indigo-50 via-white to-amber-50 py-10 ">
//       <div className="mx-auto w-full px-4">
//         <div className="grid lg:grid-cols-12 gap-6">

//           {/* ⭐ LEFT BRANDING (UNIQUE MODERN CARD) */}
//           <div className="lg:col-span-4">
//             <div className="relative overflow-hidden bg-indigo-950 to-slate-100 border border-slate-200 p-6 shadow-lg">

//               {/* floating glow */}
//               <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200 blur-3xl opacity-40 rounded-full" />

//               <div className="flex items-center gap-3">
//                 <div className="p-3 rounded-2xl bg-amber-600 text-white shadow-md">
//                   <Bell size={20} />
//                 </div>

//                 <div>
//                   <h2 className="text-lg font-black text-white">
//                     Notice Board
//                   </h2>
//                   <p className="text-xs text-white">
//                     Stay updated in real time
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-5 flex items-center gap-2 text-amber-500 font-semibold text-sm">
//                 <Sparkles size={14} />
//                 Important Announcements Hub
//               </div>

//               <p className="mt-3 text-sm text-white leading-6">
//                 All academic updates, exams, placements, events and circulars
//                 are published here instantly for students and faculty.
//               </p>

//               {/* mini highlight cards */}
//               <div className="mt-5 grid grid-cols-2 gap-3">
//                 <div className="rounded-2xl bg-white border border-slate-200 p-3">
//                   <h3 className="text-lg font-bold text-amber-600">24/7</h3>
//                   <p className="text-xs text-slate-500">Live Updates</p>
//                 </div>

//                 <div className="rounded-2xl bg-white border border-slate-200 p-3">
//                   <h3 className="text-lg font-bold text-amber-600">100+</h3>
//                   <p className="text-xs text-slate-500">Notices</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ⭐ RIGHT NOTICE BOARD (TOP → BOTTOM SCROLL) */}
//           <div className="lg:col-span-8">
//             <div className="border border-slate-200 bg-white p-5">

//               {/* header */}
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-bold text-slate-900">
//                   Latest Notices
//                 </h3>

//                 <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-600">
//                   Auto Scroll
//                 </span>
//               </div>

//               {/* SCROLL BOX */}
//               <div className="relative h-[320px] overflow-hidden">

//                 {/* TOP → BOTTOM SCROLL ANIMATION */}
//                 <div className="animate-[scrollTop_18s_linear_infinite] space-y-3">
//                   {scrollingNotices.map((notice, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 hover:bg-amber-50 transition"
//                     >
//                       <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">
//                         {notice.date}
//                       </span>

//                       <p className="text-sm font-medium text-slate-700">
//                         {notice.title}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* fade top */}
//                 <div className="pointer-events-none absolute top-0 h-10 w-full bg-gradient-to-b from-white to-transparent" />

//                 {/* fade bottom */}
//                 <div className="pointer-events-none absolute bottom-0 h-10 w-full bg-gradient-to-t from-white to-transparent" />
//               </div>

//               {/* button */}
//               <Link to="/noticeboardpage">
//                 <button className="mt-5 w-full flex items-center justify-center gap-2 bg-amber-600 py-3 text-white font-semibold hover:bg-amber-700 transition">
//                   View All Notices <ArrowRight size={16} />
//                 </button>
//               </Link>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* SCROLL KEYFRAME (ADD IN GLOBAL CSS OR TAILWIND LAYER) */}
//       <style>
//         {`
//           @keyframes scrollTop {
//             0% { transform: translateY(0); }
//             100% { transform: translateY(-50%); }
//           }
//         `}
//       </style>
//     </section>
//   );
// };

// export default NoticeBoard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Sparkles, ArrowRight } from "lucide-react";
import {
  getAllNotifications,
  type Notification,
} from "../../services/notificationService";
import Loader from "../../components/common/Loader";

const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);

        const data = await getAllNotifications();

        // optional: only active notices
        const active = data.filter((n) => n.notification_status === true);

        // latest first
        active.sort(
          (a, b) =>
            new Date(b.notification_date).getTime() -
            new Date(a.notification_date).getTime(),
        );

        setNotices(active);
      } catch (err) {
        console.error("Notice fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // duplicate for infinite scroll
  const scrollingNotices = [...notices, ...notices];

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-amber-50 py-10">
      <div className="mx-auto w-full px-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* LEFT CARD */}
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden bg-indigo-950 border border-slate-200 p-6 shadow-lg">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200 blur-3xl opacity-40 rounded-full" />

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-600 text-white shadow-md">
                  <Bell size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-white">
                    Notice Board
                  </h2>
                  <p className="text-xs text-white">Live Notification System</p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-amber-500 font-semibold text-sm">
                <Sparkles size={14} />
                Real-time Updates
              </div>

              <p className="mt-3 text-sm text-white leading-6">
                All academic updates, exams, placements, events and circulars
                are published here instantly.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-3">
                  <h3 className="text-lg font-bold text-amber-600">
                    {notices.length}
                  </h3>
                  <p className="text-xs text-slate-500">Active Notices</p>
                </div>

                <div className="rounded-2xl bg-white p-3">
                  <h3 className="text-lg font-bold text-amber-600">Live</h3>
                  <p className="text-xs text-slate-500">System Status</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SCROLL BOARD */}
          <div className="lg:col-span-8">
            <div className="border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Latest Notices
                </h3>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-600">
                  Auto Scroll
                </span>
              </div>

              {/* LOADING */}
              {loading ? (
                <div className="h-[320px] flex items-center justify-center">
                  <Loader text="Loading notices..." />
                </div>
              ) : (
                <div className="relative h-[320px] overflow-hidden">
                  <div className="animate-[scrollTop_18s_linear_infinite] space-y-3">
                    {scrollingNotices.map((notice, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 hover:bg-amber-50 transition"
                      >
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">
                          {formatDate(notice.notification_date)}
                        </span>

                        <p className="text-sm font-medium text-slate-700">
                          {notice.notification_sub}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* fades */}
                  <div className="pointer-events-none absolute top-0 h-10 w-full bg-gradient-to-b from-white to-transparent" />
                  <div className="pointer-events-none absolute bottom-0 h-10 w-full bg-gradient-to-t from-white to-transparent" />
                </div>
              )}

              {/* BUTTON */}
              <Link to="/noticeboardpage">
                <button className="mt-5 w-full flex items-center justify-center gap-2 bg-amber-600 py-3 text-white font-semibold hover:bg-amber-700 transition">
                  View All Notices <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL ANIMATION */}
      <style>
        {`
          @keyframes scrollTop {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
        `}
      </style>
    </section>
  );
};

export default NoticeBoard;
