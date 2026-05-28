import React, { useState } from 'react';
import Upload from 'lucide-react/dist/esm/icons/upload';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import Eye from 'lucide-react/dist/esm/icons/eye';
import X from 'lucide-react/dist/esm/icons/x';

const ManageBanners = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banners, setBanners] = useState([
    { id: 1, title: "Summer Admissions 2026", image: "https://via.placeholder.com/600x200" },
    { id: 2, title: "Convocation Ceremony", image: "https://via.placeholder.com/600x200" },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Banner Management</h1>
          <p className="text-slate-500">Manage promotional banners for the website homepage.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition"
        >
          <Upload size={20} /> Upload New Banner
        </button>
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm group">
            <div className="relative overflow-hidden rounded-2xl mb-4">
              <img src={banner.image} alt={banner.title} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                <button className="p-3 bg-white rounded-full text-indigo-600"><Eye size={20} /></button>
                <button className="p-3 bg-white rounded-full text-rose-600"><Trash2 size={20} /></button>
              </div>
            </div>
            <h3 className="font-bold text-slate-800 px-2">{banner.title}</h3>
            <p className="text-xs text-slate-400 px-2 mt-1">Uploaded 2 days ago</p>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upload New Banner</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="text-slate-400"/></button>
            </div>
            
            <input type="text" placeholder="Banner Title" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-indigo-600" />
            
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 hover:border-indigo-400 cursor-pointer transition">
              <Upload className="mx-auto mb-2" />
              <p className="text-sm">Click or drag image to upload</p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700"
            >
              Upload Banner
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBanners;