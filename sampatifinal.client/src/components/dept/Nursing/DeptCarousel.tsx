import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';


const images = [
  "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1583912267509-a030221dc725?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80",
];

const ImageCarousel: React.FC = () => {
  return (
    /* Removed max-w-7xl, py-12, and px-6 to allow full width */
    <div className="w-full">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[50vh] md:h-[82vh]" /* h-screen for total full screen */
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img 
              src={img} 
              alt="Campus View" 
              className="w-full h-full object-cover" 
            />
          </SwiperSlide>
        ))}
      </Swiper>
     
    </div>
   
  );
};

export default ImageCarousel;