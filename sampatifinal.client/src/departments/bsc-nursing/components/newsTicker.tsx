import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { getAllNews, type News } from "../../../services/newsService";

const BSC_NURSING_DEPARTMENT_ID = 1;

const NewsTicker: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const data = await getAllNews();

        const bscNursingNews = data
          .filter((item) =>
            item.departments?.some(
              (dept) => dept.departmentId === BSC_NURSING_DEPARTMENT_ID,
            ),
          )
          .sort(
            (a, b) =>
              new Date(b.news_date).getTime() - new Date(a.news_date).getTime(),
          )
          .slice(0, 10);

        setNews(bscNursingNews);
      } catch (error) {
        console.error("Failed to fetch B.Sc Nursing news:", error);
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
          backgroundColor: "#0F766E",
          borderColor: "#14B8A6",
        }}
      >
        {/* LEFT LABEL */}
        <div
          className="h-full px-4 flex items-center gap-2 shrink-0 text-[10px] font-black uppercase tracking-[0.15em] text-lg"
          style={{
            backgroundColor: "#14B8A6",
            color: "#FFFFFF",
          }}
        >
          <Bell size={13} />
          Latest News
        </div>

        {/* TICKER */}
        <Link
          to="/programs/bsc-nursing/news"
          className="relative flex-1 overflow-hidden cursor-pointer group"
        >
          {/* Left Fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right,#0F766E,transparent)",
            }}
          />

          {/* Right Fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left,#0F766E,transparent)",
            }}
          />

          {loading ? (
            <div className="h-9 flex items-center px-4 text-teal-100 text-xs animate-pulse">
              Loading B.Sc Nursing updates...
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
                      backgroundColor: "#14B8A6",
                      boxShadow: "0 0 8px rgba(20,184,166,0.8)",
                    }}
                  />

                  <span className="font-medium text-lg hover:text-[#CCFBF1] transition-colors">
                    {item.news_subject}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-9 flex items-center px-4 text-teal-100 text-xs italic">
              No B.Sc Nursing news available
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
