export interface LawyerOrg {
  id: string;
  name_bn: string;
  name_en: string;
  description_bn: string;
  description_en: string;
  specializations: string[];
  districts: string[];
  phone?: string;
  email?: string;
  website?: string;
  address_bn?: string;
  type: "pro_bono" | "legal_aid" | "clinic";
}

export const lawyerOrgs: LawyerOrg[] = [
  {
    id: "supreme-court-legal-aid",
    name_bn: "সুপ্রিম কোর্ট লিগ্যাল এইড কমিটি",
    name_en: "Supreme Court Legal Aid Committee",
    description_bn: "বাংলাদেশ সুপ্রিম কোর্টের অধীনে বিনামূল্যে আইনি সহায়তা প্রদান করে। দরিদ্র ও অসহায় ব্যক্তিদের উচ্চ আদালতে বিনামূল্যে প্রতিনিধিত্ব করা হয়।",
    description_en: "Provides free legal aid under Bangladesh Supreme Court. Represents poor and vulnerable individuals in higher courts at no cost.",
    specializations: ["criminal_law", "human_rights", "constitutional"],
    districts: ["ঢাকা"],
    phone: "+880-2-9559329",
    address_bn: "সুপ্রিম কোর্ট ভবন, ঢাকা",
    type: "legal_aid",
  },
  {
    id: "district-legal-aid",
    name_bn: "জেলা লিগ্যাল এইড অফিস",
    name_en: "District Legal Aid Office",
    description_bn: "সরকারি জেলা লিগ্যাল এইড অফিস প্রতিটি জেলায় বিনামূল্যে আইনি পরামর্শ ও আদালতে প্রতিনিধিত্ব প্রদান করে। হেল্পলাইন: ১৬৪৩০।",
    description_en: "Government district legal aid offices provide free legal advice and court representation in every district. Helpline: 16430.",
    specializations: ["family_law", "labor_law", "land_law", "criminal_law", "domestic_violence"],
    districts: ["ঢাকা","চট্টগ্রাম","রাজশাহী","খুলনা","বরিশাল","সিলেট","রংপুর","ময়মনসিংহ","কুমিল্লা","বগুড়া"],
    phone: "16430",
    type: "legal_aid",
  },
  {
    id: "blast-legal-clinic",
    name_bn: "ব্লাস্ট লিগ্যাল ক্লিনিক",
    name_en: "BLAST Legal Clinic",
    description_bn: "BLAST পরিচালিত বিনামূল্যে আইনি ক্লিনিক যেখানে অভিজ্ঞ আইনজীবীরা শ্রমিক, নারী ও সুবিধাবঞ্চিতদের আইনি পরামর্শ দেন।",
    description_en: "Free legal clinics run by BLAST where experienced lawyers advise workers, women, and marginalized communities.",
    specializations: ["labor_law", "human_rights", "family_law", "domestic_violence"],
    districts: ["ঢাকা","চট্টগ্রাম","রাজশাহী","খুলনা","সিলেট"],
    phone: "+880-2-8117265",
    email: "info@blast.org.bd",
    website: "https://blast.org.bd",
    type: "clinic",
  },
  {
    id: "women-lawyer-association",
    name_bn: "বাংলাদেশ মহিলা আইনজীবী সমিতি",
    name_en: "Bangladesh Women Lawyers Association",
    description_bn: "নারী আইনজীবীদের সমিতি যা নারী ও শিশুদের আইনি সমস্যায় বিশেষ সহায়তা প্রদান করে। বিশেষত পারিবারিক সহিংসতা ও যৌতুকের মামলায় সক্রিয়।",
    description_en: "Association of women lawyers providing specialized assistance for women and children, particularly in domestic violence and dowry cases.",
    specializations: ["domestic_violence", "family_law", "child_rights"],
    districts: ["ঢাকা","চট্টগ্রাম","রাজশাহী"],
    phone: "+880-2-9560315",
    type: "pro_bono",
  },
  {
    id: "labor-law-clinic",
    name_bn: "শ্রম আইন ক্লিনিক — কারমজিবী নারী",
    name_en: "Labour Law Clinic — Karmojibi Nari",
    description_bn: "গার্মেন্টস ও শিল্প শ্রমিকদের জন্য বিশেষ আইনি ক্লিনিক। বেতন বকেয়া, ছাঁটাই, মাতৃকালীন সুবিধাসহ শ্রম অধিকারের মামলায় বিনামূল্যে সেবা।",
    description_en: "Specialized legal clinic for garment and industrial workers. Free services for unpaid wages, dismissal, maternity benefits, and labor rights cases.",
    specializations: ["labor_law"],
    districts: ["ঢাকা","নারায়ণগঞ্জ","গাজীপুর","চট্টগ্রাম"],
    phone: "+880-2-9349578",
    type: "clinic",
  },
  {
    id: "human-rights-lawyers",
    name_bn: "মানবাধিকার আইনজীবী পরিষদ",
    name_en: "Human Rights Lawyers Council",
    description_bn: "গুম, বিচারবহির্ভূত হত্যা, পুলিশি নির্যাতন ও রাষ্ট্রীয় হয়রানির শিকার ব্যক্তিদের জন্য বিনামূল্যে আইনি সেবা প্রদান করে।",
    description_en: "Provides free legal services for victims of enforced disappearance, extrajudicial killings, police torture, and state harassment.",
    specializations: ["human_rights", "criminal_law"],
    districts: ["ঢাকা","চট্টগ্রাম"],
    phone: "+880-2-9561308",
    type: "pro_bono",
  },
  {
    id: "land-law-clinic",
    name_bn: "ভূমি আইন সহায়তা কেন্দ্র — ALRD",
    name_en: "Land Law Assistance Center — ALRD",
    description_bn: "ভূমিহীন কৃষক ও প্রান্তিক জনগোষ্ঠীর ভূমি অধিকার রক্ষায় ALRD বিনামূল্যে আইনি পরামর্শ ও মামলা পরিচালনা করে।",
    description_en: "ALRD provides free legal advice and case management to protect land rights of landless farmers and marginalized communities.",
    specializations: ["land_law", "property_law"],
    districts: ["ঢাকা","রাজশাহী","খুলনা","বরিশাল","রংপুর"],
    phone: "+880-2-8115881",
    website: "https://alrd.org",
    type: "legal_aid",
  },
  {
    id: "cyber-law-clinic",
    name_bn: "সাইবার ক্রাইম আইনি সহায়তা — CCAF",
    name_en: "Cyber Crime Legal Aid — CCAF",
    description_bn: "অনলাইন হয়রানি, সাইবার প্রতারণা, ফেক আইডি ও ডিজিটাল নিরাপত্তা আইনের শিকারদের জন্য বিনামূল্যে আইনি পরামর্শ ও সহায়তা।",
    description_en: "Free legal advice and assistance for victims of online harassment, cyber fraud, fake IDs, and Digital Security Act cases.",
    specializations: ["cyber_law"],
    districts: ["ঢাকা","চট্টগ্রাম"],
    phone: "01712-345678",
    type: "clinic",
  },
];

export function getLawyersBySpecialization(spec: string): LawyerOrg[] {
  return lawyerOrgs.filter((l) => l.specializations.includes(spec));
}
