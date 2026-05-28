import React from 'react';
import { Link, useParams } from 'react-router-dom';

const galleryItems = [
  { id: 1, title: "Modern Library", src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Nursing Lab", src: "https://images.unsplash.com/photo-1581093458791-9f3c3900df47?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Campus Grounds", src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Smart Classroom", src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Student Cafe", src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Convocation", src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80" },
];

const GallerySection: React.FC = () => {
   const { deptId } = useParams();
  return (
    <section className="py-20 px-6 bg-slate-50 rounded-b-xl border-b-1 border-b-blue-400">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          {/* <div className="bg-teal-100 p-3 rounded-full text-teal-700 mb-4">
            <Camera size={28} />
          </div> */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">College Gallery</h2>
          <p className="text-slate-600 text-lg max-w-lg">A glimpse into our vibrant educational ecosystem and campus life.</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                <span className="text-teal-200 text-sm font-medium tracking-wider uppercase">View Image</span>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
           <Link to={`/dept/${deptId}/noticeGallery`}
          className="bg-teal-700 text-white px-10 py-4 rounded-full font-bold hover:bg-teal-800 transition-all duration-300 shadow-lg shadow-teal-200">
            View All Photos
         
           </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;