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
  // const [previewImage, setPreviewImage] = useState<string | null>(null);
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

  const [errors, setErrors] = useState({
    heading: "",
    description: "",
    imageFile: "",
  });

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

  const validateField = (
    name: "heading" | "description" | "imageFile",
    value: string | File | null,
    isEditMode: boolean,
  ) => {
    let error = "";

    if (name === "heading") {
      const val = String(value || "").trim();

      if (!val) error = "Heading is required";
      else if (val.length < 3) error = "Heading too short";
      else if (val.length > 200) error = "Heading too long";
    }

    if (name === "description") {
      const val = String(value || "").trim();

      if (!val) error = "Description is required";
      else if (val.length < 20) error = "Minimum 20 characters required";
      else if (val.length > 2000) error = "Description too long";
    }

    if (name === "imageFile") {
      if (!value && !isEditMode) {
        error = "Image is required";
      }

      if (value instanceof File) {
        const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

        if (!allowed.includes(value.type)) {
          error = "Only JPG, PNG, WEBP allowed";
        }

        if (value.size > 2 * 1024 * 1024) {
          error = "Max size is 2MB";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    return error === "";
  };

  const handleSave = async () => {
    const data = new FormData();

    // 1. VALIDATION (single source of truth)
    const isHeadingValid = validateField(
      "heading",
      formData.heading,
      !!editingFacility,
    );

    const isDescriptionValid = validateField(
      "description",
      formData.description,
      !!editingFacility,
    );

    const isImageValid = validateField(
      "imageFile",
      formData.imageFile,
      !!editingFacility,
    );

    // stop if any validation fails
    if (!isHeadingValid || !isDescriptionValid || !isImageValid) return;

    // 2. BUILD FORM DATA
    data.append("FacilityMasterId", String(formData.facilityMasterId));
    data.append("DescriptionHeading", formData.heading.trim());
    data.append("Description", formData.description.trim());

    // only send image if user selected new one
    if (formData.imageFile instanceof File) {
      data.append("Image", formData.imageFile);
    }

    try {
      setSubmitting(true);

      // 3. API CALL
      if (editingFacility) {
        await updateFacility(editingFacility.facilityId, data);
      } else {
        await createFacility(data);
      }

      // 4. SUCCESS STATE
      showToast("Saved successfully", "success");

      // 5. CLEAN RESET (VERY IMPORTANT)
      setIsModalOpen(false);
      setEditingFacility(null);
      setFormData(initialForm);
      // setPreviewImage(null);

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
    // setPreviewImage(f.imageUrl || null);
    setEditingFacility(f);

    setFormData({
      facilityMasterId: f.facilityMasterId || 1,
      heading: f.descriptionHeading || "",
      description: f.description || "",
      imageFile: null,
    });

    setErrors({
      heading: "",
      description: "",
      imageFile: "",
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
                    className={`w-full mt-1 p-3 rounded-xl text-sm outline-none ${
                      errors.heading
                        ? "border border-red-500"
                        : "border focus:border-indigo-500"
                    }`}
                    placeholder="Enter facility heading"
                    value={formData.heading}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData((prev) => ({
                        ...prev,
                        heading: value,
                      }));

                      validateField("heading", value, !!editingFacility);
                    }}
                  />
                  {errors.heading && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.heading}
                    </p>
                  )}
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className={`w-full mt-1 p-3 rounded-xl text-sm outline-none ${
                      errors.description
                        ? "border border-red-500"
                        : "border focus:border-indigo-500"
                    }`}
                    placeholder="Enter facility description"
                    value={formData.description}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData((prev) => ({
                        ...prev,
                        description: value,
                      }));

                      validateField("description", value, !!editingFacility);
                    }}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* FILE UPLOAD */}
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    {editingFacility
                      ? "Enter New Image (Optional)"
                      : "Facility Image"}
                  </label>

                  <label className="mt-2 flex items-center justify-center gap-2 border-2 border-dashed rounded-xl p-4 cursor-pointer hover:bg-indigo-50 hover:border-indigo-400 transition">
                    <span className="text-sm text-slate-600">
                      {formData.imageFile
                        ? formData.imageFile.name
                        : editingFacility
                          ? "Click to replace image"
                          : "Upload Image"}
                    </span>
                    {/* {previewImage && (
                      <div className="mb-3">
                        <img
                          src={previewImage}
                          className="h-40 w-full object-cover rounded-xl border"
                        />
                      </div>
                    )} */}
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;

                        const isValid = validateField(
                          "imageFile",
                          file,
                          !!editingFacility,
                        );
                        if (!isValid) return;

                        setFormData((prev) => ({
                          ...prev,
                          imageFile: file,
                        }));

                        // setPreviewImage(
                        //   file ? URL.createObjectURL(file) : null,
                        // );
                      }}
                    />
                  </label>
                  {editingFacility && !formData.imageFile && (
                    <p className="mt-2 text-xs text-red-500">
                      Please upload new image to make changes
                    </p>
                  )}

                  {errors.imageFile && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.imageFile}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 border-t px-6 py-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  // setPreviewImage(null);
                }}
                className="px-4 py-2 text-sm border rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={submitting}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting && (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}

                {submitting ? "Saving..." : "Save Facility"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
