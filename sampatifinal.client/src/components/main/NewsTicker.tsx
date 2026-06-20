import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNews, type News } from "../../services/newsService";
import { Bell } from "lucide-react";

const NewsTicker: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await getAllNews();

        const sortedNews = data
          .sort(
            (a, b) =>
              new Date(b.news_date).getTime() -
              new Date(a.news_date).getTime()
          )
          .slice(0, 10);

        setNews(sortedNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="w-full flex items-center overflow-hidden bg-indigo-950 border-b border-slate-800 h-8">
      {/* Label */}
      <div className="bg-amber-500 text-slate-950 px-6 py-1 h-full flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.15em] whitespace-nowrap">
        <Bell size={12} />
        Latest
      </div>

      {/* Ticker */}
      <Link to="/newspage" className="flex-1 overflow-hidden group cursor-pointer relative">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-slate-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-slate-950 to-transparent z-10" />

        {loading ? (
          <div className="text-slate-400 px-4 text-[11px] animate-pulse">
            Loading updates...
          </div>
        ) : (
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
            {(news.length ? news : []).concat(news).map((item, index) => (
              <div
                key={index}
                className="flex items-center text-slate-300 text-[15px] font-medium px-6 hover:text-amber-400 transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-amber-500 mr-2 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
                {item.news_subject}
              </div>
            ))}

            {!news.length && !loading && (
              <div className="text-slate-500 px-4 text-[11px] italic">
                No current updates available
              </div>
            )}
          </div>
        )}
      </Link>
    </div>
  );
};

export default NewsTicker;