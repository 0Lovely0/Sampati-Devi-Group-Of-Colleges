import React, { useEffect, useState } from "react";
import {
  getAllEvents,
  type Event as ApiEvent,
} from "../../../services/eventService";

interface EventUI {
  id: number;
  title: string;
  desc: string;
  date: string;
  image: string;
}

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

const TARGET_DEPARTMENT = "Veterinary Pharmacist";

// const theme = {
//   primary: "#15803D",
//   secondary: "#DCFCE7",
//   accent: "#22C55E",
// };

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] =
    useState<EventUI | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const data: ApiEvent[] = await getAllEvents();

        const vetEvents = data
          .filter((event: any) =>
            event.departments?.some(
              (dept: any) =>
                normalize(dept.departmentName) ===
                normalize(TARGET_DEPARTMENT)
            )
          )
          .sort(
            (a: any, b: any) =>
              new Date(b.eventDate).getTime() -
              new Date(a.eventDate).getTime()
          );

        const mapped: EventUI[] = vetEvents.map((e: any) => ({
          id: e.eventId,
          title: e.title,
          desc: e.description,
          image: e.imagePath?.startsWith("http")
            ? e.imagePath
            : `${API_BASE_URL}/${e.imagePath}`,
          date: new Date(e.eventDate)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })
            .toUpperCase(),
        }));

        setEvents(mapped);
      } catch (error) {
        console.error("Veterinary Events load error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#DCFCE7] font-bold tracking-widest text-[#15803D] text-xs">
        LOADING VETERINARY PHARMACIST EVENTS...
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#DCFCE7]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#15803D]">
            No Veterinary Pharmacist Events Available
          </h2>
          <p className="text-slate-500 mt-2">
            Check back later for upcoming events.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DCFCE7] pb-20">
      {/* HEADER */}
      <div
        className="py-20 px-4 text-center"
        style={{
          background: "linear-gradient(135deg,#15803D 0%,#22C55E 100%)",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Veterinary Pharmacist Events
        </h1>

        <div className="h-1 w-24 bg-[#22C55E] mx-auto rounded-full" />

        <p className="text-green-100 mt-6 max-w-xl mx-auto text-sm">
          Explore workshops, seminars, training sessions, academic activities,
          and veterinary department events.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="group bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              style={{ borderColor: "#BBF7D0" }}
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <span
                  className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "#DCFCE7",
                    color: "#15803D",
                  }}
                >
                  {event.date}
                </span>

                <h2 className="text-lg font-black text-slate-900 mt-4 leading-tight group-hover:text-[#15803D] transition">
                  {event.title}
                </h2>

                <p className="text-sm text-slate-500 mt-2 line-clamp-3">
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(21,128,61,0.92)" }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full max-h-[40vh] object-cover"
              />

              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md px-4 py-2 text-[10px] font-black text-white rounded-full uppercase tracking-widest transition"
              >
                Close
              </button>
            </div>

            <div className="p-8">
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: "#22C55E" }}
              >
                {selectedEvent.date}
              </span>

              <h2 className="text-2xl font-black text-slate-900 mt-2">
                {selectedEvent.title}
              </h2>

              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                {selectedEvent.desc}
              </p>

              <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-[#DCFCE7] text-[#15803D] text-xs font-bold">
                Veterinary Pharmacist Department
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;