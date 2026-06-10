// // Static Code
// import React, { useState } from "react";

// interface News {
//   id: number;
//   title: string;
//   date: string;
//   category: "Admission" | "Academic" | "Events" | "General";
//   description: string;
// }

// const newsData: News[] = [
//   {
//     id: 1,
//     title: "Admission Open for Session 2026-27",
//     date: "May 28, 2026",
//     category: "Admission",
//     description:
//       "Applications are now invited for all departments. Secure your seat today by visiting the Apply Now section.",
//   },
//   {
//     id: 2,
//     title: "Semester Examination Dates Announced",
//     date: "May 25, 2026",
//     category: "Academic",
//     description:
//       "Final year semester examinations will commence from June 15th, 2026. Please check the notice board for your specific subject timetable.",
//   },
//   {
//     id: 3,
//     title: "Guest Lecture: Future of Nursing",
//     date: "May 22, 2026",
//     category: "Events",
//     description:
//       "We are pleased to host a distinguished guest speaker on June 5th at the main auditorium.",
//   },
//   {
//     id: 4,
//     title: "Campus Placement Drive",
//     date: "May 20, 2026",
//     category: "Events",
//     description:
//       "Top-tier hospitals will be on campus on May 30th for recruitment. Please bring your updated CVs.",
//   },
//   {
//     id: 5,
//     title: "Scholarship Applications Accepted",
//     date: "May 18, 2026",
//     category: "Admission",
//     description:
//       "Financial aid forms are now open for the 2026-27 session. Submit applications before June 10th.",
//   },
//   {
//     id: 6,
//     title: "Library Closure Notice",
//     date: "May 15, 2026",
//     category: "General",
//     description:
//       "The college library will remain closed on Sunday, May 31st for maintenance.",
//   },
// ];

// export const NewsPage: React.FC = () => {
//   const [selectedNews, setSelectedNews] = useState<News>(newsData[0]);

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       {/* HERO SECTION */}
//      {/* HERO SECTION */}
// <section className="bg-indigo-950 relative overflow-hidden">
//   {/* Grid Pattern */}
//   <div className="absolute inset-0 opacity-10">
//     <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px]" />
//   </div>

//   <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">
//     <div className="max-w-4xl mx-auto text-center">

//       {/* <span className="inline-block border border-indigo-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-indigo-300">
//         News & Announcements
//       </span> */}

//       <h1 className="text-3xl md:text-3xl font-black text-white leading-tight">
//         College News & Updates
       
//       </h1>

//       <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
//         Stay informed about admissions, academic schedules,
//         events, placements, scholarships, and official college
//         announcements.
//       </p>

//       <div className="mt-8 flex justify-center items-center gap-8">

//         {/* <div className="text-center">
//           <div className="text-2xl font-bold text-white">
//             {newsData.length}
//           </div>
//           <div className="text-[10px] uppercase tracking-widest text-slate-400">
//             Updates
//           </div>
//         </div> */}

//         {/* <div className="w-px h-10 bg-indigo-800" />

//         <div className="text-center">
//           <div className="text-2xl font-bold text-white">
//             2026
//           </div>
//           <div className="text-[10px] uppercase tracking-widest text-slate-400">
//             Session
//           </div>
//         </div> */}

//       </div>

//     </div>
//   </div>
// </section>

//       {/* CONTENT */}
//       <section className="max-w-7xl mx-auto px-6 py-10">
//         <div className="grid lg:grid-cols-12 gap-6">
//           {/* LEFT SIDE */}
//           <div className="lg:col-span-5">
//             <div className="border-l-4 border-amber-600 pl-3 mb-5">
//               <h2 className="text-xl font-bold text-slate-900">
//                 Recent Announcements
//               </h2>
//             </div>

//             <div className="space-y-3">
//               {newsData.map((news) => {
//                 const active = selectedNews.id === news.id;

//                 return (
//                   <button
//                     key={news.id}
//                     onClick={() => setSelectedNews(news)}
//                     className={`w-full text-left border transition-all duration-300 ${
//                       active
//                         ? "bg-indigo-950 border-indigo-950"
//                         : "bg-white border-slate-200 hover:border-indigo-500 hover:translate-x-1"
//                     }`}
//                   >
//                     <div className="p-4">
//                       <div
//                         className={`text-[11px] uppercase tracking-widest font-semibold mb-2 ${
//                           active
//                             ? "text-amber-300"
//                             : "text-amber-600"
//                         }`}
//                       >
//                         {news.category}
//                       </div>

//                       <h3
//                         className={`font-bold text-base mb-2 ${
//                           active
//                             ? "text-white"
//                             : "text-slate-900"
//                         }`}
//                       >
//                         {news.title}
//                       </h3>

