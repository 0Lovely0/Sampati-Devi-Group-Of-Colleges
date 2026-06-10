import React from "react";
import { Play } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const videoItems = [
  {
    id: 1,
    title: "College Campus Tour 2026",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "Nursing Dept Highlights",
    thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
  },
  {
    id: 3,
    title: "Modern Nursing Labs",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg",
  },
  {
    id: 4,
    title: "Clinical Training Session",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: 5,
    title: "Guest Lecture Highlights",
    thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
  },
  {
    id: 6,
    title: "Student Life at Campus",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg",
  },
];

const VideoGallery: React.FC = () => {
  const { deptId } = useParams();

  return (
    <section className="py-8 px-4 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Department Videos
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Campus tours, labs, training and academic activities
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {videoItems.map((item) => (
            <div
              key={item.id}
              className="relative border border-slate-200 bg-white"
            >
              {/* Thumbnail */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-cover"
              />

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition">
                <div className="w-10 h-10 flex items-center justify-center border border-white bg-white">
                  <Play size={16} className="text-teal-700" />
                </div>
              </div>

              {/* Title */}
              <div className="p-2">
                <h3 className="text-xs font-semibold text-slate-900">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-6">
          <Link
            to={`/dept/${deptId}/nursingVideo`}
            className="inline-flex items-center border border-teal-700 bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800 transition"
          >
            Watch All Videos
          </Link>
        </div>

      </div>
    </section>
  );
};

export default VideoGallery;