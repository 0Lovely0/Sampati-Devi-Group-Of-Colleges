import React, { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader";
import { getAllVideos } from "../../../services/videoService";

const VETERINARY_DEPT_ID = 3; // 🔁 change if your backend uses different ID

const theme = {
  primary: "#15803D",
  secondary: "#DCFCE7",
  accent: "#22C55E",
};
export const VideoGalleryPage: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const data = await getAllVideos();
        const list = Array.isArray(data) ? data : [];

        // ✅ FILTER VETERINARY DEPARTMENT
        const vetVideos = list.filter((video: any) =>
          video?.departments?.some(
            (dept: any) =>
              Number(dept?.departmentId) === VETERINARY_DEPT_ID ||
              dept?.departmentName?.toLowerCase().includes("veterinary"),
          ),
        );

        const normalized = vetVideos.map((video: any) => {
          const match = video?.videoUrl?.match(
            /(?:youtube\.com.*(?:v=|\/)|youtu\.be\/)([^&?/]+)/,
          );

          const videoId = match?.[1] || "";

          return {
            id: video.videoId,
            title: video.videoTitle || "Veterinary Video",
            videoId,
            thumbnail: videoId
              ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
              : "/placeholder.jpg",
          };
        });

        setVideos(normalized);
      } catch (error) {
        console.error("Failed to fetch veterinary videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: theme.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-16 px-4 text-center border-b"
        style={{
          backgroundColor: theme.primary,
          borderColor: theme.primary,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Veterinary Video Gallery
        </h1>

        <div
          className="h-1 w-24 mx-auto rounded-full"
          style={{ backgroundColor: theme.accent }}
        />

        <p className="text-white/80 mt-6 max-w-2xl mx-auto text-sm md:text-base">
          Explore veterinary seminars, animal health training, clinical
          practices, farm management sessions, and academic activities.
        </p>
      </div>

      {/* CONTENT */}
      <div className="w-full mx-auto px-4 md:px-8 -mt-32">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading Veterinary videos..." />
          </div>
        ) : videos.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-green-100 p-12 text-center">
            <h2 className="text-2xl font-bold" style={{ color: theme.primary }}>
              No Videos Available
            </h2>
            <p className="text-slate-500 mt-3">
              No Veterinary videos have been added yet.
            </p>
          </div>
        ) : (
          <>
            {/* HEADER ROW */}
            <div className="mb-8">
              <h2
                className="text-2xl font-bold"
                style={{ color: theme.primary }}
              >
                Veterinary Department Videos
              </h2>
              <p className="text-slate-500 mt-1">
                {videos.length} video{videos.length > 1 ? "s" : ""} available
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {videos.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveVideo(item.videoId)}
                  className="group cursor-pointer"
                >
                  <div
                    className="relative aspect-video overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                    style={{ borderColor: "#BBF7D0" }}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-green-900/20 flex items-center justify-center group-hover:bg-green-900/10 transition-colors">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-green-500 group-hover:border-green-500 transition-all">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span
                        className="text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                        style={{ backgroundColor: theme.primary }}
                      >
                        Veterinary
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mt-4 group-hover:text-green-700 transition">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-green-900/95 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 px-4 py-2 text-[10px] font-black text-white rounded-full uppercase"
            >
              Close
            </button>

            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="Veterinary Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            <div className="p-6 border-t">
              <span
                className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase"
                style={{
                  backgroundColor: theme.secondary,
                  color: theme.primary,
                }}
              >
                Veterinary Department
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGalleryPage;
