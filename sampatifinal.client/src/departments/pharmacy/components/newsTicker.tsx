import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { getAllNews, type News } from "../../../services/newsService";

const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

const TARGET_DEPARTMENT = "Pharmacy";

const NewsTicker: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const data = await getAllNews();

        const pharmacyNews = data
          .filter((item) =>
            item.departments?.some(
              (dept) =>
                normalize(dept.departmentName) ===
                normalize(TARGET_DEPARTMENT)
            )
          )
          .sort(
            (a, b) =>
              new Date(b.news_date).getTime() -
              new Date(a.news_date).getTime()
          )
          .slice(0, 10);

        setNews(pharmacyNews);
      } catch (error) {
        console.error("Failed to fetch Pharmacy news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <div
        className="w-full flex items-center overflow-hidden border-b h-9 shadow-sm"
        style={{
          backgroundColor: "#7C3AED",
          borderColor: "#A855F7",
        }}
      >
        {/* LEFT LABEL */}
        <div
          className="h-full px-4 flex items-center gap-2 shrink-0 text-[10px] font-black uppercase tracking-[0.15em]"
          style={{
            backgroundColor: "#A855F7",
            color: "#FFFFFF",
          }}
        >
          <Bell size={13} />
          Pharmacy News
        </div>

        {/* TICKER */}
        <Link
          to="/programs/pharmacy/news"
          className="relative flex-1 overflow-hidden cursor-pointer group"
        >
          {/* Left Fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right,#7C3AED,transparent)",
            }}
          />

          {/* Right Fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left,#7C3AED,transparent)",
            }}
          />

          {loading ? (
            <div className="h-9 flex items-center px-4 text-purple-100 text-xs animate-pulse">
              Loading Pharmacy updates...
            </div>
          ) : news.length > 0 ? (
            <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
              {[...news, ...news].map((item, index) => (
                <div
                  key={`${item.news_id}-${index}`}
                  className="flex items-center px-6 text-[11px] text-white"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mr-3 shrink-0"
                    style={{
                      backgroundColor: "#A855F7",
                      boxShadow: "0 0 8px rgba(168,85,247,0.8)",
                    }}
                  />

                  <span className="font-medium hover:text-[#EDE9FE] transition-colors">
                    {item.news_subject}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-9 flex items-center px-4 text-purple-100 text-xs italic">
              No Pharmacy news available
            </div>
          )}
        </Link>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
};

export default NewsTicker;