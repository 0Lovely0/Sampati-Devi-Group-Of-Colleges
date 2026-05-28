import React from 'react';
import { useParams } from "react-router-dom";
import NewsTicker from './NewsTicker';
import { deptData, defaultDeptData } from '../../../data/departments';
import { Link } from 'react-router-dom';

export default function DeptHero() {
  const { deptId } = useParams<{ deptId: string }>();

  // Determine which data to use
  const data = (deptId && deptData[deptId]) ? deptData[deptId] : defaultDeptData;

  return (
    <div className="relative w-full">
      {/* Main Hero Banner */}
      <div 
        className={`relative ${data.bgClass} text-white py-22 px-6 overflow-hidden bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${data.imageUrl}')` }}
      >
        {/* Decorative Background Circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full -ml-16 -mb-16 blur-xl z-0"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center bg-black/50 rounded-3xl p-10">
          {/* Badge */}
          <span className="px-6 py-2 rounded-full bg-white/20 backdrop-blur-md font-bold text-sm uppercase tracking-widest mb-6 border border-white/20">
            {data.badge}
          </span>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            {data.title}
          </h1>
          
          {/* Subtitle */}
          <p className={`text-lg md:text-xl ${data.accentText} max-w-2xl mb-10 leading-relaxed font-medium`}>
            {data.subtitle}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
              Download Syllabus
            </button>
             <Link to={`/dept/${deptId}/nursingContact`} className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
              Contact Faculty
            </Link>
          </div>
        </div>
      </div>
      
      <NewsTicker />
    </div>
  );
}