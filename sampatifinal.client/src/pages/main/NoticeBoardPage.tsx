import React, { useState } from 'react';

interface Notice {
  id: number;
  date: string;
  title: string;
  category: 'Exam' | 'Event' | 'General';
  content: string;
}

const notices: Notice[] = [
  { id: 1, date: "May 25", category: "Exam", title: "Semester Exam Form Filling Deadline", content: "All students are requested to complete their examination form filling process by May 30, 2026. Failure to do so will result in a late fee." },
  { id: 2, date: "May 22", category: "Event", title: "Campus Recruitment Drive - 2026 Batch", content: "Top hospitals are visiting for the 2026 batch recruitment. Students must carry their updated resumes." },
  { id: 3, category: "General", date: "May 20", title: "Holiday Announcement: Summer Break", content: "The college will remain closed for summer break from June 1st to June 20th." },
  { id: 4, category: "Event", date: "May 18", title: "Workshop on Advanced Nursing Skills", content: "Hands-on training for ICU management will be held on May 28th." },
  { id: 5, category: "General", date: "May 15", title: "Library Membership Renewal", content: "Please renew your library cards at the administration desk before the end of the month." },
  { id: 6, category: "Exam", date: "May 12", title: "Annual Sports Day Registration", content: "Registrations for the Annual Sports Day are now open. Visit the sports office to sign up." },
];

export const NoticeBoardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-slate-900">Official Notice Board</h1>
        <input 
          type="text" 
          placeholder="Search notices..." 
          className="p-3 border border-slate-300 rounded-full w-full md:w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Notice List */}
        <div className="md:col-span-2 space-y-4">
          {filteredNotices.map((notice) => (
            <div 
              key={notice.id} 
              onClick={() => setSelectedNotice(notice)}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all hover:border-indigo-500"
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  notice.category === 'Exam' ? 'bg-red-100 text-red-600' : 
                  notice.category === 'Event' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {notice.category}
                </span>
                <span className="text-slate-400 text-sm">{notice.date}</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900">{notice.title}</h3>
            </div>
          ))}
        </div>

        {/* Selected Notice Detail */}
        <div className="md:col-span-1">
          <div className="sticky top-20 p-8 bg-slate-900 text-white rounded-3xl min-h-[300px]">
            {selectedNotice ? (
              <>
                <h2 className="text-xl font-bold mb-4 border-b border-slate-700 pb-4">{selectedNotice.title}</h2>
                <p className="text-slate-300 leading-relaxed">{selectedNotice.content}</p>
                <div className="mt-8 text-sm text-slate-500">Published on {selectedNotice.date}, 2026</div>
              </>
            ) : (
              <div className="text-slate-500 flex items-center justify-center h-full">
                Select a notice to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};