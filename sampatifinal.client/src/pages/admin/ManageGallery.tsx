import React, { useEffect, useState } from "react";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  Filter ,
  ChevronDown ,
  Eye,
  CheckCircle2,
  AlertCircle,
  ImageIcon,
} from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllGalleries,
  createGallery,
  updateGallery,
  deleteGallery,
  type Gallery,
} from "../../services/galleryService";
import { getDepartments, type Department } from "../../services/bannerService";

const BASE_URL = "https://localhost:7197";

const ManageGallery: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<number | "all">(
    "all",
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
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
    <div className="min-h-screen bg-slate-50 p-8">
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
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Manage Gallery
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Upload, organize and manage gallery images
          </p>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => {
            setEditingGallery(null);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          Add Image
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
      <div
        className={`grid gap-6 transition-all ${
          isCompact
            ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {galleries.map((g) => (
          <div
            key={g.imgId}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden border border-slate-100"
          >
            {/* IMAGE */}
            <div
              className={`relative cursor-pointer overflow-hidden ${
                isCompact ? "aspect-square" : "aspect-video"
              }`}
              onClick={() => setPreviewFile(`${BASE_URL}${g.imgPic}`)}
            >
              <img
                src={`${BASE_URL}${g.imgPic}`}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />

              {/* hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                <span className="text-white text-xs opacity-0 group-hover:opacity-100">
                  Click to preview
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h3 className="font-bold text-sm truncate">{g.imgMaincat}</h3>
              <p className="text-xs text-slate-400">{g.imgCat}</p>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">
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
                  className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={async () => {
                    if (confirm("Delete?")) {
                      await deleteGallery(g.imgId);
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
