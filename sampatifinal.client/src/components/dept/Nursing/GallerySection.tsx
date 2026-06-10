import React from "react";
import { Link, useParams } from "react-router-dom";

const galleryItems = [
  {
    id: 1,
    title: "Modern Library",
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Nursing Lab",
    src: "https://images.unsplash.com/photo-1581093458791-9f3c3900df47?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Campus Grounds",
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Smart Classroom",
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Student Cafe",
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Convocation",
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  },
];

const GallerySection: React.FC = () => {
  const { deptId } = useParams();

  return (
    <section className="py-8 px-4 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Department Gallery
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Campus, labs, classrooms and activities
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 bg-white"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-36 object-cover"
              />

              <div className="p-2">
                <h3 className="text-xs font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-[10px] text-slate-500">
                  Department view
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-6">
          <Link
            to={`/dept/${deptId}/noticeGallery`}
            className="inline-flex items-center border border-teal-700 bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800 transition"
          >
            View All Photos
          </Link>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;