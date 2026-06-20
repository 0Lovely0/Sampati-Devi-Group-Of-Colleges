import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import { getAllVideos } from "../../../services/videoService";

const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

const TARGET_DEPARTMENT = "Pharmacy";

const VideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const data = await getAllVideos();

        const pharmacyVideos = (data || []).filter((video) =>
          video.departments?.some(
            (dept: any) =>
              normalize(dept.departmentName) ===
              normalize(TARGET_DEPARTMENT)
          )
        );

        const normalized = pharmacyVideos.map((video) => {
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
        console.error("Failed to fetch Pharmacy videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className="pb-14" style={{ backgroundColor: "#EDE9FE" }}>
      {/* HEADER */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background: "linear-gradient(135deg,#7C3AED 0%,#A855F7 100%)",
        }}
      >
        <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
          Pharmacy Videos
        </h2>

        <div className="h-1 w-20 bg-[#A855F7] mx-auto rounded-full" />

        <p className="text-purple-100 mt-4 max-w-2xl mx-auto text-xs md:text-lg">
          Explore pharmacy workshops, laboratory demonstrations, industrial
          visits, seminars, academic activities, research presentations, and
          department highlights.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-4 -mt-10">
        {loading ? (
          <div className="h-56 flex items-center justify-center">
            <Loader text="Loading Pharmacy videos..." />
          </div>
        ) : videos.length === 0 ? (
          <div className="h-56 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-[#7C3AED]">
              No Videos Available
            </h3>
            <p className="text-slate-500 mt-2">
              No Pharmacy videos found.
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
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-purple-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-400/20">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-purple-900/20 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-[#A855F7] group-hover:border-[#A855F7] transition-all">
                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xs font-black text-slate-900 mt-3 truncate group-hover:text-[#7C3AED] transition">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* VIEW ALL BUTTON */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/programs/pharmacy/videos"
                className="bg-[#7C3AED] text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#A855F7] transition shadow-lg hover:shadow-purple-400/30"
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-purple-900/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md px-3 py-1 text-[9px] font-black text-white rounded-full uppercase tracking-widest transition"
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
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-[10px] font-bold uppercase tracking-widest mb-3">
                Pharmacy Department
              </div>

              <h3 className="text-lg font-black text-slate-900">
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