"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  AlertTriangle,
  Phone,
  Globe,
  MapPin,
  FileDown,
  BookOpen,
  Building2,
  ChevronRight,
  ArrowLeft,
  Share2,
  Printer,
  PhoneCall,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { NGOCard } from "@/components/shared/NGOCard";
import { useLanguage } from "@/app/providers";
import type { CaseResult } from "@/lib/types";
import Link from "next/link";
import { toast } from "sonner";

const EMERGENCY_HOTLINES = [
  { label_bn: "জাতীয় জরুরি সেবা", label_en: "National Emergency", number: "999" },
  { label_bn: "নারী ও শিশু সহায়তা", label_en: "Women & Child Helpline", number: "10921" },
  { label_bn: "জাতীয় হেল্পলাইন", label_en: "National Helpline", number: "16492" },
  { label_bn: "লিগ্যাল এইড হেল্পলাইন", label_en: "Legal Aid Helpline", number: "16430" },
];

function DownloadTemplate(template: {
  title_bn: string;
  title_en: string;
  template_content: string;
}) {
  const blob = new Blob([template.template_content], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${template.title_bn}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ResultsPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<CaseResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const stored = localStorage.getItem(`case_${id}`);
    if (stored) {
      setResult(JSON.parse(stored));
    }
    setLoading(false);
  }, [params.id]);

  const handlePDFExport = () => {
    if (!result) return;
    const { analysis } = result;
    const ngos = result.matched_ngos.slice(0, 4);
    const date = new Date(result.created_at).toLocaleDateString("bn-BD");

    const html = `<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<title>আইনি সহায়তা বিশ্লেষণ রিপোর্ট</title>
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  body{font-family:'Hind Siliguri',sans-serif;padding:48px;color:#111;max-width:720px;margin:0 auto;line-height:1.8}
  h1{color:#006A4E;font-size:22px;margin-bottom:4px}
  .meta{color:#666;font-size:13px;margin-bottom:32px}
  .section{margin:20px 0;padding:16px;border:1px solid #e5e7eb;border-radius:8px}
  .label{font-weight:700;font-size:11px;color:#006A4E;letter-spacing:.05em;text-transform:uppercase;margin-bottom:8px}
  .value{font-size:14px;color:#222}
  .ngo{padding:10px 0;border-bottom:1px solid #f3f4f6}
  .ngo:last-child{border-bottom:none}
  .footer{margin-top:48px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:11px;color:#999}
  @media print{body{padding:24px}}
</style>
</head>
<body>
<h1>বাংলাদেশ আইনি সহায়তা প্ল্যাটফর্ম</h1>
<div class="meta">বিশ্লেষণ তারিখ: ${date} &nbsp;|&nbsp; বিশ্লেষণ ID: ${result.id.slice(0, 8)}</div>

<div class="section">
  <div class="label">আপনার সমস্যা</div>
  <div class="value">${result.problem_text}</div>
</div>

<div class="section">
  <div class="label">AI বিশ্লেষণ</div>
  <div class="value">${analysis.summary_bn}</div>
</div>

<div class="section">
  <div class="label">পরবর্তী পদক্ষেপ</div>
  <div class="value">${analysis.recommended_action_bn}</div>
</div>

<div class="section">
  <div class="label">যোগাযোগযোগ্য সংস্থা</div>
  ${ngos.map(n => `<div class="ngo"><strong>${n.name_bn}</strong>${n.phone ? ` — ${n.phone}` : ''}${n.districts?.[0] ? ` — ${n.districts[0]}` : ''}</div>`).join('')}
</div>

<div class="footer">
  এই রিপোর্ট bangladesh-legal-aid-platform.vercel.app দ্বারা তৈরি।
  এটি পেশাদার আইনি পরামর্শের বিকল্প নয়। গুরুত্বপূর্ণ মামলায় আইনজীবীর পরামর্শ নিন।
</div>
</body></html>`;

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
      setTimeout(() => win.print(), 800);
    }
  };

  const handleWhatsAppShare = () => {
    if (!result) return;
    const { analysis } = result;
    const text = `🏛️ *বাংলাদেশ আইনি সহায়তা*\n\n*সমস্যা:* ${result.problem_text.slice(0, 150)}...\n\n*বিশ্লেষণ:* ${analysis.summary_bn}\n\n*পরবর্তী পদক্ষেপ:* ${analysis.recommended_action_bn}\n\n🔗 https://bangladesh-legal-aid-platform.vercel.app`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center font-bangla text-muted-foreground">
            {t("লোড হচ্ছে...", "Loading...")}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-bangla font-semibold text-xl mb-2">
              {t("ফলাফল পাওয়া যায়নি", "Result Not Found")}
            </h2>
            <p className="text-muted-foreground font-bangla mb-6">
              {t("এই ফলাফলটি আর পাওয়া যাচ্ছে না।", "This result is no longer available.")}
            </p>
            <Link href="/submit">
              <Button className="bg-bd-green text-white font-bangla">
                {t("নতুন বিশ্লেষণ করুন", "New Analysis")}
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { analysis } = result;
  const isEmergency =
    analysis.category === "domestic_violence" ||
    analysis.category === "human_rights";
  const severityColor =
    analysis.severity === "high"
      ? "text-red-600 bg-red-50"
      : analysis.severity === "medium"
        ? "text-amber-600 bg-amber-50"
        : "text-green-600 bg-green-50";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Emergency Banner */}
      {isEmergency && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 text-white py-3 px-4"
        >
          <div className="max-w-5xl mx-auto">
            <p className="font-bangla font-semibold text-sm mb-2 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 shrink-0" />
              {t("জরুরি সহায়তার জন্য এখনই যোগাযোগ করুন:", "For emergency help, call now:")}
            </p>
            <div className="flex flex-wrap gap-3">
              {EMERGENCY_HOTLINES.map((h) => (
                <a
                  key={h.number}
                  href={`tel:${h.number}`}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition-colors rounded-lg px-3 py-1.5 text-sm font-bangla font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {t(h.label_bn, h.label_en)}: {h.number}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Back + Actions Row */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-bangla transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("ফিরে যান", "Go Back")}
          </button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsAppShare}
              className="font-bangla text-xs gap-1.5 text-green-600 border-green-200 hover:bg-green-50"
            >
              <Share2 className="w-3.5 h-3.5" />
              {t("শেয়ার করুন", "Share")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePDFExport}
              className="font-bangla text-xs gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              {t("PDF সংরক্ষণ", "Save PDF")}
            </Button>
            <Link href="/history">
              <Button variant="ghost" size="sm" className="font-bangla text-xs gap-1.5 text-muted-foreground">
                <History className="w-3.5 h-3.5" />
                {t("ইতিহাস", "History")}
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Summary Card */}
          <Card className="border-bd-green/30 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-bd-green" />
                    <span className="text-sm font-bangla text-bd-green font-medium">
                      {t("বিশ্লেষণ সম্পন্ন", "Analysis Complete")}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold font-bangla text-foreground">
                    {t("আপনার সমস্যার ফলাফল", "Your Problem Results")}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryBadge category={analysis.category} size="md" />
                  <span className={`text-xs font-bangla font-medium px-3 py-1 rounded-full ${severityColor}`}>
                    {analysis.severity === "high"
                      ? t("জরুরি", "Urgent")
                      : analysis.severity === "medium"
                        ? t("মাঝারি", "Medium")
                        : t("সাধারণ", "Low")}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground font-bangla mb-1">
                  {t("আপনার সমস্যা:", "Your Problem:")}
                </p>
                <p className="text-sm font-bangla text-foreground leading-relaxed line-clamp-4">
                  {result.problem_text}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-bangla font-semibold text-foreground mb-2">
                  {t("AI বিশ্লেষণ:", "AI Analysis:")}
                </h3>
                <p className="font-bangla text-muted-foreground leading-relaxed">
                  {t(analysis.summary_bn, analysis.summary_en)}
                </p>
              </div>

              {analysis.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="font-bangla text-xs">
                      {kw}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator />

              <div className="p-4 bg-bd-green-50 dark:bg-accent rounded-xl">
                <p className="text-xs font-bangla text-bd-green font-medium mb-1">
                  {t("পরবর্তী পদক্ষেপ:", "Recommended Action:")}
                </p>
                <p className="font-bangla text-sm text-foreground leading-relaxed">
                  {analysis.recommended_action_bn}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results Tabs */}
          <Tabs defaultValue="ngos">
            <TabsList className="w-full grid grid-cols-3 h-auto">
              <TabsTrigger
                value="ngos"
                className="font-bangla py-3 gap-1.5 data-[state=active]:bg-bd-green data-[state=active]:text-white"
              >
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">{t("সংস্থাসমূহ", "NGOs")}</span>
                <Badge variant="secondary" className="ml-1 text-xs">{result.matched_ngos.length}</Badge>
              </TabsTrigger>
              <TabsTrigger
                value="laws"
                className="font-bangla py-3 gap-1.5 data-[state=active]:bg-bd-green data-[state=active]:text-white"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">{t("আইন বিভাগ", "Law Sections")}</span>
                <Badge variant="secondary" className="ml-1 text-xs">{result.law_sections.length}</Badge>
              </TabsTrigger>
              <TabsTrigger
                value="templates"
                className="font-bangla py-3 gap-1.5 data-[state=active]:bg-bd-green data-[state=active]:text-white"
              >
                <FileDown className="w-4 h-4" />
                <span className="hidden sm:inline">{t("নথি টেমপ্লেট", "Templates")}</span>
                <Badge variant="secondary" className="ml-1 text-xs">{result.templates.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ngos" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.matched_ngos.map((ngo, i) => (
                  <motion.div key={ngo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <NGOCard ngo={ngo} highlighted={i === 0} />
                  </motion.div>
                ))}
              </div>
              {result.matched_ngos.length === 0 && (
                <div className="text-center py-12 text-muted-foreground font-bangla">
                  {t("এই বিভাগের জন্য কোনো সংস্থা পাওয়া যায়নি।", "No NGOs found for this category.")}
                </div>
              )}
            </TabsContent>

            <TabsContent value="laws" className="mt-6">
              <div className="space-y-4">
                {result.law_sections.map((law, i) => (
                  <motion.div key={law.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground font-bangla mb-1">
                              {t(law.law_name_bn, law.law_name_en)} {law.year && `(${law.year})`}
                            </p>
                            <h3 className="font-bangla font-semibold text-foreground">
                              {law.section_number} — {t(law.title_bn, law.title_en)}
                            </h3>
                          </div>
                          <CategoryBadge category={law.category} size="sm" showIcon={false} />
                        </div>
                        <p className="font-bangla text-sm text-muted-foreground leading-relaxed">
                          {t(law.summary_bn, law.summary_en)}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.templates.map((template, i) => (
                  <motion.div key={template.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <Card className="card-hover">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-bd-green-50 dark:bg-accent rounded-lg flex items-center justify-center shrink-0">
                            <FileDown className="w-5 h-5 text-bd-green" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bangla font-semibold text-foreground text-sm mb-1">
                              {t(template.title_bn, template.title_en)}
                            </h3>
                            <p className="text-xs text-muted-foreground font-bangla line-clamp-2 mb-3">
                              {t(template.description_bn, template.description_en)}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full font-bangla text-xs border-bd-green text-bd-green hover:bg-bd-green hover:text-white"
                              onClick={() => DownloadTemplate(template)}
                            >
                              <FileDown className="w-3.5 h-3.5 mr-1.5" />
                              {t("ডাউনলোড করুন", "Download")}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-muted/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bangla font-semibold text-foreground mb-1">
                {t("আরও সমস্যা আছে?", "Have More Problems?")}
              </h3>
              <p className="text-sm text-muted-foreground font-bangla">
                {t("নতুন আইনি সমস্যার জন্য আবার বিশ্লেষণ করুন।", "Analyze again for a new legal problem.")}
              </p>
            </div>
            <Link href="/submit">
              <Button className="bg-bd-green hover:bg-bd-green-600 text-white font-bangla whitespace-nowrap">
                {t("নতুন বিশ্লেষণ", "New Analysis")}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
