import React from 'react';

const newsItems = [
  "Admission open for Session 2026-27 | Apply Now",
  "Semester Examination dates announced for Final Year students",
  "Guest Lecture on 'Future of Nursing' scheduled for June 5th",
  "Campus Placement Drive: Top hospitals visiting on May 30th",
  "Scholarship applications are now being accepted",
  "College library will remain closed on Sunday, May 31st"
];

const NewsTicker: React.FC = () => {
  return (
    <div className="w-full bg-gray-50 py-3 overflow-hidden flex items-center border-b border-amber-100">
      {/* Label - Updated to Indigo for contrast */}
      <div className="bg-indigo-600 px-3 py-1 text-white font-bold text-[10px] uppercase tracking-widest ml-4 rounded-full z-10 whitespace-nowrap shadow-sm">
        Latest News
      </div>

      {/* Ticker Container */}
      <div className="flex overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {newsItems.concat(newsItems).map((news, index) => (
            <div key={index} className="flex items-center text-slate-800 text-sm font-semibold px-8">
              {/* Dot color adjusted for light mode */}
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 animate-pulse"></span>
              {news}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;