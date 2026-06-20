// import React, { useState } from 'react';

// // Added video IDs to the data structure
// const videoItems = [
//   { id: 1, title: "College Campus Tour 2026", videoId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
//   { id: 2, title: "Annual Fest Highlights", videoId: "jNQXAC9IVRw", thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg" },
//   { id: 3, title: "Lab & Research Facilities", videoId: "3JZ_D3ELwOQ", thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg" },
//   { id: 4, title: "Student Testimonials", videoId: "9bZkp7q19f0", thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg" },
//   { id: 5, title: "Principal's Convocation Speech", videoId: "tgbNymZ7vqY", thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/maxresdefault.jpg" },
//   { id: 6, title: "Sports Week 2026", videoId: "k6mFF3VMUAs", thumbnail: "https://img.youtube.com/vi/k6mFF3VMUAs/maxresdefault.jpg" },
// ];

// export const VideoGalleryPage: React.FC = () => {
//   const [activeVideo, setActiveVideo] = useState<string | null>(null);

//  return (
//   <div className="bg-slate-50 min-h-screen">
//     {/* Header */}
//     <div className="bg-indigo-950 py-8 px-4 text-center">
//       <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
//         Campus Video Gallery
//       </h1>

//       <p className="text-sm text-slate-300 max-w-2xl mx-auto">
//         Explore campus life, academic activities, events, and student experiences.
//       </p>
//     </div>

//     {/* Gallery */}
//     <div className="w-full mx-auto px-4 py-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videoItems.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => setActiveVideo(item.videoId)}
//             className="group relative h-52 overflow-hidden border border-slate-200 shadow-sm cursor-pointer bg-black"
//           >
//             <img
//               src={item.thumbnail}
//               alt={item.title}
//               className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
//             />

//             {/* Play Button */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
//                 <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-white border-b-[7px] border-b-transparent ml-1"></div>
//               </div>
//             </div>

//             {/* Title */}
//             <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
//               <h3 className="text-sm font-semibold text-white">
//                 {item.title}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Video Modal */}
//     {activeVideo && (
//       <div
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
//         onClick={() => setActiveVideo(null)}
//       >
//         <div
//           className="relative w-full max-w-4xl aspect-video bg-black border border-slate-700 overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <button
//             onClick={() => setActiveVideo(null)}
//             className="absolute -top-8 right-0 text-xs font-medium text-white hover:text-red-400"
//           >
//             Close [X]
//           </button>

//           <iframe
//             className="w-full h-full"
//             src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
//             title="YouTube video player"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>
//       </div>
//     )}
//   </div>
// )};


// import React, { useEffect, useState } from "react";
// import Loader from "../../components/common/Loader";
// import { getAllVideos, type Video } from "../../services/videoService";

// export const VideoGalleryPage: React.FC = () => {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [activeVideo, setActiveVideo] = useState<string | null>(null);
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
//     const match = url.match(
//       /(?:youtube\.com.*(?:v=|\/)|youtu\.be\/)([^&?/]+)/
//     );
//     return match?.[1] || "";
//   };

//   // Filter ONLY Main department videos
//   const mainVideos = videos.filter((video) =>
//     video.departments?.some(
//       (dept) => dept.departmentName === "Main"
//     )
//   );

//   // Normalize for UI
//   const normalizedVideos = mainVideos.map((v) => {
//     const id = extractYouTubeId(v.videoUrl);

//     return {
//       id: v.videoId,
//       title: v.videoTitle,
//       videoId: id,
//       thumbnail: id
//         ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
//         : "https://via.placeholder.com/800x450?text=No+Video",
//     };
//   });

//   return (
//     <div className="bg-slate-50 min-h-screen">

//       {/* Header */}
//       <div className="bg-indigo-950 py-8 px-4 text-center">
//         <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
//           Campus Video Gallery
//         </h1>

//         <p className="text-sm text-slate-300 max-w-2xl mx-auto">
//           Explore campus life, academic activities, events, and student experiences.
//         </p>
//       </div>

//       {/* CONTENT */}
//       <div className="w-full mx-auto px-2 py-2">

//         {/* LOADER */}
//         {loading ? (
//           <div className="h-64 flex items-center justify-center">
//             <Loader text="Loading videos..." />
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">

//             {normalizedVideos.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => setActiveVideo(item.videoId)}
//                 className="group relative h-52 overflow-hidden border border-slate-200 shadow-sm cursor-pointer bg-black rounded-xl"
//               >

//                 <img
//                   src={item.thumbnail}
//                   alt={item.title}
//                   className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
//                 />

//                 {/* Play Button */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
//                     <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-white border-b-[7px] border-b-transparent ml-1" />
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
//                   <h3 className="text-sm font-semibold text-white">
//                     {item.title}
//                   </h3>
//                 </div>

//               </div>
//             ))}

//           </div>
//         )}

//       </div>

//       {/* VIDEO MODAL */}
//       {activeVideo && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
//           onClick={() => setActiveVideo(null)}
//         >
//           <div
//             className="relative w-full max-w-4xl aspect-video bg-black border border-slate-700 overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setActiveVideo(null)}
//               className="absolute -top-8 right-0 text-xs font-medium text-white hover:text-red-400"
//             >
//               Close [X]
//             </button>

//             <iframe
//               className="w-full h-full"
//               src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
//               title="YouTube video player"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { getAllVideos,} from "../../services/videoService";

export const VideoGalleryPage: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const data = await getAllVideos();
        const mainVideos = (data || []).filter((v) =>
          v.departments?.some((d) => d.departmentName.trim().toLowerCase() === "main")
        );
        
        const normalized = mainVideos.map((v) => {
          const match = v.videoUrl.match(/(?:youtube\.com.*(?:v=|\/)|youtu\.be\/)([^&?/]+)/);
          const videoId = match?.[1] || "";
          return {
            id: v.videoId,
            title: v.videoTitle,
            videoId,
            thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "/placeholder.jpg",
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
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* HEADER */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Video Gallery</h1>
        <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full" />
        <p className="text-slate-400 mt-6 max-w-xl mx-auto text-lg">A collection of captured campus highlights and student milestones.</p>
      </div>

      {/* CONTENT */}
      <div className="w-full mx-auto px-4 -mt-12">
        {loading ? (
          <div className="h-64 flex items-center justify-center"><Loader text="Loading library..." /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {videos.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveVideo(item.videoId)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden rounded-3xl border border-stone-200 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-indigo-950/20 group-hover:bg-indigo-950/10 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-black text-slate-950 mt-4 leading-tight group-hover:text-amber-700 transition">{item.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-indigo-950/95 p-4 backdrop-blur-sm" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveVideo(null)} className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md px-4 py-2 text-[10px] font-black text-white rounded-full uppercase tracking-widest transition">Close</button>
            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};