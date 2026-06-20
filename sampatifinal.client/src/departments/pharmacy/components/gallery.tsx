import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllGalleries,
  type Gallery,
} from "../../../services/galleryService";
import Loader from "../../../components/common/Loader";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

const TARGET_DEPARTMENT = "Pharmacy";

const THEME = {
  primary: "#7C3AED",
  secondary: "#EDE9FE",
  accent: "#A855F7",
};

const GallerySection: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] =
    useState<Gallery | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setLoading(true);

        const data = await getAllGalleries();

        const pharmacyImages = (data || []).filter((item) =>
          item.departments?.some(
            (dept: any) =>
              normalize(dept.departmentName) ===
              normalize(TARGET_DEPARTMENT)
          )
        );

        setGalleryItems(pharmacyImages);
      } catch (error) {
        console.error("Pharmacy gallery fetch error:", error);
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

  return (
    <section
      className="pb-14"
      style={{ backgroundColor: THEME.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background: "linear-gradient(135deg,#7C3AED 0%,#A855F7 100%)",
        }}
      >
        <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
          Pharmacy Gallery
        </h2>

        <div
          className="h-1 w-16 mx-auto rounded-full"
          style={{ backgroundColor: THEME.accent }}
        />

        <p className="text-white/80 mt-4 max-w-2xl mx-auto text-lg">
          Explore moments from academic activities, laboratory sessions,
          industrial visits, seminars, workshops, cultural events, and
          achievements of the Pharmacy Department.
        </p>
      </div>

      {/* GALLERY */}
      <div className="w-full mx-auto px-4 -mt-10">
        {loading ? (
          <div className="h-56 flex items-center justify-center">
            <Loader text="Loading Pharmacy Gallery..." />
          </div>
        ) : (
          <>
            {galleryItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-lg max-w-3xl mx-auto">
                <h3
                  className="text-xl font-bold"
                  style={{ color: THEME.primary }}
                >
                  No Gallery Images Found
                </h3>

                <p className="text-slate-500 mt-2">
                  No Pharmacy gallery images are available at the moment.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {galleryItems.slice(0, 10).map((item) => (
                    <div
                      key={item.imgId}
                      onClick={() => setSelectedImage(item)}
                      className="group relative h-32 overflow-hidden rounded-2xl bg-white border border-purple-100 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <img
                        src={getImageUrl(item.imgPic)}
                        alt={item.imgDes}
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                    to="/programs/pharmacy/gallery"
                    className="text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition hover:scale-105 shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg,#7C3AED 0%,#A855F7 100%)",
                    }}
                  >
                    View Full Gallery →
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 text-[10px] font-black text-white rounded-full uppercase tracking-widest transition"
            >
              Close
            </button>

            <img
              src={getImageUrl(selectedImage.imgPic)}
              alt={selectedImage.imgDes}
              className="w-full max-h-[70vh] object-contain bg-slate-50"
            />

            <div className="p-6">
              <h3
                className="text-xl font-black"
                style={{ color: THEME.primary }}
              >
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