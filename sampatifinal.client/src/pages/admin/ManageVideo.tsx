import React, { useEffect, useState } from "react";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  // CalendarDays,
  Filter,
  ChevronDown,
} from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  type Video,
} from "../../services/videoService";
import { getDepartments, type Department } from "../../services/bannerService";

const ManageVideos: React.FC = () => {
  const [departmentFilter, setDepartmentFilter] = useState<number | "all">(
    "all",
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const getYouTubeThumbnail = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      : null;
  };

  const [formData, setFormData] = useState({
    videoTitle: "",
    videoDescription: "",
    videoUrl: "",
    departmentIds: [] as number[],
  });

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [vidData, deptData] = await Promise.all([
        getAllVideos(),
        getDepartments(),
      ]);
      setVideos(vidData || []);
      setDepartments(deptData || []);
    } catch {
      showToast("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleDepartment = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      departmentIds: prev.departmentIds.includes(id)
        ? prev.departmentIds.filter((d) => d !== id)
        : [...prev.departmentIds, id],
    }));
  };

 const handleSave = async () => {
  const data = new FormData();

  // REQUIRED FIELDS (match backend DTO exactly)
  data.append("VideoTitle", formData.videoTitle?.trim() || "");
  data.append("VideoDescription", formData.videoDescription?.trim() || "");
  data.append("VideoUrl", formData.videoUrl?.trim() || "");

  // Departments (List<int>)
  formData.departmentIds.forEach((id) => {
    data.append("DepartmentIds", String(id));
  });

  try {
    setSubmitting(true);

    if (editingVideo) {
      await updateVideo(editingVideo.videoId, data);
    } else {
      await createVideo(data);
    }

    showToast("Saved successfully", "success");
    setIsModalOpen(false);
    setEditingVideo(null); // important reset
    setFormData({
      videoTitle: "",
      videoDescription: "",
      videoUrl: "",
      departmentIds: [],
    });

    fetchData();
  } catch (err: any) {
    console.error("Video Save Error:", err?.response?.data || err);
    showToast("Operation failed", "error");
  } finally {
    setSubmitting(false);
  }
};

  if (loading) return <Loader text="Loading Videos..." />;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl text-white ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Manage Videos
        </h1>
        <button
          onClick={() => {
            setEditingVideo(null);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Video
        </button>
      </div>

      {/* Filter bar */}
      <div className="relative mb-6 inline-block">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Filter size={14} />
          {departmentFilter === "all"
            ? "All Departments"
            : departments.find((d) => d.departmentId === departmentFilter)
                ?.departmentName}
          <ChevronDown size={14} />
        </button>

        {filterOpen && (
          <div className="absolute mt-2 w-60 bg-white border rounded-xl shadow z-20">
            <button
              className="w-full text-left px-3 py-2 hover:bg-slate-50"
              onClick={() => {
                setDepartmentFilter("all");
                setFilterOpen(false);
              }}
            >
              All Departments
            </button>

            {departments.map((d) => (
              <button
                key={d.departmentId}
                className="w-full text-left px-3 py-2 hover:bg-slate-50"
                onClick={() => {
                  setDepartmentFilter(d.departmentId);
                  setFilterOpen(false);
                }}
              >
                {d.departmentName}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grids section */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {videos.map((v) => {
          const thumbnail = getYouTubeThumbnail(v.videoUrl);

          return (
            <div
              key={v.videoId}
              className="group bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* THUMBNAIL */}
              <div className="relative aspect-video overflow-hidden cursor-pointer">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    No Image
                  </div>
                )}

                {/* hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                  <span className="text-white text-xs opacity-0 group-hover:opacity-100">
                    Watch Video
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="font-bold text-sm truncate">{v.videoTitle}</h3>

                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {v.videoDescription}
                </p>

                {/* ACTIONS */}
                <div className="flex items-center justify-between mt-4">
                  <a
                    href={v.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 text-xs font-medium hover:underline"
                  >
                    Watch
                  </a>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingVideo(v);
                        setFormData({
                          videoTitle: v.videoTitle,
                          videoDescription: v.videoDescription,
                          videoUrl: v.videoUrl,
                          departmentIds: v.departments.map(
                            (d) => d.departmentId,
                          ),
                        });
                        setIsModalOpen(true);
                      }}
                      className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={async () => {
                        if (confirm("Delete this video?")) {
                          await deleteVideo(v.videoId);
                          fetchData();
                        }
                      }}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-4 text-white">
              <div>
                <h2 className="text-lg font-bold">
                  {editingVideo ? "Edit Video" : "Add Video"}
                </h2>
                <p className="text-xs text-indigo-100">
                  Manage YouTube videos and departments
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* TITLE */}
              <input
                className="w-full p-3 border rounded-xl focus:border-indigo-500 outline-none"
                placeholder="Video Title"
                value={formData.videoTitle}
                onChange={(e) =>
                  setFormData({ ...formData, videoTitle: e.target.value })
                }
              />

              {/* URL */}
              <input
                className="w-full p-3 border rounded-xl focus:border-indigo-500 outline-none"
                placeholder="YouTube URL"
                value={formData.videoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
              />

              {/* DESCRIPTION */}
              <textarea
                className="w-full p-3 border rounded-xl focus:border-indigo-500 outline-none"
                placeholder="Description"
                rows={4}
                value={formData.videoDescription}
                onChange={(e) =>
                  setFormData({ ...formData, videoDescription: e.target.value })
                }
              />

              {/* DEPARTMENTS */}
              <div className="p-4 border rounded-xl bg-slate-50">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-3">
                  Select Departments
                </p>

                <div className="flex flex-wrap gap-2">
                  {departments.map((d) => (
                    <button
                      key={d.departmentId}
                      type="button"
                      onClick={() => toggleDepartment(d.departmentId)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                        formData.departmentIds.includes(d.departmentId)
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {d.departmentName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t px-6 py-4 flex justify-end">
              <button
                onClick={handleSave}
                disabled={submitting}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVideos;
