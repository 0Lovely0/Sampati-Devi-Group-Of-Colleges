import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Filter,
  ChevronDown,
  X,
} from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  type Notification,
} from "../../services/notificationService";
import { getDepartments, type Department } from "../../services/bannerService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const ManageNotice: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState<Notification[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompact] = useState(false); // Added for size toggle
  const [previewFile, setPreviewFile] = useState<string | null>(null); // Added for lightbox
  const [editingNotice, setEditingNotice] = useState<Notification | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState<number | "all">(
    "all",
  );

  const [formData, setFormData] = useState({
    notification_sub: "",
    notification_des: "",
    notification_cat: "",
    file: null as File | null,
    departmentIds: [] as number[],
  });

  const [errors, setErrors] = useState({
    notification_sub: "",
    notification_des: "",
    notification_cat: "",
    file: "",
    departmentIds: "",
  });

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [n, d] = await Promise.all([
        getAllNotifications(),
        getDepartments(),
      ]);
      setNotices(n || []);
      setDepartments(d || []);
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

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this notice?")) return;
    try {
      await deleteNotification(id);
      showToast("Deleted successfully", "success");
      fetchData();
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const validateField = (
    name: string,
    value: string | number[] | File | null,
  ) => {
    let error = "";

    switch (name) {
      case "notification_sub":
        if (!String(value).trim()) {
          error = "Notice title is required";
        } else if (String(value).trim().length > 200) {
          error = "Title cannot exceed 200 characters";
        }
        break;

      case "notification_cat":
        if (!String(value).trim()) {
          error = "Category is required";
        }
        break;

      case "notification_des":
        if (!String(value).trim()) {
          error = "Description is required";
        } else if (String(value).trim().length < 20) {
          error = "Description must be at least 20 characters";
        }
        break;

      case "departmentIds":
        if ((value as number[]).length === 0) {
          error = "Please select at least one department";
        }
        break;

      case "file":
        if (!editingNotice && !value) {
          error = "Attachment is required";
        }

        if (value instanceof File) {
          const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "application/pdf",
          ];

          if (!allowedTypes.includes(value.type)) {
            error = "Only PDF, JPG, JPEG, PNG and WEBP files are allowed";
          }

          if (value.size > 150 * 1024) {
            error = "File size must not exceed 150 KB";
          }
        }

        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error === "";
  };

  const handleSave = async () => {
    const newErrors = {
      notification_sub: "",
      notification_des: "",
      notification_cat: "",
      file: "",
      departmentIds: "",
    };

    let hasError = false;

    if (!formData.notification_sub.trim()) {
      newErrors.notification_sub = "Notice title is required";
      hasError = true;
    }

    if (!formData.notification_cat.trim()) {
      newErrors.notification_cat = "Category is required";
      hasError = true;
    }

    if (!formData.notification_des.trim()) {
      newErrors.notification_des = "Description is required";
      hasError = true;
    } else if (formData.notification_des.trim().length < 20) {
      newErrors.notification_des = "Description must be at least 20 characters";
      hasError = true;
    }

    if (formData.departmentIds.length === 0) {
      newErrors.departmentIds = "Please select at least one department";
      hasError = true;
    }

    if (!editingNotice && !formData.file) {
      newErrors.file = "Attachment is required";
      hasError = true;
    }

    if (formData.file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "application/pdf",
      ];

      if (!allowedTypes.includes(formData.file.type)) {
        newErrors.file = "Only PDF, JPG, JPEG, PNG and WEBP files are allowed";
        hasError = true;
      }

      if (formData.file.size > 150 * 1024) {
        newErrors.file = "File size must not exceed 150 KB";
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError) return;

    const data = new FormData();
    data.append("notification_sub", formData.notification_sub);
    data.append("notification_des", formData.notification_des);
    data.append("notification_cat", formData.notification_cat);

    formData.departmentIds.forEach((id) =>
      data.append("DepartmentIds", String(id)),
    );

    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      setSubmitting(true);

      editingNotice
        ? await updateNotification(editingNotice.notification_id, data)
        : await createNotification(data);

      showToast("Saved successfully", "success");

      setIsModalOpen(false);

      setFormData({
        notification_sub: "",
        notification_des: "",
        notification_cat: "",
        file: null,
        departmentIds: [],
      });

      fetchData();
    } catch {
      showToast("Operation failed", "error");
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) return <Loader text="Loading Notices..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-1">
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl flex items-center gap-2 text-white ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
        >
          {toast.type === "success" ? <CheckCircle2 /> : <AlertCircle />}{" "}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Notice Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all notices and department assignments.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingNotice(null);
            setIsModalOpen(true);
          }}
          className="h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add Notice
          </span>
        </button>
      </div>

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
            notices.filter(
              (n) =>
                departmentFilter === "all" ||
                n.departments?.some((d) => d.departmentId === departmentFilter),
            ).length
          }{" "}
          Notices
        </span>
      </div>

      {/* Grid */}
      <div
        className={`grid gap-3 items-stretch ${
          isCompact
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"
            : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {notices
          .filter(
            (n) =>
              departmentFilter === "all" ||
              n.departments?.some((d) => d.departmentId === departmentFilter),
          )
          .map((n) => {
            const fileUrl = n.notification_file
              ? `${API_BASE_URL}/${n.notification_file}`
              : null;

            return (
              <div
                key={n.notification_id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* PREVIEW */}
                <div
                  className={`relative flex-shrink-0 cursor-pointer overflow-hidden bg-slate-100 ${
                    isCompact ? "h-24" : "h-32"
                  }`}
                  onClick={() => fileUrl && setPreviewFile(fileUrl)}
                >
                  {fileUrl ? (
                    <img
                      src={fileUrl}
                      alt={n.notification_sub}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FileText size={28} className="text-slate-400" />
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-3">
                  {/* CATEGORY */}
                  <div className="mb-2 min-h-[20px]">
                    {n.notification_cat && (
                      <span className="inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                        {n.notification_cat}
                      </span>
                    )}
                  </div>

                  {/* TITLE */}
                  <h3
                    className={`font-semibold text-slate-900 ${
                      isCompact
                        ? "line-clamp-1 text-xs min-h-[16px]"
                        : "line-clamp-2 text-xs min-h-[34px]"
                    }`}
                  >
                    {n.notification_sub}
                  </h3>

                  {/* DESCRIPTION */}
                  {!isCompact && (
                    <p className="mt-1 min-h-[34px] line-clamp-2 text-[11px] text-slate-500">
                      {n.notification_des}
                    </p>
                  )}

                  {/* DEPARTMENTS */}
                  <div className="mt-2 min-h-[28px] flex flex-wrap gap-1">
                    {n.departments?.slice(0, 2).map((dept) => (
                      <span
                        key={dept.departmentId}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-600"
                      >
                        {dept.departmentName}
                      </span>
                    ))}

                    {(n.departments?.length || 0) > 2 && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-600">
                        +{n.departments.length - 2}
                      </span>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-auto pt-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingNotice(n);
                        setFormData({
                          notification_sub: n.notification_sub,
                          notification_des: n.notification_des,
                          notification_cat: n.notification_cat,
                          file: null,
                          departmentIds: n.departments.map(
                            (d) => d.departmentId,
                          ),
                        });
                        setIsModalOpen(true);
                      }}
                      className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 transition hover:bg-indigo-200"
                    >
                      <Pencil size={13} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(n.notification_id)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-100 px-2.5 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-200"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Lightbox Preview */}
      {previewFile && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreviewFile(null)}
        >
          <button className="absolute top-6 right-6 text-white">
            <X size={40} />
          </button>
          <img
            src={previewFile}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          />
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-5 py-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">
                    {editingNotice ? "Edit Notice" : "Create Notice"}
                  </h2>
                  <p className="text-xs text-indigo-100">
                    Manage notice details and department assignments
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingNotice(null);
                  }}
                  className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[75vh] overflow-y-auto p-5">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Notice Title
                  </label>

                  <input
                    value={formData.notification_sub}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData({
                        ...formData,
                        notification_sub: value,
                      });

                      validateField("notification_sub", value);
                    }}
                    className={`w-full rounded-xl px-3 py-2 text-sm focus:outline-none ${
                      errors.notification_sub
                        ? "border border-red-500"
                        : "border border-slate-200 focus:border-indigo-500"
                    }`}
                  />
                  {errors.notification_sub && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.notification_sub}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Category
                  </label>

                  <input
                    value={formData.notification_cat}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData({
                        ...formData,
                        notification_cat: value,
                      });

                      validateField("notification_cat", value);
                    }}
                    className={`w-full rounded-xl px-3 py-2 text-sm focus:outline-none ${
                      errors.notification_cat
                        ? "border border-red-500"
                        : "border border-slate-200 focus:border-indigo-500"
                    }`}
                    placeholder="Category"
                  />

                  {errors.notification_cat && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.notification_cat}
                    </p>
                  )}
                </div>

                {/* File */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Attachment
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;

                      validateField("file", file);

                      if (!file) return;

                      const allowedTypes = [
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                        "image/webp",
                        "application/pdf",
                      ];

                      if (!allowedTypes.includes(file.type)) {
                        return;
                      }

                      if (file && file.size > 150 * 1024) {
                        return;
                      }

                      setFormData({
                        ...formData,
                        file,
                      });
                    }}
                    className={`w-full rounded-xl p-2 text-xs ${
                      errors.file
                        ? "border border-red-500"
                        : "border border-slate-200"
                    }`}
                  />

                  {errors.file && (
                    <p className="mt-1 text-xs text-red-500">{errors.file}</p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    value={formData.notification_des}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData({
                        ...formData,
                        notification_des: value,
                      });

                      validateField("notification_des", value);
                    }}
                    className={`w-full rounded-xl px-3 py-2 text-sm focus:outline-none ${
                      errors.notification_des
                        ? "border border-red-500"
                        : "border border-slate-200 focus:border-indigo-500"
                    }`}
                    placeholder="Notice description"
                  />

                  {errors.notification_des && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.notification_des}
                    </p>
                  )}
                </div>

                {/* Departments */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Select Departments
                  </label>

                  <div
                    className={`grid grid-cols-2 gap-2 rounded-xl p-2 ${
                      errors.departmentIds
                        ? "border border-red-500"
                        : "border border-transparent"
                    } md:grid-cols-3`}
                  >
                    {departments.map((d) => {
                      const selected = formData.departmentIds.includes(
                        d.departmentId,
                      );

                      return (
                        <button
                          key={d.departmentId}
                          type="button"
                          onClick={() => toggleDepartment(d.departmentId)}
                          className={`rounded-xl border p-2 text-xs font-medium transition ${
                            selected
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"
                          }`}
                        >
                          {d.departmentName}
                        </button>
                      );
                    })}
                  </div>

                  {errors.departmentIds && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.departmentIds}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingNotice(null);
                }}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={submitting}
                className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {submitting ? "Saving..." : "Save Notice"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotice;
