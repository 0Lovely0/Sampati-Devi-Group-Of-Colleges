import ProgramHome from "../../../pages/programs/ProgramHome";
import Carousel from "../components/carousel"
import EventsSection from "../components/events";
import GallerySection from "../components/gallery";
import NewsTicker from "../components/newsTicker";
import NoticeBoard from "../components/notice";
import ToppersSection from "../components/toppers";
import VideoGallery from "../components/videoGallery";

export default function BscNursingHome() {
  return (
 <>
 <NewsTicker/>  
 <Carousel/>
    <ProgramHome/>
     
     <NoticeBoard/>
     <GallerySection/>
     <EventsSection/>
     <VideoGallery/>
     <ToppersSection/>
    </>
  );
}