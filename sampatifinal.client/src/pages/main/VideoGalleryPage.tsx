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
  <div className="bg-slate-50 min-h-screen">
    {/* Header */}
    <div className="bg-indigo-950 py-8 px-4 text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
        Campus Video Gallery
      </h1>

      <p className="text-sm text-slate-300 max-w-2xl mx-auto">
        Explore campus life, academic activities, events, and student experiences.
      </p>
    </div>

    {/* Gallery */}
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videoItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveVideo(item.videoId)}
            className="group relative h-52 overflow-hidden border border-slate-200 shadow-sm cursor-pointer bg-black"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
            />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-white border-b-[7px] border-b-transparent ml-1"></div>
              </div>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-sm font-semibold text-white">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Video Modal */}
    {activeVideo && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
        onClick={() => setActiveVideo(null)}
      >
        <div
          className="relative w-full max-w-4xl aspect-video bg-black border border-slate-700 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute -top-8 right-0 text-xs font-medium text-white hover:text-red-400"
          >
            Close [X]
          </button>

          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    )}
  </div>
)};