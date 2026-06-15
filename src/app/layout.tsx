import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাংলাদেশ আইনি সহায়তা প্ল্যাটফর্ম | Bangladesh Legal Aid Platform",
  description:
    "বিনামূল্যে আইনি সহায়তা পান। আপনার সমস্যা বাংলায় লিখুন — AI আপনাকে সঠিক NGO, আইন বিভাগ ও নথি টেমপ্লেট দেবে।",
  keywords: [
    "legal aid",
    "Bangladesh",
    "আইনি সহায়তা",
    "বাংলাদেশ",
    "free legal help",
    "NGO",
  ],
  authors: [{ name: "Bangladesh Legal Aid Platform" }],
  openGraph: {
    title: "বাংলাদেশ আইনি সহায়তা প্ল্যাটফর্ম",
    description: "বিনামূল্যে আইনি সহায়তা — AI-চালিত, বাংলায়",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${hindSiliguri.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-bangla">
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
