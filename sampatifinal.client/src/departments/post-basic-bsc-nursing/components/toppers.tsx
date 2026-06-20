import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  getAllToppers,
  type Topper,
} from "../../../services/toppersService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const theme = {
  primary: "#1E40AF",
  secondary: "#DBEAFE",
  accent: "#3B82F6",
};

const POST_BASIC_ID = 2;

const PostBasicToppersSection: React.FC = () => {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        setLoading(true);

        const res = await getAllToppers();

        const list = Array.isArray(res)
          ? res
          : (res as { data?: Topper[] })?.data ?? [];

        setToppers(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchToppers();
  }, []);

  const filteredToppers = toppers.filter((t: any) =>
    t?.departments?.some(
      (d: any) => Number(d?.departmentId) === POST_BASIC_ID
    )
  );

  const list = [...filteredToppers, ...filteredToppers];

  return (
    <section
      className="pb-14 overflow-hidden"
      style={{ backgroundColor: theme.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-12 px-4 text-center border-b"
        style={{
          background: "linear-gradient(135deg,#1E40AF 0%,#3B82F6 100%)",
          borderColor: theme.primary,
        }}
      >
        <span
          className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "#fff",
          }}
        >
          Excellence
        </span>

        <h2 className="text-3xl md:text-6xl font-black text-white mt-4">
          Post Basic B.Sc Nursing Achievers
        </h2>

        <div
          className="h-1 w-16 mt-4 mx-auto rounded-full"
          style={{ backgroundColor: theme.accent }}
        />

        <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
          Celebrating the outstanding performers of Post Basic B.Sc Nursing
          Department.
        </p>
      </div>

      {/* TOPPERS SCROLL */}
      <div className="relative w-full -mt-18 overflow-hidden py-8">
        {loading ? (
          <div className="w-screen flex items-center justify-center py-16">
            <p className="text-sm text-slate-600">
              Loading toppers...
            </p>
          </div>
        ) : filteredToppers.length === 0 ? (
          <div className="w-screen flex items-center justify-center py-16">
            <p className="text-sm text-slate-600">
              No toppers found for Post Basic B.Sc Nursing.
            </p>
          </div>
        ) : (
          <div className="flex w-max animate-[scroll_25s_linear_infinite] gap-6 px-4 mx-auto">
            {list.map((item, index) => (
              <div
                key={`${item.topperId}-${index}`}
                onClick={() =>
                  setActiveId(
                    activeId === String(item.topperId)
                      ? null
                      : String(item.topperId)
                  )
                }
                className="relative w-[180px] h-[240px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 group border border-white/10"
              >
                {/* IMAGE */}
                <div className="absolute inset-0 bg-slate-900">
                  <img
                    src={`${API_BASE_URL}/${item.imagePath}`}
                    alt={item.name}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-topper.jpg";
                    }}
                  />
                </div>

                {/* NAME */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-sm font-semibold text-white tracking-wide">
                    {item.name}
                  </h3>
                </div>

                {/* OVERLAY */}
                <div
                  className={`absolute inset-0 backdrop-blur-md flex flex-col justify-center items-center text-center p-6 transition-all duration-500 ease-out ${
                    activeId === String(item.topperId)
                      ? "opacity-100"
                      : "opacity-0 md:group-hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: "rgba(30,64,175,0.82)",
                  }}
                >
                  <div className="space-y-3">
                    <div
                      className="inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        color: "#BFDBFE",
                        borderColor: "rgba(255,255,255,0.15)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                      }}
                    >
                      Rank #{item.collegeRank}
                    </div>

                    <div className="text-xs text-white font-medium">
                      {item.yearSemester}
                    </div>

                    <div className="text-[10px] text-white/70">
                      {item.batch}
                    </div>
                  </div>

                  <div className="absolute inset-2 border border-white/10 rounded-xl pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-10">
        <Link
          to="/programs/post-basic-bsc-nursing/toppers"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg hover:opacity-90 transition"
          style={{ backgroundColor: theme.primary }}
        >
          View All Achievements
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-50% - 12px));
            }
          }
        `}
      </style>
    </section>
  );
};

export default PostBasicToppersSection;