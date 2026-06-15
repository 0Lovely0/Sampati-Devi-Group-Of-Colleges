import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Filter, ChevronDown } from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllToppers,
  createTopper,
  updateTopper,
  deleteTopper,
  type Topper,
} from "../../services/toppersService";
import { getDepartments, type Department } from "../../services/bannerService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

/* ---------------- VALIDATION ---------------- */

type Errors = Partial<Record<string, string>>;

const validate = (form: any, isEdit: boolean): Errors => {
  const errors: Errors = {};

  if (!form.name?.trim()) errors.name = "Name is required";
  if (!form.yearSemester?.trim())
    errors.yearSemester = "Year/Semester is required";
  if (!form.collegeRank?.trim())
    errors.collegeRank = "College rank is required";
  if (!form.universityRank?.trim())
    errors.universityRank = "University rank is required";
  if (!form.batch?.trim()) errors.batch = "Batch is required";
  if (!form.percentile?.trim()) errors.percentile = "Percentile is required";

  if (!form.departmentIds?.length)
    errors.departmentIds = "Select at least one department";

  // 🔥 FIXED LOGIC
  if (!isEdit && !form.imageFile) {
    errors.imageFile = "Image is required";
  }

  // 👉 NEW RULE (YOUR REQUIREMENT)
  if (isEdit && form.imageFile === null) {
    errors.imageFile = "Please upload new image";
  }

  return errors;
};

/* ---------------- COMPONENT ---------------- */

