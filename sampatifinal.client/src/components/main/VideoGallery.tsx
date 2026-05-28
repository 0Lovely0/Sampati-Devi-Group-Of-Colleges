import React from 'react';
import { Link } from 'react-router-dom';
const videoItems = [
  { id: 1, title: "College Campus Tour 2026", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
  { id: 2, title: "Annual Fest Highlights", thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg" },
  { id: 3, title: "Lab & Research Facilities", thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg" },
  { id: 4, title: "Student Testimonials", thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg" },
  { id: 5, title: "Principal's Convocation Speech", thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/maxresdefault.jpg" },
  { id: 6, title: "Sports Week 2026", thumbnail: "https://img.youtube.com/vi/k6mFF3VMUAs/maxresdefault.jpg" },
];

const VideoGallery: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-slate-50 rounded-2xl border-b-1 border-gray-400">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Campus Videos</h2>
          <p className="text-slate-600 text-lg">Watch highlights and events from our campus life.</p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-72 rounded-3xl overflow-hidden shadow-xl cursor-pointer"
            >
              {/* Thumbnail */}
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to ="videogallerypage" className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-600 transition-all duration-300 shadow-xl">
            Watch More Videos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;