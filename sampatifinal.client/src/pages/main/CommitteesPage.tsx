import React, { useEffect, useState } from "react";
import {
  getCommitteeDropdown,
  getAllCommitteeMembers,
} from "../../services/committeeService";
import Loader from "../../components/common/Loader";

type DropdownDto = { value: number; label: string };

type CommitteeMember = {
  committeeMasterId: number;
  memberName: string;
  positionName: string;
  memberImage: string;
};

type MemberView = {
  name: string;
  position: string;
  image: string;
};

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const getImageUrl = (path?: string) =>
  !path
    ? "/placeholder.jpg"
    : `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

const CommitteesPage: React.FC = () => {
  const [committees, setCommittees] = useState<DropdownDto[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [allMembers, setAllMembers] = useState<CommitteeMember[]>([]);
  const [members, setMembers] = useState<MemberView[]>([]);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load dropdown + all members once
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setInitialLoading(true);

        const [dropdownRes, membersRes] = await Promise.all([
          getCommitteeDropdown(),
          getAllCommitteeMembers(),
        ]);

        setCommittees(dropdownRes);
        setAllMembers(membersRes);

        if (dropdownRes.length > 0) {
          setSelectedId(dropdownRes[0].value);
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Filter members whenever selection changes
  useEffect(() => {
    if (!selectedId) return;

    setLoading(true);

    const filtered = allMembers
      .filter((x) => x.committeeMasterId === selectedId)
      .map((x) => ({
        name: x.memberName,
        position: x.positionName,
        image: x.memberImage,
      }));

    setMembers(filtered);
    setLoading(false);
  }, [selectedId, allMembers]);

  if (initialLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-stone-50">
        <Loader text="Loading Committees..." />
      </div>
    );

  return (
    <section className="bg-stone-50 pb-20">
      {/* HEADER */}
      <div className="bg-indigo-950 py-20 px-4 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-black text-white">
          College Committees
        </h1>
        <div className="h-1 w-20 bg-amber-500 mt-6 mx-auto rounded-full" />
        <p className="text-slate-400 mt-6 text-xl">
          Explore our academic & administrative leadership teams.
        </p>
      </div>

      <div className="w-full mx-auto px-4 -mt-7">
        {/* DROPDOWN */}
        <div className="flex justify-center mb-12">
          <select
            value={selectedId ?? ""}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            className="w-full sm:w-150 bg-white border border-stone-200 px-6 py-4 rounded-full shadow-lg text-sm font-black text-slate-950 focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer "
          >
            {committees.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader text="Updating Members..." />
          </div>
        ) : members.length === 0 ? (
          <div className="text-center text-slate-500 py-20 font-medium">
            No members found for this committee.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 min-h-[280px] border border-stone-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group text-center flex flex-col items-center justify-center"
              >
                <img
                  src={getImageUrl(m.image)}
                  alt={m.name}
                  className="w-52 h-62 mx-auto  object-contain border-4 border-stone-100 mb-5 group-hover:border-amber-500 transition "
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.jpg";
                  }}
                />

                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {m.name}
                </h3>

                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-4 py-2 rounded-full">
                  {m.position}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommitteesPage;
