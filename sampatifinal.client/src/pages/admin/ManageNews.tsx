import React, { useEffect, useState } from "react";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  CheckCircle2,
  Filter,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  type News,
} from "../../services/newsService";
import { getDepartments, type Department } from "../../services/bannerService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const ManageNews: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompact] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState<number | "all">(
    "all",
  );

  const [errors, setErrors] = useState({
    news_subject: "",
    news_description: "",
    news_type: "",
    news_cat: "",
    imageFile: "",
    departmentIds: "",
  });
  // setErrors({
  //   news_subject: "",
  //   news_description: "",
  //   news_type: "",
  //   news_cat: "",
  //   imageFile: "",
  //   departmentIds: "",
  // });

  const [formData, setFormData] = useState({
    news_subject: "",
    news_description: "",
    news_type: "",
    news_cat: "",
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
      const [newsData, deptData] = await Promise.all([
        getAllNews(),
        getDepartments(),
      ]);
      setNews(newsData || []);
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

  const handleSave = async () => {
    const newErrors = {
      news_subject: "",
      news_description: "",
      news_type: "",
      news_cat: "",
      imageFile: "",
      departmentIds: "",
    };

    let hasError = false;

    // Subject
    if (!formData.news_subject.trim()) {
      newErrors.news_subject = "News subject is required";
      hasError = true;
    } else if (formData.news_subject.trim().length > 200) {
      newErrors.news_subject = "News subject cannot exceed 200 characters";
      hasError = true;
    }

    // Category
    if (!formData.news_cat.trim()) {
      newErrors.news_cat = "News category is required";
      hasError = true;
    }

    // Type
    if (!formData.news_type.trim()) {
      newErrors.news_type = "News type is required";
      hasError = true;
    }

    // Description
    if (!formData.news_description.trim()) {
      newErrors.news_description = "News description is required";
      hasError = true;
    } else if (formData.news_description.trim().length < 20) {
      newErrors.news_description = "Description must be at least 20 characters";
      hasError = true;
    }

    // Department
    if (formData.departmentIds.length === 0) {
      newErrors.departmentIds = "Please select at least one department";
      hasError = true;
    }

    // Image Validation
    if (!editingNews && !formData.imageFile) {
      newErrors.imageFile = "News image is required";
      hasError = true;
    }

    if (formData.imageFile) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(formData.imageFile.type)) {
        newErrors.imageFile = "Only JPG, JPEG, PNG and WEBP files are allowed";
        hasError = true;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB

      if (formData.imageFile.size > maxSize) {
        newErrors.imageFile = "Image size must not exceed 2 MB";
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    const data = new FormData();

    data.append("news_subject", formData.news_subject.trim());
    data.append("news_description", formData.news_description.trim());
    data.append("news_type", formData.news_type.trim());
    data.append("news_cat", formData.news_cat.trim());

    if (formData.imageFile) {
      data.append("Image", formData.imageFile);
    }

    formData.departmentIds.forEach((id) => {
      data.append("DepartmentIds", id.toString());
    });

    try {
      setSubmitting(true);

      if (editingNews) {
        await updateNews(editingNews.news_id, data);
        showToast("News updated successfully", "success");
      } else {
        await createNews(data);
        showToast("News created successfully", "success");
      }

      setIsModalOpen(false);
      setEditingNews(null);

      setFormData({
        news_subject: "",
        news_description: "",
        news_type: "",
        news_cat: "",
        imageFile: null,
        departmentIds: [],
      });

      setErrors({
        news_subject: "",
        news_description: "",
        news_type: "",
        news_cat: "",
        imageFile: "",
        departmentIds: "",
      });

      await fetchData();
    } catch (error) {
      console.error(error);
      showToast("Failed to save news", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader text="Loading News..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-6 top-6 z-[200] flex items-center gap-3 rounded-2xl px-5 py-3 text-white shadow-2xl backdrop-blur-xl ${
            toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span className="font-medium">{toast.msg}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            News Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all news articles and department assignments.
          </p>
        </div>

        <div className="flex gap-3">
          {/* <button
            onClick={() => setIsCompact(!isCompact)}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm transition hover:shadow-md"
          >
            {isCompact ? "Expanded View" : "Compact View"}
          </button> */}

          <button
            onClick={() => {
              setEditingNews(null);
              setIsModalOpen(true);
            }}
            className="h-10 rounded-xl bg-indigo-950 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02 w-full"
          >
            <span className="flex items-center gap-2">
              <Plus size={16} />
              Add News
            </span>
          </button>
        </div>
      </div>

      {/* Stats */}
      {/* <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">Total News</p>
      <h3 className="mt-2 text-3xl font-black text-slate-900">
        {news.length}
      </h3>
    </div>

    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">Departments</p>
      <h3 className="mt-2 text-3xl font-black text-indigo-600">
        {departments.length}
      </h3>
    </div>

    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">Categories</p>
      <h3 className="mt-2 text-3xl font-black text-emerald-600">
        {[...new Set(news.map((n) => n.news_cat))].length}
      </h3>
    </div>

    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">Published</p>
      <h3 className="mt-2 text-3xl font-black text-orange-500">
        {news.length}
      </h3>
    </div>

  </div> */}

      {/* Filter */}
      <div className="mb-4 flex items-center justify-between">
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
            <div className="absolute left-0 top-full z-20 mt-2 w-86 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <button
                onClick={() => {
                  setDepartmentFilter("all");
                  setFilterOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50"
              >
                All Departments
              </button>

              {departments.map((dept) => (
                <button
                  key={dept.departmentId}
                  onClick={() => {
                    setDepartmentFilter(dept.departmentId);
                    setFilterOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50"
                >
                  {dept.departmentName}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">
          {
            news.filter(
              (e) =>
                departmentFilter === "all" ||
                e.departments?.some((d) => d.departmentId === departmentFilter),
            ).length
          }{" "}
          Events
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {news
          .filter(
            (n) =>
              departmentFilter === "all" ||
              n.departments.some((d) => d.departmentId === departmentFilter),
          )
          .map((n) => (
            <div
              key={n.news_id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGE */}
              <div className={`overflow-hidden ${isCompact ? "h-24" : "h-32"}`}>
                <img
                  src={`${API_BASE_URL}/${n.news_images}`}
                  alt={n.news_subject}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-3">
                {/* CATEGORY */}
                <span className="mb-2 inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                  {n.news_cat}
                </span>

                {/* TITLE */}
                <h3
                  className={`font-semibold text-slate-900 ${
                    isCompact ? "line-clamp-1 text-xs" : "line-clamp-2 text-sm"
                  }`}
                >
                  {n.news_subject}
                </h3>

                {/* DESCRIPTION */}
                {!isCompact && (
                  <p className="mt-1 line-clamp-2 text-[11px] text-slate-500">
                    {n.news_description}
                  </p>
                )}

                {/* DEPARTMENTS */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {n.departments.slice(0, 2).map((dept) => (
                    <span
                      key={dept.departmentId}
                      className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-600"
                    >
                      {dept.departmentName}
                    </span>
                  ))}

                  {n.departments.length > 2 && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-600">
                      +{n.departments.length - 2}
                    </span>
                  )}
                </div>

                {/* ACTIONS (BANNER STYLE - ALWAYS VISIBLE) */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingNews(n);
                      setFormData({
                        news_subject: n.news_subject,
                        news_description: n.news_description,
                        news_type: n.news_type,
                        news_cat: n.news_cat,
                        imageFile: null,
                        departmentIds: n.departments.map((d) => d.departmentId),
                      });
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-indigo-950 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-slate-700 transition"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      if (confirm("Delete this news item?")) {
                        await deleteNews(n.news_id);
                        fetchData();
                      }
                    }}
                    className="flex items-center gap-1 rounded-lg bg-indigo-950 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-red-500 transition"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
            {/* Header */}
            <div className="bg-indigo-950 px-6 py-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 rounded-xl bg-white/10 p-2 text-white transition hover:bg-white/20"
              >
                <X size={18} />
              </button>

              <h2 className="text-2xl font-bold text-white">
                {editingNews ? "Edit News" : "Create News"}
              </h2>

              <p className="mt-1 text-sm text-indigo-100">
                Manage news information, departments and media.
              </p>
            </div>

            {/* Body */}
            <div className="max-h-[75vh] overflow-y-auto p-6">
              <div className="grid gap-5 md:grid-cols-2">
                {/* Subject */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    News Subject
                  </label>
                  <input
                    value={formData.news_subject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        news_subject: e.target.value,
                      })
                    }
                    placeholder="Enter news subject"
                    className={`w-full rounded-2xl px-4 py-3 outline-none transition focus:ring-4 ${
                      errors.news_subject
                        ? "border border-red-500 focus:ring-red-100"
                        : "border border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                  />

                  {errors.news_subject && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.news_subject}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    News Category
                  </label>
                  <input
                    value={formData.news_cat}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        news_cat: e.target.value,
                      })
                    }
                    placeholder="Latest News"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                  {errors.news_cat && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.news_cat}
                    </p>
                  )}
                </div>

                {/* Type */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    News Type
                  </label>
                  <input
                    value={formData.news_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        news_type: e.target.value,
                      })
                    }
                    placeholder="General"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                  {errors.news_type && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.news_type}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    News Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.news_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        news_description: e.target.value,
                      })
                    }
                    placeholder="Write news description..."
                    className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                  {errors.news_description && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.news_description}
                    </p>
                  )}
                </div>

                {/* Departments */}
                <div className="md:col-span-2">
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Departments
                  </label>

                  <div className="grid max-h-56 grid-cols-1 gap-2 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-2">
                    {departments.map((dept) => {
                      const selected = formData.departmentIds.includes(
                        dept.departmentId,
                      );

                      return (
                        <label
                          key={dept.departmentId}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${
                            selected
                              ? "border-indigo-500 bg-indigo-50 shadow-sm"
                              : "border-slate-200 bg-white hover:border-indigo-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            className="h-4 w-4"
                            onChange={() => {
                              if (selected) {
                                setFormData({
                                  ...formData,
                                  departmentIds: formData.departmentIds.filter(
                                    (id) => id !== dept.departmentId,
                                  ),
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  departmentIds: [
                                    ...formData.departmentIds,
                                    dept.departmentId,
                                  ],
                                });
                              }
                            }}
                          />

                          <span className="text-sm font-medium text-slate-700">
                            {dept.departmentName}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.departmentIds && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.departmentIds}
                    </p>
                  )}

                  {formData.departmentIds.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {departments
                        .filter((d) =>
                          formData.departmentIds.includes(d.departmentId),
                        )
                        .map((dept) => (
                          <span
                            key={dept.departmentId}
                            className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
                          >
                            {dept.departmentName}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    News Image
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50">
                    <span className="text-sm font-medium text-slate-600">
                      Click to upload image
                    </span>

                    <span className="mt-1 text-xs text-slate-400">
                      PNG, JPG, JPEG
                    </span>

                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;

                        const allowedTypes = [
                          "image/jpeg",
                          "image/jpg",
                          "image/png",
                          "image/webp",
                        ];

                        if (!allowedTypes.includes(file.type)) {
                          setErrors((prev) => ({
                            ...prev,
                            imageFile:
                              "Only JPG, JPEG, PNG and WEBP files are allowed",
                          }));
                          return;
                        }

                        if (file.size > 2 * 1024 * 1024) {
                          setErrors((prev) => ({
                            ...prev,
                            imageFile: "Image size must not exceed 2 MB",
                          }));
                          return;
                        }

                        setErrors((prev) => ({
                          ...prev,
                          imageFile: "",
                        }));

                        setFormData({
                          ...formData,
                          imageFile: file,
                        });
                      }}
                    />
                  </label>

                  {formData.imageFile && (
                    <div className="mt-3 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                      {formData.imageFile.name}
                    </div>
                  )}
                  {errors.imageFile && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.imageFile}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={submitting}
                  className="rounded-xl bg-indigo-950 px-6 py-2.5 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editingNews
                      ? "Update News"
                      : "Create News"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;
