import React from 'react';

interface FullEvent {
  id: number;
  date: string;
  title: string;
  desc: string;
  image: string;
}

const allEvents: FullEvent[] = [
  { id: 1, date: "15 JUN", title: "Annual Healthcare Seminar", desc: "A detailed seminar on modern healthcare practices and future innovations.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80" },
  { id: 2, date: "22 JUN", title: "Nursing Workshop 2026", desc: "Hands-on training session for nursing students covering advanced patient care techniques.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80" },
  { id: 3, date: "05 JUL", title: "Guest Lecture: Global Health", desc: "Insights from international experts on global health trends and policy challenges.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80" },
  { id: 4, date: "12 JUL", title: "Pharmacy Research Symposium", desc: "Showcasing the latest in pharmaceutical research and drug development breakthroughs.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80" },
];

const EventsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Events & Seminars</h1>
        <p className="text-gray-600 mb-10">Stay updated with the latest academic and extra-curricular activities at Sampati Devi Group.</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {allEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="text-indigo-600 font-bold tracking-widest text-sm">{event.date}</span>
                <h2 className="text-xl font-bold text-slate-900 mt-2 mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.desc}</p>
                <button className="text-indigo-600 font-semibold hover:underline">Learn More →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;