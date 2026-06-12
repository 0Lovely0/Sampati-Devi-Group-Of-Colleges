import {
  Users,
  GraduationCap,
  BriefcaseBusiness,
  Award,
  Building2,
  BookOpen,
} from "lucide-react";

const stats = [
  { icon: Users, value: "2500+", label: "Students" },
  { icon: GraduationCap, value: "120+", label: "Faculty" },
  { icon: BriefcaseBusiness, value: "1500+", label: "Placements" },
  { icon: BookOpen, value: "25+", label: "Courses" },
  { icon: Award, value: "15+", label: "Years" },
  { icon: Building2, value: "20+", label: "Labs" },
];

const CollegeStats = () => {
  return (
    <section className="bg-indigo-950 py-2 border-y border-slate-200">
      <div className="mx-auto w-full px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl border border-slate-200 bg-indigo-950 p-4 text-center transition-all duration-300 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-100"
              >
                {/* Icon Container with subtle transition */}
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={22} strokeWidth={2.5} />
                </div>

                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {stat.value}
                </h3>

                <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mt-1">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollegeStats;