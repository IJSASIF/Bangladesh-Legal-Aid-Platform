"use client";

import { CATEGORIES } from "@/lib/categories";
import type { LegalCategory } from "@/lib/types";
import { useLanguage } from "@/app/providers";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: LegalCategory;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function CategoryBadge({
  category,
  size = "md",
  showIcon = true,
}: CategoryBadgeProps) {
  const { t } = useLanguage();
  const cat = CATEGORIES[category] ?? CATEGORIES.general;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-bangla font-medium",
        cat.color,
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        size === "lg" && "px-4 py-1.5 text-base"
      )}
    >
      {showIcon && <span>{cat.icon}</span>}
      {t(cat.label_bn, cat.label_en)}
    </span>
  );
}
