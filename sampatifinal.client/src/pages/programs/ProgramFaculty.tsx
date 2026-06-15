import { useParams, useNavigate } from "react-router-dom";

export default function FacultyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="text-center max-w-md bg-white border shadow-sm rounded-2xl p-8">

        {/* ICON */}
        <div className="text-5xl mb-4">🚧</div>

        {/* TITLE */}
        <h1 className="text-2xl font-black text-slate-900">
          Faculty Page
        </h1>

        {/* SLUG */}
        <p className="text-sm text-slate-500 mt-2">
          Department: <span className="font-semibold text-slate-700">{slug}</span>
        </p>

        {/* STATUS */}
        <p className="text-sm text-amber-600 font-semibold mt-4">
          This page is under construction
        </p>

        {/* DESCRIPTION */}
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          We are currently working on building this faculty section.
          Please check back soon for updates.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/programs/bsc-nursing")}
          className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-full bg-indigo-950 text-white text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}