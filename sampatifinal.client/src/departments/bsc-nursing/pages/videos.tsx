import React, { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader";
import { getAllVideos } from "../../../services/videoService";

const BSC_NURSING_DEPARTMENT_ID = 1;

export const VideoGalleryPage: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const data = await getAllVideos();

        const bscNursingVideos = (data || []).filter((video) =>
          video.departments?.some(
            (dept: any) =>
              dept.departmentId === BSC_NURSING_DEPARTMENT_ID
          )
        );

        const normalized = bscNursingVideos.map((video) => {
          const match = video.videoUrl?.match(
            /(?:youtube\.com.*(?:v=|\/)|youtu\.be\/)([^&?/]+)/
          );

          const videoId = match?.[1] || "";

          return {
            id: video.videoId,
            title: video.videoTitle,
            videoId,
            thumbnail: videoId
              ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
              : "/placeholder.jpg",
          };
        });

        setVideos(normalized);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FFFE] pb-20">
      {/* HEADER */}
      <div className="bg-[#0F766E] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          B.Sc Nursing Video Gallery
        </h1>

        <div className="h-1 w-24 bg-[#14B8A6] mx-auto rounded-full" />

        <p className="text-[#CCFBF1] mt-6 max-w-2xl mx-auto text-sm md:text-base">
          Explore nursing seminars, workshops, clinical training,
          department activities, awareness programs, celebrations,
          and student achievements from the B.Sc Nursing Department.
        </p>
      </div>

      {/* CONTENT */}
      <div className="w-full mx-auto px-4 md:px-8 -mt-35">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading B.Sc Nursing videos..." />
          </div>
        ) : videos.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#CCFBF1] p-12 text-center">
            <h2 className="text-2xl font-bold text-[#0F766E]">
              No Videos Available
            </h2>

            <p className="text-slate-500 mt-3">
              No B.Sc Nursing videos have been added yet.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0F766E]">
                  Department Videos
                </h2>

                <p className="text-slate-500 mt-1">
                  {videos.length} video
                  {videos.length > 1 ? "s" : ""} available
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {videos.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveVideo(item.videoId)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden rounded-3xl border border-[#CCFBF1] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#14B8A6]/20">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-[#0F766E]/20 group-hover:bg-[#0F766E]/10 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-[#14B8A6] group-hover:border-[#14B8A6] transition-all">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="bg-[#0F766E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        B.Sc Nursing
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mt-4 leading-tight group-hover:text-[#0F766E] transition">
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F766E]/95 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md px-4 py-2 text-[10px] font-black text-white rounded-full uppercase tracking-widest transition"
            >
              Close
            </button>

            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="B.Sc Nursing Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 border-t border-slate-100">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-bold uppercase tracking-wider">
                B.Sc Nursing Department
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGalleryPage;