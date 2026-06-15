"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NGOCard } from "@/components/shared/NGOCard";
import { useLanguage } from "../providers";
import { ngos, getAllDistricts } from "@/data/ngos";
import { CATEGORIES } from "@/lib/categories";

export default function NGOsPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [district, setDistrict] = useState("all");

  const districts = getAllDistricts();

  const filtered = useMemo(() => {
    return ngos.filter((ngo) => {
      const matchSearch =
        !search ||
        ngo.name_bn.includes(search) ||
        ngo.name_en.toLowerCase().includes(search.toLowerCase()) ||
        ngo.description_bn.includes(search);

      const matchCategory =
        category === "all" ||
        ngo.specializations.includes(category as never);

      const matchDistrict =
        district === "all" || ngo.districts.includes(district);

      return matchSearch && matchCategory && matchDistrict;
    });
  }, [search, category, district]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-hero text-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-bangla mb-3">
              {t("আইনি সহায়তা সংস্থাসমূহ", "Legal Aid NGOs")}
            </h1>
            <p className="text-green-100 font-bangla max-w-xl mx-auto">
              {t(
                "বাংলাদেশের যাচাইকৃত আইনি সহায়তা সংস্থাসমূহ। সবাই বিনামূল্যে সেবা প্রদান করে।",
                "Verified legal aid organizations in Bangladesh. All provide services for free."
              )}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("সংস্থা খুঁজুন...", "Search NGOs...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 font-bangla"
              />
            </div>
            <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
              <SelectTrigger className="w-full sm:w-48 font-bangla">
                <Filter className="w-4 h-4 mr-2" />
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
            <Select value={district} onValueChange={(v) => setDistrict(v ?? "all")}>
              <SelectTrigger className="w-full sm:w-48 font-bangla">
                <SelectValue placeholder={t("জেলা", "District")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="font-bangla">
                  {t("সব জেলা", "All Districts")}
                </SelectItem>
                {districts.map((d) => (
                  <SelectItem key={d} value={d} className="font-bangla">
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground font-bangla mb-6">
            {filtered.length} {t("টি সংস্থা পাওয়া গেছে", "organizations found")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((ngo, i) => (
              <motion.div
                key={ngo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
              >
                <NGOCard ngo={ngo} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-bangla">
              {t(
                "কোনো সংস্থা পাওয়া যায়নি। ফিল্টার পরিবর্তন করুন।",
                "No NGOs found. Try changing the filters."
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
