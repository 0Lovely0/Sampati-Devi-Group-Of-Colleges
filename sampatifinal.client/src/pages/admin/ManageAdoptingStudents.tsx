import React, { useEffect, useMemo, useState } from "react";
import { Search, Users, Plus, Pencil, Trash2, X } from "lucide-react";
const toast = {
  success: (message: string) => console.log(message),
  error: (message: string) => console.error(message),
};
import Loader from "../../components/common/Loader";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  type AdoptStudent,
} from "../../services/adoptionStudentService";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const ManageStudents: React.FC = () => {
  const [students, setStudents] = useState<AdoptStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdoptStudent | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    description: "",
    photo: null as File | null,
  });

  const [errors, setErrors] = useState({
    studentName: "",
    course: "",
    description: "",
    photo: "",
  });

  const validateForm = () => {
    const newErrors = {
      studentName: "",
      course: "",
      description: "",
      photo: "",
    };

    let isValid = true;

    // Student Name
    if (!formData.studentName.trim()) {
      newErrors.studentName = "Student name is required";
      isValid = false;
    } else if (formData.studentName.trim().length < 3) {
      newErrors.studentName = "Minimum 3 characters required";
      isValid = false;
    }

    // Course
    if (!formData.course.trim()) {
      newErrors.course = "Course is required";
      isValid = false;
    }

    // Description
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
      isValid = false;
    }

    // Photo
    if (!editing && !formData.photo) {
      newErrors.photo = "Student photo is required";
      isValid = false;
    }

    if (formData.photo) {
      const maxSize = 150 * 1024; // 150 KB

      if (formData.photo.size > maxSize) {
        newErrors.photo = "Image size must not exceed 150 KB";
        isValid = false;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(formData.photo.type)) {
        newErrors.photo = "Only JPG, JPEG, PNG and WEBP images are allowed";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter(
      (s) =>
        s.studentName.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
    );
  }, [students, search]);

  const resetForm = () => {
    setFormData({
      studentName: "",
      course: "",
      description: "",
      photo: null,
    });
    setEditing(null);
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      if (editing) {
        await updateStudent(editing.studentId, formData);
        toast.success("Student updated successfully");
      } else {
        await createStudent(formData);
        toast.success("Student created successfully");
      }

      resetForm();
      fetchStudents();
    } catch {
      toast.error("Operation failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (student: AdoptStudent) => {
    setEditing(student);
    setFormData({
      studentName: student.studentName,
      course: student.course,
      description: student.description,
      photo: null,
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await deleteStudent(id);
      toast.success("Student deleted successfully");
      fetchStudents();
    } catch {
      toast.error("Delete failed");
    }
  };

  const getImageUrl = (url: string) =>
    url?.startsWith("http") ? url : `${API_BASE_URL}/${url}`;

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 p-1">
      {/* <div className="p-4"> */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Manage Students
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage all adopting students.
            </p>
          </div> */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Studetns</h1>
          <p className="text-sm text-slate-500">
            Manage all adopting students.
          </p>
        </div>

        {/* <div className="flex items-center gap-3"> */}

        <button
          onClick={() => setOpen(true)}
          className="h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add Student
          </span>
        </button>
      </div>
      {/* </div> */}
      {/* </div> */}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Total Students */}
          <div className="flex items-center gap-3 bg-indigo-50 px-5 py-3 rounded-xl shrink-0">
            <Users size={20} className="text-indigo-600" />

            <div>
              <p className="text-xs text-slate-500">Total Students</p>
              <p className="text-lg font-bold text-indigo-700">
                {students.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-auto max-h-[650px] custom-scrollbar">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                  Photo
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                  Description
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.studentId}
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-all ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  <td className="p-4">
                    <img
                      src={getImageUrl(student.photoUrl)}
                      alt={student.studentName}
                      className="h-14 w-14 rounded-xl object-contain border border-slate-200"
                    />
                  </td>
                  <td className="p-4 font-semibold">{student.studentName}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                      {student.course}
                    </span>
                  </td>
                  <td className="p-4">{student.description}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(student.studentId)}
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {filteredStudents.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <Users size={52} className="text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700">
                  No Students Found
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  New students will appear here.
                </p>
              </div>
            )}
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editing ? "Edit Student" : "Add Student"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {editing
                    ? "Update student details"
                    : "Create a new student profile"}
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-5 space-y-4">
                {/* Student Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        studentName: e.target.value,
                      })
                    }
                    placeholder="Enter student name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  {errors.studentName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.studentName}
                    </p>
                  )}
                </div>

                {/* Course */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Course
                  </label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        course: e.target.value,
                      })
                    }
                    placeholder="Enter course"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  {errors.course && (
                    <p className="mt-1 text-sm text-red-500">{errors.course}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter description"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Student Photo
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;

                      if (file) {
                        const maxSize = 150 * 1024; // 150 KB

                        if (file.size > maxSize) {
                          setErrors((prev) => ({
                            ...prev,
                            photo: "Image size must not exceed 150 KB",
                          }));

                          e.target.value = "";
                          return;
                        }

                        setErrors((prev) => ({
                          ...prev,
                          photo: "",
                        }));
                      }

                      setFormData({
                        ...formData,
                        photo: file,
                      });
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-600 file:font-medium hover:file:bg-indigo-100"
                  />
                  {errors.photo && (
                    <p className="mt-1 text-sm text-red-500">{errors.photo}</p>
                  )}
                </div>

                {/* Image Preview */}
                {formData.photo && (
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 bg-slate-50">
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Preview"
                      className="h-16 w-16 rounded-xl object-cover border border-slate-200"
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {formData.photo.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(formData.photo.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4 bg-slate-50">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-white transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving
                    ? "Saving..."
                    : editing
                      ? "Update Student"
                      : "Create Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
