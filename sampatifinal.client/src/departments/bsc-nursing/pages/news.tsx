import React, { useEffect, useState } from "react";
import { getAllNews, type News } from "../../../services/newsService";
import Loader from "../../../components/common/Loader";

const BSC_NURSING_DEPARTMENT_ID = 1;

export const NewsPage: React.FC = () => {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "https://localhost:7197"
      : "https://sampatigroup.stdruraltech.org";

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

        const bscNursingNews = data
          .filter((item) =>
            item.departments?.some(
              (dept: any) =>
                dept.departmentId === BSC_NURSING_DEPARTMENT_ID
            )
          )
          .sort(
            (a, b) =>
              new Date(b.news_date).getTime() -
              new Date(a.news_date).getTime()
          );

        setNewsData(bscNursingNews);

        if (bscNursingNews.length > 0) {
          setSelectedNews(bscNursingNews[0]);
        }
      } catch (error) {
        console.error("Error loading B.Sc Nursing news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FFFE]">
        <Loader text="Loading B.Sc Nursing news..." />
      </div>
    );
  }

  if (!selectedNews) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FFFE] text-[#0F766E] font-semibold">
        No B.Sc Nursing news available
      </div>
    );
  }

  return (
    <div className="bg-[#F8FFFE] min-h-screen">
      {/* HEADER */}
      <div className="bg-[#0F766E] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white">
          B.Sc Nursing News & Updates
        </h1>

        <div className="h-1 w-24 bg-[#14B8A6] mt-6 mx-auto rounded-full" />

        <p className="text-[#CCFBF1] mt-6 text-sm md:text-base max-w-2xl mx-auto">
          Stay updated with the latest announcements, academic activities,
          examinations, admissions, workshops, and nursing-related updates.
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
                      ? "bg-[#0F766E] border-[#0F766E] shadow-xl"
                      : "bg-white border-[#CCFBF1] hover:border-[#14B8A6] hover:shadow-md"
                  }`}
                >
                  <span
                    className={`text-[15px] font-black uppercase tracking-widest ${
                      active
                        ? "text-[#CCFBF1]"
                        : "text-[#14B8A6]"
                    }`}
                  >
                    {news.news_cat}
                  </span>

                  <h3
                    className={`font-black mt-2 mb-3 text-lg ${
                      active
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    {news.news_subject}
                  </h3>

                  <p
                    className={`text-[12px] font-medium ${
                      active
                        ? "text-[#CCFBF1]"
                        : "text-slate-500"
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
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#CCFBF1] shadow-sm sticky top-28">
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <span className="bg-[#CCFBF1] text-[#0F766E] px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest">
                  {selectedNews.news_cat}
                </span>

                <span className="text-xs font-medium text-slate-500">
                  {new Date(
                    selectedNews.news_date
                  ).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-6">
                {selectedNews.news_subject}
              </h2>

              <div className="w-20 h-1 bg-[#14B8A6] rounded-full mb-8" />

              <p className="text-slate-600 leading-relaxed text-sm md:text-lg mb-10">
                {selectedNews.news_description}
              </p>

              {selectedNews.news_images && (
                <button
                  onClick={handleViewFile}
                  className="bg-[#0F766E] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#14B8A6] transition-all shadow-lg"
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
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
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