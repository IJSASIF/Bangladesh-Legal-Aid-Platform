"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Phone, Mail, Globe, MapPin, Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/app/providers";
import { lawyerOrgs } from "@/data/lawyers";
import { CATEGORIES } from "@/lib/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TYPE_LABELS = {
  pro_bono: { bn: "প্রো-বোনো", en: "Pro Bono" },
  legal_aid: { bn: "লিগ্যাল এইড", en: "Legal Aid" },
  clinic: { bn: "লিগ্যাল ক্লিনিক", en: "Legal Clinic" },
};

const TYPE_COLORS = {
  pro_bono: "bg-purple-50 text-purple-700 border-purple-200",
  legal_aid: "bg-blue-50 text-blue-700 border-blue-200",
  clinic: "bg-green-50 text-green-700 border-green-200",
};

export default function LawyersPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [spec, setSpec] = useState("all");

  const filtered = useMemo(() => {
    return lawyerOrgs.filter((l) => {
      const matchSearch =
        !search ||
        l.name_bn.includes(search) ||
        l.name_en.toLowerCase().includes(search.toLowerCase()) ||
        l.description_bn.includes(search);
      const matchSpec = spec === "all" || l.specializations.includes(spec);
      return matchSearch && matchSpec;
    });
  }, [search, spec]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <div className="bg-hero text-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-bangla mb-3">
              {t("আইনি সহায়তা কেন্দ্রসমূহ", "Legal Aid Centers")}
            </h1>
            <p className="text-green-100 font-bangla max-w-xl mx-auto">
              {t("বিনামূল্যে আইনি সেবা প্রদানকারী সংস্থা ও ক্লিনিকসমূহ। আপনার সমস্যা অনুযায়ী সঠিক আইনজীবী খুঁজুন।", "Organizations and clinics providing free legal services. Find the right legal help for your problem.")}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("সংস্থা খুঁজুন...", "Search organizations...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 font-bangla"
              />
            </div>
            <Select value={spec} onValueChange={(v) => setSpec(v ?? "all")}>
              <SelectTrigger className="w-full sm:w-56 font-bangla">
                <SelectValue placeholder={t("বিশেষজ্ঞতা", "Specialization")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="font-bangla">{t("সব বিভাগ", "All Categories")}</SelectItem>
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
            {filtered.length} {t("টি সংস্থা পাওয়া গেছে", "organizations found")}
          </p>

          <div className="space-y-4">
            {filtered.map((org, i) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.06, 0.3) }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-bd-green-50 dark:bg-accent rounded-xl flex items-center justify-center shrink-0">
                        <Scale className="w-6 h-6 text-bd-green" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                          <div>
                            <h3 className="font-bangla font-semibold text-foreground text-base leading-tight">
                              {t(org.name_bn, org.name_en)}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{org.name_en}</p>
                          </div>
                          <span className={`text-xs font-bangla font-medium px-2.5 py-1 rounded-full border ${TYPE_COLORS[org.type]}`}>
                            {t(TYPE_LABELS[org.type].bn, TYPE_LABELS[org.type].en)}
                          </span>
                        </div>

                        <p className="font-bangla text-sm text-muted-foreground leading-relaxed mb-3">
                          {t(org.description_bn, org.description_en)}
                        </p>

                        {/* Specializations */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {org.specializations.map((s) => {
                            const cat = CATEGORIES[s as keyof typeof CATEGORIES];
                            return cat ? (
                              <Badge key={s} variant="secondary" className="font-bangla text-xs">
                                {cat.icon} {t(cat.label_bn, cat.label_en)}
                              </Badge>
                            ) : null;
                          })}
                        </div>

                        {/* Contact */}
                        <div className="flex flex-wrap gap-3 text-sm">
                          {org.phone && (
                            <a href={`tel:${org.phone}`} className="flex items-center gap-1.5 text-bd-green hover:underline font-bangla">
                              <Phone className="w-3.5 h-3.5" />
                              {org.phone}
                            </a>
                          )}
                          {org.email && (
                            <a href={`mailto:${org.email}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                              <Mail className="w-3.5 h-3.5" />
                              {org.email}
                            </a>
                          )}
                          {org.website && (
                            <a href={org.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                              <Globe className="w-3.5 h-3.5" />
                              {t("ওয়েবসাইট", "Website")}
                            </a>
                          )}
                          {org.districts.length > 0 && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground font-bangla">
                              <MapPin className="w-3 h-3" />
                              {org.districts.slice(0, 3).join(", ")}
                              {org.districts.length > 3 && ` +${org.districts.length - 3}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-bangla">
              {t("কোনো সংস্থা পাওয়া যায়নি।", "No organizations found.")}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
