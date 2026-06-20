import React, { useEffect, useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import {
  getAllDonationInquiries,
  type DonationInquiry,
} from "../../services/donationInquiryService";

const AdoptionPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<DonationInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const data = await getAllDonationInquiries();
      setEnquiries(data);
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnquiries = useMemo(() => {
    const query = search.toLowerCase();

    return enquiries.filter(
      (item) =>
        item.honorableName.toLowerCase().includes(query) ||
        item.phone.includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.studentName.toLowerCase().includes(query) ||
        item.adoptionFor.toLowerCase().includes(query)
    );
  }, [enquiries, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Adoption Enquiries
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage all adoption inquiry submissions.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-indigo-50 px-5 py-3 rounded-xl">
            <Users size={20} className="text-indigo-600" />
            <div>
              <p className="text-xs text-slate-500">Total Enquiries</p>
              <p className="text-lg font-bold text-indigo-700">
                {enquiries.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries..."
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">
          <p className="text-slate-500">Loading enquiries...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-auto max-h-[650px] custom-scrollbar">
            <table className="w-full min-w-[1200px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Meeting Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Time
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Adopting For
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Student
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                    Inquiry ID
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredEnquiries.map((item, index) => (
                  <tr
                    key={item.inquiryId}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-all ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">
                        {item.honorableName}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      {item.phone}
                    </td>

                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      {item.email}
                    </td>

                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      {new Date(item.meetingDate).toLocaleDateString("en-IN")}
                    </td>

                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      {item.meetingTime}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                        {item.adoptionFor}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                        {item.studentName}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[40px] px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        #{item.inquiryId}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEnquiries.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <Users size={52} className="text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700">
                  No Adoption Enquiries Found
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  New enquiries will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionPage;