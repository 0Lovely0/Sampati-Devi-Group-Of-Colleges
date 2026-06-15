// src/pages/main/Home.tsx
import DirectorsSection from "../../components/main/DirectorsSection";
import EventsSection from "../../components/main/EventsSection";
import GallerySection from "../../components/main/GallerySection";
import Hero from "../../components/main/Hero";
import ImageCarousel from "../../components/main/ImageCarousel";
import NoticeBoard from "../../components/main/NoticeBoard";
import ToppersSection from "../../components/main/ToppersSection";
import VideoGallery from "../../components/main/VideoGallery";
import WhyChooseUs from "../../components/main/WhyChooseUs";
import NewsTicker from "../../components/main/NewsTicker";
import Facilities from "../../components/main/Facilities";
export default function Home() {
  return (
    <div className="flex flex-col">
         <NewsTicker/>
      <ImageCarousel />
      {/* <Details/> */}
      <Hero />
        <DirectorsSection />
      {/* <Principal /> */}
      <NoticeBoard/>
    

      
      <EventsSection />

      

      {/* Notices & Events - 1/2 Ratio Grid */}

      <GallerySection />
      <VideoGallery />
     <Facilities />
      <WhyChooseUs />
      
       <ToppersSection />
    </div>
  );
}
