import React from 'react';
import { Link } from 'react-router-dom';
const galleryItems = [
  { id: 1, title: "Campus Library", src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Science Lab", src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Sports Complex", src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Classroom", src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Student Cafe", src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Graduation Day", src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80" },
];

const GallerySection: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-slate-50 rounded-2xl border-b-1 border-gray-400">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">College Gallery</h2>
          <p className="text-slate-600 text-lg">A glimpse into our vibrant educational ecosystem.</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-80 rounded-3xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
                <p className="text-slate-200 text-sm">Explore Gallery</p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link to ="/gallerypage" className="bg-white border-2 border-slate-900 text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-xl">
            View All Photos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;