import React from 'react';

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
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    date: "22 JUN",
    title: "Nursing Workshop 2026",
    desc: "Hands-on training session for nursing students covering advanced patient care techniques.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    date: "05 JUL",
    title: "Guest Lecture: Global Health",
    desc: "Insights from international experts on global health trends and policy challenges.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    date: "12 JUL",
    title: "Pharmacy Research Symposium",
    desc: "Showcasing the latest in pharmaceutical research and drug development breakthroughs.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
  },
];

const EventsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-indigo-950 py-8 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Events & Seminars
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Stay updated with the latest academic and extracurricular activities at
          Sampati Devi Group.
        </p>
      </div>

      {/* Content */}
      <div className="w-full mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-4">
          {allEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <span className="text-xs font-bold tracking-wider text-amber-500">
                  {event.date}
                </span>

                <h2 className="text-lg font-semibold text-slate-900 mt-2 mb-2">
                  {event.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {event.desc}
                </p>

                {/* <button className="text-sm font-medium text-indigo-700 hover:text-indigo-900">
                  Learn More →
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;