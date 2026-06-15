// import React, { useState } from 'react';

// interface Notice {
//   id: number;
//   date: string;
//   title: string;
//   category: 'Exam' | 'Event' | 'General';
//   content: string;
// }

// const notices: Notice[] = [
//   {
//     id: 1,
//     date: "May 25",
//     category: "Exam",
//     title: "Semester Exam Form Filling Deadline",
//     content:
//       "All students are requested to complete their examination form filling process by May 30, 2026. Failure to do so will result in a late fee."
//   },
//   {
//     id: 2,
//     date: "May 22",
//     category: "Event",
//     title: "Campus Recruitment Drive - 2026 Batch",
//     content:
//       "Top hospitals are visiting for the 2026 batch recruitment. Students must carry their updated resumes."
//   },
//   {
//     id: 3,
//     category: "General",
//     date: "May 20",
//     title: "Holiday Announcement: Summer Break",
//     content:
//       "The college will remain closed for summer break from June 1st to June 20th."
//   },
//   {
//     id: 4,
//     category: "Event",
//     date: "May 18",
//     title: "Workshop on Advanced Nursing Skills",
//     content:
//       "Hands-on training for ICU management will be held on May 28th."
//   },
//   {
//     id: 5,
//     category: "General",
//     date: "May 15",
//     title: "Library Membership Renewal",
//     content:
//       "Please renew your library cards at the administration desk before the end of the month."
//   },
//   {
//     id: 6,
//     category: "Exam",
//     date: "May 12",
//     title: "Annual Sports Day Registration",
//     content:
//       "Registrations for the Annual Sports Day are now open. Visit the sports office to sign up."
//   },
// ];

// export const NoticeBoardPage: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

//   const filteredNotices = notices.filter((notice) =>
//     notice.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       {/* Header */}
//       <div className="bg-indigo-950 py-8 px-4 text-center">
//         <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
//           Official Notice Board
//         </h1>

//         <p className="text-sm text-slate-300">
//           Latest announcements, examinations, events and important updates.
//         </p>
//       </div>

//       {/* Content */}
//       <div className="w-full mx-auto px-4 py-6">
//         {/* Search */}
//         <div className="mb-6 flex justify-center">
//           <input
//             type="text"
//             placeholder="Search notices..."
//             className="w-full md:w-72 border border-slate-300 px-3 py-2 text-sm bg-white outline-none focus:border-indigo-700"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="grid md:grid-cols-3 gap-4">
//           {/* Notice List */}
//           <div className="md:col-span-2 space-y-3">
//             {filteredNotices.map((notice) => (
//               <div
//                 key={notice.id}
//                 onClick={() => setSelectedNotice(notice)}
//                 className="bg-white border border-slate-200 p-4 shadow-sm cursor-pointer hover:border-indigo-700"
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <span
//                     className={`text-[11px] font-semibold px-2 py-1 ${
//                       notice.category === 'Exam'
//                         ? 'bg-red-100 text-red-700'
//                         : notice.category === 'Event'
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-blue-100 text-blue-700'
//                     }`}
//                   >
//                     {notice.category}
//                   </span>

//                   <span className="text-xs text-slate-500">
//                     {notice.date}
//                   </span>
//                 </div>

//                 <h3 className="text-sm md:text-base font-semibold text-slate-900">
//                   {notice.title}
//                 </h3>
//               </div>
//             ))}
//           </div>

//           {/* Notice Details */}
//           <div className="md:col-span-1">
//             <div className="sticky top-20 bg-slate-900 text-white border border-slate-800 p-4 min-h-[250px]">
//               {selectedNotice ? (
//                 <>
//                   <h2 className="text-base font-semibold border-b border-slate-700 pb-2 mb-3">
//                     {selectedNotice.title}
//                   </h2>

//                   <p className="text-sm text-slate-300 leading-relaxed">
//                     {selectedNotice.content}
//                   </p>

//                   <div className="mt-4 text-xs text-slate-500">
//                     Published on {selectedNotice.date}, 2026
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center h-full text-sm text-slate-500">
//                   Select a notice to view details
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { useEffect, useState } from "react";
// import {
//   getAllNotifications,
//   type Notification,
// } from "../../services/notificationService";
// import Loader from "../../components/common/Loader";
// import { X } from "lucide-react";

