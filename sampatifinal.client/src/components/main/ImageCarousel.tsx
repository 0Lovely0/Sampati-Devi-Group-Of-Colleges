//Static Carousel
// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import {
//   Autoplay,
//   EffectFade,
//   Pagination,
// } from "swiper/modules";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";

// const images = [
//   "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1920&q=80",
//   "https://images.unsplash.com/photo-1583912267509-a030221dc725?auto=format&fit=crop&w=1920&q=80",
//   "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80",
// ];

// const ImageCarousel = () => {
//   const [swiper, setSwiper] = useState<any>(null);

//   return (
//     <div className="relative w-full">
//       <Swiper
//         onSwiper={setSwiper}
//         modules={[Autoplay, EffectFade, Pagination]}
//         effect="fade"
//         loop
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         className="h-[50vh] md:h-[80vh]"
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index}>
//             <img
//               src={img}
//               alt={`Slide ${index + 1}`}
//               className="h-full w-full object-cover"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Previous */}
//       <button
//         onClick={() => swiper?.slidePrev()}
//         className="
//           absolute left-4 top-1/2 z-20
//           -translate-y-1/2
//           flex h-10 w-10 items-center justify-center
//           rounded-full
//           bg-amber-600 text-white
//           shadow-lg
//           hover:bg-indigo-600
//           transition
//         "
//       >
//         <ChevronLeft size={18} />
//       </button>

//       {/* Next */}
//       <button
//         onClick={() => swiper?.slideNext()}
//         className="
//           absolute right-4 top-1/2 z-20
//           -translate-y-1/2
//           flex h-10 w-10 items-center justify-center
//           rounded-full
//           bg-amber-600 text-white
//           shadow-lg
//           hover:bg-indigo-600
//           transition
//         "
//       >
//         <ChevronRight size={18} />
//       </button>
//     </div>
//   );
// };

// export default ImageCarousel;

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import Loader from "../../components/common/Loader";
import { getAllBanners, type Banner } from "../../services/bannerService";

const ImageCarousel = () => {
  const [swiper, setSwiper] = useState<any>(null);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);

        const data = await getAllBanners();

        const mainBanners = data.filter((banner) =>
          banner.departments?.some(
            (dept) => dept.departmentName.trim().toLowerCase() === "main",
          ),
        );

        setBanners(mainBanners);
      } catch (error) {
        console.error("Failed to load banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Use the environment variable defined in your .env file
  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "https://localhost:7197"
      : "https://sampatigroup.stdruraltech.org";

  // ✅ LOADER INSIDE BANNER AREA
  if (loading) {
    return (
      <div className="h-[50vh] md:h-[80vh] w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Loader text="Loading Banner..." />
      </div>
    );
  }

  // ✅ EMPTY STATE (optional but important)
  if (!banners.length) {
    return (
      <div className="h-[50vh] md:h-[80vh] w-full flex items-center justify-center text-slate-500 bg-slate-50">
        No banners available
      </div>
    );
  }
  console.log("Banners:", banners);
  return (
    <div className="relative w-full">
      <Swiper
        onSwiper={setSwiper}
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop={banners.length > 1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="h-[30vh] md:h-[80vh]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.bnnrId}>
            <img
              src={`${API_BASE_URL}/${banner.bnnrImage}`}
              alt={banner.bnnrCat}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev */}
      <button
        onClick={() => swiper?.slidePrev()}
        className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg hover:bg-indigo-600 transition"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Next */}
      <button
        onClick={() => swiper?.slideNext()}
        className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg hover:bg-indigo-600 transition"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default ImageCarousel;
