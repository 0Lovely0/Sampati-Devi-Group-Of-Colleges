// src/pages/NewsPage.tsx
export default function NewsPage() {
  const newsList = [
    { title: "Admission open for Session 2026-27", date: "May 20, 2026", desc: "Admission process is now live..." },
    { title: "Semester Examination dates announced", date: "May 25, 2026", desc: "Final year exams starting from June 15th..." },
    { title: "Guest Lecture on 'Future of Nursing'", date: "May 26, 2026", desc: "Scheduled for June 5th at Seminar Hall." },
  ];

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-10 text-teal-900">All Latest News & Updates</h1>
      
      <div className="space-y-6">
        {newsList.map((item, index) => (
          <div key={index} className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-teal-500 transition-colors">
            <h2 className="text-xl font-bold text-teal-900">{item.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{item.date}</p>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}