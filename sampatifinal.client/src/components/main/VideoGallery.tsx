// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const videoItems = [
//   {
//     id: 1,
//     title: "College Campus Tour 2026",
//     thumbnail:
//       "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     videoId: "dQw4w9WgXcQ",
//   },
//   {
//     id: 2,
//     title: "Annual Fest Highlights",
//     thumbnail:
//       "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     videoId: "jNQXAC9IVRw",
//   },
//   {
//     id: 3,
//     title: "Lab & Research Facilities",
//     thumbnail:
//       "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     videoId: "3JZ_D3ELwOQ",
//   },
//   {
//     id: 4,
//     title: "Student Testimonials",
//     thumbnail:
//       "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     videoId: "9bZkp7q19f0",
//   },
//   {
//     id: 5,
//     title: "Principal Speech",
//     thumbnail:
//       "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     videoId: "tgbNymZ7vqY",
//   },
//   {
//     id: 6,
//     title: "Sports Week 2026",
//     thumbnail:
//       "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     videoId: "k6mFF3VMUAs",
//   },
// ];

// const VideoGallery: React.FC = () => {
//   const [selectedVideo, setSelectedVideo] =
//     useState<(typeof videoItems)[0] | null>(null);

//   return (
//     <>
//       <section className="bg-gradient-to-br from-indigo-50 via-white to-amber-50 py-10 px-4">
//         <div className="w-full mx-auto">
//           {/* Heading */}
//           <div className="text-center mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
//               Campus Videos
//             </h2>

//             <p className="text-sm text-slate-500 mt-1">
//               Watch campus highlights & events
//             </p>
//           </div>

//           {/* Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//             {videoItems.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => setSelectedVideo(item)}
//                 className="group relative h-36 md:h-44 overflow-hidden shadow-sm border border-slate-200 cursor-pointer"
//               >
//                 <img
//                   src={item.thumbnail}
//                   alt={item.title}
//                   className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
//                 />

//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition flex items-center justify-center">
//                   <div className="w-7 h-7 md:w-9 md:h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
//                     <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-slate-900 border-b-[6px] border-b-transparent ml-1" />
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <div className="absolute bottom-0 w-full bg-gradient-to-t from-white/95 to-transparent p-2">
//                   <h3 className="text-xs font-semibold text-slate-800 truncate">
//                     {item.title}
//                   </h3>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Button */}
//           <div className="flex justify-center mt-6">
//             <Link
//               to="/videogallerypage"
//               className="px-5 py-2 text-xs font-semibold bg-slate-100 text-black hover:bg-amber-600 hover:text-white transition"
//             >
//               Watch More Videos
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Video Modal */}
//       {selectedVideo && (
//         <div
//           className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
//           onClick={() => setSelectedVideo(null)}
//         >
//           <div
//             className="relative w-full max-w-5xl bg-white border border-slate-200"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setSelectedVideo(null)}
//               className="absolute top-3 right-3 z-10 bg-black px-3 py-2 text-xs font-semibold text-white"
//             >
//               CLOSE
//             </button>

//             <div className="aspect-video">
//               <iframe
//                 className="w-full h-full"
//                 src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
//                 title={selectedVideo.title}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>

//             <div className="border-t border-slate-200 p-4">
//               <h3 className="text-lg font-semibold text-slate-900">
//                 {selectedVideo.title}
//               </h3>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default VideoGallery;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Loader from "../../components/common/Loader";
// import { getAllVideos, type Video } from "../../services/videoService";

// const VideoGallery: React.FC = () => {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch videos
//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllVideos();
//         setVideos(data || []);
//       } catch (error) {
//         console.error("Failed to fetch videos", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   // Extract YouTube ID
//   const extractYouTubeId = (url: string) => {
//     const match = url.match(/(?:youtube\.com.*(?:v=|\/)|youtu\.be\/)([^&?/]+)/);
//     return match?.[1] || "";
//   };

//   // Filter only "Main"
//   const mainVideos = videos.filter((video) =>
//     video.departments?.some((dept) => dept.departmentName === "Main"),
//   );

//   // Normalize
//   const normalizedVideos = mainVideos.map((v) => {
//     const videoId = extractYouTubeId(v.videoUrl);

//     return {
//       id: v.videoId,
//       title: v.videoTitle,
//       videoId,
//       thumbnail: videoId
//         ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
//         : "https://via.placeholder.com/400x300?text=No+Thumbnail",
//     };
//   });

