import { useState } from 'react';
import { galleryItems } from '../../../data/galleryData';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12 text-center">College Campus Gallery</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <img 
            key={item.id}
            src={item.src}
            alt={item.title}
            className="w-full h-60 object-cover rounded-2xl cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setSelectedImage(item)}
          />
        ))}
      </div>

      {/* Modal for full view */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6" onClick={() => setSelectedImage(null)}>
          <div className="max-w-4xl w-full">
            <img src={selectedImage.src} className="w-full rounded-xl" />
            <p className="text-white text-center mt-4 text-xl font-bold">{selectedImage.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}