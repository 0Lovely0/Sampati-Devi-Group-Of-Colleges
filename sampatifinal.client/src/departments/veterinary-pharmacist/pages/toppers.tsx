import React, { useEffect, useState } from "react";
import { getAllToppers, type Topper } from "../../../services/toppersService";
import Loader from "../../../components/common/Loader";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

// ✅ Veterinary Pharmacist Department ID
const VET_PHARMACY_ID = 3;

// 🎨 Veterinary Pharmacist Theme
const theme = {
  primary: "#15803D",
  secondary: "#DCFCE7",
  accent: "#22C55E",
};

export const VeterinaryPharmacistToppersGallery: React.FC = () => {
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
        console.error(err);
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

  // ✅ FILTER: Veterinary Pharmacist ONLY
  const vetToppers = (toppers || []).filter((t: any) =>
    t?.departments?.some(
      (d: any) =>
        Number(d?.departmentId) === VET_PHARMACY_ID ||
        d?.departmentName?.toLowerCase()?.trim() === "veterinary pharmacist",
    ),
  );

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: theme.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-16 px-4 text-center border-b"
        style={{
          backgroundColor: theme.primary,
          borderColor: theme.primary,
        }}
      >
        <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
          Veterinary Pharmacist Toppers Gallery
        </h1>

        <div
          className="h-1 w-16 mx-auto rounded-full"
          style={{ backgroundColor: theme.accent }}
        />

        <p className="text-white/70 mt-4 max-w-xl mx-auto text-lg">
          Celebrating excellence in Veterinary Pharmacist department.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-3 -mt-10">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading Veterinary Pharmacist toppers..." />
          </div>
        ) : vetToppers.length === 0 ? (
          <div className="text-center text-slate-600 text-sm py-20">
            No Veterinary Pharmacist toppers found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {vetToppers.map((t) => (
              <div
                key={t.topperId}
                onClick={() => setSelected(t)}
                className="group relative bg-white p-3 rounded-2xl border border-stone-100 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1"
              >
                {/* IMAGE */}
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-stone-100 mb-3">
                  <img
                    src={getImageUrl(t.imagePath)}
                    alt={t.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* TEXT */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900 truncate px-1">
                    {t.name}
                  </h3>

                  <div className="mt-1.5 inline-block px-2 py-0.5 rounded-md bg-amber-50 border border-amber-100">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">
                      Rank {t.collegeRank}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3"
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
              <h2 className="text-xl font-black text-slate-950">
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

export default VeterinaryPharmacistToppersGallery;
