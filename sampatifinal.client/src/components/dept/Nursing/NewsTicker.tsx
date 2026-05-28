import React from 'react';
import { Megaphone } from 'lucide-react';
import { Link, useParams } from 'react-router-dom'; // Import Link

const newsItems = [
  "Admission open for Session 2026-27 | Apply Now",
  "Semester Examination dates announced for Final Year students",
  "Guest Lecture on 'Future of Nursing' scheduled for June 5th",
  "Campus Placement Drive: Top hospitals visiting on May 30th",
  "Scholarship applications are now being accepted",
];

const NewsTicker: React.FC = () => {
  const { deptId } = useParams();
  return (
    // Yahan Link add kiya hai
    <Link to={`/dept/${deptId}/news`} className="w-full block"> 
      <div className="w-full bg-teal-50 py-3 overflow-hidden flex items-center border-b border-teal-100 hover:bg-teal-100 transition-colors">
        <div className="flex items-center gap-2 bg-teal-700 px-4 py-1 text-white font-bold text-[11px] uppercase tracking-widest ml-4 rounded-full z-10 whitespace-nowrap shadow-md">
          <Megaphone size={14} />
          Latest News
        </div>

        <div className="flex overflow-hidden relative w-full">
          <div className="flex animate-marquee whitespace-nowrap">
            {newsItems.concat(newsItems).map((news, index) => (
              <div key={index} className="flex items-center text-slate-700 text-sm font-medium px-8 hover:text-teal-700 transition-colors cursor-pointer">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3 animate-pulse"></span>
                {news}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsTicker;