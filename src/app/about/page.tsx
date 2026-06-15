"use client";

import { motion } from "framer-motion";
import { Scale, Heart, Shield, Globe, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "../providers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-hero text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Scale className="w-14 h-14 mx-auto mb-4 text-bd-gold" />
            <h1 className="text-3xl md:text-4xl font-bold font-bangla mb-4">
              {t("আমাদের সম্পর্কে", "About Us")}
            </h1>
            <p className="text-green-100 font-bangla text-lg leading-relaxed">
              {t(
                "বাংলাদেশের সাধারণ মানুষের কাছে আইনি সহায়তা পৌঁছে দেওয়ার লক্ষ্যে তৈরি একটি বিনামূল্যে ডিজিটাল প্ল্যাটফর্ম।",
                "A free digital platform built to bring legal assistance to the common people of Bangladesh."
              )}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold font-bangla text-foreground mb-4">
              {t("আমাদের লক্ষ্য", "Our Mission")}
            </h2>
            <p className="text-muted-foreground font-bangla text-lg leading-relaxed max-w-2xl mx-auto">
              {t(
                "বাংলাদেশে লক্ষ লক্ষ মানুষ আইনি সমস্যায় পড়েন কিন্তু অর্থ ও জ্ঞানের অভাবে সঠিক সহায়তা পান না। আমরা AI প্রযুক্তি ও ডিজিটাল প্ল্যাটফর্মের মাধ্যমে এই বাধা দূর করতে চাই।",
                "Millions of people in Bangladesh face legal problems but cannot get proper help due to lack of money and knowledge. We want to remove this barrier through AI technology and digital platforms."
              )}
            </p>
          </motion.div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Heart className="w-6 h-6" />,
                title_bn: "সবার জন্য বিনামূল্যে",
                title_en: "Free for Everyone",
                desc_bn:
                  "আমাদের সব সেবা বিনামূল্যে। কখনো কোনো চার্জ নেওয়া হবে না।",
                desc_en:
                  "All our services are free. No charges will ever be taken.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title_bn: "গোপনীয়তা সুরক্ষিত",
                title_en: "Privacy Protected",
                desc_bn:
                  "আপনার তথ্য সম্পূর্ণ গোপন রাখা হয়। কোনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।",
                desc_en:
                  "Your information is kept completely private. Never shared with any third party.",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title_bn: "সারা বাংলাদেশে",
                title_en: "Across Bangladesh",
                desc_bn:
                  "সব জেলার মানুষ এই প্ল্যাটফর্ম ব্যবহার করতে পারবেন।",
                desc_en:
                  "People from all districts can use this platform.",
              },
              {
                icon: <Scale className="w-6 h-6" />,
                title_bn: "নিরপেক্ষ ও নির্ভরযোগ্য",
                title_en: "Neutral & Reliable",
                desc_bn:
                  "আইনি তথ্য নির্ভরযোগ্য উৎস থেকে সংগ্রহ করা। কোনো পক্ষপাত নেই।",
                desc_en:
                  "Legal information collected from reliable sources. No bias.",
              },
            ].map((value, i) => (
              <motion.div
                key={value.title_bn}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl border border-border bg-card"
              >
                <div className="w-12 h-12 bg-bd-green-50 dark:bg-accent rounded-xl flex items-center justify-center text-bd-green shrink-0">
                  {value.icon}
                </div>
                <div>
                  <h3 className="font-bangla font-semibold text-foreground mb-1">
                    {t(value.title_bn, value.title_en)}
                  </h3>
                  <p className="text-sm text-muted-foreground font-bangla">
                    {t(value.desc_bn, value.desc_en)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="bg-muted/50 rounded-2xl p-8">
            <h2 className="font-bangla font-bold text-xl text-foreground mb-4">
              ⚠️ {t("গুরুত্বপূর্ণ বিজ্ঞপ্তি", "Important Disclaimer")}
            </h2>
            <div className="space-y-3 text-muted-foreground font-bangla text-sm leading-relaxed">
              <p>
                {t(
                  "এই প্ল্যাটফর্ম সাধারণ আইনি তথ্য ও দিকনির্দেশনা প্রদান করে। এটি পেশাদার আইনজীবীর পরামর্শের বিকল্প নয়।",
                  "This platform provides general legal information and guidance. It is not a substitute for professional legal advice."
                )}
              </p>
              <p>
                {t(
                  "গুরুত্বপূর্ণ আইনি সিদ্ধান্ত নেওয়ার আগে সর্বদা একজন যোগ্য আইনজীবীর সাথে পরামর্শ করুন।",
                  "Always consult a qualified lawyer before making important legal decisions."
                )}
              </p>
              <p>
                {t(
                  "AI বিশ্লেষণ সর্বদা ১০০% নির্ভুল নাও হতে পারে।",
                  "AI analysis may not always be 100% accurate."
                )}
              </p>
            </div>
          </div>

          {/* Emergency */}
          <div className="bg-bd-green-50 dark:bg-accent rounded-2xl p-8">
            <h2 className="font-bangla font-bold text-xl text-foreground mb-6">
              <Phone className="inline w-5 h-5 mr-2" />
              {t("জরুরি যোগাযোগ নম্বর", "Emergency Contact Numbers")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label_bn: "পুলিশ", label_en: "Police", number: "999" },
                {
                  label_bn: "নারী হেল্পলাইন",
                  label_en: "Women Helpline",
                  number: "10921",
                },
                {
                  label_bn: "শিশু হেল্পলাইন",
                  label_en: "Child Helpline",
                  number: "1098",
                },
                {
                  label_bn: "আইনি সহায়তা (BLAST)",
                  label_en: "Legal Aid (BLAST)",
                  number: "16430",
                },
                {
                  label_bn: "জাতীয় তথ্য বাতায়ন",
                  label_en: "National Info Helpline",
                  number: "333",
                },
                {
                  label_bn: "দুর্নীতি দমন",
                  label_en: "Anti-Corruption",
                  number: "106",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="flex items-center justify-between p-3 bg-white dark:bg-card rounded-xl"
                >
                  <span className="font-bangla text-sm text-foreground">
                    {t(item.label_bn, item.label_en)}
                  </span>
                  <a
                    href={`tel:${item.number}`}
                    className="font-bold text-bd-green text-lg hover:underline"
                  >
                    {item.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-bangla font-bold text-2xl text-foreground mb-4">
              {t("এখনই সহায়তা নিন", "Get Help Now")}
            </h2>
            <Link href="/submit">
              <Button className="bg-bd-green hover:bg-bd-green-600 text-white font-bangla text-base px-8">
                {t("বিনামূল্যে আইনি বিশ্লেষণ শুরু করুন", "Start Free Legal Analysis")}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
