import React, { useEffect, useState } from "react";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  Filter,
  ChevronDown,
  Eye,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
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

const BASE_URL = "https://localhost:7197/";

const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
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
    setFormData((prev) => ({
      ...prev,
      departmentIds: prev.departmentIds.includes(id)
        ? prev.departmentIds.filter((d) => d !== id)
        : [...prev.departmentIds, id],
    }));
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      return showToast("Event title required", "error");
    }

    if (!formData.description.trim()) {
      return showToast("Description required", "error");
    }

    if (!formData.eventDate) {
      return showToast("Event date required", "error");
    }

    if (formData.departmentIds.length === 0) {
      return showToast("Select at least one department", "error");
    }

    if (formData.imageFile && formData.imageFile.size > 2 * 1024 * 1024) {
      return showToast("Image must be 2 MB or less", "error");
    }

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
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl text-white ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Manage Events
        </h1>
        <button
          onClick={() => {
            setEditingEvent(null);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Event
        </button>
      </div>

      {/* Filter  */}
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
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div
                className="relative cursor-pointer overflow-hidden"
                onClick={() => setPreviewFile(`${BASE_URL}${e.imagePath}`)}
              >
                <img
                  src={`${BASE_URL}${e.imagePath}`}
                  alt={e.title}
                  className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                    isCompact ? "h-24" : "h-32"
                  }`}
                />

                <div className="absolute top-2 right-2">
                  <span className="rounded-md bg-indigo-100 px-2 py-1 text-[10px] font-semibold text-indigo-700">
                    {new Date(e.eventDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="line-clamp-2 text-xs font-semibold text-slate-800">
                  {e.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-[11px] text-slate-500">
                  {e.description}
                </p>

                {/* Departments */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {e.departments?.slice(0, 3).map((dept) => (
                    <span
                      key={dept.departmentId}
                      className="rounded-md bg-slate-100 px-2 py-1 text-[9px] text-slate-600"
                    >
                      {dept.departmentName}
                    </span>
                  ))}

                  {e.departments?.length > 3 && (
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] text-slate-600">
                      +{e.departments.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-3 flex items-center gap-2">
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
                    className="rounded-lg bg-indigo-50 p-2 text-indigo-600 transition hover:bg-indigo-100"
                  >
                    <Pencil size={13} />
                  </button>

                  <button
                    onClick={async () => {
                      if (confirm("Delete this event?")) {
                        await deleteEvent(e.eventId);
                        fetchData();
                      }
                    }}
                    className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={13} />
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter event title"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        eventDate: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500"
                  />
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
                        : "Upload Event Image (Max 2 MB)"}
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;

                        if (file.size > 2 * 1024 * 1024) {
                          showToast("Image must be 2 MB or less", "error");
                          e.target.value = "";
                          return;
                        }

                        setFormData({
                          ...formData,
                          imageFile: file,
                        });
                      }}
                    />
                  </label>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter event description"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500"
                  />
                </div>

                {/* Departments */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Departments
                  </label>

                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
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
