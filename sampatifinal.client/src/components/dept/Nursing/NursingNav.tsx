import React from 'react';
import { Link, useParams } from 'react-router-dom';


export default function NursingNav() {
  const { deptId } = useParams();
  return (
    <nav className="bg-white border-b border-teal-100 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo & Dept Name */}
        <Link to="/dept/bsc-nursing" className="flex items-center gap-3 group">
         <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm ">
            <img src="/logo1.ico" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-teal-900 text-lg leading-tight">B.Sc. Nursing</span>
            <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">Department</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
          <li>
            <Link to={`/dept/${deptId}/nursingAbout`} className="hover:text-teal-600 transition-colors">About</Link>
          </li>
          <li>
           <Link to={`/dept/${deptId}/nursingFaculty`} className="hover:text-teal-600 transition-colors">Faculty</Link>
          </li>
          <li>
            <Link to={`/dept/${deptId}/Syllabus`} className="hover:text-teal-600 transition-colors">syllabus</Link>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
        <Link to={`/dept/${deptId}/admissionenquiry`}

            className="bg-teal-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-teal-700 transition-all shadow-lg shadow-teal-200"
          >
            Admission Inquiry
          </Link>
        </div>
      </div>
    </nav>
  );
}