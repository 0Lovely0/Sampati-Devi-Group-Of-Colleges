import React, { useEffect, useState } from "react";
import { Plus, X, Pencil, Trash2 } from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
  type Facility,
} from "../../services/facilitiesService";

const BASE_URL = "https://localhost:7197";

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
    <div className="min-h-screen bg-slate-50 p-8">
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* TITLE SECTION */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Manage Facilities
          </h1>

          <p className="text-sm text-slate-500 mt-1">
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
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          Add Facility
        </button>
      </div>

      {/* OPTIONAL: STATS STRIP (HIGH IMPACT UI UPGRADE) */}
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-white px-4 py-2 rounded-xl border text-xs text-slate-600 shadow-sm">
          Total Facilities:{" "}
          <span className="font-semibold">{facilities.length}</span>
        </div>
      </div>

      {/* Grid section */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {facilities.map((f) => (
          <div
            key={f.facilityId}
            className="group bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* IMAGE SECTION */}
            <div className="relative overflow-hidden">
              <img
                src={
                  f.imageUrl?.startsWith("http")
                    ? f.imageUrl
                    : `${BASE_URL}/${f.imageUrl || ""}`
                }
                alt="Facility"
                className="w-full h-32 object-cover transition duration-500 group-hover:scale-105"
              />

              {/* HOVER OVERLAY ACTIONS */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => openEdit(f)}
                  className="bg-white p-2 rounded-lg text-indigo-600 hover:scale-105 transition"
                >
                  <Pencil size={14} />
                </button>

                <button
                  onClick={() => handleDelete(f.facilityId)}
                  className="bg-white p-2 rounded-lg text-red-600 hover:scale-105 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-3">
              <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">
                {f.descriptionHeading}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                {f.description}
              </p>
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
