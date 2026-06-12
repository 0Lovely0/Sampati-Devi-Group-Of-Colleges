import React, { useEffect, useState } from "react";
import { Plus, X, Pencil, Trash2, Filter, ChevronDown } from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllGalleries,
  createGallery,
  updateGallery,
  deleteGallery,
  type Gallery,
} from "../../services/galleryService";
import { getDepartments, type Department } from "../../services/bannerService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const ManageGallery: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<number | "all">(
    "all",
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompact] = useState(false);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const [formData, setFormData] = useState({
    imgMaincat: "",
    imgCat: "",
    imgDes: "",
    imgSession: "",
    uploadedBy: "",
    imageFile: null as File | null,
    departmentIds: [] as number[],
  });

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [galData, deptData] = await Promise.all([
        getAllGalleries(),
        getDepartments(),
      ]);
      setGalleries(galData || []);
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

    // 1. Ensure the ID key matches your backend's expected parameter name
    if (editingGallery) {
      data.append("ImgId", editingGallery.imgId.toString());
    }

    // 2. Keys MUST match your C# GalleryDto property names exactly (Case-insensitive in C#, but good practice)
    data.append("ImgMaincat", formData.imgMaincat);
    data.append("ImgCat", formData.imgCat);
    data.append("ImgDes", formData.imgDes);
    data.append("ImgSession", formData.imgSession);
    data.append("UploadedBy", formData.uploadedBy);

    // 3. Departments match the List<int> property
    formData.departmentIds.forEach((id) => {
      data.append("DepartmentIds", id.toString());
    });

    // 4. THIS WAS THE MAIN ERROR: Change "Image" to "ImgPic"
    if (formData.imageFile) {
      data.append("ImgPic", formData.imageFile);
    }

    try {
      setSubmitting(true);
      editingGallery
        ? await updateGallery(editingGallery.imgId, data)
        : await createGallery(data);

      showToast("Saved successfully", "success");
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err);
      showToast("Check you fields", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader text="Loading Gallery..." />;

  return (
    <div className="min-h-screen bg-slate-50 p-1">
      {/* TOAST */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl text-white shadow-lg ${
            toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* TITLE */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Manage Gallery
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Upload, organize and manage gallery images
          </p>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => {
            setEditingGallery(null);
            setIsModalOpen(true);
          }}
          className="h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add Image
          </span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="relative z-100">
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
            <div className="absolute mt-2 w-60 bg-white border rounded-xl shadow">
              <button
                className="w-full text-left p-2 hover:bg-gray-100"
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
                  className="w-full text-left p-2 hover:bg-gray-100"
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
      </div>

      {/* Grids section */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {galleries.map((g) => (
    <div
      key={g.imgId}
      className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* IMAGE */}
      <div
        className={`relative cursor-pointer overflow-hidden ${
          isCompact ? "aspect-square" : "aspect-video"
        }`}
        onClick={() => setPreviewFile(`${API_BASE_URL}${g.imgPic}`)}
      >
        <img
          src={`${API_BASE_URL}${g.imgPic}`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          alt="gallery"
        />

        {/* hover overlay (keep only preview hint) */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
          <span className="text-xs text-white opacity-0 transition group-hover:opacity-100">
            Click to preview
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-slate-800">
          {g.imgMaincat}
        </h3>

        <p className="text-xs text-slate-500">{g.imgCat}</p>

        {/* ACTIONS (BANNER STYLE - ALWAYS VISIBLE) */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => {
              setEditingGallery(g);
              setFormData({
                imgMaincat: g.imgMaincat,
                imgCat: g.imgCat,
                imgDes: g.imgDes,
                imgSession: g.imgSession,
                uploadedBy: g.uploadedBy,
                imageFile: null,
                departmentIds: g.departments.map((d) => d.departmentId),
              });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 rounded-lg bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 transition"
          >
            <Pencil size={13} />
            Edit
          </button>

          <button
            onClick={async () => {
              if (confirm("Delete?")) {
                await deleteGallery(g.imgId);
                fetchData();
              }
            }}
            className="flex items-center gap-1 rounded-lg bg-red-100 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 transition"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-4 text-white">
              <div>
                <h2 className="text-lg font-bold">
                  {editingGallery ? "Edit Gallery Image" : "Add Gallery Image"}
                </h2>
                <p className="text-xs text-indigo-100">
                  Manage gallery content and departments
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                <X size={18} />
              </button>
            </div>
            {previewFile && (
              <div
                className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
                onClick={() => setPreviewFile(null)}
              >
                <img
                  src={previewFile}
                  alt="Preview"
                  className="max-h-[90vh] max-w-[90vw] rounded-xl"
                />
              </div>
            )}
            {/* BODY */}
            <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">
              {/* BASIC INFO */}
              <div className="grid grid-cols-1 gap-4">
                <input
                  className="w-full p-3 border rounded-xl focus:border-indigo-500 outline-none"
                  placeholder="Main Category"
                  value={formData.imgMaincat}
                  onChange={(e) =>
                    setFormData({ ...formData, imgMaincat: e.target.value })
                  }
                />

                <input
                  className="w-full p-3 border rounded-xl focus:border-indigo-500 outline-none"
                  placeholder="Category"
                  value={formData.imgCat}
                  onChange={(e) =>
                    setFormData({ ...formData, imgCat: e.target.value })
                  }
                />

                <textarea
                  className="w-full p-3 border rounded-xl focus:border-indigo-500 outline-none"
                  rows={3}
                  placeholder="Description"
                  value={formData.imgDes}
                  onChange={(e) =>
                    setFormData({ ...formData, imgDes: e.target.value })
                  }
                />
              </div>

              {/* META INFO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="w-full p-3 border rounded-xl focus:border-indigo-500 outline-none"
                  placeholder="Session"
                  value={formData.imgSession}
                  onChange={(e) =>
                    setFormData({ ...formData, imgSession: e.target.value })
                  }
                />

                <input
                  className="w-full p-3 border rounded-xl focus:border-indigo-500 outline-none"
                  placeholder="Uploaded By"
                  value={formData.uploadedBy}
                  onChange={(e) =>
                    setFormData({ ...formData, uploadedBy: e.target.value })
                  }
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                  Upload Image
                </label>

                <input
                  type="file"
                  className="w-full p-2 border rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      imageFile: e.target.files?.[0] || null,
                    })
                  }
                />
              </div>

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

export default ManageGallery;
