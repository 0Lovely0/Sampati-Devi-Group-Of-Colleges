import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import { getAllVideos } from "../../../services/videoService";

const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

const TARGET_DEPARTMENT = "Multipurpose Health Worker";

const MPHW_THEME = {
  primary: "#EA580C",
  secondary: "#FFEDD5",
  accent: "#F97316",
};

const VideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const data = await getAllVideos();

        const mphwVideos = (data || []).filter((video) =>
          video.departments?.some(
            (dept: any) =>
              normalize(dept.departmentName) ===
              normalize(TARGET_DEPARTMENT)
          )
        );

        const normalized = mphwVideos.map((video) => {
          const match = video.videoUrl?.match(
            /(?:youtube\.com.*(?:v=|\/)|youtu\.be\/)([^&?/]+)/
          );

          const videoId = match?.[1] || "";

          return {
            id: video.videoId,
            title: video.videoTitle,
            videoId,
            thumbnail: videoId
              ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
              : "/placeholder.jpg",
          };
        });

        setVideos(normalized);
      } catch (error) {
        console.error("Failed to fetch MPHW videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section
      className="pb-14"
      style={{ backgroundColor: MPHW_THEME.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background: `linear-gradient(135deg, ${MPHW_THEME.primary} 0%, ${MPHW_THEME.accent} 100%)`,
        }}
      >
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
          MPHW Videos
        </h2>

        <div
          className="h-1 w-20 mx-auto rounded-full"
          style={{ backgroundColor: MPHW_THEME.accent }}
        />

        <p className="text-orange-100 mt-4 max-w-xl mx-auto text-xs md:text-sm">
          Explore field training activities, community health programs,
          awareness campaigns, workshops, seminars, practical demonstrations,
          outreach initiatives, and highlights from the Multipurpose Health
          Worker Department.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-4 -mt-10">
        {loading ? (
          <div className="h-56 flex items-center justify-center">
            <Loader text="Loading MPHW videos..." />
          </div>
        ) : videos.length === 0 ? (
          <div className="h-56 flex flex-col items-center justify-center">
            <h3
              className="text-xl font-bold"
              style={{ color: MPHW_THEME.primary }}
            >
              No Videos Available
            </h3>

            <p className="text-slate-500 mt-2">
              No MPHW videos found.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {videos.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedVideo(item)}
                  className="group cursor-pointer"
                >
                  <div
                    className="relative aspect-video overflow-hidden rounded-2xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      borderColor: "#FED7AA",
                    }}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-orange-900/20 flex items-center justify-center">
                      <div
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all"
                        style={{
                          boxShadow: "0 0 0 rgba(0,0,0,0)",
                        }}
                      >
                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <h3
                    className="text-xs font-black text-slate-900 mt-3 truncate transition"
                    style={{
                      color: "#0F172A",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* VIEW ALL BUTTON */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/programs/multipurpose-health-worker/videos"
                className="text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition shadow-lg hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${MPHW_THEME.primary} 0%, ${MPHW_THEME.accent} 100%)`,
                }}
              >
                View All Videos →
              </Link>
            </div>
          </>
        )}
      </div>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(234,88,12,0.92)",
          }}
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 z-10 px-3 py-1 text-[9px] font-black text-white rounded-full uppercase tracking-widest transition"
              style={{
                backgroundColor: MPHW_THEME.primary,
              }}
            >
              Close
            </button>

            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-5">
              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{
                  backgroundColor: MPHW_THEME.secondary,
                  color: MPHW_THEME.primary,
                }}
              >
                Multipurpose Health Worker Department
              </div>

              <h3
                className="text-lg font-black"
                style={{ color: MPHW_THEME.primary }}
              >
                {selectedVideo.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;