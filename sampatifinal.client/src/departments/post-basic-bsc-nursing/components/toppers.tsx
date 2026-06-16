import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getAllToppers, type Topper } from "../../../services/toppersService";

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
          backgroundColor: theme.primary,
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

        <h2 className="text-3xl md:text-4xl font-black text-white mt-4">
          Post Basic B.Sc Nursing Achievers
        </h2>

        <div
          className="h-1 w-16 mt-4 mx-auto rounded-full"
          style={{ backgroundColor: theme.accent }}
        />

        <p className="mt-4 text-white/70 text-xs max-w-xl mx-auto">
          Celebrating the outstanding performers of Post Basic B.Sc Nursing department.
        </p>
      </div>

      {/* SCROLL */}
      <div className="relative w-full overflow-hidden -mt-8">
        {loading ? (
          <div className="text-center text-slate-600 text-sm py-10">
            Loading toppers...
          </div>
        ) : filteredToppers.length === 0 ? (
          <div className="text-center text-slate-600 text-sm py-10">
            No toppers found for Post Basic B.Sc Nursing.
          </div>
        ) : (
          <div className="flex gap-3 px-4 animate-[scroll_25s_linear_infinite] min-w-max">
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
                className="relative w-[160px] flex-shrink-0 rounded-xl overflow-hidden border bg-white shadow-sm group cursor-pointer"
              >
                {/* IMAGE */}
                <div className="h-44 w-full overflow-hidden bg-stone-100">
                  <img
                    src={`${API_BASE_URL}/${item.imagePath}`}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* NAME ONLY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <h3 className="text-xs font-black text-white truncate">
                    {item.name}
                  </h3>
                </div>

                {/* HOVER + CLICK DETAILS */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center px-3 transition-all duration-300
                  ${
                    activeId === String(item.topperId)
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{ backgroundColor: "rgba(30, 64, 175, 0.95)" }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: theme.accent }}
                  >
                    Rank: {item.collegeRank}
                  </p>

                  <p className="text-[10px] text-white/80 mt-2">
                    {item.yearSemester}
                  </p>

                  <p className="text-[10px] text-white/70">
                    {item.batch}
                  </p>
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
          View All Achievements <ArrowRight size={12} />
        </Link>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
};

export default PostBasicToppersSection;