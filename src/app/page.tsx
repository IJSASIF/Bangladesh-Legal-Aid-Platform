"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Search,
  Scale,
  Users,
  FileText,
  CheckCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NGOCard } from "@/components/shared/NGOCard";
import { useLanguage } from "./providers";
import { ngos } from "@/data/ngos";
import { CATEGORIES } from "@/lib/categories";
import type { LegalCategory } from "@/lib/types";

function Counter({ to, label }: { to: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 40);
    return () => clearInterval(timer);
  }, [inView, to]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white">{count}+</div>
      <div className="text-green-200 font-bangla text-sm mt-1">{label}</div>
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/submit?q=${encodeURIComponent(query.trim())}`);
  };

  const featuredNGOs = ngos.slice(0, 3);
  const categories = Object.entries(CATEGORIES).filter(
    ([key]) => key !== "general"
  ) as [LegalCategory, (typeof CATEGORIES)[LegalCategory]][];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-hero text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm">
              <Sparkles className="w-4 h-4 text-bd-gold" />
              <span className="font-bangla text-green-100">
                {t(
                  "AI-চালিত বিনামূল্যে আইনি সহায়তা",
                  "AI-Powered Free Legal Aid"
                )}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-bangla leading-tight mb-4">
              {t("আপনার আইনি সমস্যার", "Get Legal Help")}
              <br />
              <span className="text-gradient-gold">
                {t("সমাধান বাংলায় পান", "in Bangla — Free")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-green-100 font-bangla leading-relaxed mb-8 max-w-2xl">
              {t(
                "আপনার সমস্যা সহজ বাংলায় লিখুন — AI আপনাকে সঠিক আইনি সহায়তা সংস্থা, প্রাসঙ্গিক আইন ও প্রয়োজনীয় নথি টেমপ্লেট খুঁজে দেবে। সম্পূর্ণ বিনামূল্যে।",
                "Describe your problem in Bangla — AI finds you the right legal aid NGO, relevant law sections, and document templates. Completely free."
              )}
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-2xl">
              <div className="flex gap-2 p-2 glass rounded-xl">
                <Search className="w-5 h-5 text-green-300 ml-2 self-center shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t(
                    "আপনার আইনি সমস্যা বাংলায় লিখুন...",
                    "Describe your legal problem in Bangla..."
                  )}
                  className="flex-1 bg-transparent text-white placeholder:text-green-300/70 font-bangla text-sm outline-none py-2 px-1"
                />
                <Button
                  type="submit"
                  className="bg-bd-gold hover:bg-bd-gold/90 text-[#1a1200] font-bangla font-semibold shrink-0"
                >
                  {t("শুরু করুন", "Start")}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { bn: "শ্রমিকের বেতন বকেয়া", en: "Unpaid wages" },
                { bn: "ভূমি দখল", en: "Land grab" },
                { bn: "পারিবারিক নির্যাতন", en: "Domestic violence" },
                { bn: "তালাক ও দেনমোহর", en: "Divorce & dower" },
              ].map((ex) => (
                <button
                  key={ex.bn}
                  onClick={() => {
                    setQuery(ex.bn);
                    router.push(`/submit?q=${encodeURIComponent(ex.bn)}`);
                  }}
                  className="text-xs glass rounded-full px-3 py-1 text-green-200 hover:text-white hover:bg-white/15 transition-colors font-bangla"
                >
                  {t(ex.bn, ex.en)}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Counter
                to={17}
                label={t("আইনি সহায়তা সংস্থা", "Legal Aid NGOs")}
              />
              <Counter
                to={10}
                label={t("আইনি বিভাগ", "Legal Categories")}
              />
              <Counter to={25} label={t("আইন বিভাগ", "Law Sections")} />
              <Counter
                to={10}
                label={t("নথি টেমপ্লেট", "Doc Templates")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-bangla text-foreground mb-3">
              {t("কীভাবে কাজ করে", "How It Works")}
            </h2>
            <p className="text-muted-foreground font-bangla text-lg">
              {t(
                "মাত্র তিনটি সহজ ধাপে আইনি সহায়তা পান",
                "Get legal assistance in just three simple steps"
              )}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "০১",
                icon: <FileText className="w-8 h-8" />,
                title_bn: "সমস্যা বর্ণনা করুন",
                title_en: "Describe Your Problem",
                desc_bn:
                  "আপনার আইনি সমস্যা সহজ বাংলায় লিখুন। কোনো আইনি জ্ঞান দরকার নেই।",
                desc_en:
                  "Write your legal problem in simple Bangla. No legal knowledge required.",
              },
              {
                step: "০২",
                icon: <Sparkles className="w-8 h-8" />,
                title_bn: "AI বিশ্লেষণ করে",
                title_en: "AI Analyzes",
                desc_bn:
                  "আমাদের AI আপনার সমস্যা বিশ্লেষণ করে সঠিক আইনি বিভাগ নির্ধারণ করে।",
                desc_en:
                  "Our AI analyzes your problem and determines the correct legal category.",
              },
              {
                step: "০৩",
                icon: <CheckCircle className="w-8 h-8" />,
                title_bn: "সহায়তা পান",
                title_en: "Get Assistance",
                desc_bn:
                  "প্রাসঙ্গিক NGO, আইন বিভাগ এবং প্রয়োজনীয় নথি টেমপ্লেট পান।",
                desc_en:
                  "Receive relevant NGOs, law sections, and document templates.",
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.15}>
                <div className="relative p-6 rounded-2xl border border-border bg-card group hover:border-bd-green/40 transition-colors card-hover">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-bd-green text-white text-xs font-bold rounded-lg flex items-center justify-center font-bangla">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 bg-bd-green-50 dark:bg-accent rounded-xl flex items-center justify-center text-bd-green mb-4 group-hover:bg-bd-green group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-bangla font-semibold text-lg text-foreground mb-2">
                    {t(item.title_bn, item.title_en)}
                  </h3>
                  <p className="text-muted-foreground font-bangla text-sm leading-relaxed">
                    {t(item.desc_bn, item.desc_en)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-bangla text-foreground mb-3">
              {t("আইনি বিভাগসমূহ", "Legal Categories")}
            </h2>
            <p className="text-muted-foreground font-bangla text-lg">
              {t(
                "যেকোনো ধরনের আইনি সমস্যায় আমরা সহায়তা করি",
                "We help with all types of legal problems"
              )}
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map(([key, cat], i) => (
              <FadeIn key={key} delay={i * 0.05}>
                <Link href={`/laws?category=${key}`}>
                  <div className="p-4 rounded-xl border border-border bg-card hover:border-bd-green/40 hover:shadow-md transition-all cursor-pointer group text-center card-hover">
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <p className="font-bangla text-sm font-medium text-foreground group-hover:text-bd-green transition-colors">
                      {t(cat.label_bn, cat.label_en)}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold font-bangla text-foreground mb-6">
                {t("কেন এই প্ল্যাটফর্ম?", "Why This Platform?")}
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: "🆓",
                    title_bn: "সম্পূর্ণ বিনামূল্যে",
                    title_en: "Completely Free",
                    desc_bn: "সব সেবা বিনামূল্যে। কোনো লুকানো চার্জ নেই।",
                    desc_en: "All services are free. No hidden charges ever.",
                  },
                  {
                    icon: "🇧🇩",
                    title_bn: "সম্পূর্ণ বাংলায়",
                    title_en: "Fully in Bangla",
                    desc_bn:
                      "বাংলায় সমস্যা লিখুন, বাংলায় সমাধান পান।",
                    desc_en: "Write in Bangla, get solutions in Bangla.",
                  },
                  {
                    icon: "🤖",
                    title_bn: "AI-চালিত বিশ্লেষণ",
                    title_en: "AI-Powered Analysis",
                    desc_bn:
                      "Gemini AI আপনার সমস্যা বিশ্লেষণ করে সঠিক পরামর্শ দেয়।",
                    desc_en:
                      "Gemini AI analyzes your problem and gives accurate guidance.",
                  },
                  {
                    icon: "📋",
                    title_bn: "প্রস্তুত নথি টেমপ্লেট",
                    title_en: "Ready Document Templates",
                    desc_bn:
                      "মামলা করার জন্য প্রয়োজনীয় সব নথির টেমপ্লেট পাবেন।",
                    desc_en:
                      "All document templates needed to file a case are available.",
                  },
                ].map((feature) => (
                  <div key={feature.title_bn} className="flex gap-4">
                    <div className="text-2xl shrink-0 mt-1">{feature.icon}</div>
                    <div>
                      <h3 className="font-bangla font-semibold text-foreground">
                        {t(feature.title_bn, feature.title_en)}
                      </h3>
                      <p className="text-muted-foreground font-bangla text-sm mt-1">
                        {t(feature.desc_bn, feature.desc_en)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-hero rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="w-8 h-8 text-bd-gold" />
                  <h3 className="font-bangla font-bold text-xl">
                    {t("আইনি সহায়তার প্রয়োজন?", "Need Legal Help?")}
                  </h3>
                </div>
                <p className="font-bangla text-green-100 mb-6 leading-relaxed">
                  {t(
                    "এখনই আপনার সমস্যা বাংলায় বর্ণনা করুন এবং বিনামূল্যে আইনি সহায়তা পান।",
                    "Describe your problem in Bangla now and get free legal help."
                  )}
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    t(
                      "✓ তাৎক্ষণিক AI বিশ্লেষণ",
                      "✓ Instant AI analysis"
                    ),
                    t("✓ কাছের NGO খুঁজে পান", "✓ Find nearby NGOs"),
                    t("✓ প্রাসঙ্গিক আইন জানুন", "✓ Learn relevant laws"),
                    t(
                      "✓ নথি টেমপ্লেট ডাউনলোড করুন",
                      "✓ Download document templates"
                    ),
                  ].map((item) => (
                    <p key={item} className="font-bangla text-sm text-green-100">
                      {item}
                    </p>
                  ))}
                </div>
                <Link href="/submit">
                  <Button className="w-full bg-bd-gold hover:bg-bd-gold/90 text-[#1a1200] font-bangla font-semibold">
                    {t("এখনই শুরু করুন", "Start Now")}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FEATURED NGOs */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-bangla text-foreground mb-2">
                {t("শীর্ষ আইনি সহায়তা সংস্থা", "Top Legal Aid NGOs")}
              </h2>
              <p className="text-muted-foreground font-bangla">
                {t(
                  "যাচাইকৃত ও বিশ্বস্ত সংস্থাসমূহ",
                  "Verified and trusted organizations"
                )}
              </p>
            </div>
            <Link href="/ngos">
              <Button
                variant="outline"
                className="font-bangla hidden sm:flex gap-2"
              >
                {t("সব দেখুন", "View All")}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNGOs.map((ngo, i) => (
              <FadeIn key={ngo.id} delay={i * 0.1}>
                <NGOCard ngo={ngo} highlighted={i === 0} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bd-green text-white">
        <FadeIn className="max-w-3xl mx-auto px-4 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-green-200" />
          <h2 className="text-3xl md:text-4xl font-bold font-bangla mb-4">
            {t(
              "আজই বিনামূল্যে আইনি সহায়তা নিন",
              "Get Free Legal Help Today"
            )}
          </h2>
          <p className="text-green-100 font-bangla text-lg mb-8">
            {t(
              "হাজার হাজার বাংলাদেশী এই প্ল্যাটফর্মের মাধ্যমে আইনি সহায়তা পাচ্ছেন। আপনিও শুরু করুন।",
              "Thousands of Bangladeshis are getting legal help through this platform. Start today."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit">
              <Button className="bg-white text-bd-green hover:bg-green-50 font-bangla font-semibold text-base px-8 py-3 h-auto">
                {t("সহায়তা নিন", "Get Help")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/ngos">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bangla text-base px-8 py-3 h-auto"
              >
                {t("এনজিও খুঁজুন", "Find NGOs")}
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
