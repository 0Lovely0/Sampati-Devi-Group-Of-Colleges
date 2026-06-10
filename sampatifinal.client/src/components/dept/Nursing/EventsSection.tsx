import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";

interface Event {
  id: number;
  date: string;
  title: string;
  venue: string;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    date: "15 JUN 2026",
    title: "Annual Healthcare Seminar",
    venue: "College Auditorium",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    date: "22 JUN 2026",
    title: "Advanced Nursing Workshop",
    venue: "Nursing Skills Lab",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    date: "05 JUL 2026",
    title: "Guest Lecture on Global Health",
    venue: "Seminar Hall",
    image:
      "https://images.unsplash.com/photo-1581092334494-3d8d0ecf6f6a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    date: "12 JUL 2026",
    title: "Research Presentation Session",
    venue: "Conference Room",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
];

const DepartmentEvents: React.FC = () => {
  return (
    <section className="bg-white border border-slate-200 py-6 px-4 mt-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Department Events
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Workshops, seminars and academic activities
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 border border-slate-200 px-2 py-1 text-[11px] text-slate-600">
            <CalendarDays size={12} />
            Events
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-slate-200 bg-white"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-44 object-cover"
                />

                <div className="absolute top-2 left-2 border border-white bg-black/80 px-2 py-1 text-[10px] font-semibold text-white">
                  {event.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  {event.title}
                </h3>

                <p className="text-xs text-slate-600 mt-1">
                  Venue: {event.venue}
                </p>

                <button className="mt-3 border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 transition">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="mt-4">
          <Link
            to="/events"
            className="flex items-center justify-center gap-2 border border-teal-700 bg-teal-700 py-2 text-xs font-semibold text-white hover:bg-teal-800 transition"
          >
            View All Events
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default DepartmentEvents;