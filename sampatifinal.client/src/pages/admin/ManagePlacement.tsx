import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Filter,
  ChevronDown,
} from "lucide-react";
import Loader from "../../components/common/Loader";

import {
  getAllPlacements,
  createPlacement,
  updatePlacement,
  deletePlacement,
  getPlacementById,
  type Placement,
} from "../../services/placementService";

import { getDepartments, type Department } from "../../services/bannerService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

/* ---------------- TYPES ---------------- */

type Errors = {
  studentName?: string;
  batch?: string;
  placementName?: string;
  location?: string;
  imageFile?: string;
  departmentIds?: string;
};

/* ---------------- VALIDATION ---------------- */

const validate = (form: any, isEdit: boolean): Errors => {
  const errors: Errors = {};

  if (!form.studentName?.trim())
    errors.studentName = "Student name is required";

  if (!form.batch?.trim()) errors.batch = "Batch is required";

  if (!form.placementName?.trim())
    errors.placementName = "Placement name is required";

  if (!form.location?.trim()) errors.location = "Location is required";

  if (!form.departmentIds?.length)
    errors.departmentIds = "Select at least one department";

  if (!isEdit && !form.imageFile) {
    errors.imageFile = "Image is required";
  }

  if (form.imageFile) {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowed.includes(form.imageFile.type)) {
      errors.imageFile = "Only JPG, PNG, WEBP allowed";
    }

    if (form.imageFile.size > 150 * 1024) {
      errors.imageFile = "Image must be 150 KB or less";
    }
  }

  return errors;
};

