import { Link, useParams } from "react-router-dom";

export default function NursingNav() {
  const { deptId } = useParams();

  return (
    <nav className="bg-white border-b border-teal-100 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo & Department Name */}
        <Link to="/dept/bsc-nursing" className="flex items-center gap-3 group">
          <div className="w-10 h-10 overflow-hidden border border-teal-100">
            <img
              src="/logo1.ico"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-teal-900 text-base leading-tight">
              B.Sc. Nursing
            </span>

            <span className="text-[10px] font-bold text-teal-600 tracking-[0.25em] uppercase">
              Department
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <li>
            <Link
              to={`/dept/${deptId}/nursingAbout`}
              className="hover:text-teal-600 transition-colors"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to={`/dept/${deptId}/nursingFaculty`}
              className="hover:text-teal-600 transition-colors"
            >
              Faculty
            </Link>
          </li>

          <li>
            <Link
              to={`/dept/${deptId}/Syllabus`}
              className="hover:text-teal-600 transition-colors"
            >
              Syllabus
            </Link>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to={`/dept/${deptId}/admissionenquiry`}
            className="bg-teal-600 text-white px-5 py-2 text-sm font-bold hover:bg-teal-700 transition-colors border border-teal-600"
          >
            Admission Inquiry
          </Link>

          <Link
            to="/"
            className="px-5 py-2 text-sm font-bold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Back to Main Site
          </Link>
        </div>
      </div>
    </nav>
  );
}