//                       <p
//                         className={`text-xs ${
//                           active
//                             ? "text-slate-400"
//                             : "text-slate-500"
//                         }`}
//                       >
//                         {news.date}
//                       </p>
//                     </div>

//                     <div
//                       className={`h-[2px] ${
//                         active
//                           ? "bg-indigo-400"
//                           : "bg-transparent"
//                       }`}
//                     />
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="lg:col-span-7">
//             <div className="sticky top-24">
//               <div className="bg-white border border-slate-200 shadow-xl">
//                 <div className="h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-500" />

//                 <div className="p-6">
//                   <div className="flex flex-wrap items-center gap-3 mb-5">
//                     <span className="bg-amber-100 text-amber-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest">
//                       {selectedNews.category}
//                     </span>

//                     <span className="text-sm text-slate-500">
//                       {selectedNews.date}
//                     </span>
//                   </div>

//                   <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-5">
//                     {selectedNews.title}
//                   </h2>

//                   <div className="w-16 h-1 bg-amber-600 mb-5" />

//                   <p className="text-base leading-relaxed text-slate-600 mb-8">
//                     {selectedNews.description}
//                   </p>

//                   <button className="bg-amber-600 text-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wider border border-amber-950 hover:bg-amber-700 transition-all">
//                     Read Official Circular
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };



import React, { useEffect, useState } from "react";
import { getAllNews, type News } from "../../services/newsService";

export const NewsPage: React.FC = () => {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);

  // LIGHTBOX STATE
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const getFileUrl = (file?: string) => {
    if (!file) return "";
    return file.startsWith("http")
      ? file
      : `https://localhost:7197/${file}`;
  };

  const handleViewFile = () => {
    if (!selectedNews?.news_images) return;

    setLightboxUrl(getFileUrl(selectedNews.news_images));
    setLightboxOpen(true);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const data = await getAllNews();

        const sorted = data.sort(
          (a, b) =>
            new Date(b.news_date).getTime() -
            new Date(a.news_date).getTime()
        );

        setNewsData(sorted);

        if (sorted.length > 0) {
          setSelectedNews(sorted[0]);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Loading news...
      </div>
    );
  }

  if (!selectedNews) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        No news available
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO */}
      <section className="bg-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 text-center">
          <h1 className="text-3xl font-black text-white">
            College News & Updates
          </h1>

          <p className="mt-4 text-slate-300 text-sm max-w-2xl mx-auto">
            Stay informed about admissions, academics, events, and announcements.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-5">
            <h2 className="text-xl font-bold mb-5">
              Recent Announcements
            </h2>

            <div className="space-y-3">
              {newsData.map((news) => {
                const active = selectedNews.news_id === news.news_id;

                return (
                  <button
                    key={news.news_id}
                    onClick={() => setSelectedNews(news)}
                    className={`w-full text-left border transition ${
                      active
                        ? "bg-indigo-950 border-indigo-950"
                        : "bg-white border-slate-200 hover:border-indigo-500 hover:translate-x-1"
                    }`}
                  >
                    <div className="p-4">
                      <div
                        className={`text-[11px] uppercase font-semibold mb-2 ${
                          active ? "text-amber-300" : "text-amber-600"
                        }`}
                      >
                        {news.news_cat}
                      </div>

                      <h3
                        className={`font-bold mb-2 ${
                          active ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {news.news_subject}
                      </h3>

                      <p
                        className={`text-xs ${
                          active ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {new Date(news.news_date).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div className="bg-white border shadow-xl p-6">

                <div className="flex gap-3 mb-5">
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold uppercase">
                    {selectedNews.news_cat}
                  </span>

                  <span className="text-sm text-slate-500">
                    {new Date(selectedNews.news_date).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-2xl font-black mb-5">
                  {selectedNews.news_subject}
                </h2>

                <div className="w-16 h-1 bg-amber-600 mb-5" />

                <p className="text-slate-600 leading-relaxed mb-8">
                  {selectedNews.news_description}
                </p>

                {/* VIEW FILE BUTTON */}
                <button
                  onClick={handleViewFile}
                  className="bg-amber-600 text-white px-5 py-2.5 text-sm font-semibold uppercase hover:bg-amber-700"
                >
                  View File
                </button>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && lightboxUrl && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-6 top-6 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            {/* IMAGE or PDF */}
            {lightboxUrl.endsWith(".pdf") ? (
              <iframe
                src={lightboxUrl}
                className="w-full h-[80vh] rounded-xl bg-white"
              />
            ) : (
              <img
                src={lightboxUrl}
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />
            )}
          </div>
        </div>
      )}

    </div>
  );
};