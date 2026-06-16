"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertCircle, Loader2, Mic, MicOff, ImagePlus, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const DISTRICTS = [
  "ঢাকা","চট্টগ্রাম","রাজশাহী","খুলনা","বরিশাল","সিলেট","রংপুর","ময়মনসিংহ",
  "কুমিল্লা","নারায়ণগঞ্জ","গাজীপুর","টাঙ্গাইল","ফরিদপুর","যশোর","নোয়াখালী",
  "বগুড়া","দিনাজপুর","পাবনা","নাটোর","সিরাজগঞ্জ","কুষ্টিয়া","ঝিনাইদহ",
  "মাগুরা","নড়াইল","সাতক্ষীরা","মেহেরপুর","চুয়াডাঙ্গা","বাগেরহাট","পিরোজপুর",
  "ঝালকাঠি","পটুয়াখালী","ভোলা","বরগুনা","লক্ষ্মীপুর","চাঁদপুর","ফেনী","ব্রাহ্মণবাড়িয়া",
  "হবিগঞ্জ","মৌলভীবাজার","সুনামগঞ্জ","নেত্রকোণা","কিশোরগঞ্জ","মানিকগঞ্জ",
  "মুন্সিগঞ্জ","শরীয়তপুর","রাজবাড়ী","গোপালগঞ্জ","মাদারীপুর","জামালপুর",
  "শেরপুর","গাইবান্ধা","কুড়িগ্রাম","লালমনিরহাট","নীলফামারী",
  "পঞ্চগড়","ঠাকুরগাঁও","জয়পুরহাট","চাঁপাইনবাবগঞ্জ","নওগাঁ",
  "কক্সবাজার","বান্দরবান","রাঙামাটি","খাগড়াছড়ি",
];

function SubmitContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState<"text" | "image">("text");
  const [problem, setProblem] = useState("");
  const [district, setDistrict] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setProblem(decodeURIComponent(q));
  }, [searchParams]);

  const startVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error(t("আপনার ব্রাউজার ভয়েস ইনপুট সমর্থন করে না", "Your browser doesn't support voice input"));
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "bn-BD";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setProblem((prev) => (prev ? prev + " " + transcript : transcript));
      toast.success(t("ভয়েস ইনপুট সফল", "Voice captured!"));
    };
    recognition.onerror = () => {
      setListening(false);
      toast.error(t("ভয়েস রেকগনিশন ব্যর্থ। আবার চেষ্টা করুন।", "Voice recognition failed. Try again."));
    };
    recognition.start();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("ছবি ৫MB এর বেশি হতে পারবে না", "Image must be under 5MB"));
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "text" && problem.trim().length < 20) {
      toast.error(t("অনুগ্রহ করে আরও বিস্তারিত লিখুন (কমপক্ষে ২০ অক্ষর)", "Please write more details (at least 20 characters)"));
      return;
    }
    if (mode === "image" && !imageFile) {
      toast.error(t("অনুগ্রহ করে একটি ছবি আপলোড করুন", "Please upload an image"));
      return;
    }

    setLoading(true);
    try {
      let body: Record<string, unknown>;

      if (mode === "image" && imageFile) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const result = ev.target?.result as string;
            resolve(result.split(",")[1]);
          };
          reader.readAsDataURL(imageFile);
        });
        body = {
          imageBase64: base64,
          mimeType: imageFile.type,
          additionalText: problem.trim() || undefined,
          district: district || undefined,
        };
      } else {
        body = {
          problem: problem.trim(),
          district: district || undefined,
        };
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Analysis failed");
      const result: CaseResult = await response.json();
      localStorage.setItem(`case_${result.id}`, JSON.stringify(result));
      router.push(`/results/${result.id}`);
    } catch {
      toast.error(t("বিশ্লেষণে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।", "Analysis failed. Please try again."));
      setLoading(false);
    }
  };

  const canSubmit = mode === "text" ? problem.trim().length >= 20 : !!imageFile;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
              {t("লিখুন, কথা বলুন, বা ছবি আপলোড করুন — AI আপনাকে সঠিক সহায়তা খুঁজে দেবে।", "Write, speak, or upload a photo — AI will find the right help for you.")}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-8 p-1 bg-muted rounded-xl w-fit mx-auto">
            <button
              type="button"
              onClick={() => setMode("text")}
              className={`px-5 py-2 rounded-lg text-sm font-bangla font-medium transition-all ${mode === "text" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              ✍️ {t("লিখুন", "Write")}
            </button>
            <button
              type="button"
              onClick={() => setMode("image")}
              className={`px-5 py-2 rounded-lg text-sm font-bangla font-medium transition-all ${mode === "image" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              📷 {t("ছবি আপলোড", "Upload Image")}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {mode === "text" ? (
                <motion.div key="text" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-bangla text-base font-medium">
                      {t("আপনার সমস্যা লিখুন", "Write Your Problem")}
                    </Label>
                    <button
                      type="button"
                      onClick={startVoiceInput}
                      disabled={loading}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bangla font-medium transition-all border ${
                        listening
                          ? "bg-red-50 border-red-200 text-red-600 animate-pulse"
                          : "border-border hover:border-bd-green hover:text-bd-green"
                      }`}
                    >
                      {listening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      {listening ? t("শুনছি...", "Listening...") : t("ভয়েস ইনপুট", "Voice Input")}
                    </button>
                  </div>
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
                    {problem.length} {t("অক্ষর", "characters")} — {t("কমপক্ষে ২০ অক্ষর লিখুন", "minimum 20 characters required")}
                  </p>
                </motion.div>
              ) : (
                <motion.div key="image" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                      imagePreview ? "border-bd-green/40 bg-bd-green-50/30" : "border-border hover:border-bd-green/40 hover:bg-muted/50"
                    }`}
                  >
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="preview" className="max-h-64 mx-auto rounded-lg object-contain" />
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }}
                          className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <ImagePlus className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="font-bangla text-muted-foreground font-medium">
                          {t("ছবি আপলোড করতে ক্লিক করুন", "Click to upload image")}
                        </p>
                        <p className="font-bangla text-xs text-muted-foreground mt-1">
                          {t("আইনি নথি, নোটিশ, চুক্তিপত্রের ছবি দিন (JPG/PNG, সর্বোচ্চ ৫MB)", "Legal document, notice, or contract photo (JPG/PNG, max 5MB)")}
                        </p>
                      </div>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                  <div className="space-y-2">
                    <Label className="font-bangla text-sm">{t("অতিরিক্ত তথ্য (ঐচ্ছিক)", "Additional context (optional)")}</Label>
                    <Textarea
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      placeholder={t("ছবি সম্পর্কে আরও কিছু জানান...", "Tell us more about the image...")}
                      className="min-h-[80px] font-bangla text-sm resize-none"
                      disabled={loading}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* District Picker */}
            <div className="space-y-2">
              <Label className="font-bangla text-sm font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-bd-green" />
                {t("আপনার জেলা (ঐচ্ছিক)", "Your District (optional)")}
              </Label>
              <Select value={district} onValueChange={(v) => setDistrict(v ?? "")}>
                <SelectTrigger className="w-full sm:w-64 font-bangla">
                  <SelectValue placeholder={t("জেলা নির্বাচন করুন", "Select district")} />
                </SelectTrigger>
                <SelectContent>
                  {DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d} className="font-bangla">{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground font-bangla">
                {t("জেলা দিলে কাছের সংস্থা খুঁজে পাওয়া সহজ হয়", "Selecting district helps find nearby organizations")}
              </p>
            </div>

            {/* Notice */}
            <div className="flex gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200 font-bangla">
                {t("এই প্ল্যাটফর্ম পেশাদার আইনি পরামর্শের বিকল্প নয়। গুরুত্বপূর্ণ মামলায় সর্বদা একজন আইনজীবীর সাথে পরামর্শ করুন।", "This platform is not a substitute for professional legal advice. Always consult a lawyer for important cases.")}
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || !canSubmit}
              className="w-full bg-bd-green hover:bg-bd-green-600 text-white font-bangla font-semibold text-base h-12"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t("বিশ্লেষণ করা হচ্ছে...", "Analyzing...")}</>
              ) : (
                <><Sparkles className="w-5 h-5 mr-2" />{t("AI দিয়ে বিশ্লেষণ করুন", "Analyze with AI")}</>
              )}
            </Button>
          </form>

          {mode === "text" && (
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
          )}
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
