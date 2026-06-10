import { useParams, Link } from 'react-router-dom';
import { notices } from '../../../data/noticeData';

export default function NoticePage() {
  const { id } = useParams();
  const notice = notices.find((n) => n.id === Number(id));

  if (id && notice) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-6">
        <Link to="/notices" className="text-teal-600 font-bold mb-6 block">← Back to Notices</Link>
        <div className="bg-white p-10 rounded-3xl border shadow-sm">
          <span className="text-teal-600 font-bold uppercase text-sm">{notice.date}</span>
          <h1 className="text-4xl font-bold text-teal-900 mt-2 mb-6">{notice.title}</h1>
          <p className="text-gray-700 leading-relaxed text-lg">{notice.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-teal-900 mb-10">All Official Notices</h1>
      <div className="space-y-4">
        {notices.map((n) => (
          <Link to={`/notices/${n.id}`} key={n.id} className="block p-6 bg-white border rounded-2xl hover:border-teal-400 transition-all">
            <h2 className="text-xl font-bold text-slate-800">{n.title}</h2>
            <p className="text-sm text-teal-600 font-medium mt-1">{n.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}