export const ManageToppers: React.FC = () => {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopper, setEditingTopper] = useState<Topper | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const [filterOpen, setFilterOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState<number | "all">(
    "all",
  );

  const initialForm = {
    topperId: 0,
    name: "",
    yearSemester: "",
    collegeRank: "",
    universityRank: "",
    batch: "",
    percentile: "",
    imageFile: null as File | null,
    departmentIds: [] as number[],
  };

  const [formData, setFormData] = useState(initialForm);

  /* ---------------- FETCH ---------------- */

  const fetchData = async () => {
    try {
      setLoading(true);
      const [topData, deptData] = await Promise.all([
        getAllToppers(),
        getDepartments(),
      ]);
      setToppers(topData || []);
      setDepartments(deptData || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* close filter */
  useEffect(() => {
    const handleClick = () => setFilterOpen(false);
    if (filterOpen) window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [filterOpen]);

  /* ---------------- FORM ---------------- */

  const buildFormData = () => {
    const data = new FormData();

    if (editingTopper) {
      data.append("TopperId", String(editingTopper.topperId));
    }

    data.append("Name", formData.name);
    data.append("YearSemester", formData.yearSemester);
    data.append("CollegeRank", formData.collegeRank);
    data.append("UniversityRank", formData.universityRank);
    data.append("Batch", formData.batch);
    data.append("Percentile", formData.percentile);

    formData.departmentIds.forEach((id) =>
      data.append("DepartmentIds", String(id)),
    );

    if (formData.imageFile) {
      data.append("Image", formData.imageFile);
    }

    return data;
  };

  /* ---------------- SAVE ---------------- */

  const handleSave = async () => {
    const v = validate(formData, !!editingTopper);
    setErrors(v);

    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }

    setSubmitting(true);

    try {
      const data = buildFormData();

      const res = editingTopper
        ? await updateTopper(data)
        : await createTopper(data);

      if (!res) throw new Error();

      setIsModalOpen(false);
      setEditingTopper(null);
      setFormData(initialForm);
      setErrors({});
      fetchData();
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id: number) => {
    if (!confirm("Delete topper?")) return;
    await deleteTopper(id);
    setToppers((p) => p.filter((t) => t.topperId !== id));
  };

  /* ---------------- EDIT ---------------- */

  const openEdit = (t: Topper) => {
    setEditingTopper(t);
    setIsModalOpen(true);

    setFormData({
      topperId: t.topperId,
      name: t.name || "",
      yearSemester: t.yearSemester || "",
      collegeRank: t.collegeRank || "",
      universityRank: t.universityRank || "",
      batch: t.batch || "",
      percentile: t.percentile || "",
      imageFile: null,
      departmentIds: t.departments?.map((d) => d.departmentId) || [],
    });

    setErrors({});
  };

  const inputClass = (key: keyof Errors) =>
    `w-full mt-1 p-3 border rounded-xl text-sm outline-none transition ${
      errors[key]
        ? "border-red-500 focus:border-red-500"
        : "border-slate-200 focus:border-indigo-500"
    }`;

  if (loading) return <Loader text="Loading..." />;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-slate-50 p-1">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* TITLE */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Manage Toppers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage toppers
          </p>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => {
            setEditingTopper(null);
            setFormData({
              ...initialForm,
              imageFile: null, // ✅ yaha reset
            });
            setFormData(initialForm);
            setIsModalOpen(true);
          }}
          className="h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add Topper
          </span>
        </button>
      </div>

      {/* FILTER + COUNT */}
      <div className="mb-6 flex items-center justify-between">
        {/* FILTER BUTTON */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Filter size={14} />
            Filter Department
            <ChevronDown size={14} />
          </button>

          {/* DROPDOWN */}
          {filterOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white border rounded-xl shadow-lg z-20 overflow-hidden">
              <button
                onClick={() => {
                  setDepartmentFilter("all");
                  setFilterOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
              >
                All Toppers
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

        {/* COUNT BADGE */}
        <div className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-medium">
          {
            toppers.filter((t) =>
              departmentFilter === "all"
                ? true
                : t.departments?.some(
                    (d) => d.departmentId === departmentFilter,
                  ),
            ).length
          }{" "}
          Toppers
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {toppers
          .filter((t) =>
            departmentFilter === "all"
              ? true
              : t.departments?.some((d) => d.departmentId === departmentFilter),
          )
          .map((t) => (
            <div
              key={t.topperId}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* IMAGE */}
              <div className="flex justify-center pt-4">
                <img
                  src={
                    t.imagePath?.startsWith("http")
                      ? t.imagePath
                      : `${API_BASE_URL}/${t.imagePath || ""}`
                  }
                  className="h-24 w-20 rounded-lg border border-slate-100 object-cover shadow-sm transition group-hover:scale-105"
                  alt="Topper"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>

              {/* CONTENT */}
              <div className="space-y-0.5 p-2 text-center">
                <h3 className="text-xs font-semibold leading-tight text-slate-800">
                  {t.name}
                </h3>

                <p className="text-[11px] font-medium text-indigo-600">
                  {t.collegeRank} / {t.universityRank}
                </p>

                <p className="text-[10px] uppercase tracking-wide text-slate-500">
                  {t.yearSemester}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-center gap-2 px-2 pb-3">
                <button
                  onClick={() => openEdit(t)}
                  className="flex items-center gap-1 rounded-lg bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 transition"
                >
                  <Pencil size={12} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(t.topperId)}
                  className="flex items-center gap-1 rounded-lg bg-red-100 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 transition"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between">
              <h2>{editingTopper ? "Edit Topper" : "Add Topper"}</h2>
              <button onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <input
                className={inputClass("name")}
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}

              <input
                className={inputClass("yearSemester")}
                placeholder="Year/Semester"
                value={formData.yearSemester}
                onChange={(e) =>
                  setFormData({ ...formData, yearSemester: e.target.value })
                }
              />
              {errors.yearSemester && (
                <p className="text-red-500 text-xs">{errors.yearSemester}</p>
              )}

              <input
                className={inputClass("collegeRank")}
                placeholder="College Rank"
                value={formData.collegeRank}
                onChange={(e) =>
                  setFormData({ ...formData, collegeRank: e.target.value })
                }
              />
              {errors.collegeRank && (
                <p className="text-red-500 text-xs">{errors.collegeRank}</p>
              )}

              <input
                className={inputClass("universityRank")}
                placeholder="University Rank"
                value={formData.universityRank}
                onChange={(e) =>
                  setFormData({ ...formData, universityRank: e.target.value })
                }
              />
              {errors.universityRank && (
                <p className="text-red-500 text-xs">{errors.universityRank}</p>
              )}

              <input
                className={inputClass("batch")}
                placeholder="Batch"
                value={formData.batch}
                onChange={(e) =>
                  setFormData({ ...formData, batch: e.target.value })
                }
              />
              {errors.batch && (
                <p className="text-red-500 text-xs">{errors.batch}</p>
              )}

              <input
                className={inputClass("percentile")}
                placeholder="Percentile"
                value={formData.percentile}
                onChange={(e) =>
                  setFormData({ ...formData, percentile: e.target.value })
                }
              />
              {errors.percentile && (
                <p className="text-red-500 text-xs">{errors.percentile}</p>
              )}

              {/* departments */}
              <div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {departments.map((d) => {
                    const selected = formData.departmentIds.includes(
                      d.departmentId,
                    );

                    return (
                      <button
                        key={d.departmentId}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            departmentIds: selected
                              ? prev.departmentIds.filter(
                                  (id) => id !== d.departmentId,
                                )
                              : [...prev.departmentIds, d.departmentId],
                          }))
                        }
                        className={`px-3 py-1 text-xs rounded-full border ${
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

                {errors.departmentIds && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.departmentIds}
                  </p>
                )}
              </div>

              {/* IMAGE */}
              <input
                key={editingTopper?.topperId || "new"} // 🔥 IMPORTANT FIX
                type="file"
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
            </div>

            <div className="flex justify-end gap-3 p-4 border-t">
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button
                onClick={handleSave}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
              >
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
