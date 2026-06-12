import React from "react";

interface FullEvent {
  id: number;
  date: string;
  title: string;
  desc: string;
  image: string;
}

const allEvents: FullEvent[] = [
  {
    id: 1,
    date: "15 JUN",
    title: "Annual Healthcare Seminar",
    desc: "A detailed seminar on modern healthcare practices and future innovations.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    date: "22 JUN",
    title: "Nursing Workshop 2026",
    desc: "Hands-on training session for nursing students covering advanced patient care techniques.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    date: "05 JUL",
    title: "Guest Lecture: Global Health",
    desc: "Insights from international experts on global health trends and policy challenges.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    date: "12 JUL",
    title: "Pharmacy Research Symposium",
    desc: "Showcasing the latest in pharmaceutical research and drug development breakthroughs.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
];

const EventsPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      
      {/* HEADER */}
      <div className="w-full bg-indigo-950 py-10 px-4 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          Events & Seminars
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2">
          Stay updated with the latest academic and extracurricular activities at
          Sampati Devi Group.
        </p>
      </div>

      {/* CONTENT */}
      <div className="w-full px-2 py-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">

          {allEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition rounded-lg"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-44 sm:h-48 object-cover"
              />

              <div className="p-4 sm:p-5">
                <span className="text-xs font-bold tracking-wider text-amber-500">
                  {event.date}
                </span>

                <h2 className="text-base sm:text-lg font-semibold text-slate-900 mt-2">
                  {event.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {event.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default EventsPage;