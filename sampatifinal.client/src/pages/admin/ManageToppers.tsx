import React, { useEffect, useState } from "react";
import { Plus, X, Pencil, Trash2 } from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllToppers,
  createTopper,
  updateTopper,
  deleteTopper,
  type Topper,
} from "../../services/toppersService";
import { getDepartments, type Department } from "../../services/bannerService";

const BASE_URL = "https://localhost:7197";

export const ManageToppers: React.FC = () => {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopper, setEditingTopper] = useState<Topper | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const initialForm = {
    name: "",
    achievement: "",
    rank: "",
    degree: "",
    address: "",
    fatherName: "",
    motherName: "",
    collegeName: "",
    phoneNumber: "",
    schoolDetails: "",
    imageFile: null as File | null,
    departmentIds: [] as number[],
  };

  const [formData, setFormData] = useState(initialForm);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [topData, deptData] = await Promise.all([
        getAllToppers(),
        getDepartments(),
      ]);
      setToppers(topData || []);
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

  const buildFormData = () => {
  const data = new FormData();

  if (editingTopper) {
    data.append("TopperId", String(editingTopper.topperId));
  }

  const fields = {
    Name: formData.name,
    Achievement: formData.achievement,
    Rank: formData.rank,
    Degree: formData.degree,
    Address: formData.address,
    FatherName: formData.fatherName,
    MotherName: formData.motherName,
    CollegeName: formData.collegeName,
    PhoneNumber: formData.phoneNumber,
    SchoolDetails: formData.schoolDetails,
  };

  Object.entries(fields).forEach(([key, value]) => {
    if (value?.toString().trim()) {
      data.append(key, value.toString());
    }
  });

  formData.departmentIds.forEach((id) => {
    data.append("DepartmentIds", String(id));
  });

  if (formData.imageFile) {
    data.append("Image", formData.imageFile);
  }

  return data;
};

 const handleSave = async () => {
  try {
    setSubmitting(true);

    const data = buildFormData();

    const res = editingTopper
      ? await updateTopper(data)
      : await createTopper(data);

    if (!res) throw new Error("API failed");

    showToast("Saved successfully", "success");

    setIsModalOpen(false);
    setEditingTopper(null);
    setFormData(initialForm);

    fetchData();
  } catch (err) {
    console.error("Save Error:", err);
    showToast("Operation failed", "error");
  } finally {
    setSubmitting(false);
  }
};

 const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this topper?"
  );

  if (!confirmed) return;

  try {
    setSubmitting(true);

    await deleteTopper(id);

    showToast("Deleted successfully", "success");

    setToppers((prev) => prev.filter((t) => t.topperId !== id));
  } catch (err) {
    console.error("Delete Error:", err);
    showToast("Delete failed", "error");
  } finally {
    setSubmitting(false);
  }
};

 const openEdit = (t: Topper) => {
  console.log("TOPPER OBJECT:", t);
  setEditingTopper(t);
  setIsModalOpen(true);

  setTimeout(() => {
    setFormData({
      name: t.name || "",
      achievement: t.achievement || "",
      rank: String(t.rank || ""),
      degree: t.degree || "",
      address: t.address || "",
      fatherName: t.fatherName || "",
      motherName: t.motherName || "",
      collegeName: t.collegeName || "",
      phoneNumber: t.phoneNumber || "",
      schoolDetails: t.schoolDetails || "",
      imageFile: null,
      departmentIds: t.departments?.map((d) => d.departmentId) || [],
    });
  }, 0);
};

  if (loading) return <Loader text="Loading..." />;

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
          Manage Toppers
        </h1>
        <button
          onClick={() => {
            setEditingTopper(null);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Topper
        </button>
      </div>

      {/* Grid section */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {toppers.map((t) => (
          <div
            key={t.topperId}
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* IMAGE SECTION */}
            <div className="relative overflow-hidden">
              <img
                src={
                  t.imagePath.startsWith("http")
                    ? t.imagePath
                    : `${BASE_URL}/${t.imagePath}`
                }
                alt={t.name}
                className="w-full h-32 object-contain transition duration-500 group-hover:scale-105"
              />

              {/* RANK BADGE */}
              <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-md">
                Rank #{t.rank}
              </div>

              {/* HOVER ACTION OVERLAY */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => openEdit(t)}
                  className="bg-white p-2 rounded-lg text-indigo-600 hover:scale-105 transition"
                >
                  <Pencil size={14} />
                </button>

                <button
                  onClick={() => handleDelete(t.topperId)}
                  className="bg-white p-2 rounded-lg text-red-600 hover:scale-105 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-3">
              <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">
                {t.name}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                {t.achievement}
              </p>

              {/* EXTRA INFO STRIP (OPTIONAL NICE TOUCH) */}
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                <span>{t.degree}</span>
                <span>{t.collegeName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-4 text-white">
              <div>
                <h2 className="text-lg font-bold">
                  {editingTopper ? "Edit Topper" : "Add Topper"}
                </h2>
                <p className="text-xs text-indigo-100">
                  Fill topper details carefully
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
            <div className="max-h-[75vh] overflow-y-auto p-6 space-y-4">
              {/* GRID FORM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="p-3 border rounded-xl text-sm focus:border-indigo-500 outline-none"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  className="p-3 border rounded-xl text-sm"
                  placeholder="Achievement"
                  value={formData.achievement}
                  onChange={(e) =>
                    setFormData({ ...formData, achievement: e.target.value })
                  }
                />

                <input
                  className="p-3 border rounded-xl text-sm"
                  placeholder="Rank"
                  value={formData.rank}
                  onChange={(e) =>
                    setFormData({ ...formData, rank: e.target.value })
                  }
                />

                <input
                  className="p-3 border rounded-xl text-sm"
                  placeholder="Degree"
                  value={formData.degree}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                />

                <input
                  className="p-3 border rounded-xl text-sm"
                  placeholder="Father Name"
                  value={formData.fatherName}
                  onChange={(e) =>
                    setFormData({ ...formData, fatherName: e.target.value })
                  }
                />

                <input
                  className="p-3 border rounded-xl text-sm"
                  placeholder="Mother Name"
                  value={formData.motherName}
                  onChange={(e) =>
                    setFormData({ ...formData, motherName: e.target.value })
                  }
                />

                <input
                  className="p-3 border rounded-xl text-sm"
                  placeholder="College Name"
                  value={formData.collegeName}
                  onChange={(e) =>
                    setFormData({ ...formData, collegeName: e.target.value })
                  }
                />

                <input
                  className="p-3 border rounded-xl text-sm"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </div>

              {/* FULL WIDTH */}
              <input
                className="w-full p-3 border rounded-xl text-sm"
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />

              <textarea
                className="w-full p-3 border rounded-xl text-sm"
                rows={3}
                placeholder="School Details"
                value={formData.schoolDetails}
                onChange={(e) =>
                  setFormData({ ...formData, schoolDetails: e.target.value })
                }
              />

              {/* DEPARTMENTS (UPGRADED CHIPS UI) */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Select Departments
                </label>

                <div className="mt-2 flex flex-wrap gap-2">
                  {departments.map((dept) => {
                    const selected = formData.departmentIds.includes(
                      dept.departmentId,
                    );

                    return (
                      <button
                        key={dept.departmentId}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            departmentIds: selected
                              ? prev.departmentIds.filter(
                                  (id) => id !== dept.departmentId,
                                )
                              : [...prev.departmentIds, dept.departmentId],
                          }));
                        }}
                        className={`px-3 py-1 text-xs rounded-full border transition ${
                          selected
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                        }`}
                      >
                        {dept.departmentName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FILE UPLOAD (MODERN STYLE) */}
              <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-xl p-4 cursor-pointer hover:bg-indigo-50 hover:border-indigo-400 transition">
                <span className="text-sm text-slate-600">
                  {formData.imageFile
                    ? formData.imageFile.name
                    : "Upload Topper Image"}
                </span>

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      imageFile: e.target.files?.[0] || null,
                    })
                  }
                />
              </label>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 border-t px-6 py-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm border rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={submitting}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save Topper"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
