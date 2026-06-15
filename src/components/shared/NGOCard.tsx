"use client";

import { Phone, Globe, MapPin, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryBadge } from "./CategoryBadge";
import type { NGO } from "@/lib/types";
import { useLanguage } from "@/app/providers";

interface NGOCardProps {
  ngo: NGO;
  highlighted?: boolean;
}

export function NGOCard({ ngo, highlighted }: NGOCardProps) {
  const { t } = useLanguage();

  return (
    <Card
      className={`card-hover ${highlighted ? "border-bd-green shadow-md" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bangla font-semibold text-foreground leading-snug">
              {t(ngo.name_bn, ngo.name_en)}
            </h3>
            {ngo.verified && (
              <span className="inline-flex items-center gap-1 text-xs text-bd-green mt-1">
                <CheckCircle className="w-3 h-3" />
                {t("যাচাইকৃত", "Verified")}
              </span>
            )}
          </div>
          {ngo.is_free && (
            <Badge className="bg-bd-green-50 text-bd-green border-bd-green/20 shrink-0 font-bangla text-xs">
              {t("বিনামূল্যে", "Free")}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground font-bangla line-clamp-3">
          {t(ngo.description_bn, ngo.description_en)}
        </p>

        {/* Specializations */}
        <div className="flex flex-wrap gap-1.5">
          {ngo.specializations.slice(0, 3).map((spec) => (
            <CategoryBadge key={spec} category={spec} size="sm" />
          ))}
          {ngo.specializations.length > 3 && (
            <span className="text-xs text-muted-foreground self-center">
              +{ngo.specializations.length - 3}
            </span>
          )}
        </div>

        {/* Districts */}
        <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span className="font-bangla line-clamp-1">
            {ngo.districts.slice(0, 4).join(", ")}
            {ngo.districts.length > 4 && ` +${ngo.districts.length - 4}`}
          </span>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-4 pt-1 border-t border-border">
          {ngo.phone && (
            <a
              href={`tel:${ngo.phone}`}
              className="flex items-center gap-1 text-xs text-bd-green hover:underline"
            >
              <Phone className="w-3 h-3" />
              {ngo.phone}
            </a>
          )}
          {ngo.website && (
            <a
              href={ngo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-bd-green hover:underline"
            >
              <Globe className="w-3 h-3" />
              {t("ওয়েবসাইট", "Website")}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
