import React, { useState } from 'react';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Edit from 'lucide-react/dist/esm/icons/edit';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import X from 'lucide-react/dist/esm/icons/x';

const ManageNews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [news, setNews] = useState([
    { id: 1, title: "University Annual Sports Meet", date: "May 25, 2026", status: "Published" },
    { id: 2, title: "New Lab Equipment Arrival", date: "May 20, 2026", status: "Draft" },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">News Management</h1>
          <p className="text-slate-500">Manage latest updates and announcements.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition"
        >
          <Plus size={20} /> Add News
        </button>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-xs font-bold text-slate-400 uppercase">Title</th>
              <th className="p-6 text-xs font-bold text-slate-400 uppercase">Date</th>
              <th className="p-6 text-xs font-bold text-slate-400 uppercase">Status</th>
              <th className="p-6 text-xs font-bold text-slate-400 uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {news.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition">
                <td className="p-6 font-bold text-slate-900">{item.title}</td>
                <td className="p-6 text-slate-500">{item.date}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-6 flex justify-center gap-3">
                  <button className="text-slate-400 hover:text-indigo-600"><Edit size={18} /></button>
                  <button className="text-slate-400 hover:text-rose-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add News Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Post New Update</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="text-slate-400"/></button>
            </div>
            
            <input type="text" placeholder="News Headline" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-indigo-600" />
            <textarea placeholder="Write news content here..." rows={4} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-indigo-600" />
            <select className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none">
              <option value="Published">Publish Now</option>
              <option value="Draft">Save as Draft</option>
            </select>
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700"
            >
              Post News
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;