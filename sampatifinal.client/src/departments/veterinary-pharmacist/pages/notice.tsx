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

const theme = {
  primary: "#15803D",
  secondary: "#DCFCE7",
  accent: "#22C55E",
};

export const VeterinaryNoticeBoardPage: React.FC = () => {
  const [notices, setNotices] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotice, setSelectedNotice] =
    useState<Notification | null>(null);
  const [fileOpen, setFileOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const VETERINARY_DEPT_ID = 3; // change if needed

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);

        const data = await getAllNotifications();

        const veterinaryNotices = data
          .filter((n) => n.notification_status === true)
          .filter((n) =>
            n.departments?.some(
              (d: any) => Number(d.departmentId) === VETERINARY_DEPT_ID
            )
          )
          .sort(
            (a, b) =>
              new Date(b.notification_date).getTime() -
              new Date(a.notification_date).getTime()
          );

        setNotices(veterinaryNotices);

        if (veterinaryNotices.length > 0) {
          setSelectedNotice(veterinaryNotices[0]);
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
        style={{ backgroundColor: theme.secondary }}
      >
        <Loader text="Loading Veterinary notices..." />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: theme.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-20 px-4 text-center"
        style={{ backgroundColor: theme.primary }}
      >
        <div className="flex justify-center mb-5">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{ backgroundColor: theme.accent }}
          >
            <Bell className="text-white" size={36} />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Veterinary Notices
        </h1>

        <p className="text-white/80 max-w-2xl mx-auto">
          Stay updated with veterinary announcements, examinations,
          schedules, circulars, and academic updates.
        </p>

        <div
          className="h-1 w-24 mx-auto rounded-full mt-6"
          style={{ backgroundColor: theme.accent }}
        />
      </div>

      <div className="w-full mx-auto px-4 -mt-8">
        {/* SEARCH */}
        <div className="bg-white p-2 rounded-2xl shadow-xl flex items-center gap-3 border mb-10"
          style={{ borderColor: "#BBF7D0" }}
        >
          <Search className="ml-3" size={20} style={{ color: theme.primary }} />

          <input
            type="text"
            placeholder="Search veterinary notices..."
            className="w-full py-3 text-sm outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LIST */}
          <div className="lg:col-span-7 space-y-4">
            {filteredNotices.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center">
                <h3 className="font-bold text-xl text-slate-700">
                  No veterinary notices found
                </h3>
                <p className="text-slate-500 mt-2">
                  Try a different keyword.
                </p>
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <div
                  key={notice.notification_id}
                  onClick={() => setSelectedNotice(notice)}
                  className={`group p-6 rounded-2xl border cursor-pointer transition-all ${
                    selectedNotice?.notification_id === notice.notification_id
                      ? "bg-white shadow-lg"
                      : "bg-white hover:shadow-md"
                  }`}
                  style={{
                    borderColor:
                      selectedNotice?.notification_id === notice.notification_id
                        ? theme.accent
                        : "#DCFCE7",
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: theme.secondary,
                        color: theme.primary,
                      }}
                    >
                      {notice.notification_cat}
                    </span>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Calendar size={12} />
                      {formatDate(notice.notification_date)}
                    </div>
                  </div>

                  <h3
                    className="font-bold text-lg"
                    style={{
                      color:
                        selectedNotice?.notification_id === notice.notification_id
                          ? theme.primary
                          : "#0f172a",
                    }}
                  >
                    {notice.notification_sub}
                  </h3>
                </div>
              ))
            )}
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-5 h-full">
            <div
              className="sticky top-30 p-8 rounded-3xl shadow-2xl text-white"
              style={{ backgroundColor: theme.primary }}
            >
              {selectedNotice ? (
                <>
                  <span style={{ color: theme.accent }} className="text-[10px] font-bold uppercase tracking-widest">
                    Veterinary Update
                  </span>

                  <h2 className="text-2xl font-black mt-2">
                    {selectedNotice.notification_sub}
                  </h2>

                  <p className="text-white/80 text-sm mt-6">
                    {selectedNotice.notification_des}
                  </p>

                  {selectedNotice.notification_file && (
                    <button
                      onClick={() =>
                        setFileOpen(getFileUrl(selectedNotice.notification_file))
                      }
                      className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold bg-white text-green-700"
                    >
                      <FileText size={18} />
                      View Document
                      <ArrowRight size={18} />
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <h3 className="font-bold text-xl">No Notice Selected</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FILE VIEWER */}
      {fileOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setFileOpen(null)}
        >
          <div
            className="relative bg-white w-full max-w-5xl rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFileOpen(null)}
              className="absolute -top-12 right-0 text-white"
            >
              <X size={32} />
            </button>

            {fileOpen.match(/\.(jpg|jpeg|png|webp)$/i) ? (
              <img
                src={fileOpen}
                className="w-full max-h-[80vh] object-contain"
              />
            ) : (
              <iframe
                src={fileOpen}
                className="w-full h-[80vh]"
                title="file"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VeterinaryNoticeBoardPage;