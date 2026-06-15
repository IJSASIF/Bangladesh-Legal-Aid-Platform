"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "../providers";
import { toast } from "sonner";
import type { CaseResult } from "@/lib/types";

const EXAMPLE_PROBLEMS = [
  "আমি একটি গার্মেন্টস কারখানায় কাজ করি। গত ৩ মাস ধরে আমার বেতন পাচ্ছি না। মালিক বলছেন টাকা নেই। আমি কী করতে পারি?",
  "আমার স্বামী আমাকে প্রতিদিন মারধর করে এবং যৌতুকের জন্য চাপ দেয়। আমি কোথায় সাহায্য পাবো?",
  "আমার পাশের বাড়ির লোক আমার জমির সীমানা দিয়ে দখল করে নিচ্ছে। খতিয়ানে আমার নাম আছে কিন্তু সে মানছে না।",
  "আমার ছেলেকে পুলিশ গ্রেফতার করেছে ৩ দিন আগে কিন্তু কোনো থানায় তার নাম নেই। পরিবার তার খোঁজ পাচ্ছে না।",
];

function SubmitContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setProblem(decodeURIComponent(q));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim().length < 20) {
      toast.error(
        t(
          "অনুগ্রহ করে আরও বিস্তারিত লিখুন (কমপক্ষে ২০ অক্ষর)",
          "Please write more details (at least 20 characters)"
        )
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const result: CaseResult = await response.json();

      localStorage.setItem(`case_${result.id}`, JSON.stringify(result));
      router.push(`/results/${result.id}`);
    } catch {
      toast.error(
        t(
          "বিশ্লেষণে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
          "Analysis failed. Please try again."
        )
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-bd-green-50 text-bd-green rounded-full px-4 py-2 mb-4 text-sm font-bangla font-medium">
              <Sparkles className="w-4 h-4" />
              {t("AI-চালিত বিশ্লেষণ", "AI-Powered Analysis")}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-bangla text-foreground mb-3">
              {t("আপনার সমস্যা বর্ণনা করুন", "Describe Your Problem")}
            </h1>
            <p className="text-muted-foreground font-bangla max-w-xl mx-auto">
              {t(
                "আপনার আইনি সমস্যা যতটা সম্ভব বিস্তারিত বাংলায় লিখুন। AI আপনাকে সঠিক সহায়তা খুঁজে দেবে।",
                "Describe your legal problem in as much detail as possible in Bangla. AI will find the right help for you."
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="font-bangla text-base font-medium">
                {t("আপনার সমস্যা লিখুন", "Write Your Problem")}
              </Label>
              <Textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder={t(
                  "উদাহরণ: আমি একটি কারখানায় কাজ করতাম। গত মাসে মালিক কোনো কারণ না দেখিয়ে আমাকে চাকরি থেকে বের করে দিয়েছে। আমার ৩ মাসের বেতন বকেয়া আছে। আমি কী করতে পারি?",
                  "Example: I worked at a factory. Last month the owner dismissed me without any reason. I have 3 months of unpaid salary. What can I do?"
                )}
                className="min-h-[200px] font-bangla text-base resize-none leading-relaxed"
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground font-bangla">
                {problem.length} {t("অক্ষর", "characters")} —{" "}
                {t(
                  "কমপক্ষে ২০ অক্ষর লিখুন",
                  "minimum 20 characters required"
                )}
              </p>
            </div>

            {/* Notice */}
            <div className="flex gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200 font-bangla">
                {t(
                  "এই প্ল্যাটফর্ম পেশাদার আইনি পরামর্শের বিকল্প নয়। গুরুত্বপূর্ণ মামলায় সর্বদা একজন আইনজীবীর সাথে পরামর্শ করুন।",
                  "This platform is not a substitute for professional legal advice. Always consult a lawyer for important cases."
                )}
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || problem.trim().length < 20}
              className="w-full bg-bd-green hover:bg-bd-green-600 text-white font-bangla font-semibold text-base h-12"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t("বিশ্লেষণ করা হচ্ছে...", "Analyzing...")}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t("AI দিয়ে বিশ্লেষণ করুন", "Analyze with AI")}
                </>
              )}
            </Button>
          </form>

          {/* Examples */}
          <div className="mt-12">
            <h2 className="font-bangla font-semibold text-foreground mb-4">
              {t("উদাহরণ সমস্যা", "Example Problems")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXAMPLE_PROBLEMS.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setProblem(example)}
                  disabled={loading}
                  className="text-left p-4 rounded-xl border border-border bg-card hover:border-bd-green/40 hover:bg-bd-green-50/50 dark:hover:bg-accent/50 transition-colors group"
                >
                  <p className="text-sm text-muted-foreground font-bangla leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors">
                    {example}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default function SubmitPage() {
  return (
    <Suspense>
      <SubmitContent />
    </Suspense>
  );
}
