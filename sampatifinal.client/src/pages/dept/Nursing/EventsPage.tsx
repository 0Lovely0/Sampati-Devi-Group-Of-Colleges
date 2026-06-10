import { useParams, Link } from 'react-router-dom';
import { events } from '../../../data/eventsData';

export default function EventsPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  // Agar ID exist karti hai, toh Details dikhao
  if (id && event) {
    
    return (
      <div className="max-w-7xl mx-auto py-16 px-6">
        <Link to="/events" className="text-teal-600 font-bold mb-4 block">← Back to All Events</Link>
        <img src={event.image} className="w-full h-80 object-cover rounded-3xl mb-8" />
        <h1 className="text-4xl font-extrabold text-teal-900 mb-2">{event.title}</h1>
        <p className="text-teal-600 font-bold mb-6">{event.date}</p>
        <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
      </div>
    );
  }

  // Default: Saari events ki list dikhao
  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-teal-900 mb-10">Upcoming Events</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event) => (
          <Link to={`/events/${event.id}`} key={event.id} className="bg-white rounded-3xl overflow-hidden border hover:shadow-lg transition-all">
            <img src={event.image} className="w-full h-56 object-cover" />
            <div className="p-6">
              <span className="text-teal-600 font-bold text-sm">{event.date}</span>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{event.title}</h2>
              <p className="text-gray-600 line-clamp-2">{event.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}