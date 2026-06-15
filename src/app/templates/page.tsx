"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FileDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { useLanguage } from "../providers";
import { templates } from "@/data/templates";
import { CATEGORIES } from "@/lib/categories";
import { toast } from "sonner";

function downloadTemplate(template: {
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

export default function TemplatesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return templates.filter((tmpl) => {
      const matchSearch =
        !search ||
        tmpl.title_bn.includes(search) ||
        tmpl.title_en.toLowerCase().includes(search.toLowerCase()) ||
        tmpl.description_bn.includes(search);

      const matchCategory =
        category === "all" ||
        tmpl.category === category ||
        tmpl.category === "general";

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
              {t("নথি টেমপ্লেটসমূহ", "Document Templates")}
            </h1>
            <p className="text-green-100 font-bangla max-w-xl mx-auto">
              {t(
                "আইনি কাজে প্রয়োজনীয় নথিপত্রের প্রস্তুত টেমপ্লেট। বিনামূল্যে ডাউনলোড করুন।",
                "Ready templates for legal documents. Download for free."
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
                placeholder={t("টেমপ্লেট খুঁজুন...", "Search templates...")}
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
                {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <SelectItem key={key} value={key} className="font-bangla">
                    {cat.icon} {t(cat.label_bn, cat.label_en)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground font-bangla mb-6">
            {filtered.length} {t("টি টেমপ্লেট পাওয়া গেছে", "templates found")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.08, 0.4) }}
              >
                <Card className="card-hover h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-bd-green-50 dark:bg-accent rounded-xl flex items-center justify-center shrink-0">
                        <FileDown className="w-6 h-6 text-bd-green" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bangla font-semibold text-foreground mb-1 leading-snug">
                          {t(template.title_bn, template.title_en)}
                        </h3>
                        <CategoryBadge
                          category={template.category}
                          size="sm"
                          showIcon={false}
                        />
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground font-bangla leading-relaxed flex-1 mb-4">
                      {t(template.description_bn, template.description_en)}
                    </p>

                    {/* Variables */}
                    {template.variables.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {template.variables.slice(0, 4).map((v) => (
                          <Badge
                            key={v}
                            variant="outline"
                            className="text-xs font-bangla"
                          >
                            {`{{${v}}}`}
                          </Badge>
                        ))}
                        {template.variables.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.variables.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}

                    <Button
                      className="w-full bg-bd-green hover:bg-bd-green-600 text-white font-bangla"
                      onClick={() => {
                        downloadTemplate(template);
                        toast.success(
                          t(
                            "টেমপ্লেট ডাউনলোড হচ্ছে...",
                            "Template downloading..."
                          )
                        );
                      }}
                    >
                      <FileDown className="w-4 h-4 mr-2" />
                      {t("টেমপ্লেট ডাউনলোড করুন", "Download Template")}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-bangla">
              {t(
                "কোনো টেমপ্লেট পাওয়া যায়নি।",
                "No templates found."
              )}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-10 p-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
            <p className="text-sm text-amber-800 dark:text-amber-200 font-bangla">
              ⚠️{" "}
              {t(
                "এই টেমপ্লেটগুলো শুধুমাত্র নমুনা হিসেবে প্রদান করা হয়েছে। আপনার নির্দিষ্ট পরিস্থিতি অনুযায়ী পরিবর্তন করুন এবং পেশাদার আইনজীবীর পরামর্শ নিন।",
                "These templates are provided as samples only. Modify them according to your specific situation and consult a professional lawyer."
              )}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
