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

/** POST BASIC THEME (your provided config) */
const THEME = {
  primary: "#1E40AF",
  secondary: "#DBEAFE",
  accent: "#3B82F6",
};

/** Correct department matching (your API list) */
const POST_BASIC_DEPT_ID = 2;
const POST_BASIC_DEPT_NAME = "post basic b.sc. nursing";

export const PostBasicBscNursingNoticeBoard: React.FC = () => {
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

        const filtered = data
          .filter((n) => n.notification_status === true)
          .filter((n) =>
            n.departments?.some((d: any) => {
              const name = (d.departmentName || "")
                .toLowerCase()
                .replace(/\s+/g, " ")
                .trim();

              return (
                Number(d.departmentId) === POST_BASIC_DEPT_ID ||
                name === POST_BASIC_DEPT_NAME
              );
            })
          )
          .sort(
            (a, b) =>
              new Date(b.notification_date).getTime() -
              new Date(a.notification_date).getTime()
          );

        setNotices(filtered);

        if (filtered.length > 0) {
          setSelectedNotice(filtered[0]);
        }
      } catch (error) {
        console.error("Notice load error:", error);
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
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getFileUrl = (file?: string | null) =>
    !file
      ? ""
      : file.startsWith("http")
      ? file
      : `${API_BASE_URL}/${file}`;

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: THEME.secondary }}
      >
        <Loader text="Loading Post Basic B.Sc Nursing notices..." />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: THEME.secondary }}
    >
      {/* HEADER */}
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

        <h1 className="text-4xl md:text-5xl font-black text-white">
          Post Basic B.Sc Nursing Notices
        </h1>

        <p className="text-white/80 mt-4 max-w-2xl mx-auto">
          Academic updates, examinations, circulars and departmental notices.
        </p>

        <div
          className="h-1 w-24 mx-auto rounded-full mt-6"
          style={{ backgroundColor: THEME.accent }}
        />
      </div>

      <div className="w-full mx-auto px-4 -mt-8">
        {/* SEARCH */}
        <div className="bg-white p-2 rounded-2xl shadow-lg flex items-center gap-3 mb-10">
          <Search size={18} style={{ color: THEME.primary }} />

          <input
            type="text"
            placeholder="Search notices..."
            className="w-full py-3 text-sm outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* LIST */}
          <div className="lg:col-span-7 space-y-4">
            {filteredNotices.length === 0 ? (
              <div className="bg-white p-10 rounded-3xl text-center">
                <h3 className="font-bold text-xl">
                  No notices found
                </h3>
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <div
                  key={notice.notification_id}
                  onClick={() => setSelectedNotice(notice)}
                  className="bg-white p-6 rounded-2xl cursor-pointer border hover:shadow-md transition"
                  style={{
                    borderColor:
                      selectedNotice?.notification_id === notice.notification_id
                        ? THEME.accent
                        : "#BFDBFE",
                  }}
                >
                  <div className="flex justify-between mb-3">
                    <span
                      className="text-[10px] font-black uppercase px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: THEME.secondary,
                        color: THEME.primary,
                      }}
                    >
                      {notice.notification_cat}
                    </span>

                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(notice.notification_date)}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900">
                    {notice.notification_sub}
                  </h3>
                </div>
              ))
            )}
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-5 h-full">
            <div
              className="sticky top-30 p-8 rounded-3xl text-white shadow-2xl"
              style={{ backgroundColor: THEME.primary }}
            >
              {selectedNotice ? (
                <>
                  <h2 className="text-2xl font-black">
                    {selectedNotice.notification_sub}
                  </h2>

                  <p className="text-white/80 mt-6 text-sm">
                    {selectedNotice.notification_des}
                  </p>

                  {selectedNotice.notification_file && (
                    <button
                      onClick={() =>
                        setFileOpen(
                          getFileUrl(selectedNotice.notification_file)
                        )
                      }
                      className="mt-8 w-full bg-white text-blue-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      <FileText size={18} />
                      View Document
                      <ArrowRight size={18} />
                    </button>
                  )}
                </>
              ) : (
                <p>No notice selected</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FILE MODAL */}
      {fileOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setFileOpen(null)}
        >
          <div
            className="bg-white w-full max-w-5xl rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFileOpen(null)}
              className="absolute top-4 right-4 text-white"
            >
              <X size={28} />
            </button>

            {fileOpen.match(/\.(jpg|jpeg|png|webp)$/i) ? (
              <img src={fileOpen} className="w-full max-h-[80vh]" />
            ) : (
              <iframe
                src={fileOpen}
                className="w-full h-[80vh]"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostBasicBscNursingNoticeBoard;