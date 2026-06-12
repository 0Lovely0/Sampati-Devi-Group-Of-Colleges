import { Link, useParams } from "react-router-dom";
import { Bell, ArrowRight, GraduationCap } from "lucide-react";

const notices = [
  {
    id: 1,
    date: "May 25",
    title: "Semester Examination Form Submission Deadline",
  },
  {
    id: 2,
    date: "May 22",
    title: "Clinical Posting Schedule Released",
  },
  {
    id: 3,
    date: "May 20",
    title: "Workshop on Advanced Nursing Procedures",
  },
  {
    id: 4,
    date: "May 18",
    title: "Community Health Camp Participation Notice",
  },
  {
    id: 5,
    date: "May 15",
    title: "Library Membership Renewal Process",
  },
  {
    id: 6,
    date: "May 12",
    title: "Scholarship Applications Open",
  },
];

const scrollingNotices = [...notices, ...notices];

export default function DepartmentNoticeBoard() {
  const { deptId } = useParams();

  return (
    <section className="bg-slate-50 py-8 px-4">
      <div className="w-full mx-auto">
        <div className="grid lg:grid-cols-12 gap-5">
          {/* Left Panel */}
          <div className="lg:col-span-4">
            <div className="bg-teal-900 border border-teal-800 p-5 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="border border-teal-700 p-2 text-white">
                  <Bell size={18} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white">
                    Department Notices
                  </h2>
                  <p className="text-xs text-teal-200">
                    Academic & Clinical Updates
                  </p>
                </div>
              </div>

              <p className="text-sm text-teal-100 leading-relaxed">
                Stay informed about examinations, clinical postings,
                workshops, seminars, academic activities and departmental
                announcements.
              </p>

              <div className="mt-5 border-t border-teal-800 pt-4">
                <div className="flex items-center gap-2 text-teal-100">
                  <GraduationCap size={16} />
                  <span className="text-sm font-medium">
                    B.Sc. Nursing Department
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="border border-teal-700 bg-teal-950 p-3">
                  <h3 className="text-lg font-bold text-white">24/7</h3>
                  <p className="text-[11px] text-teal-300">
                    Updates
                  </p>
                </div>

                <div className="border border-teal-700 bg-teal-950 p-3">
                  <h3 className="text-lg font-bold text-white">100+</h3>
                  <p className="text-[11px] text-teal-300">
                    Notices
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Notice Board */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 p-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Latest Announcements
                </h3>

                <span className="text-[11px] font-semibold text-teal-700 border border-teal-200 bg-teal-50 px-2 py-1">
                  LIVE
                </span>
              </div>

              {/* Scroll Area */}
              <div className="relative h-[280px] overflow-hidden">
                <div className="animate-[scrollTop_18s_linear_infinite] space-y-2">
                  {scrollingNotices.map((notice, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 border border-slate-200 bg-slate-50 p-3"
                    >
                      <span className="shrink-0 border border-teal-200 bg-teal-50 px-2 py-1 text-[10px] font-bold text-teal-700">
                        {notice.date}
                      </span>

                      <p className="text-sm text-slate-700">
                        {notice.title}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pointer-events-none absolute top-0 h-8 w-full bg-gradient-to-b from-white to-transparent" />
                <div className="pointer-events-none absolute bottom-0 h-8 w-full bg-gradient-to-t from-white to-transparent" />
              </div>

              <Link to={`/dept/${deptId}/news`}>
                <button className="mt-4 w-full flex items-center justify-center gap-2 border border-teal-700 bg-teal-700 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 transition-colors">
                  View All Notices
                  <ArrowRight size={15} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scrollTop {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
        `}
      </style>
    </section>
  );
}