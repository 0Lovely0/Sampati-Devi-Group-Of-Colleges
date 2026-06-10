import React, { useState } from "react";
import { Link } from "react-router-dom";

const galleryItems = [
  {
    id: 1,
    title: "Campus Library",
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Science Lab",
    src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Sports Complex",
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Classroom",
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Student Cafe",
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
  },
];

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryItems)[0] | null
  >(null);

  return (
    <>
      <section className="bg-indigo-950 py-10 px-4">
        <div className="w-full mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              College Gallery
            </h2>

            <p className="text-sm text-slate-300 mt-2">
              A glimpse into our vibrant campus life
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative h-44 md:h-52 overflow-hidden border border-white/10 shadow-sm cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-3">
                  <div>
                    <h3 className="text-white text-sm font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300">
                      Click to View
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="text-center mt-8">
            <Link
              to="/gallerypage"
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold bg-white text-indigo-950 hover:bg-amber-500 transition"
            >
              View All Photos
            </Link>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-6xl bg-white border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 bg-black px-3 py-2 text-xs font-semibold text-white"
            >
              CLOSE
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full max-h-[85vh] object-contain bg-slate-100"
            />

            <div className="border-t border-slate-200 p-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;