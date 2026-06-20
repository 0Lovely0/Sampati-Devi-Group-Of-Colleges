import React, { useEffect, useState } from "react";
import { getAllToppers, type Topper } from "../../services/toppersService";
import {
  getAllPlacements,
  type Placement,
} from "../../services/placementService";
import Loader from "../../components/common/Loader";

import { LocationEdit } from "lucide-react";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

export const ToppersGalleryPage: React.FC = () => {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [selected, setSelected] = useState<Topper | null>(null);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [tData, pData] = await Promise.all([
          getAllToppers(),
          getAllPlacements(),
        ]);

        setToppers(tData || []);
        setPlacements(pData || []);
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

  const mainOnly = toppers.filter((t) =>
    t.departments?.some(
      (d) => d.departmentName?.trim().toLowerCase() === "main",
    ),
  );

  // Group toppers by semester
  const groupedBySemester = mainOnly.reduce(
    (acc, topper) => {
      const semester = topper.yearSemester?.trim() || "Other";

      if (!acc[semester]) {
        acc[semester] = [];
      }

      acc[semester].push(topper);

      return acc;
    },
    {} as Record<string, Topper[]>,
  );

  // Sort semesters numerically if possible
  const sortedSemesters = Object.entries(groupedBySemester).sort(([a], [b]) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || "999");
    const numB = parseInt(b.match(/\d+/)?.[0] || "999");

    return numA - numB;
  });

  const mainPlacements = placements?.filter((p) =>
    p.departments?.some(
      (d) => d.departmentName?.trim().toLowerCase() === "main",
    ),
  );
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* HEADER */}
      <div className="bg-indigo-950 py-16 px-4 text-center border-b border-slate-800">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
          Toppers Gallery
        </h1>

        <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />

        <p className="text-slate-400 mt-4 max-w-xl mx-auto text-lg">
          Celebrating our brightest academic achievers.
        </p>
      </div>

      {/* CONTENT */}
      <div className="w-full mx-auto px-4 md:px-6 lg:px-8 mt-5">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader text="Loading profiles..." />
          </div>
        ) : sortedSemesters.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
            <p className="text-slate-500">No toppers found.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {sortedSemesters.map(([semester, semesterToppers]) => (
              <section key={semester}>
                {/* Semester Heading */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3">
                    <div className="h-8 w-2 rounded-full bg-amber-500" />
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                      {semester}
                    </h2>
                  </div>

                  <div className="h-[2px] w-full bg-gradient-to-r from-amber-400 via-amber-200 to-transparent mt-3 rounded-full" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {semesterToppers.map((t) => (
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

                      {/* INFO */}
                      <div className="text-center">
                        <h3 className="text-sm font-bold text-slate-900 truncate px-1">
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
              </section>
            ))}
          </div>
        )}
      </div>

      {/* ================= PLACEMENTS TABLE ================= */}
      <div className="mt-16 px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
          Placements
        </h2>

        {!mainPlacements?.length ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center text-slate-500 shadow-sm">
            No placements found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl bg-indigo-950 shadow-2xl border border-indigo-900">
            <table className="w-full text-sm">
              {/* HEADER */}
              <thead className="bg-indigo-900 border-b border-indigo-800">
                <tr>
                  <th className="p-5 text-left text-xs font-black text-amber-400 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="p-5 text-left text-xs font-black text-amber-400 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="p-5 text-left text-xs font-black text-amber-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="p-5 text-left text-xs font-black text-amber-400 uppercase tracking-wider">
                    Location
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y divide-indigo-800">
                {mainPlacements.map((p) => (
                  <tr
                    key={p.placementId}
                    className="hover:bg-indigo-900/70 transition-all duration-300"
                  >
                    {/* Student */}
                    <td className="p-5 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                        {p.studentName}
                      </div>
                    </td>

                    {/* Batch */}
                    <td className="p-5">
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                        {p.batch}
                      </span>
                    </td>

                    {/* Company */}
                    <td className="p-5 text-slate-200 font-medium">
                      {p.placementName}
                    </td>

                    {/* Location */}
                    <td className="p-5 text-slate-300">
                      <span className="inline-flex items-center gap-2 text-slate-300">
                        <LocationEdit
                          size={16}
                          className="text-amber-400 flex-shrink-0"
                        />
                        {p.location}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setSelected(null)}
                className="bg-black/20 hover:bg-black/40 text-white backdrop-blur-md px-4 py-1.5 text-[10px] font-bold rounded-full uppercase tracking-widest transition"
              >
                Close
              </button>
            </div>

            {/* Image */}
            <div className="relative h-72 w-full bg-stone-100 flex items-center justify-center overflow-hidden">
              <img
                src={getImageUrl(selected.imagePath)}
                alt={selected.name}
                className="w-full h-full object-contain"
              />

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Details */}
            <div className="p-6">
              <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                {selected.name}
              </h2>

              <div className="w-12 h-1 bg-indigo-600 rounded-full mt-2 mb-6" />

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Batch", value: selected.batch },
                  { label: "Semester", value: selected.yearSemester },
                  {
                    label: "College Rank",
                    value: `#${selected.collegeRank}`,
                  },
                  {
                    label: "Percentile",
                    value: `${selected.percentile}%`,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-stone-50 p-3 rounded-xl border border-stone-100"
                  >
                    <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">
                      {item.label}
                    </p>

                    <p className="font-bold text-slate-900 mt-0.5">
                      {item.value || "-"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
