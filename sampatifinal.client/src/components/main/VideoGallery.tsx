// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Loader from "../../components/common/Loader";
// import { getAllVideos } from "../../services/videoService";

// const VideoGallery: React.FC = () => {
//   const [videos, setVideos] = useState<any[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllVideos();

//         const mainVideos = (data || []).filter((v) =>
//           v.departments?.some(
//             (d) => d.departmentName.trim().toLowerCase() === "main"
//           )
//         );

//         const normalized = mainVideos.map((v) => {
//           const match = v.videoUrl.match(
//             /(?:youtube\.com.*(?:v=|\/)|youtu\.be\/)([^&?/]+)/
//           );
//           const videoId = match?.[1] || "";

//           return {
//             id: v.videoId,
//             title: v.videoTitle,
//             videoId,
//             thumbnail: videoId
//               ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
//               : "/placeholder.jpg",
//           };
//         });

//         setVideos(normalized);
//       } catch (error) {
//         console.error("Failed to fetch videos", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   return (
//     <section className="bg-stone-50 pb-14">
//       {/* HEADER */}
//       <div className="bg-indigo-950 py-12 px-4 text-center border-b border-slate-800">
//         <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
//           Campus Videos
//         </h2>
//         <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />
//         <p className="text-slate-400 mt-4 max-w-xl mx-auto text-xs">
//           Highlights and events from our vibrant campus life.
//         </p>
//       </div>

//       {/* GRID */}
//       <div className="w-full mx-auto px-4 -mt-10">
//         {loading ? (
//           <div className="h-56 flex items-center justify-center">
//             <Loader text="Loading videos..." />
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//               {videos.slice(0, 8).map((item) => (
//                 <div
//                   key={item.id}
//                   onClick={() => setSelectedVideo(item)}
//                   className="group cursor-pointer"
//                 >
//                   <div className="relative aspect-video overflow-hidden rounded-2xl border border-stone-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
//                     <img
//                       src={item.thumbnail}
//                       alt={item.title}
//                       className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
//                     />

//                     <div className="absolute inset-0 bg-indigo-950/20 flex items-center justify-center">
//                       <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all">
//                         <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
//                       </div>
//                     </div>
//                   </div>

//                   <h3 className="text-xs font-black text-slate-950 mt-3 text-center truncate">
//                     {item.title}
//                   </h3>
//                 </div>
//               ))}
//             </div>

//             {/* ARCHIVE BUTTON */}
//             <div className="mt-12 flex justify-center">
//               <Link
//                 to="/videogallerypage"
//                 className="bg-indigo-950 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg hover:shadow-amber-500/20"
//               >
//                 View All Videos &rarr;
//               </Link>
//             </div>
//           </>
//         )}
//       </div>

//       {/* MODAL */}
//       {selectedVideo && (
//         <div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-indigo-950/95 p-4 backdrop-blur-sm"
//           onClick={() => setSelectedVideo(null)}
//         >
//           <div
//             className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setSelectedVideo(null)}
//               className="absolute top-3 right-3 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md px-3 py-1 text-[9px] font-black text-white rounded-full uppercase tracking-widest transition"
//             >
//               Close
//             </button>

//             <div className="aspect-video bg-black">
//               <iframe
//                 className="w-full h-full"
//                 src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
//                 title={selectedVideo.title}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>

//             <div className="p-5">
//               <h3 className="text-lg font-black text-slate-950">
//                 {selectedVideo.title}
//               </h3>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default VideoGallery;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { getAllVideos } from "../../services/videoService";

const VideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const data = await getAllVideos();

        const mainVideos = (data || []).filter((v) =>
          v.departments?.some(
            (d: any) =>
              d.departmentName.trim().toLowerCase() === "main"
          )
        );

        const normalized = mainVideos.map((v: any) => {
          const match = v.videoUrl.match(
            /(?:youtube\.com.*(?:v=|\/)|youtu\.be\/)([^&?/]+)/
          );

          const videoId = match?.[1] || "";

          return {
            id: v.videoId,
            title: v.videoTitle,
            videoId,
            thumbnail: videoId
              ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
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
    <section className="bg-stone-50 pb-20">
      {/* HEADER */}
      <div className="bg-indigo-950 py-16 px-6 text-center border-b border-slate-800">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Campus Videos
        </h2>

        <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full" />

        <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
          Highlights, achievements, celebrations, and memorable moments
          from our vibrant campus life.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-6 -mt-10">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading videos..." />
          </div>
        ) : (
          <>
            {/* ONLY 4 VIDEOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {videos.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedVideo(item)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden rounded-3xl border border-stone-200 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-indigo-950/25 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all">
                        <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-white border-b-[7px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-sm font-black text-slate-950 mt-4 text-center line-clamp-2 min-h-[40px]">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* VIEW ALL BUTTON */}
            <div className="mt-16 flex justify-center">
              <Link
                to="/videogallerypage"
                className="bg-indigo-950 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-all duration-300 shadow-xl hover:shadow-amber-500/30"
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-indigo-950/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 text-[10px] font-black text-white rounded-full uppercase tracking-widest transition"
            >
              Close
            </button>

            {/* VIDEO */}
            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* TITLE */}
            <div className="p-8">
              <h3 className="text-2xl md:text-3xl font-black text-slate-950">
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

