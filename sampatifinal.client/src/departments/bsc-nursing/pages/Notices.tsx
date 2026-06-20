import React, { useEffect, useState } from "react";
import {
  getAllNotifications,
  type Notification,
} from "../../../services/notificationService";
import Loader from "../../../components/common/Loader";
import {
  X,
  Search,
  FileText,
  Calendar,
  ArrowRight,
  Bell,
} from "lucide-react";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const THEME = {
  primary: "#0F766E",
  secondary: "#CCFBF1",
  accent: "#14B8A6",
};

export const NoticeBoardPage: React.FC = () => {
  const [notices, setNotices] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotice, setSelectedNotice] =
    useState<Notification | null>(null);
  const [fileOpen, setFileOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);

        const data = await getAllNotifications();

        const bscNursingNotices = data
          .filter((n) => n.notification_status === true)
          .filter((n) =>
            n.departments?.some(
              (d) => d.departmentId === 1 // B.Sc Nursing
            )
          )
          .sort(
            (a, b) =>
              new Date(b.notification_date).getTime() -
              new Date(a.notification_date).getTime()
          );

        setNotices(bscNursingNotices);

        if (bscNursingNotices.length > 0) {
          setSelectedNotice(bscNursingNotices[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const filteredNotices = notices.filter((notice) =>
    notice.notification_sub
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  const getFileUrl = (file?: string | null) => {
    if (!file) return "";
    return file.startsWith("http")
      ? file
      : `${API_BASE_URL}/${file}`;
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: THEME.secondary }}
      >
        <Loader text="Loading B.Sc Nursing notices..." />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: THEME.secondary }}
    >
      {/* Header */}
      <div
        className="py-20 px-4 text-center"
        style={{ backgroundColor: THEME.primary }}
      >
        <div className="flex justify-center mb-5">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{ backgroundColor: THEME.accent }}
          >
            <Bell className="text-white" size={36} />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          B.Sc Nursing Notices
        </h1>

        <p className="text-white/80 max-w-2xl mx-auto">
          Stay updated with the latest announcements, examinations,
          circulars, schedules, and departmental activities.
        </p>

        <div
          className="h-1 w-24 mx-auto rounded-full mt-6"
          style={{ backgroundColor: THEME.accent }}
        />
      </div>

      <div className="w-full mx-auto px-4 -mt-8">
        {/* Search */}
        <div className="bg-white p-2 rounded-2xl shadow-xl shadow-teal-200/40 flex items-center gap-3 border border-teal-100 mb-10">
          <Search
            className="ml-3"
            size={20}
            style={{ color: THEME.primary }}
          />

          <input
            type="text"
            placeholder="Search notices..."
            className="w-full py-3 text-sm outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Notices List */}
          <div className="lg:col-span-7 space-y-4">
            {filteredNotices.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
                <h3 className="font-bold text-xl text-slate-700">
                  No notices found
                </h3>

                <p className="text-slate-500 mt-2">
                  Try another search term.
                </p>
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <div
                  key={notice.notification_id}
                  onClick={() => setSelectedNotice(notice)}
                  className={`group p-6 rounded-2xl border transition-all cursor-pointer ${
                    selectedNotice?.notification_id ===
                    notice.notification_id
                      ? "bg-white shadow-lg border-2"
                      : "bg-white border-slate-200 hover:shadow-md"
                  }`}
                  style={{
                    borderColor:
                      selectedNotice?.notification_id ===
                      notice.notification_id
                        ? THEME.accent
                        : undefined,
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: THEME.secondary,
                        color: THEME.primary,
                      }}
                    >
                      {notice.notification_cat}
                    </span>

                    <div className="flex items-center gap-1.5 text-[15px] text-slate-500">
                      <Calendar size={12} />
                      {formatDate(notice.notification_date)}
                    </div>
                  </div>

                  <h3
                    className="font-bold text-lg leading-snug transition-colors"
                    style={{
                      color:
                        selectedNotice?.notification_id ===
                        notice.notification_id
                          ? THEME.primary
                          : "#0f172a",
                    }}
                  >
                    {notice.notification_sub}
                  </h3>
                </div>
              ))
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-5 h-screen">
            <div
              className="sticky top-30 p-8 rounded-3xl shadow-2xl text-white"
              style={{ backgroundColor: THEME.primary }}
            >
              {selectedNotice ? (
                <>
                  <div className="mb-6">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest block mb-2"
                      style={{ color: THEME.accent }}
                    >
                      Announcement
                    </span>

                    <h2 className="text-2xl font-black leading-tight">
                      {selectedNotice.notification_sub}
                    </h2>
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <p className="text-white text-[15px] leading-relaxed mb-8">
                      {selectedNotice.notification_des}
                    </p>
                  </div>

                  {selectedNotice.notification_file && (
                    <button
                      onClick={() =>
                        setFileOpen(
                          getFileUrl(
                            selectedNotice.notification_file
                          )
                        )
                      }
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold transition-all"
                      style={{
                        backgroundColor: "#ffffff",
                        color: THEME.primary,
                      }}
                    >
                      <FileText size={18} />
                      View Document
                      <ArrowRight size={18} />
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <h3 className="font-bold text-xl">
                    No Notice Selected
                  </h3>

                  <p className="text-white/70 mt-2">
                    Select a notice to view details.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* File Viewer */}
      {fileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setFileOpen(null)}
        >
          <div
            className="relative bg-white max-w-5xl w-full p-2 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFileOpen(null)}
              className="absolute -top-12 right-0 text-white transition-colors"
            >
              <X size={32} />
            </button>

            {fileOpen.match(/\.(jpg|jpeg|png|webp)$/i) ? (
              <img
                src={fileOpen}
                alt="Notice"
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            ) : (
              <iframe
                src={fileOpen}
                className="w-full h-[80vh] rounded-lg"
                title="Notice File"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoardPage;