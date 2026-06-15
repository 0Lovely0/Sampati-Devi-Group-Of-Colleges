// src/data/departments.ts

export const departments = [
  {
    name: "B.Sc Nursing",
    slug: "bsc-nursing",
    theme: {
      primary: "#0F766E",
      secondary: "#CCFBF1",
      accent: "#14B8A6",
    },
  },
  {
    name: "Post Basic B.Sc Nursing",
    slug: "post-basic-bsc-nursing",
    theme: {
      primary: "#1E40AF",
      secondary: "#DBEAFE",
      accent: "#3B82F6",
    },
  },
  {
    name: "Veterinary Pharmacist",
    slug: "veterinary-pharmacist",
    theme: {
      primary: "#15803D",
      secondary: "#DCFCE7",
      accent: "#22C55E",
    },
  },
  {
    name: "Pharmacy",
    slug: "pharmacy",
    theme: {
      primary: "#7C3AED",
      secondary: "#EDE9FE",
      accent: "#A855F7",
    },
  },
  {
    name: "Multipurpose Health Worker",
    slug: "multipurpose-health-worker",
    theme: {
      primary: "#EA580C",
      secondary: "#FFEDD5",
      accent: "#F97316",
    },
  },
  {
    name: "Scope Admissions",
    slug: "scope-admissions",
    theme: {
      primary: "#BE123C",
      secondary: "#FFE4E6",
      accent: "#F43F5E",
    },
  },
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
    imageUrl: "/college.png",
  },
  pharmacy: {
    title: "Pharmacy Department",
    subtitle: "Innovating Health through Pharmaceutical Science",
    badge: "Pharmacy Dept",
    bgClass: "bg-orange-600/80",
    accentText: "text-orange-200",
    imageUrl: "/images/pharmacy-hero.jpg",
  },
};

export const defaultDeptData: DeptConfig = {
  title: "Our Department",
  subtitle: "Welcome to our academic excellence center.",
  badge: "Academic Center",
  bgClass: "bg-slate-900/80",
  accentText: "text-slate-300",
  imageUrl: "/images/default-hero.jpg",
};