//   return (
//     <>
//       <section className="bg-gradient-to-br from-indigo-50 via-white to-amber-50 py-10 px-4 sm:px-6">
//         <div className="w-full mx-auto">
//           {/* HEADER */}
//           <div className="text-center mb-6 sm:mb-8">
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
//               Campus Videos
//             </h2>

//             <p className="text-xs sm:text-sm text-slate-500 mt-1">
//               Watch campus highlights & events
//             </p>
//           </div>

//           {/* LOADER */}
//           {loading ? (
//             <div className="h-64 flex items-center justify-center">
//               <Loader text="Loading videos..." />
//             </div>
//           ) : (
//             <>
//               {/* GRID */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
//                 {normalizedVideos.map((item) => (
//                   <div
//                     key={item.id}
//                     onClick={() => setSelectedVideo(item)}
//                     className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm cursor-pointer transition hover:-translate-y-1 hover:shadow-lg"
//                   >
//                     {/* THUMBNAIL */}
//                     <div className="h-24 sm:h-28 md:h-32 overflow-hidden">
//                       <img
//                         src={item.thumbnail}
//                         alt={item.title}
//                         className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
//                       />
//                     </div>

//                     {/* PLAY OVERLAY */}
//                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
//                       <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md">
//                         <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-slate-900 border-b-[5px] border-b-transparent ml-1" />
//                       </div>
//                     </div>

//                     {/* TITLE */}
//                     <div className="absolute bottom-0 w-full bg-gradient-to-t from-white/95 to-transparent p-2">
//                       <h3 className="text-[10px] sm:text-xs font-semibold text-slate-800 truncate">
//                         {item.title}
//                       </h3>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* BUTTON */}
//               <div className="flex justify-center mt-6 sm:mt-8">
//                 <Link
//                   to="/videogallerypage"
//                   className="rounded-full px-5 py-2 text-xs sm:text-sm font-semibold bg-slate-100 text-black hover:bg-amber-600 hover:text-white transition"
//                 >
//                   Watch More Videos
//                 </Link>
//               </div>
//             </>
//           )}
//         </div>

//         {/* MODAL */}
//         {selectedVideo && (
//           <div
//             className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-3 sm:p-4"
//             onClick={() => setSelectedVideo(null)}
//           >
//             <div
//               className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* CLOSE */}
//               <button
//                 onClick={() => setSelectedVideo(null)}
//                 className="absolute top-3 right-3 z-10 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold text-white hover:bg-black"
//               >
//                 CLOSE
//               </button>

//               {/* VIDEO */}
//               <div className="aspect-video">
//                 <iframe
//                   className="w-full h-full"
//                   src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
//                   title={selectedVideo.title}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>

//               {/* TITLE */}
//               <div className="border-t border-slate-200 p-3 sm:p-4">
//                 <h3 className="text-sm sm:text-lg font-semibold text-slate-900">
//                   {selectedVideo.title}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* Modal */}
//       {selectedVideo && (
//         <div
//           className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
//           onClick={() => setSelectedVideo(null)}
//         >
//           <div
//             className="relative w-full max-w-5xl bg-white border border-slate-200"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setSelectedVideo(null)}
//               className="absolute top-3 right-3 z-10 bg-black px-3 py-2 text-xs font-semibold text-white"
//             >
//               CLOSE
//             </button>

//             <div className="aspect-video">
//               <iframe
//                 className="w-full h-full"
//                 src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
//                 title={selectedVideo.title}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>

//             <div className="border-t border-slate-200 p-4">
//               <h3 className="text-lg font-semibold text-slate-900">
//                 {selectedVideo.title}
//               </h3>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
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
            (d) => d.departmentName.trim().toLowerCase() === "main"
          )
        );

        const normalized = mainVideos.map((v) => {
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
    <section className="bg-stone-50 pb-14">
      {/* HEADER */}
      <div className="bg-indigo-950 py-12 px-4 text-center border-b border-slate-800">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
          Campus Videos
        </h2>
        <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />
        <p className="text-slate-400 mt-4 max-w-xl mx-auto text-xs">
          Highlights and events from our vibrant campus life.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-4 -mt-10">
        {loading ? (
          <div className="h-56 flex items-center justify-center">
            <Loader text="Loading videos..." />
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
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-stone-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-indigo-950/20 flex items-center justify-center">
                      <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all">
                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xs font-black text-slate-950 mt-3 text-center truncate">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* ARCHIVE BUTTON */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/videogallerypage"
                className="bg-indigo-950 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg hover:shadow-amber-500/20"
              >
                View All Videos &rarr;
              </Link>
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-indigo-950/95 p-4 backdrop-blur-sm"
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
              <h3 className="text-lg font-black text-slate-950">
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