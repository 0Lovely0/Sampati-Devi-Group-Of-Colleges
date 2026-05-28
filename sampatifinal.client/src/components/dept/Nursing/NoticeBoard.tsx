import { Link, useParams } from "react-router-dom";
import { Bell, ArrowRight } from "lucide-react";
import { notices } from "../../../data/noticeData";

const NoticeBoard = () => {
  const { deptId } = useParams();

  return (
    <div className="bg-white p-8 rounded-3xl border border-teal-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-teal-100 p-2 rounded-lg text-teal-700">
          <Bell size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Latest Notices</h2>
      </div>

      <div className="h-[400px] overflow-y-auto space-y-4 pr-2 flex-grow">
        {notices.map((notice) => (
          <Link
            // Yahan path ko Dept layout ke andar rakha hai taaki consistency rahe
            to={`/dept/${deptId}/notices/${notice.id}`}
            key={notice.id}
            className="block p-4 bg-teal-50/50 rounded-2xl border border-teal-50 hover:border-teal-200 transition-all group"
          >
            <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-3 py-1 rounded-lg">
              {notice.date}
            </span>
            <h4 className="font-medium text-slate-700 text-sm group-hover:text-teal-900 mt-2">
              {notice.title}
            </h4>
          </Link>
        ))}
      </div>

      <Link 
        to={`/dept/${deptId}/noticeDetails`}
        className="w-full mt-6 py-3 border-2 border-teal-700 text-teal-700 rounded-xl font-bold hover:bg-teal-700 hover:text-white transition flex items-center justify-center gap-2"
      >
        View All Notices <ArrowRight size={16} />
      </Link>
    </div>
  );
};

// --- YEH LINE ADD KAREIN ---
export default NoticeBoard;