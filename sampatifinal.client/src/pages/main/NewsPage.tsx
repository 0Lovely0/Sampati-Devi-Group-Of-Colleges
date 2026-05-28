import React, { useState } from 'react';

interface News {
  id: number;
  title: string;
  date: string;
  category: 'Admission' | 'Academic' | 'Events' | 'General';
  description: string;
}

const newsData: News[] = [
  { id: 1, title: "Admission open for Session 2026-27", date: "May 28, 2026", category: "Admission", description: "Applications are now invited for all departments. Secure your seat today by visiting the Apply Now section." },
  { id: 2, title: "Semester Examination dates announced", date: "May 25, 2026", category: "Academic", description: "Final year semester examinations will commence from June 15th, 2026. Please check the notice board for your specific subject timetable." },
  { id: 3, title: "Guest Lecture: 'Future of Nursing'", date: "May 22, 2026", category: "Events", description: "We are pleased to host a distinguished guest speaker on June 5th at the main auditorium." },
  { id: 4, title: "Campus Placement Drive", date: "May 20, 2026", category: "Events", description: "Top-tier hospitals will be on campus on May 30th for recruitment. Please bring your updated CVs." },
  { id: 5, title: "Scholarship applications accepted", date: "May 18, 2026", category: "Admission", description: "Financial aid forms are now open for the 2026-27 session. Submit applications before June 10th." },
  { id: 6, title: "Library Closure Notice", date: "May 15, 2026", category: "General", description: "The college library will remain closed on Sunday, May 31st for maintenance." },
];

export const NewsPage: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<News | null>(newsData[0]);

  return (
    <div className="max-w-7xl mx-auto p-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">College News & Updates</h1>
        <p className="text-lg text-slate-600">Stay informed about the latest developments, events, and academic schedules.</p>
      </header>

      <div className="grid md:grid-cols-12 gap-8">
        {/* News List */}
        <div className="md:col-span-5 space-y-4">
          {newsData.map((news) => (
            <button
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className={`w-full text-left p-6 rounded-2xl border transition-all ${
                selectedNews?.id === news.id 
                  ? 'bg-indigo-600 border-indigo-600 text-white' 
                  : 'bg-white border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className={`text-xs font-bold uppercase mb-2 ${selectedNews?.id === news.id ? 'text-indigo-200' : 'text-indigo-600'}`}>
                {news.category} • {news.date}
              </div>
              <h3 className={`font-bold text-lg ${selectedNews?.id === news.id ? 'text-white' : 'text-slate-900'}`}>
                {news.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Detailed View */}
        <div className="md:col-span-7">
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl sticky top-24">
            {selectedNews ? (
              <>
                <span className="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-bold mb-6">
                  {selectedNews.date}
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
                  {selectedNews.title}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {selectedNews.description}
                </p>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition">
                  Read Full Official Circular
                </button>
              </>
            ) : (
              <p>Select a news item to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};