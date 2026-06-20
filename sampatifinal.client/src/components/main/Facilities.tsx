// import React, { useState } from "react";
// import { X } from "lucide-react";

// interface Facility {
//   id: number;
//   name: string;
//   image: string;
// }

// const facilities: Facility[] = [
//   {
//     id: 1,
//     name: "Modern Nursing Lab",
//     image:
//       "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 2,
//     name: "Advanced Anatomy Lab",
//     image:
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 3,
//     name: "Library Facility",
//     image:
//       "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 4,
//     name: "Skill Lab Training",
//     image:
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 5,
//     name: "Computer Lab",
//     image:
//       "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 6,
//     name: "Hospital Training Area",
//     image:
//       "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
//   },
// ];

// const FacilitiesPage: React.FC = () => {
//   const [selected, setSelected] = useState<Facility | null>(null);

//   return (
//     <section className="bg-indigo-950  py-20 px-8 text-white">
//       <div className="w-full mx-auto">

//         {/* Heading */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold">Our Facilities</h1>
//           <p className="text-sm text-slate-300 mt-1">
//             Modern infrastructure and learning environment for students.
//           </p>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           {facilities.map((item) => (
//             <div key={item.id} className="group">

//               {/* Image */}
//               <div
//                 onClick={() => setSelected(item)}
//                 className="cursor-pointer overflow-hidden"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//               </div>

//               {/* Name */}
//               <p className="text-xs mt-2 text-slate-200">
//                 {item.name}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Watch More Button */}
//         {/* <div className="flex justify-center mt-10">
//           <button className="bg-amber-500 text-black text-xs font-bold px-6 py-2 hover:bg-amber-400 transition">
//             Watch More
//           </button>
//         </div> */}
//       </div>

//       {/* IMAGE PREVIEW MODAL */}
//       {selected && (
//         <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

//           {/* Close Button */}
//           <button
//             onClick={() => setSelected(null)}
//             className="absolute top-5 right-5 text-white"
//           >
//             <X size={28} />
//           </button>

//           {/* Image */}
//           <img
//             src={selected.image}
//             alt={selected.name}
//             className="max-h-[80vh] max-w-[90vw] object-contain"
//           />
//         </div>
//       )}
//     </section>
//   );
// };

// export default FacilitiesPage;

// import React, { useEffect, useState } from "react";
// // import { X } from "lucide-react";
// import Loader from "../../components/common/Loader";
// import {
//   getAllFacilities,
//   type Facility,
// } from "../../services/facilitiesService";

//  const API_BASE_URL =
//     window.location.hostname === "localhost"
//       ? "https://localhost:7197"
//       : "https://sampatigroup.stdruraltech.org";

// const FacilitiesPage: React.FC = () => {
//   const [facilities, setFacilities] = useState<Facility[]>([]);
//   const [selected, setSelected] = useState<Facility | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch API data
//   useEffect(() => {
//     const fetchFacilities = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllFacilities();
//         setFacilities(data || []);
//       } catch (error) {
//         console.error("Failed to fetch facilities:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFacilities();
//   }, []);

//   // SAFE IMAGE HANDLER
//   const getImageUrl = (url?: string) => {
//     if (!url) return "";
//     if (url.startsWith("http")) return url;
//     return `${API_BASE_URL}/${url.replace(/^\//, "")}`;
//   };

//   // FILTER Academic Facilities only
//   const filteredFacilities = facilities.filter(
//     (item) => item.facilityMaster?.facilityName === "Academic Facilities",
//   );

//   return (
//     <section className="bg-indigo-950 py-12 sm:py-16 px-4 text-white">
//       <div className="w-full mx-auto">
//         {/* HEADER */}
//         <div className="mb-6 sm:mb-8 text-center">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
//             Our Facilities
//           </h1>

//           <p className="text-xs sm:text-sm text-slate-300 mt-2">
//             Modern infrastructure and learning environment for students.
//           </p>
//         </div>

