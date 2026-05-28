import { useParams } from "react-router-dom";
import NewsTicker from '.././../../components/dept/Nursing/NewsTicker';
export default function DeptBanner() {
  const { deptId } = useParams();

  // Department ke hisaab se colors aur content
  const config = {
    "bsc-nursing": {
      title: "B.Sc. Nursing",
      subtitle: "Excellence in Healthcare & Clinical Training",
      color: "bg-teal-700"
    },
    "pharmacy": {
      title: "Pharmacy Department",
      subtitle: "Innovating Health through Pharmaceutical Science",
      color: "bg-orange-600"
    },
    // Baaki departments ke liye yahan add karein
  };

  const data = config[deptId as keyof typeof config] || { 
    title: "Our Department", 
    subtitle: "Welcome to our academic excellence center.", 
    color: "bg-indigo-700" 
  };

  return (
    <>
    <div className={`relative ${data.color} text-white py-20 px-6 overflow-hidden`}>
      {/* Background Decorative Shape */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{data.title}</h1>
        <p className="text-lg md:text-xl text-teal-50 max-w-2xl mb-8">{data.subtitle}</p>
        
        <div className="flex gap-4">
          <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            View Syllabus
          </button>
          <button className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
            Contact Faculty
          </button>
        </div>
      </div>
      
    </div>
    <NewsTicker/>
     
     </>
  );
}