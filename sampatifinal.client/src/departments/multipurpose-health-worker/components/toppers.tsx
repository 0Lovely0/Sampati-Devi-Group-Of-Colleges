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

const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

const TARGET_DEPARTMENT = "Multipurpose Health Worker";

const MPHW_THEME = {
  primary: "#EA580C",
  secondary: "#FFEDD5",
  accent: "#F97316",
};

const MPHWToppersSection: React.FC = () => {
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
        console.error("MPHW toppers fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchToppers();
  }, []);

  const filteredToppers = toppers.filter((t: any) =>
    t?.departments?.some(
      (d: any) =>
        normalize(d?.departmentName) ===
        normalize(TARGET_DEPARTMENT)
    )
  );

  const list = [...filteredToppers, ...filteredToppers];

  return (
    <section
      className="pb-14 overflow-hidden"
      style={{ backgroundColor: MPHW_THEME.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-12 px-4 text-center border-b"
        style={{
          background: `linear-gradient(135deg, ${MPHW_THEME.primary} 0%, ${MPHW_THEME.accent} 100%)`,
          borderColor: MPHW_THEME.accent,
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
          MPHW Achievers
        </h2>

        <div
          className="h-1 w-16 mt-4 mx-auto rounded-full"
          style={{ backgroundColor: MPHW_THEME.accent }}
        />

        <p className="mt-4 text-white/70 text-xs max-w-xl mx-auto">
          Celebrating the outstanding performers, academic achievers,
          community health leaders, and top-ranking students of the
          Multipurpose Health Worker Department.
        </p>
      </div>

      {/* SCROLL */}
      <div className="relative w-full overflow-hidden -mt-8">
        {loading ? (
          <div
            className="text-center text-sm py-10 font-medium"
            style={{ color: MPHW_THEME.primary }}
          >
            Loading MPHW achievers...
          </div>
        ) : filteredToppers.length === 0 ? (
          <div
            className="text-center text-sm py-10 font-medium"
            style={{ color: MPHW_THEME.primary }}
          >
            No MPHW achievers found.
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
                style={{
                  borderColor: MPHW_THEME.secondary,
                }}
              >
                {/* IMAGE */}
                <div className="h-44 w-full overflow-hidden bg-stone-100">
                  <img
                    src={`${API_BASE_URL}/${item.imagePath}`}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* NAME */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <h3 className="text-xs font-black text-white truncate">
                    {item.name}
                  </h3>
                </div>

                {/* DETAILS */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center px-3 transition-all duration-300 ${
                    activeId === String(item.topperId)
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: "rgba(234,88,12,0.95)",
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "#FED7AA" }}
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
          to="/programs/multipurpose-health-worker/toppers"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg hover:opacity-90 transition"
          style={{
            background: `linear-gradient(135deg, ${MPHW_THEME.primary} 0%, ${MPHW_THEME.accent} 100%)`,
          }}
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
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </section>
  );
};

export default MPHWToppersSection;