//         {/* LOADING */}
//         {loading ? (
//           <div className="h-64 flex items-center justify-center">
//             <Loader text="Loading facilities..." />
//           </div>
//         ) : (
//           <>
//             {/* GRID */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//               {filteredFacilities.map((item) => (
//                 <div
//                   key={item.facilityId}
//                   onClick={() => setSelected(item)}
//                   className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 shadow-sm overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
//                 >
//                   {/* IMAGE */}
//                   <div className="h-28 sm:h-32 md:h-36 overflow-hidden bg-white/10">
//                     <img
//                       src={getImageUrl(item.imageUrl)}
//                       alt={item.descriptionHeading}
//                       className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
//                       onError={(e) =>
//                         (e.currentTarget.src = "/placeholder.jpg")
//                       }
//                     />
//                   </div>

//                   {/* CONTENT */}
//                   <div className="p-2 sm:p-3 text-center">
//                     <h3 className="text-[11px] sm:text-xs font-medium text-slate-200 line-clamp-1">
//                       {item.descriptionHeading}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* MODAL */}
//       {selected && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-4"
//           onClick={() => setSelected(null)}
//         >
//           <div
//             className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* CLOSE */}
//             <button
//               onClick={() => setSelected(null)}
//               className="absolute top-3 right-3 z-10 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold text-white hover:bg-black"
//             >
//               CLOSE
//             </button>

//             {/* IMAGE */}
//             <img
//               src={getImageUrl(selected.imageUrl)}
//               alt={selected.descriptionHeading}
//               className="w-full max-h-[75vh] object-contain bg-slate-100"
//             />

//             {/* TEXT */}
//             <div className="border-t border-slate-200 p-3 sm:p-4 text-center">
//               <h2 className="text-sm sm:text-lg font-semibold text-slate-900">
//                 {selected.descriptionHeading}
//               </h2>

//               <p className="text-xs sm:text-sm text-slate-600 mt-1">
//                 {selected.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default FacilitiesPage;


// import React, { useEffect, useState } from "react";
// import Loader from "../../components/common/Loader";
// // import {Link} from "react-router-dom";
// import {
//   getAllFacilities,
//   type Facility,
// } from "../../services/facilitiesService";

// const API_BASE_URL =
//   window.location.hostname === "localhost"
//     ? "https://localhost:7197"
//     : "https://sampatigroup.stdruraltech.org";

// const FacilitiesPage: React.FC = () => {
//   const [facilities, setFacilities] = useState<Facility[]>([]);
//   const [selected, setSelected] = useState<Facility | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFacilities = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllFacilities();
//         setFacilities(data || []);
//       } catch (error) {
//         console.error("Failed to fetch facilities:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFacilities();
//   }, []);

//   const getImageUrl = (url?: string) => {
//     if (!url) return "/placeholder.jpg";
//     if (url.startsWith("http")) return url;
//     return `${API_BASE_URL}/${url.replace(/^\//, "")}`;
//   };

//   const filteredFacilities = facilities.filter(
//     (item) =>
//       item.facilityMaster?.facilityName === "Academic Facilities"
//   );

//   return (
//     <div className=" bg-stone-50 pb-12">
//       {/* HEADER */}
//       <div className="bg-indigo-950 py-12 px-4 text-center border-b border-slate-800">
//         <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
//           Academic Facilities
//         </h1>
//         <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />
//         <p className="text-slate-400 mt-4 max-w-xl mx-auto text-xs">
//           Our modern infrastructure designed to foster excellence and innovation.
//         </p>
//       </div>

