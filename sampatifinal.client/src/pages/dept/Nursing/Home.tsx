
import EventsSection from "../../../components/dept/Nursing/EventsSection";
import GallerySection from "../../../components/dept/Nursing/GallerySection";
import Hero from "../../../components/dept/Nursing/Hero";
import NoticeBoard from "../../../components/dept/Nursing/NoticeBoard";
import VideoGallery from "../../../components/dept/Nursing/VideoGallery";

export default function DeptHome() {
  return (
    <>
      <Hero />
      <NoticeBoard />
      <EventsSection />

      {/* <Carousel /> */}

      <GallerySection />
      <VideoGallery />
    </>
  );
}
