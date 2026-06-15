"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/app/providers";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/ngos", label_bn: "এনজিও সমূহ", label_en: "NGOs" },
  { href: "/laws", label_bn: "আইন বিভাগ", label_en: "Law Sections" },
  { href: "/templates", label_bn: "নথি টেমপ্লেট", label_en: "Templates" },
  { href: "/about", label_bn: "আমাদের সম্পর্কে", label_en: "About" },
];

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-bd-green flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="font-bangla font-semibold text-sm leading-tight text-foreground">
              {t("বাংলাদেশ আইনি সহায়তা", "BD Legal Aid")}
            </p>
            <p className="text-xs text-muted-foreground leading-tight">
              {t("বিনামূল্যে আইনি পরামর্শ", "Free Legal Advice")}
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-bangla transition-colors",
                pathname === link.href
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {t(link.label_bn, link.label_en)}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="px-3 py-1.5 rounded-md text-xs font-medium border border-border hover:bg-muted transition-colors"
          >
            {lang === "bn" ? "EN" : "বাং"}
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-muted transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* CTA */}
          <Link href="/submit" className="hidden sm:block">
            <Button size="sm" className="bg-bd-green hover:bg-bd-green-600 text-white font-bangla">
              {t("সহায়তা নিন", "Get Help")}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center hover:bg-muted rounded-md transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-bangla transition-colors",
                    pathname === link.href
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {t(link.label_bn, link.label_en)}
                </Link>
              ))}
              <Link href="/submit" onClick={() => setMenuOpen(false)}>
                <Button className="w-full mt-2 bg-bd-green hover:bg-bd-green-600 text-white font-bangla">
                  {t("সহায়তা নিন", "Get Help")}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
