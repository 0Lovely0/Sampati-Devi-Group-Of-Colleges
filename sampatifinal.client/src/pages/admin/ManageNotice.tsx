import React, { useState } from 'react';
import Plus from 'lucide-react/dist/esm/icons/plus';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import X from 'lucide-react/dist/esm/icons/x';
import Paperclip from 'lucide-react/dist/esm/icons/paperclip';

const ManageNotice = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notices, setNotices] = useState([
    { id: 1, title: "Semester Exam Guidelines", date: "May 20, 2026", type: "Academic" },
    { id: 2, title: "Hostel Fee Submission", date: "May 15, 2026", type: "Admin" },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notice Management</h1>
          <p className="text-slate-500">Post important notices for students and staff.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition"
        >
          <Plus size={20} /> New Notice
        </button>
      </div>

      {/* Notice List */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {notices.map((notice) => (
          <div key={notice.id} className="flex items-center justify-between p-6 border-b border-slate-100 hover:bg-slate-50 transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><FileText size={24} /></div>
              <div>
                <h3 className="font-bold text-slate-900">{notice.title}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase">{notice.type} • {notice.date}</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-rose-600"><Trash2 size={20} /></button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Post New Notice</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="text-slate-400"/></button>
            </div>
            
            <input type="text" placeholder="Notice Title" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none" />
            
            <div className="flex gap-2">
              <select className="flex-1 p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none">
                <option>Academic</option>
                <option>Admin</option>
                <option>Sports</option>
              </select>
              <button className="flex items-center gap-2 p-4 bg-slate-100 rounded-xl font-bold text-slate-600">
                <Paperclip size={20} /> Attach PDF
              </button>
            </div>

            <textarea placeholder="Notice details..." rows={4} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none" />
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700"
            >
              Publish Notice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotice;