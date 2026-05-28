import { useState } from 'react';
import { videoItems } from '../../../data/videoData';
import { Play } from 'lucide-react';

export default function VideoPage() {
  const [activeVideo, setActiveVideo] = useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12 text-center">College Video Gallery</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoItems.map((video) => (
          <div 
            key={video.id} 
            className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
            onClick={() => setActiveVideo(video)}
          >
            <div className="relative h-56">
              <img src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={20} className="text-teal-700 ml-1 fill-teal-700" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-slate-900">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6" onClick={() => setActiveVideo(null)}>
          <div className="max-w-4xl w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <iframe 
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`} 
              className="w-full h-full"
              allowFullScreen 
            />
          </div>
        </div>
      )}
    </div>
  );
}