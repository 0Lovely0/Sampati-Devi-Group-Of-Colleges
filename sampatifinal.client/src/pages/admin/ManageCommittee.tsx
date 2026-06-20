import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ChevronDown, Filter } from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  getAllCommitteeMembers,
  createCommitteeMember,
  updateCommitteeMember,
  deleteCommitteeMember,
  getCommitteeDropdown,
  getPositionDropdown,
  type CommitteeMember,
  type DropdownDto,
} from "../../services/committeeService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

export const ManageCommittee: React.FC = () => {
  const [committeeFilter, setCommitteeFilter] = useState<number | "all">("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [committees, setCommittees] = useState<DropdownDto[]>([]);
  const [positions, setPositions] = useState<DropdownDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

 const [formData, setFormData] = useState<{
  committeeMasterId: number;
  positionMasterId: number;
  memberName: string;
  displayOrder: number;
  imageFile: File | null;
}>({
  committeeMasterId: 0,
  positionMasterId: 0,
  memberName: "",
  displayOrder: 1,
  imageFile: null,
});

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [membersData, comms, pos] = await Promise.all([
        getAllCommitteeMembers(),
        getCommitteeDropdown(),
        getPositionDropdown(),
      ]);
      setMembers(membersData);
      setCommittees(comms);
      setPositions(pos);
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  const [errors, setErrors] = useState({
    committeeMasterId: "",
    positionMasterId: "",
    memberName: "",
    imageFile: "",
  });

  const validateForm = () => {
    const newErrors = {
      committeeMasterId: "",
      positionMasterId: "",
      memberName: "",
      imageFile: "",
    };

    let isValid = true;

    if (!formData.committeeMasterId) {
      newErrors.committeeMasterId = "Committee is required";
      isValid = false;
    }

    if (!formData.positionMasterId) {
      newErrors.positionMasterId = "Position is required";
      isValid = false;
    }

    if (!formData.memberName.trim()) {
      newErrors.memberName = "Member name is required";
      isValid = false;
    }

    // Image Required
    if (!formData.imageFile && !editingId) {
      newErrors.imageFile = "Image is required";
      isValid = false;
    }

    // Max 10 KB validation
    if (formData.imageFile) {
      const maxSize = 150 * 1024; // 10 KB

      if (formData.imageFile.size > maxSize) {
        newErrors.imageFile = "Image size must be 150 KB or less";
        isValid = false;
      }
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    const data = new FormData();

    // Always append these fields
    data.append("CommitteeMasterId", formData.committeeMasterId.toString());
    data.append("PositionMasterId", formData.positionMasterId.toString());
    data.append("MemberName", formData.memberName);
    data.append("DisplayOrder", formData.displayOrder.toString());
    data.append("IsActive", "true"); // Required by your Update DTO

    if (formData.imageFile) {
      data.append("MemberImage", formData.imageFile);
    }

    try {
      if (editingId) {
        data.append("CommitteeMemberId", editingId.toString());
        await updateCommitteeMember(editingId, data);
      } else {
        await createCommitteeMember(data);
      }
      setIsModalOpen(false);
      fetchInitialData(); // Refresh list
    } catch (error: any) {
      console.error("Save Error:", error.response?.data);
      alert("Failed to save. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = (member?: CommitteeMember) => {
    if (member) {
      setEditingId(member.committeeMemberId);
      setFormData({
        committeeMasterId: member.committeeMasterId,
        positionMasterId: member.positionMasterId,
        memberName: member.memberName,
        displayOrder: member.displayOrder,
        imageFile: null,
      });
    } else {
      setEditingId(null);
     setFormData({
  committeeMasterId: 0,
  positionMasterId: 0,
  memberName: "",
  displayOrder: 1,
  imageFile: null,
});
    }
    setErrors({
  committeeMasterId: "",
  positionMasterId: "",
  memberName: "",
  imageFile: "",
});
    setIsModalOpen(true);
  };

  if (loading) return <Loader text="Loading..." />;

  return (
    <div className="p-1 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* TITLE */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Manage Committee
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage committee members
          </p>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => openModal()}
          className="h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add Member
          </span>
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        {/* FILTER BUTTON */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Filter size={14} />
            Filter Committee
            <ChevronDown size={14} />
          </button>

          {/* DROPDOWN */}
          {filterOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white border rounded-xl shadow-lg z-20 overflow-hidden">
              <button
                onClick={() => {
                  setCommitteeFilter("all");
                  setFilterOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
              >
                All Committees
              </button>

              {committees.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    setCommitteeFilter(c.value);
                    setFilterOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* COUNT BADGE */}
        <div className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-medium">
          {
            members.filter((m) =>
              committeeFilter === "all"
                ? true
                : m.committeeMasterId === committeeFilter,
            ).length
          }{" "}
          Members
        </div>
      </div>

      {/* Grid section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {members
          .filter((m) =>
            committeeFilter === "all"
              ? true
              : m.committeeMasterId === committeeFilter,
          )
          .map((m) => (
            <div
              key={m.committeeMemberId}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* IMAGE */}
              <div className="flex justify-center pt-4">
                <img
                  src={
                    m.memberImage?.startsWith("http")
                      ? m.memberImage
                      : `${API_BASE_URL}/${m.memberImage || ""}`
                  }
                  className="h-24 w-20 rounded-lg border border-slate-100 object-cover shadow-sm transition group-hover:scale-105"
                  alt="Member"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>

              {/* CONTENT */}
              <div className="space-y-0.5 p-2 text-center">
                <h3 className="text-xs font-semibold leading-tight text-slate-800">
                  {m.memberName}
                </h3>

                <p className="text-[11px] font-medium text-indigo-600">
                  {m.committeeName}
                </p>

                <p className="text-[10px] uppercase tracking-wide text-slate-500">
                  {m.positionName}
                </p>
              </div>

              {/* ACTIONS (ALWAYS VISIBLE LIKE BANNER) */}
              <div className="flex justify-center gap-2 px-2 pb-3">
                <button
                  onClick={() => openModal(m)}
                  className="flex items-center gap-1 rounded-lg bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 transition"
                >
                  <Pencil size={12} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteCommitteeMember(m.committeeMemberId).then(
                      fetchInitialData,
                    )
                  }
                  className="flex items-center gap-1 rounded-lg bg-red-100 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 transition"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">
                  {editingId ? "Edit Member" : "Add Member"}
                </h2>
                <p className="text-xs text-indigo-100">
                  Manage committee member details
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
              {/* COMMITTEE */}
              <div>
                <label className="text-xs font-medium text-slate-600">
                  Committee
                </label>
                <select
                
                  className="w-full mt-1 p-3 border rounded-xl text-sm focus:border-indigo-500 outline-none"
                  value={formData.committeeMasterId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      committeeMasterId: Number(e.target.value),
                    })
                  }
                >
                  <option value={0}>Select Committee</option>
                 
                  {committees.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                 {errors.committeeMasterId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.committeeMasterId}
                    </p>
                  )}
              </div>

              {/* POSITION */}
              <div>
                <label className="text-xs font-medium text-slate-600">
                  Position
                </label>
                
                <select
                  className="w-full mt-1 p-3 border rounded-xl text-sm focus:border-indigo-500 outline-none"
                  value={formData.positionMasterId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      positionMasterId: Number(e.target.value),
                    })
                  }
                >
                  <option value={0}>Select Position</option>
                  
                  {positions.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
                {errors.positionMasterId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.positionMasterId}
                    </p>
                  )}
              </div>

              {/* NAME */}
              <div>
                <label className="text-xs font-medium text-slate-600">
                  Member Name
                </label>
                <input
                  className="w-full mt-1 p-3 border rounded-xl text-sm focus:border-indigo-500 outline-none"
                  placeholder="Enter member name"
                  value={formData.memberName}
                  onChange={(e) =>
                    setFormData({ ...formData, memberName: e.target.value })
                  }
                />
                {errors.memberName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.memberName}
                  </p>
                )}
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="text-xs font-medium text-slate-600">
                  Member Image
                </label>

                <label className="mt-2 flex items-center justify-center gap-2 border-2 border-dashed rounded-xl p-4 cursor-pointer hover:bg-indigo-50 hover:border-indigo-400 transition">
                  <span className="text-sm text-slate-600">
                    {formData.imageFile
                      ? formData.imageFile.name
                      : "Upload Image"}
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      if (file.size > 150 * 1024) {
                        setErrors((prev) => ({
                          ...prev,
                          imageFile: "Image size must be 150 KB or less",
                        }));

                        e.target.value = "";
                        return;
                      }

                      setErrors((prev) => ({
                        ...prev,
                        imageFile: "",
                      }));

                      setFormData({
                        ...formData,
                        imageFile: file,
                      });
                    }}
                  />
                  {errors.imageFile && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.imageFile}
                    </p>
                  )}
                </label>
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
                {submitting ? "Saving..." : "Save Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
