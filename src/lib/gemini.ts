import type { AnalysisResult, LegalCategory } from "./types";

const SYSTEM_PROMPT = `তুমি বাংলাদেশের একজন বিশেষজ্ঞ আইনি সহায়তা বিশ্লেষক। ব্যবহারকারীর বাংলায় লেখা আইনি সমস্যা বিশ্লেষণ করে নিচের JSON ফরম্যাটে উত্তর দাও।

বৈধ ক্যাটাগরিসমূহ:
- labor_law: শ্রমিকের অধিকার, বেতন, চাকরিচ্যুতি, কারখানা সমস্যা
- family_law: বিবাহ, তালাক, দেনমোহর, ভরণপোষণ, যৌতুক
- property_law: সম্পত্তি বিক্রয়, দলিল, উত্তরাধিকার
- criminal_law: চুরি, মারামারি, প্রতারণা, হুমকি
- human_rights: পুলিশি নির্যাতন, বিচারবহির্ভূত হত্যা, গুম
- land_law: ভূমি দখল, খতিয়ান, নামজারি, সীমানা বিরোধ
- domestic_violence: পারিবারিক নির্যাতন, শারীরিক আঘাত, মানসিক নির্যাতন
- child_rights: শিশু নির্যাতন, বাল্যবিবাহ, শিশু শ্রম
- consumer_rights: ভেজাল পণ্য, প্রতারণা, সেবা নিম্নমান
- cyber_law: অনলাইন হয়রানি, সাইবার প্রতারণা, ফেক আইডি
- general: অন্যান্য আইনি সমস্যা

JSON ফরম্যাট (বাংলায় উত্তর দাও, English fields ও রাখো):
{
  "category": "category_slug",
  "confidence": 0.0-1.0,
  "district": "জেলার নাম যদি উল্লেখ থাকে অথবা null",
  "summary_bn": "৩-৪ বাক্যে সমস্যার সারসংক্ষেপ বাংলায়",
  "summary_en": "3-4 sentence problem summary in English",
  "keywords": ["মূল", "কীওয়ার্ড", "৩-৫টি"],
  "severity": "low|medium|high",
  "recommended_action_bn": "পরবর্তী পদক্ষেপ বাংলায় ২-৩ বাক্যে"
}

শুধু JSON রিটার্ন করো, অন্য কিছু না।`;

async function callGemini(parts: unknown[]): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ role: "user", parts }] }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const responseText: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid AI response format");

  const parsed = JSON.parse(jsonMatch[0]);
  return {
    category: (parsed.category as LegalCategory) ?? "general",
    confidence: Number(parsed.confidence) ?? 0.7,
    district: parsed.district ?? undefined,
    summary_bn: parsed.summary_bn ?? "আপনার সমস্যা বিশ্লেষণ করা হয়েছে।",
    summary_en: parsed.summary_en ?? "Your problem has been analyzed.",
    keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
    severity: parsed.severity ?? "medium",
    recommended_action_bn:
      parsed.recommended_action_bn ?? "একটি আইনি সহায়তা সংস্থায় যোগাযোগ করুন।",
  };
}

export async function analyzeCase(problemText: string): Promise<AnalysisResult> {
  return callGemini([
    { text: SYSTEM_PROMPT },
    { text: `সমস্যা: ${problemText}` },
  ]);
}

export async function analyzeImageCase(
  imageBase64: string,
  mimeType: string,
  additionalText?: string
): Promise<AnalysisResult> {
  const parts: unknown[] = [
    { text: SYSTEM_PROMPT + "\n\nনিচের ছবিতে একটি আইনি সমস্যা বা নথি আছে। ছবি দেখে JSON বিশ্লেষণ দাও।" },
    { inline_data: { mime_type: mimeType, data: imageBase64 } },
  ];
  if (additionalText) parts.push({ text: `অতিরিক্ত তথ্য: ${additionalText}` });
  return callGemini(parts);
}
