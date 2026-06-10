// import React, { useState } from 'react';

// interface GalleryItem {
//   id: number;
//   title: string;
//   category: 'Infrastructure' | 'Campus Life' | 'Academic';
//   src: string;
// }

// const galleryItems: GalleryItem[] = [
//   {
//     id: 1,
//     title: "Campus Library",
//     category: 'Infrastructure',
//     src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
//   },
//   {
//     id: 2,
//     title: "Science Lab",
//     category: 'Academic',
//     src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80"
//   },
//   {
//     id: 3,
//     title: "Sports Complex",
//     category: 'Campus Life',
//     src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80"
//   },
//   {
//     id: 4,
//     title: "Classroom",
//     category: 'Academic',
//     src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
//   },
//   {
//     id: 5,
//     title: "Student Cafe",
//     category: 'Campus Life',
//     src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
//   },
//   {
//     id: 6,
//     title: "Graduation Day",
//     category: 'Campus Life',
//     src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
//   },
// ];

// const categories = ['All', 'Infrastructure', 'Campus Life', 'Academic'];

// export const GalleryPage: React.FC = () => {
//   const [filter, setFilter] = useState('All');
//   const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

//   const filteredItems =
//     filter === 'All'
//       ? galleryItems
//       : galleryItems.filter(item => item.category === filter);

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       {/* Header */}
//       <div className="bg-indigo-950 py-8 px-4 text-center">
//         <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
//           College Gallery
//         </h1>
//         <p className="text-sm text-slate-300">
//           Explore our facilities, infrastructure, and student activities.
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {/* Filter Buttons */}
//         <div className="flex justify-center gap-2 mb-6 flex-wrap">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setFilter(cat)}
//               className={`px-3 py-1 text-xs font-medium border transition-colors ${
//                 filter === cat
//                   ? 'bg-amber-600 text-white border-indigo-950'
//                   : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Gallery Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredItems.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => setSelectedImg(item)}
//               className="group relative h-56 overflow-hidden border border-slate-200 bg-white shadow-sm cursor-pointer"
//             >
//               <img
//                 src={item.src}
//                 alt={item.title}
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//               />

//               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
//                 <h3 className="text-white text-sm font-semibold">
//                   {item.title}
//                 </h3>

//                 <p className="text-slate-300 text-xs">
//                   {item.category}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Lightbox Modal */}
//       {selectedImg && (
//         <div
//           className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//           onClick={() => setSelectedImg(null)}
//         >
//           <div
//             className="max-w-4xl w-full bg-white"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={selectedImg.src}
//               alt={selectedImg.title}
//               className="w-full max-h-[75vh] object-contain"
//             />

//             <div className="border-t border-slate-200 p-3 text-center">
//               <p className="text-sm font-semibold text-slate-900">
//                 {selectedImg.title}
//               </p>

//               <p className="text-xs text-slate-500 mt-1">
//                 {selectedImg.category}
//               </p>
//             </div>

//             <button
//               onClick={() => setSelectedImg(null)}
//               className="w-full border-t border-slate-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import { getAllGalleries, type Gallery } from "../../services/galleryService";

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const [galleryItems, setGalleryItems] = useState<Gallery[]>([]);
  const [selectedImg, setSelectedImg] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://localhost:7197";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllGalleries();
        setGalleryItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getImageUrl = (path?: string) => {
    if (!path) return "/placeholder.jpg";
    return `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  };

  // ✅ ONLY "Main" department filter
  const mainOnlyItems = galleryItems.filter((item) =>
    item.departments?.some(
      (d) => d.departmentName?.trim().toLowerCase() === "main"
    )
  );

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="bg-indigo-950 py-8 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          College Gallery
        </h1>
        <p className="text-sm text-slate-300">
          Only Main Department Images
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Loading */}
        {loading ? (
          <p className="text-center text-slate-600">Loading gallery...</p>
        ) : mainOnlyItems.length === 0 ? (
          <p className="text-center text-slate-600">
            No Main department images found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {mainOnlyItems.map((item) => (
              <div
                key={item.imgId}
                onClick={() => setSelectedImg(item)}
                className="group relative h-56 overflow-hidden border border-slate-200 bg-white shadow-sm cursor-pointer"
              >
                <img
                  src={getImageUrl(item.imgPic)}
                  alt={item.imgDes}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <h3 className="text-white text-sm font-semibold">
                    {item.imgDes}
                  </h3>
                  <p className="text-slate-300 text-xs">
                    Main Department
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="max-w-4xl w-full bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getImageUrl(selectedImg.imgPic)}
              alt={selectedImg.imgDes}
              className="w-full max-h-[75vh] object-contain"
            />

            <div className="border-t border-slate-200 p-3 text-center">
              <p className="text-sm font-semibold text-slate-900">
                {selectedImg.imgDes}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Main Department
              </p>
            </div>

            <button
              onClick={() => setSelectedImg(null)}
              className="w-full border-t border-slate-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};