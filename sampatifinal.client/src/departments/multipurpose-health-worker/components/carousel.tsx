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

/**
 * Normalize helper for safe matching
 */
const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

/**
 * MPHW Theme
 */
const MPHW_THEME = {
  primary: "#EA580C",
  secondary: "#FFEDD5",
  accent: "#F97316",
};

const MPHW_NAME = "Multipurpose Health Worker";

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

        const mphwBanners = data.filter((banner) =>
          banner.departments?.some(
            (dept) =>
              normalize(dept.departmentName) ===
              normalize(MPHW_NAME)
          )
        );

        setBanners(mphwBanners);
      } catch (error) {
        console.error("Failed to load banners:", error);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div
        className="h-[50vh] md:h-[80vh] w-full flex items-center justify-center"
        style={{ background: MPHW_THEME.secondary }}
      >
        <Loader text="Loading MPHW visuals..." />
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
            "swiper-pagination-bullet-active !bg-[#F97316]",
        }}
        className="h-[35vh] md:h-[85vh] w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.bnnrId}>
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={`${API_BASE_URL}/${banner.bnnrImage}`}
                alt={banner.bnnrCat}
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev Button */}
      <button
        onClick={() => swiper?.slidePrev()}
        className="
          absolute left-4 top-1/2 z-20
          -translate-y-1/2
          flex h-12 w-12 items-center justify-center
          rounded-full
          text-white
          shadow-lg
          backdrop-blur-sm
          transition-all duration-300
          opacity-0 group-hover:opacity-100
          hover:scale-105
        "
        style={{ backgroundColor: MPHW_THEME.primary }}
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
          text-white
          shadow-lg
          backdrop-blur-sm
          transition-all duration-300
          opacity-0 group-hover:opacity-100
          hover:scale-105
        "
        style={{ backgroundColor: MPHW_THEME.primary }}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageCarousel;