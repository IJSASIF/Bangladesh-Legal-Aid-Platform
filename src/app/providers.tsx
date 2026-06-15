"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/types";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (bn: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "bn",
  setLang: () => {},
  t: (bn) => bn,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("bn");

  const t = (bn: string, en: string) => (lang === "bn" ? bn : en);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        {children}
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}
