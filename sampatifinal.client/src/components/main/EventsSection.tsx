// import React from 'react';
// import { Link } from 'react-router-dom';

// const events = [
//   { id: 1, date: "15 JUN", title: "Annual Healthcare Seminar", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80" },
//   { id: 2, date: "22 JUN", title: "Nursing Workshop 2026", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80" },
//   { id: 3, date: "05 JUL", title: "Guest Lecture: Global Health", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80" },
//   { id: 4, date: "12 JUL", title: "Pharmacy Research Symposium", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80" },
// ];

// const EventsSection: React.FC = () => {
//   return (
//     <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl h-full flex flex-col">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Upcoming Events</h2>
      
//       <div className="space-y-4 flex-grow">
//         {events.map((event) => (
//           <div key={event.id} className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 items-center hover:border-indigo-200 transition-all group">
            
//             {/* Image Container with guaranteed visibility */}
//             <div className="min-w-[80px] h-[70px] rounded-xl overflow-hidden bg-slate-200">
//               <img 
//                 src={event.image} 
//                 alt={event.title} 
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   // Fallback to a solid color if the image fails to load
//                   (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
//                 }}
//               />
//             </div>
            
//             {/* Details */}
//             <div className="flex flex-col">
//               <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{event.date}</span>
//               <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
//                 {event.title}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>

//    <Link to="/events" className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition text-center">
//         View All Events
//       </Link>
//     </div>
//   );
// };

// export default EventsSection;

import React from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  date: string;
  title: string;
  image: string;
}

const events: Event[] = [
  { id: 1, date: "15 JUN", title: "Annual Healthcare Seminar", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80" },
  { id: 2, date: "22 JUN", title: "Nursing Workshop 2026", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80" },
  { id: 3, date: "05 JUL", title: "Guest Lecture: Global Health", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80" },
  { id: 4, date: "12 JUL", title: "Pharmacy Research Symposium", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80" },
];

const EventsSection: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Upcoming Events</h2>
      
      <div className="space-y-4 flex-grow">
        {events.map((event) => (
          <div key={event.id} className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 items-center hover:border-indigo-200 transition-all group">
            <div className="min-w-[80px] h-[70px] rounded-xl overflow-hidden bg-slate-200">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{event.date}</span>
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                {event.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <Link 
        to="/events" 
        className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition text-center"
      >
        View All Events
      </Link>
    </div>
  );
};

export default EventsSection;