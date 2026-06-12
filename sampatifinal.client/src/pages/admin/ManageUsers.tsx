import React, { useEffect, useState } from "react";
import { Plus, X, User } from "lucide-react";

import Loader from "../../components/common/Loader";

import {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../../services/adminService";

import type { Admin, CreateAdminDto } from "../../services/adminService";

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<Admin[]>([]);

  const [loading, setLoading] = useState(true); // ✅ GLOBAL LOADER
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const emptyForm: CreateAdminDto = {
    adminName: "",
    adminMobile: "",
    adminUsername: "",
    adminPassword: "",
  };

  const [errors, setErrors] = useState({
    adminName: "",
    adminUsername: "",
    adminMobile: "",
    adminPassword: "",
  });

  const [formData, setFormData] = useState<CreateAdminDto>(emptyForm);

  // ================= LOAD ADMINS =================
  const loadAdmins = async () => {
    try {
      setLoading(true);
      const data = await getAdmins();
      setUsers(data || []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const openCreateModal = () => {
    setEditingAdmin(null);
    setFormData(emptyForm);

    setErrors({
      adminName: "",
      adminUsername: "",
      adminMobile: "",
      adminPassword: "",
    });

    setIsModalOpen(true);
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);

    setFormData({
      adminName: admin.adminName,
      adminMobile: admin.adminMobile,
      adminUsername: admin.adminUsername,
      adminPassword: "",
     
    });

    setErrors({
      adminName: "",
      adminUsername: "",
      adminMobile: "",
      adminPassword: "",
    });

    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this admin?")) return;

    try {
      setLoading(true);
      await deleteAdmin(id);
      await loadAdmins();
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const newErrors = {
      adminName: "",
      adminUsername: "",
      adminMobile: "",
      adminPassword: "",
    };

    let hasError = false;

    if (!formData.adminName.trim()) {
      newErrors.adminName = "Name is required";
      hasError = true;
    }

    if (!formData.adminUsername.trim()) {
      newErrors.adminUsername = "Username is required";
      hasError = true;
    }

    if (!formData.adminMobile.trim()) {
      newErrors.adminMobile = "Mobile number is required";
      hasError = true;
    } else if (!/^\d{10}$/.test(formData.adminMobile)) {
      newErrors.adminMobile = "Enter a valid 10 digit mobile number";
      hasError = true;
    }

    if (!editingAdmin) {
      if (!formData.adminPassword.trim()) {
        newErrors.adminPassword = "Password is required";
        hasError = true;
      } else if (formData.adminPassword.length < 6) {
        newErrors.adminPassword = "Password must be at least 6 characters";
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError) return;

    try {
      setSubmitting(true);
      setLoading(true);

      if (editingAdmin) {
        await updateAdmin(editingAdmin.adminId, formData);
      } else {
        await createAdmin(formData);
      }

      setErrors({
        adminName: "",
        adminUsername: "",
        adminMobile: "",
        adminPassword: "",
      });

      setIsModalOpen(false);
      setEditingAdmin(null);
      setFormData(emptyForm);

      await loadAdmins();
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Users..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 p-1">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
         <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
           Admin Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage administrators and access permissions
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 w-full"
          >
            <Plus size={16} />
            Add Admin
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-3xl border border-blue-500 bg-white shadow-xl shadow-slate-200/50">
        <div className="border-b flex items-center justify-between border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-700">
            Administrators List
          </h2>
             <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg">
              {users.length} Admins
            </span>
        </div>

        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
              <User className="text-indigo-600" size={28} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              No Admins Found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create your first administrator account.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4 text-left">User</th>
                  <th className="px-4 py-4 text-left">Username</th>
                  <th className="px-4 py-4 text-left">Mobile</th>
                  <th className="px-4 py-4 text-left">Role</th>
                  <th className="px-4 py-4 text-left">Status</th>
                  <th className="px-4 py-4 text-left">Created</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.adminId}
                    className="border-t border-slate-100 transition-all hover:bg-indigo-50/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md">
                          <User size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {user.adminName}
                          </p>
                          <p className="text-xs text-slate-500">
                            Administrator
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm font-medium text-slate-700">
                      {user.adminUsername}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      {user.adminMobile}
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {user.adminRole || "ADMIN"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.adminStatus
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.adminStatus ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-500">
                      {user.adminDate
                        ? new Date(user.adminDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(user.adminId)}
                          className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-5 text-white">
              <h2 className="text-lg font-bold">
                {editingAdmin ? "Update Admin" : "Create Admin"}
              </h2>

              <p className="text-sm text-indigo-100 mt-1">
                Enter administrator details below
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-white hover:bg-white/10"
            >
              <X size={18} />
            </button>

            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Full Name
                </label>

                <input
                  name="adminName"
                  placeholder="Enter full name"
                  value={formData.adminName}
                  onChange={handleChange}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition
      ${
        errors.adminName
          ? "border-red-500 focus:ring-red-100"
          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
      }
      focus:ring-4`}
                />

                {errors.adminName && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.adminName}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Username
                </label>

                <input
                  name="adminUsername"
                  placeholder="Enter username"
                  value={formData.adminUsername}
                  onChange={handleChange}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition
      ${
        errors.adminUsername
          ? "border-red-500 focus:ring-red-100"
          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
      }
      focus:ring-4`}
                />

                {errors.adminUsername && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.adminUsername}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Mobile Number
                </label>

                <input
                  name="adminMobile"
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={formData.adminMobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    handleChange({
                      ...e,
                      target: {
                        ...e.target,
                        name: "adminMobile",
                        value,
                      },
                    });
                  }}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition
      ${
        errors.adminMobile
          ? "border-red-500 focus:ring-red-100"
          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
      }
      focus:ring-4`}
                />

                {errors.adminMobile && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.adminMobile}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Password
                </label>

                <input
                  name="adminPassword"
                  type="password"
                  placeholder={
                    editingAdmin
                      ? "Enter a New password to save the file"
                      : "Enter password"
                  }
                  value={formData.adminPassword}
                  onChange={handleChange}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition
      ${
        errors.adminPassword
          ? "border-red-500 focus:ring-red-100"
          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
      }
      focus:ring-4`}
                />

                {errors.adminPassword && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.adminPassword}
                  </p>
                )}
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={submitting}
                className="mt-3 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting
                  ? "Saving..."
                  : editingAdmin
                    ? "Update Admin"
                    : "Create Admin"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
