import React, { useState } from 'react';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import X from 'lucide-react/dist/esm/icons/x';

const ManageEvents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([
    { id: 1, title: "Annual Sports Meet", date: "June 15, 2026", venue: "Main Ground", status: "Upcoming" },
    { id: 2, title: "Tech Fest 2026", date: "July 10, 2026", venue: "Auditorium", status: "Upcoming" },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Event Management</h1>
          <p className="text-slate-500">Coordinate and schedule upcoming campus events.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition"
        >
          <Plus size={20} /> Schedule Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition space-y-4">
            <div className="flex justify-between items-start">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${event.status === 'Upcoming' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                {event.status}
              </span>
              <button className="text-slate-300 hover:text-rose-600"><Trash2 size={18} /></button>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Calendar size={16} /> {event.date}</div>
              <div className="flex items-center gap-2"><MapPin size={16} /> {event.venue}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Schedule New Event</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="text-slate-400"/></button>
            </div>
            
            <input type="text" placeholder="Event Title" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none" />
            
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none" />
              <input type="text" placeholder="Venue" className="p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none" />
            </div>

            <textarea placeholder="Event Description..." rows={3} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none" />
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700"
            >
              Schedule Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;