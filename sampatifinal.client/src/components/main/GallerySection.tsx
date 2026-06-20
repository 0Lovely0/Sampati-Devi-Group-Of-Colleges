import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllGalleries, type Gallery } from "../../services/galleryService";
import Loader from "../common/Loader";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const GallerySection: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setLoading(true);
        const data = await getAllGalleries();
        setGalleryItems(data || []);
      } catch (error) {
        console.error("Error fetching galleries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  const getImageUrl = (path?: string) =>
    !path
      ? "/placeholder.jpg"
      : `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const filteredItems = galleryItems.filter((item) =>
    item.departments?.some(
      (dept) =>
        dept.departmentName.trim().toLowerCase() === "main"
    )
  );

  return (
    <section className="bg-stone-50 pb-14">
      {/* HEADER */}
      <div className="bg-indigo-950 py-12 px-4 text-center border-b border-slate-800">
      <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Campus Gallery
        </h2>
       <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full" />
     <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
          A visual journey through our vibrant academic life.
        </p>
      </div>

      {/* GRID */}
    <div className="w-full mx-auto px-6 -mt-8">
        {loading ? (
          <div className="h-56 flex items-center justify-center">
            <Loader text="Loading Gallery..." />
          </div>
        ) : (
          <>
           <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
             {filteredItems.map((item) => (
                <div
                  key={item.imgId}
                  onClick={() => setSelectedImage(item)}
                 className="group relative h-56 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <img
                    src={getImageUrl(item.imgPic)}
                    alt={item.imgDes}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-indigo-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[9px] font-black text-white uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/gallerypage"
                className="bg-indigo-950 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg hover:shadow-amber-500/20"
              >
                View Full Gallery &rarr;
              </Link>
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-indigo-950/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md px-3 py-1 text-[9px] font-black text-white rounded-full uppercase tracking-widest transition"
            >
              Close
            </button>

            <img
              src={getImageUrl(selectedImage.imgPic)}
              alt={selectedImage.imgDes}
              className="w-full max-h-[60vh] object-contain bg-stone-100"
            />

            <div className="p-5">
              <h3 className="text-lg font-black text-slate-950">
                {selectedImage.imgDes}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;