import DeptBanner from "../../../components/dept/Nursing/DeptBanner";
import Carousel from "../../../components/dept/Nursing/DeptCarousel";
import EventsSection from "../../../components/dept/Nursing/EventsSection";
import GallerySection from "../../../components/dept/Nursing/GallerySection";
import Hero from "../../../components/dept/Nursing/Hero";
import NoticeBoard from "../../../components/dept/Nursing/NoticeBoard";
import VideoGallery from "../../../components/dept/Nursing/VideoGallery";

export default function DeptHome() {
  return (
    <div className=" mb-20">
      {/* <DeptBanner /> */}
      <Hero/>

      {/* Grid Container for Events and Notices - 50/50 split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="h-full">
          <EventsSection />
        </div>
        <div className="h-full">
          <NoticeBoard />
        </div>
      </div>

      <div className="mt-10">
      <Carousel />
      </div>

      <GallerySection />
      <VideoGallery />
    </div>
  );
}
