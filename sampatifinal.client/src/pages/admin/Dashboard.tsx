import React from 'react';
import { LayoutDashboard, FileText, Image as ImageIcon, Video, Users, UserPlus } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Control Center</h1>
        <p className="text-slate-500 mt-1">Manage portal content, user activity, and site statistics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <StatCard title="Total Users" value="1,284" icon={<Users className="text-orange-600" />} />
        <StatCard title="New Users" value="24" icon={<UserPlus className="text-sky-600" />} />
        <StatCard title="Notices" value="12" icon={<FileText className="text-blue-600" />} />
        <StatCard title="Gallery" value="84" icon={<ImageIcon className="text-purple-600" />} />
        <StatCard title="Events" value="05" icon={<LayoutDashboard className="text-emerald-600" />} />
        <StatCard title="Videos" value="03" icon={<Video className="text-rose-600" />} />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recently Added Users Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <UserPlus size={20} className="text-sky-600" /> Recently Registered Users
          </h2>
          <div className="space-y-3">
            <UserItem name="Rahul Sharma" email="rahul@college.edu" role="Staff" />
            <UserItem name="Priya Verma" email="priya@college.edu" role="Student" />
            <UserItem name="Amit Kumar" email="amit@college.edu" role="Staff" />
            <UserItem name="Sneha Singh" email="sneha@college.edu" role="Student" />
          </div>
        </div>

        {/* Quick Management Links */}
        <div className="bg-slate-900 p-6 rounded-3xl text-white">
          <h2 className="text-lg font-bold mb-6">Quick Manage</h2>
          <div className="space-y-3">
            <ManageButton label="Manage Users" />
            <ManageButton label="Upload Banner" />
            <ManageButton label="Post New Notice" />
            <ManageButton label="Create Event" />
            <ManageButton label="Publish Video" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-2">
    <div className="p-2 bg-slate-50 w-fit rounded-xl">{icon}</div>
    <div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{title}</p>
      <h3 className="text-xl font-bold text-slate-900">{value}</h3>
    </div>
  </div>
);

const UserItem = ({ name, email, role }: { name: string, email: string, role: string }) => (
  <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition border border-slate-100">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900">{name}</p>
        <p className="text-xs text-slate-400">{email}</p>
      </div>
    </div>
    <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase ${role === 'Staff' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
      {role}
    </span>
  </div>
);

const ManageButton = ({ label }: { label: string }) => (
  <button className="w-full p-4 bg-white/5 hover:bg-indigo-600 rounded-2xl transition text-left text-sm font-semibold border border-white/10">
    {label} →
  </button>
);

export default Dashboard;