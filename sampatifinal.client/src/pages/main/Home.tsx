// src/pages/main/Home.tsx
import { DirectorsSection } from '../../components/main/DirectorsSection';
import EventsSection from '../../components/main/EventsSection';
import GallerySection from '../../components/main/GallerySection';
import Hero from '../../components/main/Hero';
import ImageCarousel from '../../components/main/ImageCarousel';
import NoticeBoard from '../../components/main/NoticeBoard';
import Principal from '../../components/main/PrincipalMessage';
import ToppersSection from '../../components/main/ToppersSection';
import VideoGallery from '../../components/main/VideoGallery';
import WhyChooseUs from '../../components/main/WhyChooseUs';

export default function Home() {
  return (
    <div className="flex flex-col gap-5 pb-20">
      <ImageCarousel />
      <Hero />
      
      {/* Principal Section - Full Width */}
      <section className="max-w-7xl mx-auto w-full px-6">
        <Principal />
      </section>
      <DirectorsSection/>

      <ToppersSection/>

      {/* Notices & Events - 1/2 Ratio Grid */}
      <section className="max-w-7xl mx-auto w-full px-2">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <NoticeBoard />
          <EventsSection />
        </div>
      </section>
      <GallerySection/>
      <VideoGallery/>
      <WhyChooseUs/>
    </div>
  );
}