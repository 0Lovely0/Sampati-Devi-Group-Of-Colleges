import React from "react";
import { Play, Film } from "lucide-react";
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
];

const VideoGallery: React.FC = () => {
  const { deptId } = useParams();
  return (
    <section className="py-20 px-6 bg-white rounded-b-xl border-b-1 border-b-blue-400">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          {/* <div className="bg-teal-100 p-3 rounded-full text-teal-700 mb-4">
            <Film size={28} />
          </div> */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            College Videos
          </h2>
          <p className="text-slate-600 text-lg max-w-lg">
            Watch highlights, clinical training sessions, and campus life
            updates.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoItems.map((item) => (
            <div
              key={item.id}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play
                    size={24}
                    className="text-teal-700 fill-teal-700 ml-1"
                  />
                </div>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-lg font-bold group-hover:text-teal-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            to={`/dept/${deptId}/nursingVideo`}
            className="bg-teal-700 text-white px-10 py-4 rounded-full font-bold hover:bg-teal-800 transition-all duration-300 shadow-lg shadow-teal-200"
          >
            Watch All Videos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
