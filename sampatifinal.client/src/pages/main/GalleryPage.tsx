import React, { useState } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'Infrastructure' | 'Campus Life' | 'Academic';
  src: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: "Campus Library", category: 'Infrastructure', src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, title: "Science Lab", category: 'Academic', src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, title: "Sports Complex", category: 'Campus Life', src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80" },
  { id: 4, title: "Classroom", category: 'Academic', src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80" },
  { id: 5, title: "Student Cafe", category: 'Campus Life', src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80" },
  { id: 6, title: "Graduation Day", category: 'Campus Life', src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80" },
];

const categories = ['All', 'Infrastructure', 'Campus Life', 'Academic'];

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  const filteredItems = filter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="py-20 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">College Gallery</h1>
          <p className="text-slate-600 text-lg">Explore our facilities and student life.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${filter === cat ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedImg(item)}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-xl cursor-pointer bg-white"
            >
              <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
                <p className="text-blue-300 text-sm font-semibold">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg.src} alt={selectedImg.title} className="max-w-full max-h-[80vh] rounded-lg" />
          <p className="absolute bottom-10 text-white text-2xl font-bold">{selectedImg.title}</p>
        </div>
      )}
    </div>
  );
};