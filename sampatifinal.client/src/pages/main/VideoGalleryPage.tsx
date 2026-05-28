import React, { useState } from 'react';

// Added video IDs to the data structure
const videoItems = [
  { id: 1, title: "College Campus Tour 2026", videoId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
  { id: 2, title: "Annual Fest Highlights", videoId: "jNQXAC9IVRw", thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg" },
  { id: 3, title: "Lab & Research Facilities", videoId: "3JZ_D3ELwOQ", thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg" },
  { id: 4, title: "Student Testimonials", videoId: "9bZkp7q19f0", thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg" },
  { id: 5, title: "Principal's Convocation Speech", videoId: "tgbNymZ7vqY", thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/maxresdefault.jpg" },
  { id: 6, title: "Sports Week 2026", videoId: "k6mFF3VMUAs", thumbnail: "https://img.youtube.com/vi/k6mFF3VMUAs/maxresdefault.jpg" },
];

export const VideoGalleryPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-20 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Campus Video Gallery</h2>
          <p className="text-slate-600 text-lg">Immerse yourself in our vibrant campus life through our featured videos.</p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveVideo(item.videoId)}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-xl cursor-pointer bg-black"
            >
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100" 
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-white text-lg font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white font-bold hover:text-red-400 transition"
            >
              Close [X]
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};