// const API_BASE_URL =
//   window.location.hostname === "localhost"
//     ? "https://localhost:7197"
//     : "https://sampatigroup.stdruraltech.org";

// export const NoticeBoardPage: React.FC = () => {
//   const [notices, setNotices] = useState<Notification[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedNotice, setSelectedNotice] = useState<Notification | null>(
//     null,
//   );
//   const [fileOpen, setFileOpen] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         setLoading(true);

//         const data = await getAllNotifications();

//         const mainNotices = data
//           .filter((n) => n.notification_status === true)
//           .filter((n) =>
//             n.departments?.some(
//               (d) => d.departmentName.trim().toLowerCase() === "main",
//             ),
//           )
//           .sort(
//             (a, b) =>
//               new Date(b.notification_date).getTime() -
//               new Date(a.notification_date).getTime(),
//           );

//         setNotices(mainNotices);

//         if (mainNotices.length > 0) {
//           setSelectedNotice(mainNotices[0]);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotices();
//   }, []);

//   const filteredNotices = notices.filter((notice) =>
//     notice.notification_sub.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const formatDate = (dateStr: string) =>
//     new Date(dateStr).toLocaleDateString("en-US", {
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//     });

//   const getFileUrl = (file?: string | null) => {
//     if (!file) return "";
//     return file.startsWith("http") ? file : `${API_BASE_URL}/${file}`;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader text="Loading notices..." />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       {/* Header */}
//       <div className="bg-indigo-950 py-8 px-4 text-center">
//         <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
//           Official Notice Board
//         </h1>

//         <p className="text-sm text-slate-300">
//           Latest announcements, examinations, events and important updates.
//         </p>
//       </div>

//       {/* Content */}
//       <div className="w-full mx-auto px-4 py-6">
//         {/* Search */}
//         <div className="mb-6 flex justify-center">
//           <input
//             type="text"
//             placeholder="Search notices..."
//             className="w-full md:w-72 border border-slate-300 px-3 py-2 text-sm bg-white outline-none focus:border-indigo-700"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="grid md:grid-cols-3 gap-4">
//           {/* Notice List */}
//           <div className="md:col-span-2 space-y-3">
//             {filteredNotices.map((notice) => (
//               <div
//                 key={notice.notification_id}
//                 onClick={() => setSelectedNotice(notice)}
//                 className="bg-white border border-slate-200 p-4 shadow-sm cursor-pointer hover:border-indigo-700"
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-[11px] font-semibold px-2 py-1 bg-amber-100 text-amber-700">
//                     {notice.notification_cat}
//                   </span>

//                   <span className="text-xs text-slate-500">
//                     {formatDate(notice.notification_date)}
//                   </span>
//                 </div>

//                 <h3 className="text-sm md:text-base font-semibold text-slate-900">
//                   {notice.notification_sub}
//                 </h3>
//               </div>
//             ))}
//           </div>

//           {/* Notice Details */}
//           <div className="md:col-span-1 h-full self-start">
//             <div className="sticky top-30 bg-slate-900 text-white border border-slate-800 p-4 min-h-[250px]">
//               {selectedNotice ? (
//                 <>
//                   <h2 className="text-base font-semibold border-b border-slate-700 pb-2 mb-3">
//                     {selectedNotice.notification_sub}
//                   </h2>

//                   <p className="text-sm text-slate-300 leading-relaxed">
//                     {selectedNotice.notification_des}
//                   </p>

//                   {/* VIEW FILE BUTTON */}
//                   {selectedNotice.notification_file && (
//                     <button
//                       onClick={() =>
//                         setFileOpen(
//                           getFileUrl(selectedNotice.notification_file),
//                         )
//                       }
//                       className="mt-4 bg-amber-600 px-4 py-2 text-sm font-semibold hover:bg-amber-700"
//                     >
//                       View File
//                     </button>
//                   )}

//                   <div className="mt-4 text-xs text-slate-500">
//                     Published on {formatDate(selectedNotice.notification_date)}
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center h-full text-sm text-slate-500">
//                   Select a notice to view details
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* LIGHTBOX (NO UI CHANGE IMPACT) */}
//       {fileOpen && (
//         <div
//           className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
//           onClick={() => setFileOpen(null)}
//         >
//           <div
//             className="relative bg-white max-w-4xl w-full p-3"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setFileOpen(null)}
//               className="absolute top-2 right-2 bg-red-500 text-white p-1"
//             >
//               <X size={18} />
//             </button>

