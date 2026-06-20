import React, { useEffect, useState } from "react";
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

const TARGET_DEPARTMENT = "Multipurpose Health Worker";

const MPHW_THEME = {
  primary: "#EA580C",
  secondary: "#FFEDD5",
  accent: "#F97316",
};

export const GalleryPage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<Gallery[]>([]);
  const [selectedImg, setSelectedImg] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAllGalleries();

        const mphwImages = (data || []).filter((item) =>
          item.departments?.some(
            (dept) =>
              normalize(dept.departmentName) ===
              normalize(TARGET_DEPARTMENT)
          )
        );

        setGalleryItems(mphwImages);
      } catch (err) {
        console.error("MPHW Gallery load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getImageUrl = (path?: string) =>
    !path
      ? "/placeholder.jpg"
      : `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: MPHW_THEME.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-20 px-4 text-center"
        style={{
          background: `linear-gradient(135deg, ${MPHW_THEME.primary} 0%, ${MPHW_THEME.accent} 100%)`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          MPHW Gallery
        </h1>

        <div
          className="h-1 w-24 mx-auto rounded-full"
          style={{ backgroundColor: MPHW_THEME.accent }}
        />

        <p className="text-white/80 mt-6 text-lg max-w-3xl mx-auto">
          Explore moments from field training activities, community health
          programs, health awareness campaigns, workshops, seminars,
          practical sessions, outreach initiatives, and achievements of the
          Multipurpose Health Worker Department.
        </p>
      </div>

      {/* GALLERY */}
      <div className="w-full mx-auto px-4 -mt-10">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading MPHW Gallery..." />
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-lg">
            <h3
              className="text-xl font-bold"
              style={{ color: MPHW_THEME.primary }}
            >
              No Gallery Images Found
            </h3>

            <p className="text-slate-500 mt-2">
              No MPHW gallery images are currently available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.imgId}
                onClick={() => setSelectedImg(item)}
                className="group relative aspect-square overflow-hidden rounded-3xl bg-white border shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ borderColor: "#FED7AA" }}
              >
                <img
                  src={getImageUrl(item.imgPic)}
                  alt={item.imgDes}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">
                    View Image
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* IMAGE MODAL */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(234,88,12,0.92)" }}
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 text-[10px] font-black text-white rounded-full uppercase tracking-widest transition"
            >
              Close
            </button>

            <img
              src={getImageUrl(selectedImg.imgPic)}
              alt={selectedImg.imgDes}
              className="w-full max-h-[75vh] object-contain bg-slate-50"
            />

            <div className="p-8">
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: MPHW_THEME.accent }}
              >
                Multipurpose Health Worker Department
              </span>

              <h3
                className="text-2xl font-black mt-2"
                style={{ color: MPHW_THEME.primary }}
              >
                {selectedImg.imgDes}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;