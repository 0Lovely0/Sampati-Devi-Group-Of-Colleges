import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, ChevronDown  } from "lucide-react";
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

const BASE_URL = "https://localhost:7197";

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

  const [formData, setFormData] = useState({
    committeeMasterId: 1,
    positionMasterId: 1,
    memberName: "",
    displayOrder: 1,
    imageFile: null as File | null,
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

  const handleSave = async () => {
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
        committeeMasterId: 1,
        positionMasterId: 1,
        memberName: "",
        displayOrder: 1,
        imageFile: null,
      });
    }
    setIsModalOpen(true);
  };

  if (loading) return <Loader text="Loading..." />;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* TITLE */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Manage Committee
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Create and manage committee members
          </p>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        {/* FILTER BUTTON */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl text-sm shadow-sm hover:bg-slate-50"
          >
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {members
          .filter((m) =>
            committeeFilter === "all"
              ? true
              : m.committeeMasterId === committeeFilter,
          )
          .map((m) => (
            <div
              key={m.committeeMemberId}
              className="group bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGE SECTION */}
              <div className="relative flex justify-center pt-6">
                <img
                  src={
                    m.memberImage?.startsWith("http")
                      ? m.memberImage
                      : `${BASE_URL}/${m.memberImage || ""}`
                  }
                  className="w-30 h-40 object-cover border-4 border-white shadow-md transition group-hover:scale-105"
                  alt="Member"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>

              {/* CONTENT */}
              <div className="p-2 text-center">
                <h3 className="font-semibold text-slate-800 text-sm">
                  {m.memberName}
                </h3>

                <p className="text-xs text-indigo-600 font-medium mt-1">
                  {m.committeeName}
                </p>

                <p className="text-[11px] text-slate-500 uppercase mt-1">
                  {m.positionName}
                </p>
              </div>

              {/* ACTIONS (HOVER OVERLAY STYLE) */}
              <div className="flex justify-center gap-2 pb-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
                <button
                  onClick={() => openModal(m)}
                  className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
                >
                  <Pencil size={14} />
                </button>

                <button
                  onClick={() =>
                    deleteCommitteeMember(m.committeeMemberId).then(
                      fetchInitialData,
                    )
                  }
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                >
                  <Trash2 size={14} />
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
                  {committees.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
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
                  {positions.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
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
