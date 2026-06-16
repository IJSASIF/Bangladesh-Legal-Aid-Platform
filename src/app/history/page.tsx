"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History, Trash2, ArrowRight, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { useLanguage } from "@/app/providers";
import type { CaseResult } from "@/lib/types";
import Link from "next/link";
import { toast } from "sonner";

export default function HistoryPage() {
  const { t } = useLanguage();
  const [cases, setCases] = useState<CaseResult[]>([]);

  useEffect(() => {
    const results: CaseResult[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("case_")) {
        try {
          const data = JSON.parse(localStorage.getItem(key)!);
          results.push(data);
        } catch {}
      }
    }
    results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setCases(results);
  }, []);

  const deleteCase = (id: string) => {
    localStorage.removeItem(`case_${id}`);
    setCases((prev) => prev.filter((c) => c.id !== id));
    toast.success(t("কেস মুছে ফেলা হয়েছে", "Case deleted"));
  };

  const clearAll = () => {
    cases.forEach((c) => localStorage.removeItem(`case_${c.id}`));
    setCases([]);
    toast.success(t("সব ইতিহাস মুছে ফেলা হয়েছে", "All history cleared"));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <div className="bg-hero text-white py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-bangla mb-3">
              {t("বিশ্লেষণের ইতিহাস", "Analysis History")}
            </h1>
            <p className="text-green-100 font-bangla max-w-xl mx-auto">
              {t("আপনার সকল পূর্ববর্তী বিশ্লেষণ এখানে সংরক্ষিত আছে।", "All your previous analyses are saved here.")}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {cases.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground font-bangla">
                  {cases.length} {t("টি বিশ্লেষণ পাওয়া গেছে", "analyses found")}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 font-bangla text-xs gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {t("সব মুছুন", "Clear All")}
                </Button>
              </div>

              <div className="space-y-4">
                {cases.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="card-hover group">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <CategoryBadge category={c.analysis.category} size="sm" />
                              <span className={`text-xs font-bangla font-medium px-2 py-0.5 rounded-full ${
                                c.analysis.severity === "high" ? "text-red-600 bg-red-50" :
                                c.analysis.severity === "medium" ? "text-amber-600 bg-amber-50" :
                                "text-green-600 bg-green-50"
                              }`}>
                                {c.analysis.severity === "high" ? t("জরুরি","Urgent") :
                                 c.analysis.severity === "medium" ? t("মাঝারি","Medium") : t("সাধারণ","Low")}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground font-bangla ml-auto">
                                <Clock className="w-3 h-3" />
                                {new Date(c.created_at).toLocaleDateString("bn-BD")}
                              </span>
                            </div>
                            <p className="font-bangla text-sm text-foreground leading-relaxed line-clamp-2 mb-2">
                              {c.problem_text}
                            </p>
                            <p className="font-bangla text-xs text-muted-foreground line-clamp-1">
                              {c.analysis.summary_bn}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => deleteCase(c.id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <Link href={`/results/${c.id}`}>
                              <Button size="sm" variant="outline" className="font-bangla text-xs gap-1 border-bd-green text-bd-green hover:bg-bd-green hover:text-white">
                                {t("দেখুন", "View")}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <History className="w-14 h-14 text-muted-foreground/40 mx-auto mb-4" />
              <h2 className="font-bangla font-semibold text-xl text-foreground mb-2">
                {t("কোনো ইতিহাস নেই", "No History Yet")}
              </h2>
              <p className="text-muted-foreground font-bangla mb-6 max-w-sm mx-auto">
                {t("আপনি এখনো কোনো সমস্যা বিশ্লেষণ করেননি।", "You haven't analyzed any problems yet.")}
              </p>
              <Link href="/submit">
                <Button className="bg-bd-green hover:bg-bd-green-600 text-white font-bangla">
                  {t("প্রথম বিশ্লেষণ শুরু করুন", "Start Your First Analysis")}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
