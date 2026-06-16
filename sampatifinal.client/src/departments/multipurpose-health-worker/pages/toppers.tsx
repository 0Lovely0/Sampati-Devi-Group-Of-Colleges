import React, { useEffect, useState } from "react";
import { getAllToppers, type Topper } from "../../../services/toppersService";
import Loader from "../../../components/common/Loader";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const TARGET_DEPARTMENT = "Multipurpose Health Worker";

const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

const MPHW_THEME = {
  primary: "#EA580C",
  secondary: "#FFEDD5",
  accent: "#F97316",
};

export const MPHWToppersGallery: React.FC = () => {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [selected, setSelected] = useState<Topper | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getAllToppers();
        const list = res ?? [];

        setToppers(list);
      } catch (err) {
        console.error("MPHW toppers load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getImageUrl = (path?: string) =>
    !path
      ? "/placeholder.jpg"
      : `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const mphwToppers = (toppers || []).filter((t: any) =>
    t?.departments?.some(
      (d: any) =>
        normalize(d?.departmentName) ===
        normalize(TARGET_DEPARTMENT)
    )
  );

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: MPHW_THEME.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-16 px-4 text-center border-b"
        style={{
          background: `linear-gradient(135deg, ${MPHW_THEME.primary} 0%, ${MPHW_THEME.accent} 100%)`,
          borderColor: MPHW_THEME.primary,
        }}
      >
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
          MPHW Achievers Gallery
        </h1>

        <div
          className="h-1 w-16 mx-auto rounded-full"
          style={{ backgroundColor: MPHW_THEME.accent }}
        />

        <p className="text-white/70 mt-4 max-w-xl mx-auto text-xs">
          Celebrating outstanding performers, academic achievers,
          community health leaders, and top-ranking students of the
          Multipurpose Health Worker Department.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-3 -mt-10">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading MPHW achievers..." />
          </div>
        ) : mphwToppers.length === 0 ? (
          <div className="text-center text-slate-600 text-sm py-20">
            No MPHW achievers found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {mphwToppers.map((t) => (
              <div
                key={t.topperId}
                onClick={() => setSelected(t)}
                className="group bg-white rounded-xl border overflow-hidden shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ borderColor: "#FED7AA" }}
              >
                {/* IMAGE */}
                <div className="h-44 overflow-hidden bg-stone-100">
                  <img
                    src={getImageUrl(t.imagePath)}
                    alt={t.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-700"
                  />
                </div>

                {/* TEXT */}
                <div className="p-3 text-center">
                  <h3 className="text-xs font-black text-slate-950 truncate">
                    {t.name}
                  </h3>

                  <p
                    className="text-[9px] font-bold uppercase tracking-widest mt-1"
                    style={{ color: MPHW_THEME.accent }}
                  >
                    Rank: {t.collegeRank}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3"
          style={{
            backgroundColor: "rgba(234,88,12,0.95)",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getImageUrl(selected.imagePath)}
              alt={selected.name}
              className="w-full h-64 object-contain bg-stone-100"
            />

            <div className="p-5">
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: MPHW_THEME.accent }}
              >
                Multipurpose Health Worker Department
              </span>

              <h2 className="text-xl font-black text-slate-950 mt-2">
                {selected.name}
              </h2>

              <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
                <div>
                  <p className="text-[9px] text-stone-500 font-bold uppercase">
                    Batch
                  </p>
                  <p className="font-bold">{selected.batch}</p>
                </div>

                <div>
                  <p className="text-[9px] text-stone-500 font-bold uppercase">
                    Year/Sem
                  </p>
                  <p className="font-bold">{selected.yearSemester}</p>
                </div>

                <div>
                  <p className="text-[9px] text-stone-500 font-bold uppercase">
                    Rank
                  </p>
                  <p className="font-bold">{selected.collegeRank}</p>
                </div>

                <div>
                  <p className="text-[9px] text-stone-500 font-bold uppercase">
                    Percentile
                  </p>
                  <p className="font-bold">{selected.percentile}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MPHWToppersGallery;