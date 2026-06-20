import React, { useEffect, useMemo, useState } from "react";
import { Search, Users } from "lucide-react";

import {
  type ApplyNow,
  getApplyNowByFormType,
} from "../../services/admissionEnquiryService";

const AdmissionEnquiryPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [enquiries, setEnquiries] = useState<ApplyNow[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getApplyNowByFormType(
        "AdmissionEnquiry"
      );

      setEnquiries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return enquiries.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.mobileNumber.includes(searchTerm) ||
        item.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (item.course || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        // (item.educationLevel || "")
        //   .toLowerCase()
        //   .includes(searchTerm.toLowerCase()) ||
        (item.preferredMode || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [enquiries, searchTerm]);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Admission Enquiries
          </h1>

          <p className="text-slate-500 mt-1">
            Manage and review admission enquiry submissions.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-indigo-50 px-5 py-3 rounded-xl">
          <Users size={20} className="text-indigo-600" />

          <div>
            <p className="text-xs text-slate-500">
              Total Enquiries
            </p>
            <p className="text-lg font-bold text-indigo-700">
              {filteredData.length}
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by name, mobile, email, course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-auto max-h-[650px] custom-scrollbar">

          {loading ? (
            <div className="py-20 text-center text-slate-500">
              Loading...
            </div>
          ) : (
            <table className="w-full min-w-[1200px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-slate-100 border-b border-slate-200">

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Father's Name
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Mobile
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Course
                  </th>
{/* 
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Education Level
                  </th> */}

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Preferred Mode
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b border-slate-100 hover:bg-slate-50 ${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-slate-50/40"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold">
                      {item.name}
                    </td>

                    <td className="px-6 py-4">
                      {item.fatherName}
                    </td>

                    <td className="px-6 py-4">
                      {item.mobileNumber}
                    </td>

                    <td className="px-6 py-4">
                      {item.email}
                    </td>

                    <td className="px-6 py-4">
                      {item.course || "-"}
                    </td>

                    {/* <td className="px-6 py-4">
                      {item.educationLevel || "-"}
                    </td> */}

                    <td className="px-6 py-4">
                      {item.preferredMode || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && filteredData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <Users size={52} className="text-slate-300 mb-4" />

              <h3 className="text-lg font-semibold text-slate-700">
                No Admission Enquiries Found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                New admission enquiries will appear here.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdmissionEnquiryPage;