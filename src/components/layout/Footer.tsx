"use client";

import Link from "next/link";
import { Scale, Heart } from "lucide-react";
import { useLanguage } from "@/app/providers";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-bd-green flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <span className="font-bangla font-semibold text-foreground">
                {t("বাংলাদেশ আইনি সহায়তা", "Bangladesh Legal Aid")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-bangla max-w-sm">
              {t(
                "বাংলাদেশের মানুষের জন্য বিনামূল্যে AI-চালিত আইনি সহায়তা। আপনার সমস্যা বাংলায় বলুন, সঠিক পথ খুঁজে পান।",
                "Free AI-powered legal aid for the people of Bangladesh. Describe your problem in Bangla, find the right path."
              )}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              {t(
                "⚠️ এই প্ল্যাটফর্ম আইনি পরামর্শের বিকল্প নয়। পেশাদার আইনজীবীর সাথে পরামর্শ করুন।",
                "⚠️ This platform is not a substitute for legal advice. Consult a professional lawyer."
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bangla font-semibold text-sm text-foreground mb-3">
              {t("দ্রুত লিঙ্ক", "Quick Links")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/submit", bn: "সহায়তা নিন", en: "Get Help" },
                { href: "/ngos", bn: "এনজিও সমূহ", en: "NGOs" },
                { href: "/laws", bn: "আইন বিভাগ", en: "Law Sections" },
                { href: "/templates", bn: "নথি টেমপ্লেট", en: "Templates" },
                { href: "/about", bn: "আমাদের সম্পর্কে", en: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground font-bangla transition-colors"
                  >
                    {t(link.bn, link.en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="font-bangla font-semibold text-sm text-foreground mb-3">
              {t("জরুরি যোগাযোগ", "Emergency Contacts")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-bangla">
              <li>🚔 {t("পুলিশ:", "Police:")} 999</li>
              <li>🏥 {t("অ্যাম্বুলেন্স:", "Ambulance:")} 999</li>
              <li>📞 {t("নারী হেল্পলাইন:", "Women Helpline:")} 10921</li>
              <li>👶 {t("শিশু হেল্পলাইন:", "Child Helpline:")} 1098</li>
              <li>⚖️ {t("আইনি সহায়তা (BLAST):", "Legal Aid (BLAST):")} 16430</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-bangla">
            © {new Date().getFullYear()}{" "}
            {t("বাংলাদেশ আইনি সহায়তা প্ল্যাটফর্ম। সর্বস্বত্ব সংরক্ষিত।", "Bangladesh Legal Aid Platform. All rights reserved.")}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {t("তৈরি করা হয়েছে", "Built with")}{" "}
            <Heart className="w-3 h-3 text-bd-red fill-bd-red" />{" "}
            {t("বাংলাদেশের মানুষের জন্য", "for the people of Bangladesh")}
          </p>
        </div>
      </div>
    </footer>
  );
}
