import { useState } from 'react';
import { Mail, Phone, Search } from 'lucide-react';

const facultyMembers = [
  { id: 1, name: "Dr. Anjali Sharma", dept: "Nursing", position: "HOD", email: "anjali@college.edu", phone: "+91 98765 43210" },
  { id: 2, name: "Prof. Rajesh Kumar", dept: "Nursing", position: "Assistant Professor", email: "rajesh@college.edu", phone: "+91 98765 43211" },
  { id: 3, name: "Dr. Suman Verma", dept: "Nursing", position: "Senior Lecturer", email: "suman@college.edu", phone: "+91 98765 43212" },
  { id: 4, name: "Prof. Vikram Singh", dept: "Pharmacy", position: "HOD", email: "vikram@college.edu", phone: "+91 98765 43213" },
];

export default function FacultyContactPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaculty = facultyMembers.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-teal-900 mb-4">Faculty Directory</h1>
        <p className="text-slate-600">Get in touch with our expert faculty members for any academic guidance.</p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mt-8">
          <Search className="absolute left-3 top-3.5 text-teal-500" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or department..." 
            className="w-full pl-12 pr-4 py-3 rounded-full border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Faculty List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredFaculty.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <span className="text-teal-600 font-medium text-sm">{member.position}</span>
              </div>
              <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold">{member.dept}</div>
            </div>
            
            <div className="space-y-2">
              <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-slate-600 hover:text-teal-700 transition">
                <Mail size={16} /> {member.email}
              </a>
              <a href={`tel:${member.phone}`} className="flex items-center gap-3 text-slate-600 hover:text-teal-700 transition">
                <Phone size={16} /> {member.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}