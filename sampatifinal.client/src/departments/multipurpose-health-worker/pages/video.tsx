import React, { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader";
import { getAllVideos } from "../../../services/videoService";

const TARGET_DEPARTMENT = "Multipurpose Health Worker";

const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

const MPHW_THEME = {
  primary: "#EA580C",
  secondary: "#FFEDD5",
  accent: "#F97316",
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

        const mphwVideos = list.filter((video: any) =>
          video?.departments?.some(
            (dept: any) =>
              normalize(dept?.departmentName) ===
              normalize(TARGET_DEPARTMENT)
          )
        );

        const normalizedVideos = mphwVideos.map((video: any) => {
          const match = video?.videoUrl?.match(
            /(?:youtube\.com.*(?:v=|\/)|youtu\.be\/)([^&?/]+)/
          );

          const videoId = match?.[1] || "";

          return {
            id: video.videoId,
            title: video.videoTitle || "MPHW Video",
            videoId,
            thumbnail: videoId
              ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
              : "/placeholder.jpg",
          };
        });

        setVideos(normalizedVideos);
      } catch (error) {
        console.error("Failed to fetch MPHW videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: MPHW_THEME.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-16 px-4 text-center border-b"
        style={{
          backgroundColor: MPHW_THEME.primary,
          borderColor: MPHW_THEME.primary,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          MPHW Videos
        </h1>

        <div
          className="h-1 w-24 mx-auto rounded-full"
          style={{ backgroundColor: MPHW_THEME.accent }}
        />

        <p className="text-white/80 mt-6 max-w-2xl mx-auto text-sm md:text-base">
          Explore field training activities, community health programs,
          awareness campaigns, workshops, seminars, practical demonstrations,
          outreach initiatives, and highlights from the Multipurpose Health
          Worker Department.
        </p>
      </div>

      {/* CONTENT */}
      <div className="w-full mx-auto px-4 md:px-8 -mt-32">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading MPHW videos..." />
          </div>
        ) : videos.length === 0 ? (
          <div
            className="bg-white rounded-3xl shadow-sm p-12 text-center"
            style={{ border: "1px solid #FED7AA" }}
          >
            <h2
              className="text-2xl font-bold"
              style={{ color: MPHW_THEME.primary }}
            >
              No Videos Available
            </h2>
            <p className="text-slate-500 mt-3">
              No MPHW videos found.
            </p>
          </div>
        ) : (
          <>
            {/* HEADER ROW */}
            <div className="mb-8">
              <h2
                className="text-2xl font-bold"
                style={{ color: MPHW_THEME.primary }}
              >
                Multipurpose Health Worker Department Videos
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
                    style={{ borderColor: "#FED7AA" }}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div
                      className="absolute inset-0 flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: "rgba(234,88,12,0.15)",
                      }}
                    >
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all group-hover:bg-[#F97316] group-hover:border-[#F97316]">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span
                        className="text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                        style={{ backgroundColor: MPHW_THEME.primary }}
                      >
                        MPHW
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-lg font-black text-slate-900 mt-4 transition"
                    style={{
                      color: "#0f172a",
                    }}
                  >
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
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(234,88,12,0.92)",
          }}
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
                title="MPHW Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            <div className="p-6 border-t">
              <span
                className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase"
                style={{
                  backgroundColor: MPHW_THEME.secondary,
                  color: MPHW_THEME.primary,
                }}
              >
                Multipurpose Health Worker Department
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGalleryPage;