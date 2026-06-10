import React from "react";
import { Megaphone } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const newsItems = [
  "Admission open for Session 2026-27 | Apply Now",
  "Semester Examination dates announced for Final Year students",
  "Guest Lecture on Future of Nursing scheduled for June 5th",
  "Campus Placement Drive: Top hospitals visiting on May 30th",
  "Scholarship applications are now being accepted",
];

const NewsTicker: React.FC = () => {
  const { deptId } = useParams();

  return (
    <Link
      to={`/dept/${deptId}/news`}
      className="block w-full"
    >
      <div className="w-full bg-white border-t border-b border-slate-200 hover:bg-slate-50 transition-colors">
        <div className="flex items-center">
          {/* Label */}
          <div className="flex items-center gap-2 bg-teal-700 text-white px-4 py-3 shrink-0">
            <Megaphone size={14} />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
              Latest News
            </span>
          </div>

          {/* Ticker */}
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {newsItems.concat(newsItems).map((news, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-slate-700 px-8"
                >
                  <span className="mr-3 text-teal-700 font-bold">
                    •
                  </span>

                  <span>{news}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsTicker;