import React, { useState } from "react";
import { Link } from "react-router-dom";

const videoItems = [
  {
    id: 1,
    title: "College Campus Tour 2026",
    thumbnail:
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Annual Fest Highlights",
    thumbnail:
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoId: "jNQXAC9IVRw",
  },
  {
    id: 3,
    title: "Lab & Research Facilities",
    thumbnail:
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoId: "3JZ_D3ELwOQ",
  },
  {
    id: 4,
    title: "Student Testimonials",
    thumbnail:
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoId: "9bZkp7q19f0",
  },
  {
    id: 5,
    title: "Principal Speech",
    thumbnail:
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoId: "tgbNymZ7vqY",
  },
  {
    id: 6,
    title: "Sports Week 2026",
    thumbnail:
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoId: "k6mFF3VMUAs",
  },
];

const VideoGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] =
    useState<(typeof videoItems)[0] | null>(null);

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-50 via-white to-amber-50 py-10 px-4">
        <div className="w-full mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Campus Videos
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Watch campus highlights & events
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {videoItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedVideo(item)}
                className="group relative h-36 md:h-44 overflow-hidden shadow-sm border border-slate-200 cursor-pointer"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition flex items-center justify-center">
                  <div className="w-7 h-7 md:w-9 md:h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-slate-900 border-b-[6px] border-b-transparent ml-1" />
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-white/95 to-transparent p-2">
                  <h3 className="text-xs font-semibold text-slate-800 truncate">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="flex justify-center mt-6">
            <Link
              to="/videogallerypage"
              className="px-5 py-2 text-xs font-semibold bg-slate-100 text-black hover:bg-amber-600 hover:text-white transition"
            >
              Watch More Videos
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-white border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 z-10 bg-black px-3 py-2 text-xs font-semibold text-white"
            >
              CLOSE
            </button>

            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="border-t border-slate-200 p-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {selectedVideo.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGallery;