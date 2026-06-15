import React, { useEffect, useState } from "react";
import { Plus, X, Pencil, Trash2 } from "lucide-react";
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

const ManagePlacement: React.FC = () => {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Placement | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);

  // const [toast, setToast] = useState<{
  //   msg: string;
  //   type: "success" | "error";
  // } | null>(null);

  const [formData, setFormData] = useState({
    studentName: "",
    batch: "",
    placementName: "",
    location: "",
    imageFile: null as File | null,
    departmentIds: [] as number[],
  });

  /* ---------------- TOAST ---------------- */
  // const showToast = (msg: string, type: "success" | "error") => {
  //   setToast({ msg, type });
  //   setTimeout(() => setToast(null), 3000);
  // };

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
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    const data = new FormData();

    if (editing) {
      data.append("PlacementId", editing.placementId.toString());
    }

    data.append("StudentName", formData.studentName);
    data.append("Batch", formData.batch);
    data.append("PlacementName", formData.placementName);
    data.append("Location", formData.location);

    formData.departmentIds.forEach((id) => {
      data.append("DepartmentIds", id.toString());
    });

    // ✅ FIXED IMAGE FIELD (ONLY ONCE)
    // if (formData.imageFile) {
    //   data.append("Image", formData.imageFile);
    // } else if (!editing) {
    //   showToast("Image is required", "error");
    //   return;
    // }

    try {
      setSubmitting(true);

      if (editing) {
        await updatePlacement(data);
      } else {
        await createPlacement(data);
      }

      // showToast("Saved successfully", "success");
      setIsModalOpen(false);
      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      // showToast("Error saving placement", "error");
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
    <div className="min-h-screen bg-slate-50 p-2">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Placements</h1>
          <p className="text-sm text-gray-500">
            Manage student placement records
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={16} /> Add Placement
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {placements.map((p) => (
          <div
            key={p.placementId}
            className="bg-white rounded-xl shadow-sm border overflow-hidden"
          >
            <div
              className="h-40 cursor-pointer"
              onClick={() =>
                setPreview(`${API_BASE_URL}/${p.imagePath}`)
              }
            >
              <img
                src={`${API_BASE_URL}/${p.imagePath}`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-3">
              <h3 className="font-semibold">{p.studentName}</h3>
              <p className="text-xs text-gray-500">{p.placementName}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-xs bg-indigo-100 px-2 py-1 rounded"
                >
                  <Pencil size={12} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(p.placementId)}
                  className="text-xs bg-red-100 px-2 py-1 rounded"
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

            {/* HEADER */}
            <div className="bg-indigo-600 text-white p-4 flex justify-between">
              <h2>{editing ? "Edit Placement" : "Add Placement"}</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X />
              </button>
            </div>

            {/* BODY */}
            <div className="p-4 space-y-3">
              <input
                placeholder="Student Name"
                className="w-full border p-2 rounded"
                value={formData.studentName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    studentName: e.target.value,
                  })
                }
              />

              <input
                placeholder="Batch"
                className="w-full border p-2 rounded"
                value={formData.batch}
                onChange={(e) =>
                  setFormData({ ...formData, batch: e.target.value })
                }
              />

              <input
                placeholder="Placement Name"
                className="w-full border p-2 rounded"
                value={formData.placementName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    placementName: e.target.value,
                  })
                }
              />

              <input
                placeholder="Location"
                className="w-full border p-2 rounded"
                value={formData.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: e.target.value,
                  })
                }
              />

              <input
                type="file"
                className="w-full"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imageFile: e.target.files?.[0] || null,
                  })
                }
              />

              {/* DEPARTMENTS */}
              <div className="flex flex-wrap gap-2">
                {departments.map((d) => (
                  <button
                    key={d.departmentId}
                    onClick={() => toggleDepartment(d.departmentId)}
                    className={`px-2 py-1 rounded text-xs border ${
                      formData.departmentIds.includes(d.departmentId)
                        ? "bg-indigo-600 text-white"
                        : ""
                    }`}
                  >
                    {d.departmentName}
                  </button>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-4 flex justify-end">
              <button
                onClick={handleSave}
                disabled={submitting}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE PREVIEW */}
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