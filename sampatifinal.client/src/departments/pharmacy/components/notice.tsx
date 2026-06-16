import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Sparkles, ArrowRight } from "lucide-react";
import {
  getAllNotifications,
  type Notification,
} from "../../../services/notificationService";
import Loader from "../../../components/common/Loader";

const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

const TARGET_DEPARTMENT = "Pharmacy";

const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);

        const data = await getAllNotifications();

        const filtered = data
          .filter(
            (n) =>
              n.notification_status &&
              n.departments?.some(
                (dept: any) =>
                  normalize(dept.departmentName) ===
                  normalize(TARGET_DEPARTMENT)
              )
          )
          .sort(
            (a, b) =>
              new Date(b.notification_date).getTime() -
              new Date(a.notification_date).getTime()
          );

        setNotices(filtered);
      } catch (err) {
        console.error("Pharmacy notice fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const scrollingNotices = [...notices, ...notices];

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });

  return (
    <section className="bg-[#EDE9FE] py-12">
      <div className="w-full mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL */}
          <div className="lg:col-span-4">
            <div
              className="h-[500px] p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg,#7C3AED 0%,#A855F7 100%)",
              }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="p-3 rounded-2xl text-white"
                    style={{ backgroundColor: "#A855F7" }}
                  >
                    <Bell size={24} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-white">
                      Notice Board
                    </h2>

                    <p className="text-[10px] uppercase tracking-widest text-purple-100 font-bold">
                      Pharmacy Department
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-purple-100 font-bold text-xs uppercase tracking-widest mb-6">
                  <Sparkles size={14} />
                  Real-time Updates
                </div>

                <p className="text-purple-50 text-sm leading-relaxed">
                  Access all academic circulars, examination updates,
                  admissions information, internship opportunities, and
                  official announcements for the Pharmacy department.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4 text-center border border-white/10">
                  <h3 className="text-2xl font-black text-white">
                    {notices.length}
                  </h3>
                  <p className="text-[9px] uppercase tracking-widest text-purple-100 mt-1">
                    Active
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 text-center border border-white/10">
                  <h3 className="text-2xl font-black text-white">Live</h3>
                  <p className="text-[9px] uppercase tracking-widest text-purple-100 mt-1">
                    Status
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-8">
            <div className="h-[500px] bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-[#7C3AED]">
                  Latest Updates
                </h3>

                <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#EDE9FE] text-[#7C3AED]">
                  Auto Scrolling
                </span>
              </div>

              {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <Loader text="Loading pharmacy notices..." />
                </div>
              ) : (
                <div className="flex-1 relative overflow-hidden">
                  <div className="animate-[scrollTop_20s_linear_infinite] space-y-4">
                    {scrollingNotices.map((notice, index) => (
                      <div
                        key={`${index}-${notice.notification_sub}`}
                        className="flex items-center gap-4 p-4 rounded-xl border border-stone-100 hover:border-[#A855F7] hover:bg-[#F5F3FF] transition-all duration-300"
                      >
                        <span
                          className="shrink-0 text-[10px] font-bold px-3 py-1 rounded-lg"
                          style={{
                            color: "#7C3AED",
                            backgroundColor: "#EDE9FE",
                          }}
                        >
                          {formatDate(notice.notification_date)}
                        </span>

                        <p className="text-sm font-medium text-slate-700 line-clamp-1">
                          {notice.notification_sub}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pointer-events-none absolute top-0 h-16 w-full bg-gradient-to-b from-white to-transparent" />
                  <div className="pointer-events-none absolute bottom-0 h-16 w-full bg-gradient-to-t from-white to-transparent" />
                </div>
              )}

              <Link
                to="/programs/pharmacy/notices"
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background:
                    "linear-gradient(135deg,#7C3AED 0%,#A855F7 100%)",
                }}
              >
                View All Official Notices
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollTop {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </section>
  );
};

export default NoticeBoard;