//             {fileOpen.match(/\.(jpg|jpeg|png|webp)$/i) ? (
//               <img
//                 src={fileOpen}
//                 alt="Notice File"
//                 className="w-full max-h-[80vh] object-contain"
//               />
//             ) : (
//               <iframe
//                 src={fileOpen}
//                 className="w-full h-[80vh]"
//                 title="Notice File"
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { getAllNotifications, type Notification } from "../../services/notificationService";
import Loader from "../../components/common/Loader";
import { X, Search, FileText, Calendar, ArrowRight } from "lucide-react";

const API_BASE_URL = window.location.hostname === "localhost"
  ? "https://localhost:7197"
  : "https://sampatigroup.stdruraltech.org";

export const NoticeBoardPage: React.FC = () => {
  const [notices, setNotices] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<Notification | null>(null);
  const [fileOpen, setFileOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const data = await getAllNotifications();
        const mainNotices = data
          .filter((n) => n.notification_status === true)
          .filter((n) => n.departments?.some((d) => d.departmentName.trim().toLowerCase() === "main"))
          .sort((a, b) => new Date(b.notification_date).getTime() - new Date(a.notification_date).getTime());
        setNotices(mainNotices);
        if (mainNotices.length > 0) setSelectedNotice(mainNotices[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = notices.filter((n) => 
    n.notification_sub.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  const getFileUrl = (f?: string | null) => (!f ? "" : f.startsWith("http") ? f : `${API_BASE_URL}/${f}`);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-stone-50"><Loader text="Loading notices..." /></div>;

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Notice Board</h1>
        <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full" />
      </div>

      <div className="w-fullmx-auto px-4 -mt-10">
        {/* Search Bar */}
        <div className="bg-white p-2 rounded-2xl shadow-xl shadow-stone-200/50 flex items-center gap-3 border border-stone-100 mb-12">
          <Search className="text-stone-400 ml-3" size={20} />
          <input
            type="text"
            placeholder="Search for examinations, events, or updates..."
            className="w-full py-3 text-sm outline-none bg-transparent"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* List */}
          <div className="lg:col-span-7 space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.notification_id}
                onClick={() => setSelectedNotice(notice)}
                className={`group p-6 rounded-2xl border transition-all cursor-pointer ${
                  selectedNotice?.notification_id === notice.notification_id 
                    ? "bg-white border-amber-500 shadow-lg" 
                    : "bg-white border-stone-200 hover:border-stone-300 hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                    {notice.notification_cat}
                  </span>
                  <div className="flex items-center text-stone-400 gap-1.5 text-[11px]">
                    <Calendar size={12} />
                    {formatDate(notice.notification_date)}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                  {notice.notification_sub}
                </h3>
              </div>
            ))}
          </div>

          {/* Sticky Detail View */}
          <div className="lg:col-span-5 h-full">
            <div className="sticky top-30 bg-indigo-950 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl">
              {selectedNotice ? (
                <>
                  <div className="mb-6">
                    <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Announcement</span>
                    <h2 className="text-2xl font-black leading-tight">{selectedNotice.notification_sub}</h2>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-8 border-t border-slate-800 pt-6">
                    {selectedNotice.notification_des}
                  </p>

                  {selectedNotice.notification_file && (
                    <button
                      onClick={() => setFileOpen(getFileUrl(selectedNotice.notification_file))}
                      className="flex items-center justify-center gap-2 w-full bg-white text-slate-950 font-bold py-4 rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-300"
                    >
                      <FileText size={18} />
                      View Document
                      <ArrowRight size={18} />
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-20 text-slate-500">
                  <p>Select a notice to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {fileOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setFileOpen(null)}>
          <div className="relative bg-white max-w-4xl w-full p-2 rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setFileOpen(null)} className="absolute -top-12 right-0 text-white hover:text-amber-500 transition-colors">
              <X size={32} />
            </button>
            {fileOpen.match(/\.(jpg|jpeg|png|webp)$/i) ? (
              <img src={fileOpen} alt="Notice" className="w-full max-h-[80vh] object-contain rounded-lg" />
            ) : (
              <iframe src={fileOpen} className="w-full h-[80vh] rounded-lg" title="Notice File" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};