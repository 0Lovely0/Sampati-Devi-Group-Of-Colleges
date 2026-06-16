import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import Loader from "../../../components/common/Loader";
import {
  getAllBanners,
  type Banner,
} from "../../../services/bannerService";

const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

const ImageCarousel = () => {
  const [swiper, setSwiper] = useState<any>(null);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "https://localhost:7197"
      : "https://sampatigroup.stdruraltech.org";

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);

        const data = await getAllBanners();

        // 🎯 Filter ONLY Veterinary Pharmacist department
        const vetPharmacyBanners = data.filter((banner) =>
          banner.departments?.some(
            (dept) =>
              normalize(dept.departmentName) ===
              normalize("Veterinary Pharmacist")
          )
        );

        setBanners(vetPharmacyBanners);
      } catch (error) {
        console.error("Failed to load banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="h-[50vh] md:h-[80vh] w-full flex items-center justify-center bg-[#DCFCE7]">
        <Loader text="Loading Veterinary visuals..." />
      </div>
    );
  }

  if (!banners.length) return null;

  return (
    <div className="relative w-full group">
      <Swiper
        onSwiper={setSwiper}
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop={banners.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-[#22C55E]",
        }}
        className="h-[35vh] md:h-[85vh] w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.bnnrId}>
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={`${API_BASE_URL}/${banner.bnnrImage}`}
                alt={banner.bnnrCat}
                className="h-full w-full object-cover top-5"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous Button */}
      <button
        onClick={() => swiper?.slidePrev()}
        className="
          absolute left-4 top-1/2 z-20
          -translate-y-1/2
          flex h-12 w-12 items-center justify-center
          rounded-full
          bg-[#15803D]/90
          text-white
          border border-[#22C55E]
          shadow-lg
          backdrop-blur-sm
          hover:bg-[#22C55E]
          hover:scale-105
          transition-all duration-300
          opacity-0 group-hover:opacity-100
        "
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={() => swiper?.slideNext()}
        className="
          absolute right-4 top-1/2 z-20
          -translate-y-1/2
          flex h-12 w-12 items-center justify-center
          rounded-full
          bg-[#15803D]/90
          text-white
          border border-[#22C55E]
          shadow-lg
          backdrop-blur-sm
          hover:bg-[#22C55E]
          hover:scale-105
          transition-all duration-300
          opacity-0 group-hover:opacity-100
        "
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageCarousel;