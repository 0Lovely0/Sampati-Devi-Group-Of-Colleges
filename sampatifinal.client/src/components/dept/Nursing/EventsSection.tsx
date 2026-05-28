import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';

interface Event {
  id: number;
  date: string;
  title: string;
  image: string;
}

const events: Event[] = [
  { id: 1, date: "15 JUN", title: "Annual Healthcare Seminar", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&q=80" },
  { id: 2, date: "22 JUN", title: "Nursing Workshop 2026", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&q=80" },
  { id: 3, date: "05 JUL", title: "Global Health Lecture", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&q=80" },
];

const EventsSection: React.FC = () => {
    const { deptId } = useParams();
  return (
    <div className="bg-white p-8 rounded-3xl border border-teal-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-teal-100 p-2 rounded-lg text-teal-700">
          <CalendarDays size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Upcoming Events</h2>
      </div>
      
      <div className="space-y-4 flex-grow">
        {events.map((event) => (
          <div key={event.id} className="flex gap-4 p-3 bg-white rounded-2xl border border-slate-100 items-center hover:border-teal-200 hover:shadow-md transition-all group cursor-pointer">
            <div className="min-w-[80px] h-[70px] rounded-xl overflow-hidden bg-slate-100">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">{event.date}</span>
              <h3 className="font-semibold text-slate-800 text-sm group-hover:text-teal-700 transition-colors">
                {event.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <Link to={`/dept/${deptId}/eventDetails`}
        className="w-full mt-6 py-3 border-2 border-teal-600 text-teal-700 rounded-xl font-bold hover:bg-teal-600 hover:text-white transition text-center"
      >
        View All Events
      </Link>
    </div>
  );
};

export default EventsSection;