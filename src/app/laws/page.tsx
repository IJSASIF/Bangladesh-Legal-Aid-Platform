"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { useLanguage } from "../providers";
import { lawSections } from "@/data/laws";
import { CATEGORIES } from "@/lib/categories";

function LawsContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(initialCategory);

  const filtered = useMemo(() => {
    return lawSections.filter((law) => {
      const matchSearch =
        !search ||
        law.title_bn.includes(search) ||
        law.title_en.toLowerCase().includes(search.toLowerCase()) ||
        law.law_name_bn.includes(search) ||
        law.summary_bn.includes(search);

      const matchCategory =
        category === "all" || law.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-hero text-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-bangla mb-3">
              {t("আইন বিভাগসমূহ", "Law Sections")}
            </h1>
            <p className="text-green-100 font-bangla max-w-xl mx-auto">
              {t(
                "বাংলাদেশের গুরুত্বপূর্ণ আইনের সহজ বাংলা সারসংক্ষেপ। আপনার অধিকার জানুন।",
                "Simple Bangla summaries of important Bangladesh laws. Know your rights."
              )}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("আইন খুঁজুন...", "Search laws...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 font-bangla"
              />
            </div>
            <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
              <SelectTrigger className="w-full sm:w-56 font-bangla">
                <SelectValue placeholder={t("আইনি বিভাগ", "Category")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="font-bangla">
                  {t("সব বিভাগ", "All Categories")}
                </SelectItem>
                {Object.entries(CATEGORIES)
                  .filter(([k]) => k !== "general")
                  .map(([key, cat]) => (
                    <SelectItem key={key} value={key} className="font-bangla">
                      {cat.icon} {t(cat.label_bn, cat.label_en)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground font-bangla mb-6">
            {filtered.length} {t("টি আইন বিভাগ পাওয়া গেছে", "law sections found")}
          </p>

          <div className="space-y-4">
            {filtered.map((law, i) => (
              <motion.div
                key={law.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.3) }}
              >
                <Card className="card-hover">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground font-bangla mb-1">
                          {t(law.law_name_bn, law.law_name_en)}{" "}
                          {law.year && (
                            <span className="text-bd-green font-medium">
                              ({law.year})
                            </span>
                          )}
                        </p>
                        <h3 className="font-bangla font-semibold text-foreground">
                          <span className="text-bd-green">
                            {law.section_number}
                          </span>{" "}
                          — {t(law.title_bn, law.title_en)}
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

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-bangla">
              {t(
                "কোনো আইন বিভাগ পাওয়া যায়নি।",
                "No law sections found."
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LawsPage() {
  return (
    <Suspense>
      <LawsContent />
    </Suspense>
  );
}
