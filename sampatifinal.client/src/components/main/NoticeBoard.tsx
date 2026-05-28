import React from 'react';
import { Link } from 'react-router-dom';
const notices = [
  { id: 1, date: "May 25", title: "Semester Exam Form Filling Deadline" },
  { id: 2, date: "May 22", title: "Campus Recruitment Drive - 2026 Batch" },
  { id: 3, date: "May 20", title: "Holiday Announcement: Summer Break" },
  { id: 4, date: "May 18", title: "Workshop on Advanced Nursing Skills" },
  { id: 5, date: "May 15", title: "Library Membership Renewal Process" },
  { id: 6, date: "May 12", title: "Annual Sports Day Registration Open" },
];

const NoticeBoard: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Latest Notices</h2>
      
      {/* Scrollable list area */}
      <div className="h-[400px] overflow-y-auto space-y-4 pr-2 flex-grow">
        {notices.map((notice) => (
          <div key={notice.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all flex gap-4 items-center">
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{notice.date}</span>
            <h4 className="font-semibold text-slate-800 text-sm">{notice.title}</h4>
          </div>
        ))}
      </div>
      <Link to = "noticeboardpage">
      <button className="w-full mt-6 py-3 border-2 border-slate-900 text-slate-900 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition">
        View All Notices
      </button>
      </Link>
    </div>
  );
};

export default NoticeBoard;