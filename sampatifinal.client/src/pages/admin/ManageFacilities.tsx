import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
  type Facility,
} from "../../services/facilitiesService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

export const ManageFacilities: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const initialForm = {
    facilityMasterId: 1, // Default or fetch from a Master API
    heading: "",
    description: "",
    imageFile: null as File | null,
  };

  const [formData, setFormData] = useState(initialForm);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllFacilities();
      setFacilities(data || []);
    } catch {
      showToast("Failed to load facilities", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const data = new FormData();

    data.append("FacilityMasterId", String(formData.facilityMasterId));

    if (formData.heading?.trim()) {
      data.append("DescriptionHeading", formData.heading.trim());
    }

    if (formData.description?.trim()) {
      data.append("Description", formData.description.trim());
    }

    if (formData.imageFile) {
      data.append("Image", formData.imageFile);
    }

    try {
      setSubmitting(true);

      if (editingFacility) {
        await updateFacility(editingFacility.facilityId, data);
      } else {
        await createFacility(data);
      }

      showToast("Saved successfully", "success");

      // CLEAN RESET (IMPORTANT FIX)
      setIsModalOpen(false);
      setEditingFacility(null);
      setFormData(initialForm);

      fetchData();
    } catch (err) {
      console.error(err);
      showToast("Operation failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const ok = window.confirm("Delete this facility?");
    if (!ok) return;

    try {
      await deleteFacility(id);
      showToast("Deleted successfully", "success");
      fetchData();
    } catch (err) {
      console.error(err);
      showToast("Delete failed", "error");
    }
  };

  const openEdit = (f: Facility) => {
    setEditingFacility(f);

    setFormData({
      facilityMasterId: f.facilityMasterId || 1,
      heading: f.descriptionHeading || "",
      description: f.description || "",
      imageFile: null,
    });

    setIsModalOpen(true);
  };

  if (loading) return <Loader text="Loading..." />;

  return (
    <div className="min-h-screen bg-slate-50 p-1">
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

      {/* HEADER BAR */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Manage Facilities
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create, update and manage facility information
          </p>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => {
            setEditingFacility(null);
            setFormData(initialForm);
            setIsModalOpen(true);
          }}
          className="h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add Facility
          </span>
        </button>
      </div>

      {/* OPTIONAL: STATS STRIP (HIGH IMPACT UI UPGRADE) */}
      <div className="mb-6 flex items-center justify-end gap-3">
        <div className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg">
          Total Facilities:{" "}
          <span className="font-semibold">{facilities.length}</span>
        </div>
      </div>

      {/* Grid section */}
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
  {facilities.map((f) => (
    <div
      key={f.facilityId}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={
            f.imageUrl?.startsWith("http")
              ? f.imageUrl
              : `${API_BASE_URL}/${f.imageUrl || ""}`
          }
          alt="Facility"
          className="h-32 w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-slate-800">
          {f.descriptionHeading}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs text-slate-500">
          {f.description}
        </p>

        {/* ALWAYS VISIBLE ACTIONS (LIKE BANNER STYLE) */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => openEdit(f)}
            className="flex items-center justify-center gap-1 rounded-lg bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 transition"
          >
            <Pencil size={13} />
            Edit
          </button>

          <button
            onClick={() => handleDelete(f.facilityId)}
            className="flex items-center justify-center gap-1 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 transition"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-4">
              <div>
                <h2 className="text-lg font-bold">
                  {editingFacility ? "Edit Facility" : "Add Facility"}
                </h2>
                <p className="text-xs text-indigo-100">
                  Manage facility details
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* FORM GRID */}
              <div className="grid grid-cols-1 gap-4">
                {/* HEADING */}
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    Heading
                  </label>
                  <input
                    className="w-full mt-1 p-3 border rounded-xl text-sm focus:border-indigo-500 outline-none"
                    placeholder="Enter facility heading"
                    value={formData.heading}
                    onChange={(e) =>
                      setFormData({ ...formData, heading: e.target.value })
                    }
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full mt-1 p-3 border rounded-xl text-sm focus:border-indigo-500 outline-none"
                    placeholder="Enter facility description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {/* FILE UPLOAD */}
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    Facility Image
                  </label>

                  <label className="mt-2 flex items-center justify-center gap-2 border-2 border-dashed rounded-xl p-4 cursor-pointer hover:bg-indigo-50 hover:border-indigo-400 transition">
                    <span className="text-sm text-slate-600">
                      {formData.imageFile
                        ? formData.imageFile.name
                        : "Upload Image"}
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
              </div>
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
                {submitting ? "Saving..." : "Save Facility"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
