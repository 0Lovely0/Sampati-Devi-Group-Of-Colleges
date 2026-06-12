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

import React, { useEffect, useState } from "react";
// import { X } from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllFacilities,
  type Facility,
} from "../../services/facilitiesService";

const BASE_URL = "https://localhost:7197";

const FacilitiesPage: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selected, setSelected] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch API data
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

  // SAFE IMAGE HANDLER
  const getImageUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${BASE_URL}/${url.replace(/^\//, "")}`;
  };

  // FILTER Academic Facilities only
  const filteredFacilities = facilities.filter(
    (item) => item.facilityMaster?.facilityName === "Academic Facilities",
  );

  return (
    <section className="bg-indigo-950 py-12 sm:py-16 px-4 text-white">
      <div className="w-full mx-auto">
        {/* HEADER */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Our Facilities
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Modern infrastructure and learning environment for students.
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading facilities..." />
          </div>
        ) : (
          <>
            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredFacilities.map((item) => (
                <div
                  key={item.facilityId}
                  onClick={() => setSelected(item)}
                  className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 shadow-sm overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* IMAGE */}
                  <div className="h-28 sm:h-32 md:h-36 overflow-hidden bg-white/10">
                    <img
                      src={getImageUrl(item.imageUrl)}
                      alt={item.descriptionHeading}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) =>
                        (e.currentTarget.src = "/placeholder.jpg")
                      }
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-2 sm:p-3 text-center">
                    <h3 className="text-[11px] sm:text-xs font-medium text-slate-200 line-clamp-1">
                      {item.descriptionHeading}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold text-white hover:bg-black"
            >
              CLOSE
            </button>

            {/* IMAGE */}
            <img
              src={getImageUrl(selected.imageUrl)}
              alt={selected.descriptionHeading}
              className="w-full max-h-[75vh] object-contain bg-slate-100"
            />

            {/* TEXT */}
            <div className="border-t border-slate-200 p-3 sm:p-4 text-center">
              <h2 className="text-sm sm:text-lg font-semibold text-slate-900">
                {selected.descriptionHeading}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FacilitiesPage;
