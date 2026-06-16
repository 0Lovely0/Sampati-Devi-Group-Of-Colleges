import React, { useEffect, useState } from "react";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  Filter,
  ChevronDown,
  Upload,
} from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  type Event,
} from "../../services/eventService";
import { getDepartments, type Department } from "../../services/bannerService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompact] = useState(false);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<number | "all">(
    "all",
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    imageFile: null as File | null,
    departmentIds: [] as number[],
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    eventDate: "",
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
      const [evData, deptData] = await Promise.all([
        getAllEvents(),
        getDepartments(),
      ]);
      setEvents(evData || []);
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
    setFormData((prev) => {
      const updatedIds = prev.departmentIds.includes(id)
        ? prev.departmentIds.filter((d) => d !== id)
        : [...prev.departmentIds, id];

      validateField("departmentIds", updatedIds);

      return {
        ...prev,
        departmentIds: updatedIds,
      };
    });
  };

  const validateField = (
    name: string,
    value: string | number[] | File | null,
  ) => {
    let error = "";

    switch (name) {
      case "title":
        if (!String(value).trim()) {
          error = "Event title is required";
        } else if (String(value).trim().length > 200) {
          error = "Title cannot exceed 200 characters";
        }
        break;

      case "description":
        if (!String(value).trim()) {
          error = "Description is required";
        } else if (String(value).trim().length < 20) {
          error = "Description must be at least 20 characters";
        }
        break;

      case "eventDate":
        if (!String(value).trim()) {
          error = "Event date is required";
        }
        break;

      case "departmentIds":
        if ((value as number[]).length === 0) {
          error = "Please select at least one department";
        }
        break;

      case "imageFile":
        if (!editingEvent && !value) {
          error = "Event image is required";
        }

        if (value instanceof File) {
          const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
          ];

          if (!allowedTypes.includes(value.type)) {
            error = "Only JPG, JPEG, PNG and WEBP files are allowed";
          }

          if (value.size > 10 * 1024) {
            error = "Image size must not exceed 10 KB";
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
      title: "",
      description: "",
      eventDate: "",
      imageFile: "",
      departmentIds: "",
    };

    let hasError = false;

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
      hasError = true;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      hasError = true;
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
      hasError = true;
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required";
      hasError = true;
    }

    if (formData.departmentIds.length === 0) {
      newErrors.departmentIds = "Please select at least one department";
      hasError = true;
    }

    if (!editingEvent && !formData.imageFile) {
      newErrors.imageFile = "Event image is required";
      hasError = true;
    }

    if (formData.imageFile) {
      if (formData.imageFile.size > 10 * 1024) {
        newErrors.imageFile = "Image size must not exceed 10 KB";
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError) return;
    const data = new FormData();

    if (editingEvent) {
      data.append("eventId", editingEvent.eventId.toString());
    }

    data.append("title", formData.title.trim());
    data.append("description", formData.description.trim());
    data.append("eventDate", formData.eventDate);

    formData.departmentIds.forEach((id) =>
      data.append("DepartmentIds", id.toString()),
    );

    if (formData.imageFile) {
      data.append("Image", formData.imageFile);
    }

    try {
      setSubmitting(true);

      editingEvent
        ? await updateEvent(editingEvent.eventId, data)
        : await createEvent(data);

      showToast("Saved successfully", "success");

      setIsModalOpen(false);
      setEditingEvent(null);

      setFormData({
        title: "",
        description: "",
        eventDate: "",
        imageFile: null,
        departmentIds: [],
      });

      fetchData();
    } catch (err) {
      console.error(err);

      showToast("Operation failed. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) return <Loader text="Loading Events..." />;

  return (
    <div className="min-h-screen bg-slate-50 p-1">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl text-white ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
        >
          {toast.msg}
        </div>
      )}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Manage Events
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create, edit and organize website Events
          </p>
        </div>
        <button
          onClick={() => {
            setEditingEvent(null);
            setIsModalOpen(true);
          }}
          className="h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add Events
          </span>
        </button>
      </div>

      {/* Filter  */}
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
            <div className="mb-3 flex items-center justify-between">
              <div className="relative">
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
            </div>
          )}
        </div>

        <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">
          {
            events.filter(
              (e) =>
                departmentFilter === "all" ||
                e.departments?.some((d) => d.departmentId === departmentFilter),
            ).length
          }{" "}
          Events
        </span>
      </div>

      {/* Grid */}
      <div
        className={`grid gap-3 ${
          isCompact
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"
            : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {events
          .filter(
            (e) =>
              departmentFilter === "all" ||
              e.departments?.some((d) => d.departmentId === departmentFilter),
          )
          .map((e) => (
            <div
              key={e.eventId}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGE */}
              <div
                className="relative cursor-pointer overflow-hidden"
                onClick={() => setPreviewFile(`${API_BASE_URL}/${e.imagePath}`)}
              >
                <img
                  src={`${API_BASE_URL}/${e.imagePath}`}
                  alt={e.title}
                  className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                    isCompact ? "h-24" : "h-32"
                  }`}
                />

                {/* DATE BADGE */}
                <div className="absolute right-2 top-2">
                  <span className="rounded-md bg-indigo-100 px-2 py-1 text-[10px] font-semibold text-indigo-700">
                    {new Date(e.eventDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h3 className="line-clamp-2 text-xs font-semibold text-slate-800">
                  {e.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-[11px] text-slate-500">
                  {e.description}
                </p>

                {/* DEPARTMENTS */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {e.departments?.slice(0, 3).map((dept) => (
                    <span
                      key={dept.departmentId}
                      className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-600"
                    >
                      {dept.departmentName}
                    </span>
                  ))}

                  {e.departments?.length > 3 && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-600">
                      +{e.departments.length - 3}
                    </span>
                  )}
                </div>

                {/* ACTIONS (BANNER STYLE - ALWAYS VISIBLE) */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingEvent(e);
                      setFormData({
                        title: e.title,
                        description: e.description,
                        eventDate: e.eventDate.split("T")[0],
                        imageFile: null,
                        departmentIds: e.departments.map((d) => d.departmentId),
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
                      if (confirm("Delete this event?")) {
                        await deleteEvent(e.eventId);
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-800 px-5 py-4 text-white">
              <div>
                <h2 className="text-lg font-bold">
                  {editingEvent ? "Edit Event" : "Create Event"}
                </h2>
                <p className="text-xs text-indigo-100">
                  Manage event information and departments
                </p>
              </div>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingEvent(null);
                }}
                className="rounded-xl bg-white/10 p-2 transition hover:bg-white/20"
              >
                <X size={16} />
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

            {/* Body */}
            <div className="max-h-[75vh] overflow-y-auto p-5">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Title */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Event Title
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData({
                        ...formData,
                        title: value,
                      });

                      validateField("title", value);
                    }}
                    placeholder="Enter event title"
                    className={`w-full rounded-xl px-3 py-2 text-sm outline-none transition ${
                      errors.title
                        ? "border border-red-500"
                        : "border border-slate-200 focus:border-indigo-500"
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData({
                        ...formData,
                        eventDate: value,
                      });

                      validateField("eventDate", value);
                    }}
                    className={`w-full rounded-xl px-3 py-2 text-sm outline-none transition ${
                      errors.eventDate
                        ? "border border-red-500"
                        : "border border-slate-200 focus:border-indigo-500"
                    }`}
                  />
                  {errors.eventDate && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.eventDate}
                    </p>
                  )}
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Event Image
                  </label>

                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-5 transition hover:border-indigo-400 hover:bg-indigo-50">
                    <Upload size={18} />
                    <span className="text-sm text-slate-600">
                      {formData.imageFile
                        ? formData.imageFile.name
                        : "Upload Event Image (Max 10 KB)"}
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;

                        validateField("imageFile", file);

                        if (!file) return;

                        const allowedTypes = [
                          "image/jpeg",
                          "image/jpg",
                          "image/png",
                          "image/webp",
                        ];

                        if (!allowedTypes.includes(file.type)) {
                          return;
                        }

                        if (file.size > 10 * 1024) {
                          return;
                        }

                        setFormData({
                          ...formData,
                          imageFile: file,
                        });
                      }}
                    />
                  </label>
                  {errors.imageFile && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.imageFile}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData({
                        ...formData,
                        description: value,
                      });

                      validateField("description", value);
                    }}
                    placeholder="Enter event description"
                    className={`w-full rounded-xl px-3 py-2 text-sm outline-none transition ${
                      errors.description
                        ? "border border-red-500"
                        : "border border-slate-200 focus:border-indigo-500"
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Departments */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Departments
                  </label>

                  <div
                    className={`grid grid-cols-2 gap-2 rounded-xl p-2 ${
                      errors.departmentIds
                        ? "border border-red-500"
                        : "border border-transparent"
                    } md:grid-cols-3`}
                  >
                    {departments.map((dept) => {
                      const selected = formData.departmentIds.includes(
                        dept.departmentId,
                      );

                      return (
                        <button
                          key={dept.departmentId}
                          type="button"
                          onClick={() => toggleDepartment(dept.departmentId)}
                          className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                            selected
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"
                          }`}
                        >
                          {dept.departmentName}
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
                  setEditingEvent(null);
                }}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={submitting}
                className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
