import React, { useEffect, useState } from "react";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Filter,
  ChevronDown,
} from "lucide-react";

import Loader from "../../components/common/Loader";
import {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  getDepartments,
  type Banner,
  type Department,
} from "../../services/bannerService";

const ManageBanners: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState<number | "all">(
    "all",
  );

  const [formData, setFormData] = useState({
    bnnrCat: "",
    bnnrDes: "",
    imageFile: null as File | null,
    departmentIds: [] as number[],
  });
  const [errors, setErrors] = useState({
    bnnrCat: "",
    bnnrDes: "",
    imageFile: "",
    departmentIds: "",
  });
  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bannersData, deptsData] = await Promise.all([
        getAllBanners(),
        getDepartments(),
      ]);
      setBanners(bannersData || []);
      setDepartments(deptsData || []);
    } catch {
      showToast("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this banner permanently?")) return;

    try {
      setLoading(true);

      await deleteBanner(id);

      showToast("Banner deleted successfully", "success");

      await fetchData();
    } catch {
      showToast("Failed to delete banner", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const newErrors = {
      bnnrCat: "",
      bnnrDes: "",
      imageFile: "",
      departmentIds: "",
    };

    let hasError = false;

    // Category Validation
    if (!formData.bnnrCat.trim()) {
      newErrors.bnnrCat = "Category is required";
      hasError = true;
    }

    // Description Validation
    if (!formData.bnnrDes.trim()) {
      newErrors.bnnrDes = "Description is required";
      hasError = true;
    }

    // Image Validation
    if (!editingBanner && !formData.imageFile) {
      newErrors.imageFile = "Banner image is required";
      hasError = true;
    }

    if (formData.imageFile && formData.imageFile.size > 2 * 1024 * 1024) {
      newErrors.imageFile = "Image size must be 2 MB or less";
      hasError = true;
    }

    // Department Validation
    if (formData.departmentIds.length === 0) {
      newErrors.departmentIds = "Please select at least one department";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    try {
      setSubmitting(true);

      const data = new FormData();

      data.append("BnnrCat", formData.bnnrCat.trim());
      data.append("BnnrDes", formData.bnnrDes.trim());
      data.append("BnnrStatus", "true");

      if (formData.imageFile) {
        data.append("Image", formData.imageFile);
      }

      formData.departmentIds.forEach((id) =>
        data.append("DepartmentIds", id.toString()),
      );

      if (editingBanner) {
        await updateBanner(editingBanner.bnnrId, data);

        showToast("Banner updated successfully", "success");
      } else {
        await createBanner(data);

        showToast("Banner created successfully", "success");
      }

      setIsModalOpen(false);
      setEditingBanner(null);

      setFormData({
        bnnrCat: "",
        bnnrDes: "",
        imageFile: null,
        departmentIds: [],
      });

      setErrors({
        bnnrCat: "",
        bnnrDes: "",
        imageFile: "",
        departmentIds: "",
      });

      await fetchData();
    } catch {
      showToast(
        editingBanner ? "Failed to update banner" : "Failed to create banner",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filteredBanners =
    departmentFilter === "all"
      ? banners
      : banners.filter((b) =>
          b.departments?.some((d) => d.departmentId === departmentFilter),
        );

  if (loading && banners.length === 0)
    return <Loader text="Loading Banners..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-[200] flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-sm
      ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}

          {toast.msg}
        </div>
      )}
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Manage Banners
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create, edit and organize website banners
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBanner(null);

            setFormData({
              bnnrCat: "",
              bnnrDes: "",
              imageFile: null,
              departmentIds: [],
            });

            setErrors({
              bnnrCat: "",
              bnnrDes: "",
              imageFile: "",
              departmentIds: "",
            });

            setIsModalOpen(true);
          }}
          className="h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add Banner
          </span>
        </button>
      </div>
      {/* Filter bar */}
      <div className="mb-5 flex items-center justify-between">
        <div className="relative">
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
            <div className="absolute left-0 mt-2 w-64 bg-white border rounded-xl shadow-lg z-20">
              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
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
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
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
        <div className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg">
          {filteredBanners.length} Banners
        </div>
      </div>

      {/* Grid section */}
      {banners.length === 0 ? (
        <div className="flex h-[350px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-700">
              No Banners Found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Create your first banner to get started.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredBanners.map((b) => (
            <div
              key={b.bnnrId}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={`https://localhost:7197/${b.bnnrImage}`}
                  alt={b.bnnrCat}
                  className="h-32 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="line-clamp-1 text-sm font-semibold text-slate-800">
                  {b.bnnrCat}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                  {b.bnnrDes || "No description available"}
                </p>

                {/* Departments */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {b.departments?.slice(0, 2).map((dept) => (
                    <span
                      key={dept.departmentId}
                      className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-700"
                    >
                      {dept.departmentName}
                    </span>
                  ))}

                  {b.departments?.length > 2 && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      +{b.departments.length - 2}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-3 flex gap-1.5">
                  <button
                    onClick={() =>
                      setLightbox(`https://localhost:7197/${b.bnnrImage}`)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    <Eye size={13} />
                  </button>

                  <button
                    onClick={() => {
                      setEditingBanner(b);

                      setFormData({
                        bnnrCat: b.bnnrCat,
                        bnnrDes: b.bnnrDes,
                        imageFile: null,
                        departmentIds: b.departments.map((d) => d.departmentId),
                      });

                      setErrors({
                        bnnrCat: "",
                        bnnrDes: "",
                        imageFile: "",
                        departmentIds: "",
                      });

                      setIsModalOpen(true);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  >
                    <Pencil size={13} />
                  </button>

                  <button
                    onClick={() => handleDelete(b.bnnrId)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      ;
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_25px_80px_-20px_rgba(0,0,0,0.35)]">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-5 py-4 text-white">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setErrors({
                    bnnrCat: "",
                    bnnrDes: "",
                    imageFile: "",
                    departmentIds: "",
                  });
                }}
                className="absolute right-4 top-4 text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>

              <h2 className="text-lg font-bold">
                {editingBanner ? "Update Banner" : "Create Banner"}
              </h2>

              <p className="text-xs text-indigo-100 mt-1">
                Banner information and department mapping
              </p>
            </div>

            <div className="p-5 space-y-4">
              {/* Category */}
              <div>
                <input
                  type="text"
                  placeholder="Banner Category"
                  value={formData.bnnrCat}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      bnnrCat: e.target.value,
                    });

                    setErrors((prev) => ({
                      ...prev,
                      bnnrCat: "",
                    }));
                  }}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
            ${
              errors.bnnrCat
                ? "border-red-500"
                : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            }`}
                />

                {errors.bnnrCat && (
                  <p className="mt-1 text-xs text-red-500">{errors.bnnrCat}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <textarea
                  rows={3}
                  placeholder="Banner Description"
                  value={formData.bnnrDes}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      bnnrDes: e.target.value,
                    });

                    setErrors((prev) => ({
                      ...prev,
                      bnnrDes: "",
                    }));
                  }}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm resize-none outline-none transition
            ${
              errors.bnnrDes
                ? "border-red-500"
                : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            }`}
                />

                {errors.bnnrDes && (
                  <p className="mt-1 text-xs text-red-500">{errors.bnnrDes}</p>
                )}
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Banner Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;

                    if (file && file.size > 2 * 1024 * 1024) {
                      setErrors((prev) => ({
                        ...prev,
                        imageFile: "Image size must be 2MB or less",
                      }));

                      e.target.value = "";
                      return;
                    }

                    setFormData({
                      ...formData,
                      imageFile: file,
                    });

                    setErrors((prev) => ({
                      ...prev,
                      imageFile: "",
                    }));
                  }}
                />

                {formData.imageFile && (
                  <div className="mt-2 rounded-xl bg-emerald-50 p-2 text-xs text-emerald-700">
                    {formData.imageFile.name}
                  </div>
                )}

                {errors.imageFile && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.imageFile}
                  </p>
                )}
              </div>

              {/* Departments */}
              <div>
                <div
                  className={`rounded-2xl border p-3 max-h-44 overflow-y-auto bg-slate-50
            ${errors.departmentIds ? "border-red-500" : "border-slate-200"}`}
                >
                  <label className="text-sm font-semibold text-slate-700 block mb-2">
                    Departments
                  </label>

                  {departments.map((d) => (
                    <label
                      key={d.departmentId}
                      className="flex items-center gap-2 py-1.5 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={formData.departmentIds.includes(
                          d.departmentId,
                        )}
                        onChange={(e) => {
                          const ids = e.target.checked
                            ? [...formData.departmentIds, d.departmentId]
                            : formData.departmentIds.filter(
                                (id) => id !== d.departmentId,
                              );

                          setFormData({
                            ...formData,
                            departmentIds: ids,
                          });

                          setErrors((prev) => ({
                            ...prev,
                            departmentIds: "",
                          }));
                        }}
                      />

                      {d.departmentName}
                    </label>
                  ))}
                </div>

                {errors.departmentIds && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.departmentIds}
                  </p>
                )}
              </div>

              {/* Save */}
              <button
                onClick={handleSave}
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save Banner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBanners;
