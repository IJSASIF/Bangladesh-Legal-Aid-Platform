import type { LegalCategory } from "./types";

export const CATEGORIES: Record<
  LegalCategory,
  { label_bn: string; label_en: string; icon: string; color: string }
> = {
  labor_law: {
    label_bn: "শ্রম আইন",
    label_en: "Labor Law",
    icon: "⚒️",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  family_law: {
    label_bn: "পারিবারিক আইন",
    label_en: "Family Law",
    icon: "👨‍👩‍👧",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  property_law: {
    label_bn: "সম্পত্তি আইন",
    label_en: "Property Law",
    icon: "🏠",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  criminal_law: {
    label_bn: "ফৌজদারি আইন",
    label_en: "Criminal Law",
    icon: "⚖️",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
  human_rights: {
    label_bn: "মানবাধিকার",
    label_en: "Human Rights",
    icon: "✊",
    color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  },
  land_law: {
    label_bn: "ভূমি আইন",
    label_en: "Land Law",
    icon: "🌾",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  domestic_violence: {
    label_bn: "পারিবারিক সহিংসতা",
    label_en: "Domestic Violence",
    icon: "🛡️",
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  },
  child_rights: {
    label_bn: "শিশু অধিকার",
    label_en: "Child Rights",
    icon: "👶",
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  },
  consumer_rights: {
    label_bn: "ভোক্তা অধিকার",
    label_en: "Consumer Rights",
    icon: "🛒",
    color:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  },
  cyber_law: {
    label_bn: "সাইবার আইন",
    label_en: "Cyber Law",
    icon: "💻",
    color: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
  },
  general: {
    label_bn: "সাধারণ",
    label_en: "General",
    icon: "📋",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  },
};
