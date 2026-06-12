import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  date: string;
  title: string;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    date: "15 JUN",
    title: "Annual Healthcare Seminar",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    date: "22 JUN",
    title: "Nursing Workshop 2026",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    date: "05 JUL",
    title: "Guest Lecture: Global Health",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    date: "12 JUL",
    title: "Pharmacy Research Symposium",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
];

const EventsSection: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<Event | null>(null);

  return (
    <>
      <section className="border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-amber-50 px-4 sm:px-6 py-8 sm:py-10 shadow-sm mt-10">
        {/* HEADER */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
            Upcoming Events
          </h2>

          <span className="w-fit border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-semibold text-amber-600 rounded-full">
            Gallery View
          </span>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setPreviewImage(event)}
              className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-40 sm:h-48 lg:h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* DATE */}
                <div className="absolute left-2 top-2 rounded-md bg-black/75 px-2 py-1 text-[10px] font-semibold text-white">
                  {event.date}
                </div>

                {/* OVERLAY */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="p-3">
                    <p className="text-xs font-semibold text-white">
                      Click to View
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-2">
                  {event.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <Link
          to="/events"
          className="mt-6 mx-auto block w-fit rounded-full bg-amber-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-amber-700"
        >
          View All Events
        </Link>
      </section>

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative w-full max-w-6xl bg-white border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute right-3 top-3 z-10 bg-black px-3 py-2 text-xs font-semibold text-white"
            >
              CLOSE
            </button>

            <img
              src={previewImage.image}
              alt={previewImage.title}
              className="w-full max-h-[85vh] object-contain bg-slate-100"
            />

            <div className="border-t border-slate-200 p-4">
              <p className="text-xs font-semibold text-amber-600">
                {previewImage.date}
              </p>

              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                {previewImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventsSection;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getAllEvents, type Event as ApiEvent } from "../../services/eventService";

// interface EventUI {
//   id: number;
//   date: string;
//   title: string;
//   image: string;
// }

// const EventsSection: React.FC = () => {
//   const [events, setEvents] = useState<EventUI[]>([]);
//   const [previewImage, setPreviewImage] = useState<EventUI | null>(null);
//   const [loading, setLoading] = useState(false);

//   /* ================= FETCH EVENTS ================= */
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);

//         const data: ApiEvent[] = await getAllEvents();

//         // optional: only main department (if needed)
//         const mainEvents = data.filter((e) =>
//           e.departments?.some(
//             (d) => d.departmentName.trim().toLowerCase() === "main"
//           )
//         );

//         const mapped: EventUI[] = mainEvents.map((e) => ({
//           id: e.eventId,
//           title: e.title,
//           image: e.imagePath?.startsWith("http")
//             ? e.imagePath
//             : `https://localhost:7197/${e.imagePath}`,
//           date: new Date(e.eventDate).toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "short",
//           }).toUpperCase(),
//         }));

//         setEvents(mapped);
//       } catch (error) {
//         console.error("Failed to load events:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   /* ================= LOADER ================= */
//   if (loading) {
//     return (
//       <div className="py-10 text-center text-slate-600">
//         Loading events...
//       </div>
//     );
//   }

//   return (
//     <>
//       <section className="border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-amber-50 p-5 shadow-sm mt-10 py-10">

//         {/* Header */}
//         <div className="mb-5 flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-slate-900">
//             Upcoming Events
//           </h2>

//           <span className="border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-semibold text-amber-600">
//             Gallery View
//           </span>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {events.map((event) => (
//             <div
//               key={event.id}
//               onClick={() => setPreviewImage(event)}
//               className="group cursor-pointer overflow-hidden border border-slate-200 bg-white shadow-sm"
//             >
//               <div className="relative">
//                 <img
//                   src={event.image}
//                   alt={event.title}
//                   className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
//                 />

//                 <div className="absolute left-2 top-2 bg-black/75 px-2 py-1 text-[10px] font-semibold text-white">
//                   {event.date}
//                 </div>

//                 <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//                   <div className="p-3">
//                     <p className="text-xs font-semibold text-white">
//                       Click to View
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-3">
//                 <h3 className="text-sm font-semibold text-slate-900">
//                   {event.title}
//                 </h3>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Button */}
//         <Link
//           to="/events"
//           className="mt-5 block w-[140px] mx-auto bg-amber-600 py-2 text-center text-xs font-semibold text-white transition hover:bg-amber-700"
//         >
//           View All Events
//         </Link>
//       </section>

//       {/* ================= LIGHTBOX ================= */}
//       {previewImage && (
//         <div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
//           onClick={() => setPreviewImage(null)}
//         >
//           <div
//             className="relative w-full max-w-6xl bg-white border border-slate-200"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setPreviewImage(null)}
//               className="absolute right-3 top-3 z-10 bg-black px-3 py-2 text-xs font-semibold text-white"
//             >
//               CLOSE
//             </button>

//             <img
//               src={previewImage.image}
//               alt={previewImage.title}
//               className="w-full max-h-[85vh] object-contain bg-slate-100"
//             />

//             <div className="border-t border-slate-200 p-4">
//               <p className="text-xs font-semibold text-amber-600">
//                 {previewImage.date}
//               </p>

//               <h3 className="mt-1 text-lg font-semibold text-slate-900">
//                 {previewImage.title}
//               </h3>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EventsSection;
