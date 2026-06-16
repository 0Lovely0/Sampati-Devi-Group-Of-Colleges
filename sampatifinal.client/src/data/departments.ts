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
  // {
  //   name: "Scope Admissions",
  //   slug: "scope-admissions",
  //   theme: {
  //     primary: "#BE123C",
  //     secondary: "#FFE4E6",
  //     accent: "#F43F5E",
  //   },
  // },
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

  "post-basic-bsc-nursing": {
    title: "Post Basic B.Sc. Nursing",
    subtitle: "Advanced Nursing Education for Professional Growth",
    badge: "Advanced Nursing Dept",
    bgClass: "bg-blue-700/80",
    accentText: "text-blue-200",
    imageUrl: "/images/post-basic-nursing.jpg",
  },

  "veterinary-pharmacist": {
    title: "Veterinary Pharmacist",
    subtitle: "Animal Healthcare & Pharmaceutical Expertise",
    badge: "Vet Pharma Dept",
    bgClass: "bg-green-700/80",
    accentText: "text-green-200",
    imageUrl: "/images/veterinary-pharmacist.jpg",
  },

  "pharmacy": {
    title: "pharmacy",
    subtitle: "Innovating Health through Pharmaceutical Science",
    badge: "Pharmacy Dept",
    bgClass: "bg-orange-600/80",
    accentText: "text-orange-200",
    imageUrl: "/images/pharmacy-hero.jpg",
  },

  "multipurpose-health-worker": {
    title: "Multipurpose Health Worker",
    subtitle: "Community Healthcare & Primary Health Services",
    badge: "MPHW Dept",
    bgClass: "bg-red-600/80",
    accentText: "text-red-200",
    imageUrl: "/images/mphw.jpg",
  },

  "scope-admissions": {
    title: "Scope Admissions",
    subtitle: "Guiding Students Toward Academic Opportunities",
    badge: "Admissions Cell",
    bgClass: "bg-purple-700/80",
    accentText: "text-purple-200",
    imageUrl: "/images/admissions.jpg",
  },

  main: {
    title: "Main Department",
    subtitle: "Central Administration & Academic Coordination",
    badge: "Main Office",
    bgClass: "bg-slate-800/80",
    accentText: "text-slate-300",
    imageUrl: "/images/main.jpg",
  },
};