//       {/* GRID */}
//       <div className="w-full mx-auto px-4 -mt-10">
//         {loading ? (
//           <div className="h-56 flex items-center justify-center">
//             <Loader text="Loading infrastructure..." />
//           </div>
//         ) : (
//           <>
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {filteredFacilities.map((item) => (
//               <div
//                 key={item.facilityId}
//                 onClick={() => setSelected(item)}
//                 className="group relative bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
//               >
//                 <div className="h-32 overflow-hidden">
//                   <img
//                     src={getImageUrl(item.imageUrl)}
//                     alt={item.descriptionHeading}
//                     className="w-full h-full object-full transition duration-700 group-hover:scale-105"
//                   />
//                 </div>

//                 <div className="p-4">
//                   <h3 className="text-xs font-black text-slate-950 leading-tight">
//                     {item.descriptionHeading}
//                   </h3>
//                   <p className="text-[9px] text-amber-600 font-bold uppercase tracking-widest mt-2">
//                     View Details
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* <div className="mt-12 flex justify-center">
//               <Link
//                 to="/"
//                 className="bg-indigo-950 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition shadow-lg hover:shadow-amber-500/20"
//               >
//                 View All Facilities &rarr;
//               </Link>
//             </div> */}
//             </>
//         )}
//       </div>

//       {/* MODAL */}
//       {selected && (
//         <div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-indigo-950/95 p-4 backdrop-blur-sm"
//           onClick={() => setSelected(null)}
//         >
//           <div
//             className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setSelected(null)}
//               className="absolute top-3 right-3 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md px-3 py-1 text-[9px] font-black text-white rounded-full uppercase tracking-widest transition"
//             >
//               Close
//             </button>

//             <img
//               src={getImageUrl(selected.imageUrl)}
//               alt={selected.descriptionHeading}
//               className="w-full max-h-[55vh] object-cover bg-stone-100"
//             />

//             <div className="p-5">
//               <h2 className="text-xl font-black text-slate-950">
//                 {selected.descriptionHeading}
//               </h2>
//               <p className="text-xs text-slate-600 mt-3 leading-relaxed">
//                 {selected.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacilitiesPage;

import React, { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import {
  getAllFacilities,
  type Facility,
} from "../../services/facilitiesService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const FacilitiesPage: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selected, setSelected] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        const data = await getAllFacilities();
        setFacilities(data || []);
      } catch (error) {
        console.error("Failed to fetch facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const getImageUrl = (url?: string) => {
    if (!url) return "/placeholder.jpg";
    if (url.startsWith("http")) return url;
    return `${API_BASE_URL}/${url.replace(/^\//, "")}`;
  };

  const filteredFacilities = facilities.filter(
    (item) =>
      item.facilityMaster?.facilityName === "Academic Facilities"
  );

  return (
    <div className="bg-stone-50 pb-20">
      {/* HEADER */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Academic Facilities
        </h1>

        <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full" />

        <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
          Our modern infrastructure designed to foster excellence,
          innovation, and an inspiring learning environment for students.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-6 -mt-12">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading infrastructure..." />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {filteredFacilities.map((item) => (
              <div
                key={item.facilityId}
                onClick={() => setSelected(item)}
                className="group relative bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="h-60 overflow-hidden">
                  <img
                    src={getImageUrl(item.imageUrl)}
                    alt={item.descriptionHeading}
                    className="w-full h-full object-contain transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-950 leading-tight">
                    {item.descriptionHeading}
                  </h3>

                  <p className="text-xs text-amber-600 font-bold uppercase tracking-widest mt-3">
                    View Details
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-indigo-950/95 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md px-4 py-2 text-[10px] font-black text-white rounded-full uppercase tracking-widest transition"
            >
              Close
            </button>

            <img
              src={getImageUrl(selected.imageUrl)}
              alt={selected.descriptionHeading}
              className="w-full max-h-[75vh] object-contain bg-stone-100"
            />

            <div className="p-8">
              <h2 className="text-3xl font-black text-slate-950">
                {selected.descriptionHeading}
              </h2>

              <p className="text-base text-slate-600 mt-4 leading-relaxed">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilitiesPage;

