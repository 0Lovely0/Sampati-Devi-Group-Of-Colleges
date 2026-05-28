import React, { useState } from 'react';
import Search from 'lucide-react/dist/esm/icons/search';
import MoreVertical from 'lucide-react/dist/esm/icons/more-vertical';
import Plus from 'lucide-react/dist/esm/icons/plus';
import X from 'lucide-react/dist/esm/icons/x';

const ManageUsers = () => {
  // Dummy Data
  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@college.edu", role: "Staff", status: "Active" },
    { id: 2, name: "Priya Verma", email: "priya@college.edu", role: "Student", status: "Active" },
    { id: 3, name: "Amit Kumar", email: "amit@college.edu", role: "Staff", status: "Inactive" },
    { id: 4, name: "Sneha Singh", email: "sneha@college.edu", role: "Student", status: "Active" },
    { id: 5, name: "Vikram Rathore", email: "vikram@college.edu", role: "Staff", status: "Active" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Total {users.length} registered users.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition"
        >
          <Plus size={20} /> Add New User
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-xs font-bold text-slate-400 uppercase">User</th>
              <th className="p-6 text-xs font-bold text-slate-400 uppercase">Role</th>
              <th className="p-6 text-xs font-bold text-slate-400 uppercase">Status</th>
              <th className="p-6 text-xs font-bold text-slate-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition">
                <td className="p-6">
                  <div className="font-bold text-slate-900">{user.name}</div>
                  <div className="text-sm text-slate-500">{user.email}</div>
                </td>
                <td className="p-6 font-medium text-slate-600">{user.role}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-6">
                  <button className="text-slate-400 hover:text-indigo-600"><MoreVertical size={20} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Ye tab dikhega jab isModalOpen true hoga */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New User</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="text-slate-400"/></button>
            </div>
            
            <input type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-indigo-600" />
            <input type="email" placeholder="Email Address" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-indigo-600" />
            <select className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-indigo-600">
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700"
            >
              Confirm and Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;