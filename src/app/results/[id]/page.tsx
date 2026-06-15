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
              {t(
                "এই ফলাফলটি আর পাওয়া যাচ্ছে না।",
                "This result is no longer available."
              )}
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
  const severityColor =
    analysis.severity === "high"
      ? "text-red-600 bg-red-50"
      : analysis.severity === "medium"
        ? "text-amber-600 bg-amber-50"
        : "text-green-600 bg-green-50";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-bangla mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("ফিরে যান", "Go Back")}
        </button>

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
                  <span
                    className={`text-xs font-bangla font-medium px-3 py-1 rounded-full ${severityColor}`}
                  >
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
              {/* Problem */}
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground font-bangla mb-1">
                  {t("আপনার সমস্যা:", "Your Problem:")}
                </p>
                <p className="text-sm font-bangla text-foreground leading-relaxed line-clamp-4">
                  {result.problem_text}
                </p>
              </div>

              <Separator />

              {/* AI Summary */}
              <div>
                <h3 className="font-bangla font-semibold text-foreground mb-2">
                  {t("AI বিশ্লেষণ:", "AI Analysis:")}
                </h3>
                <p className="font-bangla text-muted-foreground leading-relaxed">
                  {t(analysis.summary_bn, analysis.summary_en)}
                </p>
              </div>

              {/* Keywords */}
              {analysis.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((kw) => (
                    <Badge
                      key={kw}
                      variant="secondary"
                      className="font-bangla text-xs"
                    >
                      {kw}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator />

              {/* Recommended Action */}
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
                <span className="hidden sm:inline">
                  {t("সংস্থাসমূহ", "NGOs")}
                </span>
                <Badge
                  variant="secondary"
                  className="ml-1 text-xs"
                >
                  {result.matched_ngos.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="laws"
                className="font-bangla py-3 gap-1.5 data-[state=active]:bg-bd-green data-[state=active]:text-white"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {t("আইন বিভাগ", "Law Sections")}
                </span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {result.law_sections.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="templates"
                className="font-bangla py-3 gap-1.5 data-[state=active]:bg-bd-green data-[state=active]:text-white"
              >
                <FileDown className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {t("নথি টেমপ্লেট", "Templates")}
                </span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {result.templates.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            {/* NGOs Tab */}
            <TabsContent value="ngos" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.matched_ngos.map((ngo, i) => (
                  <motion.div
                    key={ngo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <NGOCard ngo={ngo} highlighted={i === 0} />
                  </motion.div>
                ))}
              </div>
              {result.matched_ngos.length === 0 && (
                <div className="text-center py-12 text-muted-foreground font-bangla">
                  {t(
                    "এই বিভাগের জন্য কোনো সংস্থা পাওয়া যায়নি।",
                    "No NGOs found for this category."
                  )}
                </div>
              )}
            </TabsContent>

            {/* Laws Tab */}
            <TabsContent value="laws" className="mt-6">
              <div className="space-y-4">
                {result.law_sections.map((law, i) => (
                  <motion.div
                    key={law.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground font-bangla mb-1">
                              {t(law.law_name_bn, law.law_name_en)}{" "}
                              {law.year && `(${law.year})`}
                            </p>
                            <h3 className="font-bangla font-semibold text-foreground">
                              {law.section_number} — {t(law.title_bn, law.title_en)}
                            </h3>
                          </div>
                          <CategoryBadge
                            category={law.category}
                            size="sm"
                            showIcon={false}
                          />
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

            {/* Templates Tab */}
            <TabsContent value="templates" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.templates.map((template, i) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
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
                              {t(
                                template.description_bn,
                                template.description_en
                              )}
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

          {/* New Analysis CTA */}
          <div className="bg-muted/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bangla font-semibold text-foreground mb-1">
                {t("আরও সমস্যা আছে?", "Have More Problems?")}
              </h3>
              <p className="text-sm text-muted-foreground font-bangla">
                {t(
                  "নতুন আইনি সমস্যার জন্য আবার বিশ্লেষণ করুন।",
                  "Analyze again for a new legal problem."
                )}
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
