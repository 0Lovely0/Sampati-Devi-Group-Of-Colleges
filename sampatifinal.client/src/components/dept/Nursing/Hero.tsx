import { useParams, Link } from "react-router-dom";
import NewsTicker from "./NewsTicker";
import { deptData, defaultDeptData } from "../../../data/departments";

export default function DeptHero() {
  const { deptId } = useParams<{ deptId: string }>();

  const data =
    deptId && deptData[deptId]
      ? deptData[deptId]
      : defaultDeptData;

  return (
    <div className="relative w-full">
      {/* Hero Banner */}
      <div
        className={`relative ${data.bgClass} text-white py-14 px-4 overflow-hidden bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('${data.imageUrl}')`,
        }}
      >
        {/* Background Shapes */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 -ml-16 -mb-16 blur-2xl"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-black/40 border border-white/10 p-6 md:p-8 text-center">
            {/* Badge */}
            <span className="inline-block border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
              {data.badge}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              {data.title}
            </h1>

            {/* Subtitle */}
            <p
              className={`text-sm md:text-base ${data.accentText} max-w-2xl mx-auto leading-relaxed`}
            >
              {data.subtitle}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link to={`/dept/${deptId}/syllabus`}>
              <button className="bg-white text-slate-900 px-5 py-2 text-sm font-semibold border border-white hover:bg-slate-100 transition-colors">
                Download Syllabus
              </button>
              </Link>

              <Link
                to={`/dept/${deptId}/nursingContact`}
                className="border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Contact Faculty
              </Link>
            </div>
          </div>
        </div>
      </div>

      <NewsTicker />
    </div>
  );
}