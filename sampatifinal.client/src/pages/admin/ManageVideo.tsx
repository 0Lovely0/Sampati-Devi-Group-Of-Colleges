import React, { useState } from 'react';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Film from 'lucide-react/dist/esm/icons/film';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import X from 'lucide-react/dist/esm/icons/x';
import LinkIcon from 'lucide-react/dist/esm/icons/link';

const ManageVideo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState([
    { id: 1, title: "Campus Tour 2026", duration: "05:20", url: "https://youtube.com/..." },
    { id: 2, title: "Annual Convocation Highlights", duration: "12:45", url: "https://youtube.com/..." },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Video Management</h1>
          <p className="text-slate-500">Add or manage official campus videos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition"
        >
          <Plus size={20} /> Add New Video
        </button>
      </div>

      {/* Video List */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {videos.map((video) => (
          <div key={video.id} className="flex items-center justify-between p-6 border-b border-slate-100 hover:bg-slate-50 transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><Film size={24} /></div>
              <div>
                <h3 className="font-bold text-slate-900">{video.title}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase">{video.duration} • Official Media</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-rose-600"><Trash2 size={20} /></button>
          </div>
        ))}
      </div>

      {/* Upload/Link Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Video Link</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="text-slate-400"/></button>
            </div>
            
            <input type="text" placeholder="Video Title" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none" />
            
            <div className="flex gap-2 items-center p-4 bg-slate-50 rounded-xl border border-slate-200">
              <LinkIcon size={20} className="text-slate-400" />
              <input type="text" placeholder="YouTube/Vimeo Link" className="w-full bg-transparent outline-none" />
            </div>

            <textarea placeholder="Video Description..." rows={3} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none" />
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700"
            >
              Publish Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVideo;