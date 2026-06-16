import { NextRequest } from "next/server";
import { analyzeCase, analyzeImageCase } from "@/lib/gemini";
import { getNGOsByCategory } from "@/data/ngos";
import { getLawsByCategory } from "@/data/laws";
import { getTemplatesByCategory } from "@/data/templates";
import type { CaseResult } from "@/lib/types";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
    }

    let analysis;

    if (body.imageBase64) {
      const { imageBase64, mimeType, additionalText } = body;
      if (!imageBase64 || !mimeType) {
        return Response.json({ error: "imageBase64 and mimeType required" }, { status: 400 });
      }
      analysis = await analyzeImageCase(imageBase64, mimeType, additionalText);
    } else {
      const { problem } = body;
      if (!problem || typeof problem !== "string" || problem.trim().length < 10) {
        return Response.json({ error: "Problem text is too short" }, { status: 400 });
      }
      const problemWithDistrict = body.district
        ? `${problem.trim()} [জেলা: ${body.district}]`
        : problem.trim();
      analysis = await analyzeCase(problemWithDistrict);
      if (body.district && !analysis.district) {
        analysis.district = body.district;
      }
    }

    const matchedNGOs = getNGOsByCategory(analysis.category);
    const districtFiltered = analysis.district
      ? matchedNGOs.filter((n) => n.districts.includes(analysis.district!)).concat(
          matchedNGOs.filter((n) => !n.districts.includes(analysis.district!))
        )
      : matchedNGOs;

    const result: CaseResult = {
      id: randomUUID(),
      problem_text: body.problem?.trim() ?? "[ছবি থেকে বিশ্লেষণ]",
      analysis,
      matched_ngos: districtFiltered.slice(0, 6),
      law_sections: getLawsByCategory(analysis.category),
      templates: getTemplatesByCategory(analysis.category),
      created_at: new Date().toISOString(),
    };

    return Response.json(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Analysis error:", msg);
    return Response.json({ error: "Failed to analyze problem", detail: msg }, { status: 500 });
  }
}
