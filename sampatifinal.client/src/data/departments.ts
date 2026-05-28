// src/data/departments.ts

export const departments = [
  { name: "B.Sc. Nursing", slug: "bsc-nursing" },
  { name: "Post Basic B.Sc. Nursing", slug: "post-basic-bsc-nursing" },
  { name: "Veterinary Pharmacist", slug: "veterinary-pharmacist" },
  { name: "Pharmacy", slug: "pharmacy" },
  { name: "Multipurpose Health Worker", slug: "multipurpose-health-worker" },
];


// data.ts

export interface DeptConfig {
  title: string;
  subtitle: string;
  badge: string;
  bgClass: string;
  accentText: string;
  imageUrl: string;
}

export const deptData: Record<string, DeptConfig> = {
  "bsc-nursing": {
    title: "B.Sc. Nursing",
    subtitle: "Excellence in Healthcare & Clinical Training",
    badge: "Nursing Dept",
    bgClass: "bg-teal-700/80",
    accentText: "text-teal-200",
    imageUrl: "/college.png"
  },
  "pharmacy": {
    title: "Pharmacy Department",
    subtitle: "Innovating Health through Pharmaceutical Science",
    badge: "Pharmacy Dept",
    bgClass: "bg-orange-600/80",
    accentText: "text-orange-200",
    imageUrl: "/images/pharmacy-hero.jpg"
  }
};

export const defaultDeptData: DeptConfig = {
  title: "Our Department",
  subtitle: "Welcome to our academic excellence center.",
  badge: "Academic Center",
  bgClass: "bg-slate-900/80",
  accentText: "text-slate-300",
  imageUrl: "/images/default-hero.jpg"
};