const ManagePlacement: React.FC = () => {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Placement | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [filterOpen, setFilterOpen] = useState(false);

const [departmentFilter, setDepartmentFilter] = useState<
  number | "all"
>("all");

  const [formData, setFormData] = useState({
    studentName: "",
    batch: "",
    placementName: "",
    location: "",
    imageFile: null as File | null,
    departmentIds: [] as number[],
  });

  /* ---------------- FETCH ---------------- */

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plc, dept] = await Promise.all([
        getAllPlacements(),
        getDepartments(),
      ]);
      setPlacements(plc);
      setDepartments(dept);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  const handleClick = () => setFilterOpen(false);

  if (filterOpen) {
    window.addEventListener("click", handleClick);
  }

  return () => {
    window.removeEventListener("click", handleClick);
  };
}, [filterOpen]);

  /* ---------------- TOGGLE ---------------- */

  const toggleDepartment = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      departmentIds: prev.departmentIds.includes(id)
        ? prev.departmentIds.filter((d) => d !== id)
        : [...prev.departmentIds, id],
    }));
  };

  /* ---------------- EDIT ---------------- */

  const handleEdit = async (p: Placement) => {
    const data = await getPlacementById(p.placementId);

    setEditing(data);

    setFormData({
      studentName: data.studentName,
      batch: data.batch,
      placementName: data.placementName,
      location: data.location,
      imageFile: null,
      departmentIds: data.departments.map((d) => d.departmentId),
    });

    setErrors({});
    setIsModalOpen(true);
  };

  /* ---------------- RESET ---------------- */

  const resetForm = () => {
    setEditing(null);
    setFormData({
      studentName: "",
      batch: "",
      placementName: "",
      location: "",
      imageFile: null,
      departmentIds: [],
    });
    setErrors({});
  };

  /* ---------------- SAVE ---------------- */

  const handleSave = async () => {
    const v = validate(formData, !!editing);
    setErrors(v);

    if (Object.keys(v).length > 0) return;

    const data = new FormData();

    if (editing) {
      data.append("PlacementId", editing.placementId.toString());
    }

    data.append("StudentName", formData.studentName);
    data.append("Batch", formData.batch);
    data.append("PlacementName", formData.placementName);
    data.append("Location", formData.location);

    formData.departmentIds.forEach((id) =>
      data.append("DepartmentIds", id.toString()),
    );

    if (formData.imageFile) {
      data.append("Image", formData.imageFile);
    }

    try {
      setSubmitting(true);

      if (editing) await updatePlacement(data);
      else await createPlacement(data);

      setIsModalOpen(false);
      resetForm();
      fetchData();
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this placement?")) return;
    await deletePlacement(id);
    fetchData();
  };

  if (loading) return <Loader text="Loading Placements..." />;

  return (
    <div className="min-h-screen bg-slate-50 p-1">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manage Placements
          </h1>
          <p className="text-sm text-slate-500">
            Create and manage student placements
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add Placement
          </span>
        </button>
      </div>

      {/* FILTER + COUNT */}
<div className="mb-6 flex items-center justify-between">
  {/* FILTER */}
  <div className="relative">
    <button
      onClick={(e) => {
        e.stopPropagation();
        setFilterOpen(!filterOpen);
      }}
      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
    >
      <Filter size={14} />
      Filter Department
      <ChevronDown size={14} />
    </button>

    {filterOpen && (
      <div className="absolute left-0 mt-2 w-64 bg-white border rounded-xl shadow-lg z-20 overflow-hidden">
        <button
          onClick={() => {
            setDepartmentFilter("all");
            setFilterOpen(false);
          }}
          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
        >
          All Placements
        </button>

        {departments.map((d) => (
          <button
            key={d.departmentId}
            onClick={() => {
              setDepartmentFilter(d.departmentId);
              setFilterOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
          >
            {d.departmentName}
          </button>
        ))}
      </div>
    )}
  </div>

  {/* COUNT */}
  <div className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-medium">
    {
      placements.filter((p) =>
        departmentFilter === "all"
          ? true
          : p.departments?.some(
              (d) => d.departmentId === departmentFilter
            )
      ).length
    }{" "}
    Placements
  </div>
</div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {placements.map((p) => (
          <div
            key={p.placementId}
            className="group bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md transition"
          >
            {/* IMAGE */}
            <div
              className="h-40 cursor-pointer overflow-hidden"
              onClick={() => setPreview(`${API_BASE_URL}/${p.imagePath}`)}
            >
              <img
                src={`${API_BASE_URL}/${p.imagePath}`}
                className="h-full w-full object-contain group-hover:scale-105 transition"
              />
            </div>

            {/* CONTENT */}
            <div className="p-3 text-center flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-slate-800 line-clamp-1">
                {p.studentName}
              </h3>

              <p className="text-xs text-indigo-600 font-medium">
                {p.placementName}
              </p>

              <p className="text-[11px] text-slate-500">{p.batch}</p>

              {/* 🔥 FIXED ACTION BUTTONS */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 flex items-center justify-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium py-1.5 rounded-lg hover:bg-indigo-100 transition"
                >
                  <Pencil size={12} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(p.placementId)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 text-xs font-medium py-1.5 rounded-lg hover:bg-red-100 transition"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl overflow-hidden">
            <div className="bg-indigo-600 text-white px-5 py-3 flex justify-between">
              <h2>{editing ? "Edit Placement" : "Add Placement"}</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X />
              </button>
            </div>

            <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              <input
                placeholder="Student Name"
                className={`w-full p-2 border rounded ${
                  errors.studentName ? "border-red-500" : "border-slate-300"
                }`}
                value={formData.studentName}
                onChange={(e) =>
                  setFormData({ ...formData, studentName: e.target.value })
                }
              />

              {errors.studentName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.studentName}
                </p>
              )}
              <input
                placeholder="Batch"
                className={`w-full p-2 border rounded ${
                  errors.batch ? "border-red-500" : "border-slate-300"
                }`}
                value={formData.batch}
                onChange={(e) =>
                  setFormData({ ...formData, batch: e.target.value })
                }
              />

              {errors.batch && (
                <p className="text-red-500 text-xs mt-1">{errors.batch}</p>
              )}

              <input
                placeholder="Placement Name"
                className={`w-full p-2 border rounded ${
                  errors.placementName ? "border-red-500" : "border-slate-300"
                }`}
                value={formData.placementName}
                onChange={(e) =>
                  setFormData({ ...formData, placementName: e.target.value })
                }
              />

              {errors.placementName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.placementName}
                </p>
              )}

              <input
                placeholder="Location"
                className={`w-full p-2 border rounded ${
                  errors.location ? "border-red-500" : "border-slate-300"
                }`}
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
              )}
              <input
                type="file"
                className={`w-full ${errors.imageFile ? "border-red-500" : ""}`}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imageFile: e.target.files?.[0] || null,
                  })
                }
              />

              {errors.imageFile && (
                <p className="text-red-500 text-xs mt-1">{errors.imageFile}</p>
              )}

              {/* departments */}
              <div className="flex flex-wrap gap-2">
                {departments.map((d) => {
                  const selected = formData.departmentIds.includes(
                    d.departmentId,
                  );

                  return (
                    <button
                      key={d.departmentId}
                      onClick={() => toggleDepartment(d.departmentId)}
                      className={`px-2 py-1 text-xs rounded-full border transition ${
                        selected
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-slate-600"
                      }`}
                    >
                      {d.departmentName}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                onClick={handleSave}
                disabled={submitting}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setPreview(null)}
        >
          <img src={preview} className="max-h-[90vh]" />
        </div>
      )}
    </div>
  );
};

export default ManagePlacement;
