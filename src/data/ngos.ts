import type { NGO } from "@/lib/types";

export const ngos: NGO[] = [
  {
    id: "blast",
    name_bn: "বাংলাদেশ লিগ্যাল এইড এন্ড সার্ভিসেস ট্রাস্ট (ব্লাস্ট)",
    name_en: "Bangladesh Legal Aid and Services Trust (BLAST)",
    description_bn:
      "ব্লাস্ট বাংলাদেশের অন্যতম প্রধান আইনি সহায়তা সংস্থা। দেশব্যাপী বিনামূল্যে আইনি পরামর্শ, আদালতে প্রতিনিধিত্ব এবং মানবাধিকার সংরক্ষণে কাজ করে।",
    description_en:
      "BLAST is one of Bangladesh's premier legal aid organizations, providing free legal advice, court representation, and human rights protection nationwide.",
    specializations: [
      "labor_law",
      "human_rights",
      "criminal_law",
      "family_law",
      "child_rights",
    ],
    districts: [
      "ঢাকা",
      "চট্টগ্রাম",
      "রাজশাহী",
      "খুলনা",
      "সিলেট",
      "বরিশাল",
      "রংপুর",
      "ময়মনসিংহ",
    ],
    phone: "+880-2-8117265",
    email: "info@blast.org.bd",
    website: "https://blast.org.bd",
    address_bn: "ব্লক-এফ, লেভেল-৩, আর্কেডিয়া, ৯০ নিউ এস্কাটন, ঢাকা-১০০০",
    is_free: true,
    verified: true,
  },
  {
    id: "ask",
    name_bn: "আইন ও সালিশ কেন্দ্র (আসক)",
    name_en: "Ain o Salish Kendra (ASK)",
    description_bn:
      "আসক একটি জাতীয় আইনি সহায়তা ও মানবাধিকার সংস্থা। নারী, সংখ্যালঘু এবং সুবিধাবঞ্চিত মানুষের অধিকার সংরক্ষণে কাজ করে।",
    description_en:
      "ASK is a national legal aid and human rights organization focused on protecting the rights of women, minorities, and marginalized communities.",
    specializations: [
      "human_rights",
      "domestic_violence",
      "family_law",
      "criminal_law",
    ],
    districts: ["ঢাকা", "চট্টগ্রাম", "খুলনা", "রাজশাহী"],
    phone: "+880-2-8100749",
    email: "askdhaka@gmail.com",
    website: "https://www.askbd.org",
    address_bn: "৭/১৭ তালতলা লেন, হাতিরপুল, ঢাকা-১২০৫",
    is_free: true,
    verified: true,
  },
  {
    id: "brac-legal",
    name_bn: "ব্র্যাক আইনি সহায়তা কার্যক্রম",
    name_en: "BRAC Legal Aid Programme",
    description_bn:
      "ব্র্যাকের আইনি সহায়তা কার্যক্রম দেশের সকল জেলায় বিনামূল্যে আইনি সেবা প্রদান করে। দরিদ্র ও প্রান্তিক জনগোষ্ঠীর জন্য বিশেষভাবে কাজ করে।",
    description_en:
      "BRAC's legal aid programme provides free legal services across all districts, with a special focus on poor and marginalized communities.",
    specializations: [
      "family_law",
      "land_law",
      "property_law",
      "labor_law",
      "domestic_violence",
    ],
    districts: [
      "ঢাকা",
      "চট্টগ্রাম",
      "রাজশাহী",
      "খুলনা",
      "সিলেট",
      "বরিশাল",
      "রংপুর",
      "ময়মনসিংহ",
      "কুমিল্লা",
      "যশোর",
    ],
    phone: "+880-2-9881265",
    email: "info@brac.net",
    website: "https://www.brac.net",
    address_bn: "৭৫ মহাখালী, ঢাকা-১২১২",
    is_free: true,
    verified: true,
  },
  {
    id: "bnwla",
    name_bn: "বাংলাদেশ জাতীয় মহিলা আইনজীবী সমিতি (বিএনডব্লিউএলএ)",
    name_en: "Bangladesh National Woman Lawyers Association (BNWLA)",
    description_bn:
      "বিএনডব্লিউএলএ নারী ও শিশুদের আইনি অধিকার রক্ষায় কাজ করে। পারিবারিক সহিংসতা, যৌন নির্যাতন ও শিশু অধিকার বিষয়ে বিশেষ দক্ষতা আছে।",
    description_en:
      "BNWLA works to protect the legal rights of women and children, with expertise in domestic violence, sexual assault, and child rights cases.",
    specializations: [
      "domestic_violence",
      "family_law",
      "child_rights",
      "human_rights",
    ],
    districts: ["ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা"],
    phone: "+880-2-9340148",
    email: "bnwla@bnwla.org",
    website: "https://bnwla.org",
    address_bn: "৪/৬ ইন্দিরা রোড, ফার্মগেট, ঢাকা-১২১৫",
    is_free: true,
    verified: true,
  },
  {
    id: "mlaa",
    name_bn: "মাদারীপুর লিগ্যাল এইড অ্যাসোসিয়েশন (এমএলএএ)",
    name_en: "Madaripur Legal Aid Association (MLAA)",
    description_bn:
      "গ্রামীণ এলাকায় আইনি সহায়তা প্রদানে পথিকৃৎ সংস্থা। ভূমি বিরোধ, পারিবারিক আইন ও মধ্যস্থতা সেবায় বিশেষ দক্ষতা।",
    description_en:
      "Pioneer in rural legal aid, with special expertise in land disputes, family law, and mediation services.",
    specializations: ["land_law", "family_law", "property_law", "labor_law"],
    districts: ["মাদারীপুর", "ফরিদপুর", "শরীয়তপুর", "গোপালগঞ্জ", "ঢাকা"],
    phone: "+880-662-61634",
    email: "mlaa@mlaa-bd.org",
    website: "https://mlaa-bd.org",
    address_bn: "পুরানো বাসস্ট্যান্ড, মাদারীপুর",
    is_free: true,
    verified: true,
  },
  {
    id: "nari-pokkho",
    name_bn: "নারী পক্ষ",
    name_en: "Nari Pokkho",
    description_bn:
      "নারীর অধিকার আদায় ও নারীর বিরুদ্ধে সহিংসতা প্রতিরোধে কাজ করা একটি নারীবাদী সংগঠন। আইনি সহায়তা ও পরামর্শ সেবা প্রদান করে।",
    description_en:
      "A feminist organization working for women's rights and against violence, providing legal aid and counseling services.",
    specializations: ["domestic_violence", "family_law", "human_rights"],
    districts: ["ঢাকা"],
    phone: "+880-2-8114016",
    email: "naripokkho@gmail.com",
    website: "https://naripokkho.org",
    address_bn: "১৬/৫ ইন্দিরা রোড, ফার্মগেট, ঢাকা",
    is_free: true,
    verified: true,
  },
  {
    id: "mahila-parishad",
    name_bn: "বাংলাদেশ মহিলা পরিষদ",
    name_en: "Bangladesh Mahila Parishad",
    description_bn:
      "নারী আন্দোলনের ঐতিহাসিক সংগঠন। পারিবারিক আইন, নারী নির্যাতন ও শিশু অধিকার বিষয়ে আইনি সহায়তা ও সামাজিক আন্দোলনে সক্রিয়।",
    description_en:
      "A historic women's movement organization providing legal aid and advocacy in family law, violence against women, and child rights.",
    specializations: ["family_law", "domestic_violence", "child_rights"],
    districts: [
      "ঢাকা",
      "চট্টগ্রাম",
      "রাজশাহী",
      "খুলনা",
      "সিলেট",
      "বরিশাল",
    ],
    phone: "+880-2-8358523",
    email: "bmp@bangla.net",
    is_free: true,
    verified: true,
  },
  {
    id: "odhikar",
    name_bn: "অধিকার",
    name_en: "Odhikar",
    description_bn:
      "মানবাধিকার লঙ্ঘনের নথিভুক্তি ও ভুক্তভোগীদের আইনি সহায়তায় নিবেদিত সংগঠন। বিচারবহির্ভূত হত্যা, নির্যাতন ও গুম বিষয়ে কাজ করে।",
    description_en:
      "Dedicated to documenting human rights violations and providing legal assistance to victims of extrajudicial killings, torture, and enforced disappearances.",
    specializations: ["human_rights", "criminal_law"],
    districts: ["ঢাকা"],
    phone: "+880-2-9888587",
    email: "odhikar@bol-online.com",
    website: "https://odhikar.org",
    address_bn: "৮/২ পূর্ব মাতুয়াইল, মুগদাপাড়া, ঢাকা-১২১৪",
    is_free: true,
    verified: true,
  },
  {
    id: "ypsa",
    name_bn: "ইয়ং পাওয়ার ইন সোশ্যাল অ্যাকশন (ওয়াইপিএসএ)",
    name_en: "Young Power in Social Action (YPSA)",
    description_bn:
      "চট্টগ্রাম ও কক্সবাজার অঞ্চলে শিশু অধিকার, মানবাধিকার ও শ্রম আইন বিষয়ে বিনামূল্যে সেবা প্রদান করে।",
    description_en:
      "Provides free services on child rights, human rights, and labor law in the Chittagong and Cox's Bazar region.",
    specializations: ["child_rights", "human_rights", "labor_law"],
    districts: ["চট্টগ্রাম", "কক্সবাজার", "বান্দরবান"],
    phone: "+880-31-2853892",
    email: "info@ypsa.org",
    website: "https://ypsa.org",
    address_bn: "এইচবি-৫ মেহেদীবাগ, চট্টগ্রাম",
    is_free: true,
    verified: true,
  },
  {
    id: "nijera-kori",
    name_bn: "নিজেরা করি",
    name_en: "Nijera Kori",
    description_bn:
      "ভূমিহীন কৃষক ও শ্রমজীবী মানুষের ভূমি অধিকার ও শ্রমিক অধিকার আদায়ে কাজ করে। খুলনা, সাতক্ষীরা ও বাগেরহাটে সক্রিয়।",
    description_en:
      "Works for land rights and labor rights of landless farmers and working people, active in Khulna, Satkhira and Bagerhat.",
    specializations: ["land_law", "labor_law", "human_rights"],
    districts: ["খুলনা", "সাতক্ষীরা", "বাগেরহাট"],
    phone: "+880-41-731220",
    email: "nijerakori@gmail.com",
    address_bn: "বয়রা, খুলনা",
    is_free: true,
    verified: true,
  },
  {
    id: "karmojibi-nari",
    name_bn: "কর্মজীবী নারী",
    name_en: "Karmojibi Nari (Working Women)",
    description_bn:
      "গার্মেন্টস ও অন্যান্য শিল্প খাতের নারী শ্রমিকদের শ্রম অধিকার ও পারিবারিক সুরক্ষায় কাজ করে। ঢাকা, গাজীপুর ও নারায়ণগঞ্জে সক্রিয়।",
    description_en:
      "Works for labor rights and domestic protection of women workers in garments and other industries, active in Dhaka, Gazipur, and Narayanganj.",
    specializations: ["labor_law", "domestic_violence", "family_law"],
    districts: ["ঢাকা", "গাজীপুর", "নারায়ণগঞ্জ"],
    phone: "+880-2-9672323",
    email: "kn@karmojibi.org",
    website: "https://karmojibi.org",
    address_bn: "৫৩/৩ পশ্চিম রাজাবাজার, ঢাকা",
    is_free: true,
    verified: true,
  },
  {
    id: "manusher-jonno",
    name_bn: "মানুষের জন্য ফাউন্ডেশন",
    name_en: "Manusher Jonno Foundation",
    description_bn:
      "মানবাধিকার, শিশু অধিকার ও পারিবারিক সহিংসতা প্রতিরোধে দেশব্যাপী কাজ করে। প্রত্যন্ত অঞ্চলেও সেবা প্রদান করে।",
    description_en:
      "Works nationwide on human rights, child rights, and prevention of domestic violence, including in remote areas.",
    specializations: ["human_rights", "child_rights", "domestic_violence"],
    districts: [
      "ঢাকা",
      "চট্টগ্রাম",
      "রাজশাহী",
      "সিলেট",
      "খুলনা",
      "বরিশাল",
    ],
    phone: "+880-2-8858810",
    email: "info@manusher-jonno.org",
    website: "https://www.manusher-jonno.org",
    address_bn: "বাড়ি-১৭, রোড-৫, সেক্টর-৩, উত্তরা, ঢাকা",
    is_free: true,
    verified: true,
  },
  {
    id: "alrd",
    name_bn: "ভূমি সংস্কার ও উন্নয়ন সংস্থা (এএলআরডি)",
    name_en: "Association for Land Reform and Development (ALRD)",
    description_bn:
      "ভূমি সংস্কার, ভূমিহীনদের অধিকার ও সম্পত্তি বিরোধ নিষ্পত্তিতে বিশেষজ্ঞ সংগঠন। গবেষণা ও আইনি সহায়তা প্রদান করে।",
    description_en:
      "Expert organization in land reform, landless rights, and property dispute resolution, providing research and legal assistance.",
    specializations: ["land_law", "property_law", "human_rights"],
    districts: ["ঢাকা", "ময়মনসিংহ", "রাজশাহী", "খুলনা"],
    phone: "+880-2-9882408",
    email: "alrd@alrd.org",
    website: "https://alrd.org",
    address_bn: "৭১/১ শান্তিনগর, ঢাকা-১২১৭",
    is_free: true,
    verified: true,
  },
  {
    id: "banchte-shekha",
    name_bn: "বাঁচতে শেখা",
    name_en: "Banchte Shekha",
    description_bn:
      "যশোর ও খুলনা অঞ্চলে নারীর ক্ষমতায়ন, পারিবারিক সহিংসতা প্রতিরোধ ও ভূমি অধিকার নিয়ে কাজ করে।",
    description_en:
      "Works on women's empowerment, domestic violence prevention, and land rights in the Jessore and Khulna region.",
    specializations: ["domestic_violence", "family_law", "land_law"],
    districts: ["যশোর", "খুলনা", "নড়াইল"],
    phone: "+880-421-72254",
    email: "bancheteshekha@gmail.com",
    address_bn: "বিজয়নগর, যশোর",
    is_free: true,
    verified: true,
  },
  {
    id: "bnps",
    name_bn: "বাংলাদেশ নারী প্রগতি সংঘ (বিএনপিএস)",
    name_en: "Bangladesh Nari Pragati Sangha (BNPS)",
    description_bn:
      "নারীর আর্থ-সামাজিক অধিকার ও পারিবারিক সুরক্ষায় কাজ করে। রাজশাহী ও নওগাঁয় বিশেষভাবে সক্রিয়।",
    description_en:
      "Works for women's socio-economic rights and domestic protection, particularly active in Rajshahi and Naogaon.",
    specializations: ["domestic_violence", "family_law", "labor_law"],
    districts: ["রাজশাহী", "নওগাঁ", "চাঁপাইনবাবগঞ্জ"],
    phone: "+880-721-773668",
    email: "bnps@bnps-bd.org",
    address_bn: "শালবাগান, রাজশাহী",
    is_free: true,
    verified: true,
  },
  {
    id: "consumer-rights",
    name_bn: "কনজুমার্স অ্যাসোসিয়েশন অব বাংলাদেশ (ক্যাব)",
    name_en: "Consumers Association of Bangladesh (CAB)",
    description_bn:
      "ভোক্তা অধিকার সংরক্ষণ ও প্রতারণামূলক ব্যবসায়িক কার্যক্রমের বিরুদ্ধে আইনি সহায়তা প্রদান করে।",
    description_en:
      "Protects consumer rights and provides legal assistance against fraudulent business practices.",
    specializations: ["consumer_rights"],
    districts: ["ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "সিলেট"],
    phone: "+880-2-9111937",
    email: "cab@cabbd.org",
    website: "https://www.cabbd.org",
    address_bn: "৮/২ সেগুনবাগিচা, ঢাকা-১০০০",
    is_free: true,
    verified: true,
  },
  {
    id: "cyber-helpline",
    name_bn: "সাইবার ক্রাইম অ্যাওয়ারনেস ফাউন্ডেশন",
    name_en: "Cyber Crime Awareness Foundation",
    description_bn:
      "সাইবার অপরাধের শিকারদের আইনি সহায়তা ও মানসিক সহযোগিতা প্রদান করে। অনলাইন হয়রানি, প্রতারণা বিষয়ে বিশেষ দক্ষতা।",
    description_en:
      "Provides legal assistance and psychological support to victims of cybercrime, with expertise in online harassment and fraud.",
    specializations: ["cyber_law"],
    districts: ["ঢাকা", "চট্টগ্রাম"],
    phone: "+880-1730-345345",
    email: "info@ccabd.org",
    is_free: true,
    verified: true,
  },
];

export function getNGOsByCategory(category: string): NGO[] {
  return ngos.filter((ngo) =>
    ngo.specializations.includes(category as NGO["specializations"][0])
  );
}

export function getNGOsByDistrict(district: string): NGO[] {
  return ngos.filter((ngo) => ngo.districts.includes(district));
}

export function getAllDistricts(): string[] {
  const districts = new Set<string>();
  ngos.forEach((ngo) => ngo.districts.forEach((d) => districts.add(d)));
  return Array.from(districts).sort();
}
