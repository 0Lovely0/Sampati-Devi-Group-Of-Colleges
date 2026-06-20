import React, { useEffect, useState } from "react";
import { getAllNews, type News } from "../../../services/newsService";
import Loader from "../../../components/common/Loader";

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

export const NewsPage: React.FC = () => {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const getFileUrl = (file?: string) =>
    !file
      ? ""
      : file.startsWith("http")
      ? file
      : `${API_BASE_URL}/${file}`;

  const handleViewFile = () => {
    if (!selectedNews?.news_images) return;

    setLightboxUrl(getFileUrl(selectedNews.news_images));
    setLightboxOpen(true);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const data = await getAllNews();

        const mphwNews = data
          .filter((item: any) =>
            item.departments?.some(
              (dept: any) =>
                normalize(dept.departmentName) ===
                normalize(TARGET_DEPARTMENT)
            )
          )
          .sort(
            (a, b) =>
              new Date(b.news_date).getTime() -
              new Date(a.news_date).getTime()
          );

        setNewsData(mphwNews);

        if (mphwNews.length > 0) {
          setSelectedNews(mphwNews[0]);
        }
      } catch (error) {
        console.error("MPHW news load error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ backgroundColor: MPHW_THEME.secondary }}
      >
        <Loader text="Loading MPHW news..." />
      </div>
    );
  }

  if (!selectedNews) {
    return (
      <div
        className="h-screen flex items-center justify-center font-semibold"
        style={{
          backgroundColor: MPHW_THEME.secondary,
          color: MPHW_THEME.primary,
        }}
      >
        No MPHW news available
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: MPHW_THEME.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-20 px-4 text-center"
        style={{
          background: `linear-gradient(135deg, ${MPHW_THEME.primary} 0%, ${MPHW_THEME.accent} 100%)`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-black text-white">
          MPHW News & Updates
        </h1>

        <div
          className="h-1 w-24 mt-6 mx-auto rounded-full"
          style={{ backgroundColor: MPHW_THEME.accent }}
        />

        <p className="text-white/80 mt-6 text-sm md:text-lg max-w-2xl mx-auto">
          Stay updated with the latest announcements, training programs,
          examinations, workshops, seminars, community health initiatives,
          outreach activities, and Multipurpose Health Worker Department
          updates.
        </p>
      </div>

      <section className="w-full mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-4 space-y-4">
            {newsData.map((news) => {
              const active = selectedNews.news_id === news.news_id;

              return (
                <button
                  key={news.news_id}
                  onClick={() => setSelectedNews(news)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                    active
                      ? "shadow-xl"
                      : "bg-white hover:shadow-md"
                  }`}
                  style={{
                    backgroundColor: active
                      ? MPHW_THEME.primary
                      : "#FFFFFF",
                    borderColor: active
                      ? MPHW_THEME.primary
                      : "#FED7AA",
                  }}
                >
                  <span
                    className={`text-[12px] font-black uppercase tracking-widest ${
                      active ? "text-white/90" : ""
                    }`}
                    style={{
                      color: active
                        ? undefined
                        : MPHW_THEME.accent,
                    }}
                  >
                    {news.news_cat}
                  </span>

                  <h3
                    className={`font-black mt-2 mb-3 text-lg ${
                      active ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {news.news_subject}
                  </h3>

                  <p
                    className={`text-[12px] font-medium ${
                      active ? "text-white/80" : "text-slate-500"
                    }`}
                  >
                    {new Date(news.news_date).toLocaleDateString()}
                  </p>
                </button>
              );
            })}
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-8">
            <div
              className="bg-white p-8 md:p-12 rounded-3xl shadow-sm sticky top-28"
              style={{ border: "1px solid #FED7AA" }}
            >
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <span
                  className="px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest"
                  style={{
                    backgroundColor: MPHW_THEME.secondary,
                    color: MPHW_THEME.primary,
                  }}
                >
                  {selectedNews.news_cat}
                </span>

                <span className="text-lg font-medium text-slate-500">
                  {new Date(selectedNews.news_date).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-6">
                {selectedNews.news_subject}
              </h2>

              <div
                className="w-20 h-1 rounded-full mb-8"
                style={{ backgroundColor: MPHW_THEME.accent }}
              />

              <p className="text-slate-600 leading-relaxed text-lg md:text-base mb-10">
                {selectedNews.news_description}
              </p>

              {selectedNews.news_images && (
                <button
                  onClick={handleViewFile}
                  className="text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg hover:opacity-90"
                  style={{
                    backgroundColor: MPHW_THEME.primary,
                  }}
                >
                  View Attachment
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxOpen && lightboxUrl && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm p-4"
          style={{
            backgroundColor: "rgba(234,88,12,0.92)",
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white font-bold text-xl"
            >
              Close ✕
            </button>

            {lightboxUrl.toLowerCase().endsWith(".pdf") ? (
              <iframe
                src={lightboxUrl}
                className="w-full h-[85vh] rounded-2xl bg-white"
                title="News Attachment"
              />
            ) : (
              <img
                src={lightboxUrl}
                alt={selectedNews.news_subject}
                className="w-full max-h-[85vh] object-contain rounded-2xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;