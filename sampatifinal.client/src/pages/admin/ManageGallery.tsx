import React, { useState } from 'react';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Image from 'lucide-react/dist/esm/icons/image';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import X from 'lucide-react/dist/esm/icons/x';
import Upload from 'lucide-react/dist/esm/icons/upload';

const ManageGallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photos, setPhotos] = useState([
    { id: 1, title: "Convocation 2026", url: "https://via.placeholder.com/300" },
    { id: 2, title: "Sports Day", url: "https://via.placeholder.com/300" },
    { id: 3, title: "Lab Inauguration", url: "https://via.placeholder.com/300" },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gallery Management</h1>
          <p className="text-slate-500">Manage campus photo gallery and albums.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition"
        >
          <Plus size={20} /> Add Photos
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group bg-white p-2 rounded-3xl border border-slate-100 shadow-sm">
            <img src={photo.url} alt={photo.title} className="w-full h-48 object-cover rounded-2xl" />
            <div className="p-3">
              <h4 className="font-bold text-slate-900 truncate">{photo.title}</h4>
            </div>
            {/* Delete Overlay */}
            <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg text-rose-600 cursor-pointer">
              <Trash2 size={18} />
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Add New Photos</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="text-slate-400"/></button>
            </div>
            
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 hover:border-indigo-400 transition cursor-pointer">
              <Upload className="mx-auto mb-4" size={40} />
              <p>Drag & Drop images here</p>
              <p className="text-xs mt-2">or click to browse files</p>
            </div>

            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700"
            >
              Upload to Gallery
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;