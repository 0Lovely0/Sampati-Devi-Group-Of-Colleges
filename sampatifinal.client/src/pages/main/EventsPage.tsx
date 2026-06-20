// import React from "react";

// interface FullEvent {
//   id: number;
//   date: string;
//   title: string;
//   desc: string;
//   image: string;
// }

// const allEvents: FullEvent[] = [
//   {
//     id: 1,
//     date: "15 JUN",
//     title: "Annual Healthcare Seminar",
//     desc: "A detailed seminar on modern healthcare practices and future innovations.",
//     image:
//       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 2,
//     date: "22 JUN",
//     title: "Nursing Workshop 2026",
//     desc: "Hands-on training session for nursing students covering advanced patient care techniques.",
//     image:
//       "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 3,
//     date: "05 JUL",
//     title: "Guest Lecture: Global Health",
//     desc: "Insights from international experts on global health trends and policy challenges.",
//     image:
//       "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 4,
//     date: "12 JUL",
//     title: "Pharmacy Research Symposium",
//     desc: "Showcasing the latest in pharmaceutical research and drug development breakthroughs.",
//     image:
//       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
//   },
// ];

// const EventsPage: React.FC = () => {
//   return (
//     <div className="w-full min-h-screen bg-slate-50">
      
//       {/* HEADER */}
//       <div className="w-full bg-indigo-950 py-10 px-4 text-center">
//         <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
//           Events & Seminars
//         </h1>

//         <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2">
//           Stay updated with the latest academic and extracurricular activities at
//           Sampati Devi Group.
//         </p>
//       </div>

//       {/* CONTENT */}
//       <div className="w-full px-2 py-2">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">

//           {allEvents.map((event) => (
//             <div
//               key={event.id}
//               className="bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition rounded-lg"
//             >
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="w-full h-44 sm:h-48 object-cover"
//               />

//               <div className="p-4 sm:p-5">
//                 <span className="text-xs font-bold tracking-wider text-amber-500">
//                   {event.date}
//                 </span>

//                 <h2 className="text-base sm:text-lg font-semibold text-slate-900 mt-2">
//                   {event.title}
//                 </h2>

//                 <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
//                   {event.desc}
//                 </p>
//               </div>
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventsPage;

// import React, { useEffect, useState } from "react";
// import { getAllEvents, type Event as ApiEvent } from "../../services/eventService";

// interface EventUI {
//   id: number;
//   title: string;
//   desc: string;
//   date: string;
//   image: string;
// }

// const API_BASE_URL =
//   window.location.hostname === "localhost"
//     ? "https://localhost:7197"
//     : "https://sampatigroup.stdruraltech.org";

// const EventsPage: React.FC = () => {
//   const [events, setEvents] = useState<EventUI[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedEvent, setSelectedEvent] = useState<EventUI | null>(null);

//   /* ================= FETCH EVENTS ================= */
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);

//         const data: ApiEvent[] = await getAllEvents();

//         const mapped: EventUI[] = data.map((e) => ({
//           id: e.eventId,
//           title: e.title,
//           desc: e.description,

//           image: e.imagePath?.startsWith("http")
//             ? e.imagePath
//             : `${API_BASE_URL}/${e.imagePath}`,

//           date: new Date(e.eventDate)
//             .toLocaleDateString("en-GB", {
//               day: "2-digit",
//               month: "short",
//             })
//             .toUpperCase(),
//         }));

//         setEvents(mapped);
//       } catch (error) {
//         console.error("Events load error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center text-slate-600">
//         Loading events...
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-slate-50">

//       {/* HEADER */}
//       <div className="w-full bg-indigo-950 py-10 px-4 text-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-white">
//           Events & Seminars
//         </h1>

//         <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2">
//           Stay updated with the latest academic and extracurricular activities.
//         </p>
//       </div>

//       {/* GRID */}
//       <div className="w-full mx-auto px-3 sm:px-6 py-6">

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

//           {events.map((event) => (
//             <div
//               key={event.id}
//               onClick={() => setSelectedEvent(event)}
//               className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm cursor-pointer transition hover:-translate-y-1 hover:shadow-lg"
//             >

//               {/* IMAGE */}
//               <div className="h-32 sm:h-40 overflow-hidden">
//                 <img
//                   src={event.image}
//                   alt={event.title}
//                   className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
//                   onError={(e) =>
//                     ((e.target as HTMLImageElement).src = "/placeholder.png")
//                   }
//                 />
//               </div>

//               {/* DATE */}
//               <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
//                 {event.date}
//               </div>

//               {/* HOVER OVERLAY */}
//               <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition">
//                 <p className="text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100">
//                   View Event
//                 </p>
//               </div>

//               {/* CONTENT */}
//               <div className="p-3">
//                 <h2 className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-1">
//                   {event.title}
//                 </h2>

//                 <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2">
//                   {event.desc}
//                 </p>
//               </div>

//             </div>
//           ))}

//         </div>
//       </div>

//       {/* ================= MODAL ================= */}
//       {selectedEvent && (
//         <div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
//           onClick={() => setSelectedEvent(null)}
//         >
//           <div
//             className="w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >

//             {/* IMAGE */}
//             <div className="relative">
//               <img
//                 src={selectedEvent.image}
//                 alt={selectedEvent.title}
//                 className="w-full max-h-[60vh] object-cover"
//               />

//               <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded">
//                 {selectedEvent.date}
//               </div>

//               <button
//                 onClick={() => setSelectedEvent(null)}
//                 className="absolute top-3 right-3 bg-white text-black px-3 py-1 text-xs font-semibold rounded shadow"
//               >
//                 ✕ Close
//               </button>
//             </div>

//             {/* CONTENT */}
//             <div className="p-5">
//               <h2 className="text-lg font-bold text-slate-900">
//                 {selectedEvent.title}
//               </h2>

//               <p className="text-sm text-slate-500 mt-2 leading-relaxed">
//                 {selectedEvent.desc}
//               </p>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default EventsPage;


import React, { useEffect, useState } from "react";
import { getAllEvents, type Event as ApiEvent } from "../../services/eventService";

interface EventUI {
  id: number;
  title: string;
  desc: string;
  date: string;
  image: string;
}

const API_BASE_URL = window.location.hostname === "localhost" ? "https://localhost:7197" : "https://sampatigroup.stdruraltech.org";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventUI | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data: ApiEvent[] = await getAllEvents();
        const mapped: EventUI[] = data.map((e) => ({
          id: e.eventId,
          title: e.title,
          desc: e.description,
          image: e.imagePath?.startsWith("http") ? e.imagePath : `${API_BASE_URL}/${e.imagePath}`,
          date: new Date(e.eventDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).toUpperCase(),
        }));
        setEvents(mapped);
      } catch (error) {
        console.error("Events load error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-stone-50 font-bold tracking-widest text-slate-400 text-xs">LOADING ARCHIVE...</div>;

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* HEADER */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Events & Seminars</h1>
        <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full" />
        <p className="text-slate-400 mt-6 max-w-xl mx-auto text-lg">Explore our archive of past and upcoming institutional milestones.</p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              <div className="h-56 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">{event.date}</span>
                <h2 className="text-lg font-black text-slate-950 mt-4 leading-tight group-hover:text-amber-700 transition">{event.title}</h2>
                <p className="text-sm text-slate-500 mt-2 line-clamp-3">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-indigo-950/90 p-4 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
          <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full max-h-[40vh] object-cover" />
              <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md px-4 py-2 text-[10px] font-black text-white rounded-full uppercase tracking-widest transition">Close</button>
            </div>
            <div className="p-8">
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{selectedEvent.date}</span>
              <h2 className="text-2xl font-black text-slate-950 mt-2">{selectedEvent.title}</h2>
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">{selectedEvent.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;