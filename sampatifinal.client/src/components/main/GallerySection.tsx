// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const galleryItems = [
//   {
//     id: 1,
//     title: "Campus Library",
//     src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 2,
//     title: "Science Lab",
//     src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 3,
//     title: "Sports Complex",
//     src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 4,
//     title: "Classroom",
//     src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 5,
//     title: "Student Cafe",
//     src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
//   },
// ];

// const GallerySection: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<
//     (typeof galleryItems)[0] | null
//   >(null);

//   return (
//     <>
//       <section className="bg-indigo-950 py-10 px-4">
//         <div className="w-full mx-auto">
//           {/* Heading */}
//           <div className="text-center mb-8">
//             <h2 className="text-2xl md:text-3xl font-black text-white">
//               College Gallery
//             </h2>

//             <p className="text-sm text-slate-300 mt-2">
//               A glimpse into our vibrant campus life
//             </p>
//           </div>

//           {/* Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {galleryItems.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => setSelectedImage(item)}
//                 className="group relative h-44 md:h-52 overflow-hidden border border-white/10 shadow-sm cursor-pointer"
//               >
//                 <img
//                   src={item.src}
//                   alt={item.title}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-3">
//                   <div>
//                     <h3 className="text-white text-sm font-semibold">
//                       {item.title}
//                     </h3>

//                     <p className="text-xs text-slate-300">
//                       Click to View
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Button */}
//           <div className="text-center mt-8">
//             <Link
//               to="/gallerypage"
//               className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold bg-white text-indigo-950 hover:bg-amber-500 transition"
//             >
//               View All Photos
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Image Preview Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div
//             className="relative w-full max-w-6xl bg-white border border-slate-200"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute top-3 right-3 z-10 bg-black px-3 py-2 text-xs font-semibold text-white"
//             >
//               CLOSE
//             </button>

//             <img
//               src={selectedImage.src}
//               alt={selectedImage.title}
//               className="w-full max-h-[85vh] object-contain bg-slate-100"
//             />

//             <div className="border-t border-slate-200 p-4">
//               <h3 className="text-lg font-semibold text-slate-900">
//                 {selectedImage.title}
//               </h3>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GallerySection;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getAllGalleries, type Gallery } from "../../services/galleryService";
// import Loader from "../common/Loader";

// const GallerySection: React.FC = () => {
//   const [galleryItems, setGalleryItems] = useState<Gallery[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

//   const API_BASE_URL =
//     window.location.hostname === "localhost"
//       ? "https://localhost:7197"
//       : "https://sampatigroup.stdruraltech.org";

//   useEffect(() => {
//     const fetchGalleries = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllGalleries();
//         setGalleryItems(data);
//       } catch (error) {
//         console.error("Error fetching galleries:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGalleries();
//   }, []);

//   // ✅ Safe image URL builder
//   const getImageUrl = (path?: string) => {
//     if (!path) return "/placeholder.jpg";
//     return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
//   };

//   // ✅ ONLY MAIN department filter
//   const filteredItems = galleryItems.filter((item) =>
//     item.departments?.some(
//       (dept) => dept.departmentName.trim().toLowerCase() === "main",
//     ),
//   );

//   return (
//     <>
//       <section className="bg-indigo-950 py-10 px-4 sm:px-6">
//         <div className="w-full mx-auto">
//           {/* HEADING */}
//           <div className="text-center mb-6 sm:mb-8">
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
//               College Gallery
//             </h2>

//             <p className="text-xs sm:text-sm text-slate-300 mt-2">
//               A glimpse into our vibrant campus life
//             </p>
//           </div>

//           {/* LOADING */}
//           {loading ? (
//             <div className="h-[220px] flex items-center justify-center text-white">
//               <Loader text="Loading images..." />
//             </div>
//           ) : (
//             <>
//               {/* GRID */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
//                 {filteredItems.map((item) => (
//                   <div
//                     key={item.imgId}
//                     onClick={() => setSelectedImage(item)}
//                     className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm cursor-pointer"
//                   >
//                     {/* IMAGE */}
//                     <div className="h-24 sm:h-28 md:h-32 lg:h-36 overflow-hidden">
//                       <img
//                         src={getImageUrl(item.imgPic)}
//                         alt={item.imgDes}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                         onError={(e) =>
//                           (e.currentTarget.src = "/placeholder.jpg")
//                         }
//                       />
//                     </div>

//                     {/* OVERLAY */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-2 sm:p-3">
//                       <div>
//                         <h3 className="text-white text-[11px] sm:text-xs font-medium line-clamp-1">
//                           {item.imgDes}
//                         </h3>
//                         <p className="text-[9px] sm:text-[10px] text-slate-300">
//                           Click to View
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* BUTTON */}
//               <div className="text-center mt-6 sm:mt-8">
//                 <Link
//                   to="/gallerypage"
//                   className="inline-flex items-center justify-center rounded-full px-5 sm:px-6 py-2 text-xs sm:text-sm font-semibold bg-white text-indigo-950 hover:bg-amber-500 transition"
//                 >
//                   View All Photos
//                 </Link>
//               </div>
//             </>
//           )}
//         </div>

//         {/* MODAL */}
//         {selectedImage && (
//           <div
//             className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 sm:p-4"
//             onClick={() => setSelectedImage(null)}
//           >
//             <div
//               className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* CLOSE */}
//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="absolute top-3 right-3 z-10 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold text-white hover:bg-black"
//               >
//                 CLOSE
//               </button>

//               {/* IMAGE */}
//               <img
//                 src={getImageUrl(selectedImage.imgPic)}
//                 alt={selectedImage.imgDes}
//                 className="w-full max-h-[75vh] object-contain bg-slate-100"
//               />

//               {/* CAPTION */}
//               <div className="border-t border-slate-200 p-3 sm:p-4">
//                 <h3 className="text-sm sm:text-lg font-semibold text-slate-900">
//                   {selectedImage.imgDes}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div
//             className="relative w-full max-w-6xl bg-white border border-slate-200"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute top-3 right-3 z-10 bg-black px-3 py-2 text-xs font-semibold text-white"
//             >
//               CLOSE
//             </button>

//             <img
//               src={getImageUrl(selectedImage.imgPic)}
//               alt={selectedImage.imgDes}
//               className="w-full max-h-[85vh] object-contain bg-slate-100"
//             />

//             <div className="border-t border-slate-200 p-4">
//               <h3 className="text-lg font-semibold text-slate-900">
//                 {selectedImage.imgDes}
//               </h3>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GallerySection;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllGalleries, type Gallery } from "../../services/galleryService";
import Loader from "../common/Loader";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const GallerySection: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setLoading(true);
        const data = await getAllGalleries();
        setGalleryItems(data || []);
      } catch (error) {
        console.error("Error fetching galleries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  const getImageUrl = (path?: string) =>
    !path
      ? "/placeholder.jpg"
      : `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const filteredItems = galleryItems.filter((item) =>
    item.departments?.some(
      (dept) =>
        dept.departmentName.trim().toLowerCase() === "main"
    )
  );

  return (
    <section className="bg-stone-50 pb-14">
      {/* HEADER */}
      <div className="bg-indigo-950 py-12 px-4 text-center border-b border-slate-800">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
          Campus Gallery
        </h2>
        <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />
        <p className="text-slate-400 mt-4 max-w-xl mx-auto text-xs">
          A visual journey through our vibrant academic life.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-4 -mt-10">
        {loading ? (
          <div className="h-56 flex items-center justify-center">
            <Loader text="Loading Gallery..." />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredItems.slice(0, 10).map((item) => (
                <div
                  key={item.imgId}
                  onClick={() => setSelectedImage(item)}
                  className="group relative h-32 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={getImageUrl(item.imgPic)}
                    alt={item.imgDes}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-indigo-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[9px] font-black text-white uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/gallerypage"
                className="bg-indigo-950 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg hover:shadow-amber-500/20"
              >
                View Full Gallery &rarr;
              </Link>
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-indigo-950/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md px-3 py-1 text-[9px] font-black text-white rounded-full uppercase tracking-widest transition"
            >
              Close
            </button>

            <img
              src={getImageUrl(selectedImage.imgPic)}
              alt={selectedImage.imgDes}
              className="w-full max-h-[60vh] object-contain bg-stone-100"
            />

            <div className="p-5">
              <h3 className="text-lg font-black text-slate-950">
                {selectedImage.imgDes}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;