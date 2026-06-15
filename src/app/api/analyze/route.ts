import { NextRequest } from "next/server";
import { analyzeCase } from "@/lib/gemini";
import { getNGOsByCategory } from "@/data/ngos";
import { getLawsByCategory } from "@/data/laws";
import { getTemplatesByCategory } from "@/data/templates";
import type { CaseResult } from "@/lib/types";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { problem } = await request.json();

    if (!problem || typeof problem !== "string" || problem.trim().length < 10) {
      return Response.json(
        { error: "Problem text is too short" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    const analysis = await analyzeCase(problem.trim());

    const matchedNGOs = getNGOsByCategory(analysis.category);
    const lawSections = getLawsByCategory(analysis.category);
    const docTemplates = getTemplatesByCategory(analysis.category);

    const result: CaseResult = {
      id: randomUUID(),
      problem_text: problem.trim(),
      analysis,
      matched_ngos: matchedNGOs.slice(0, 6),
      law_sections: lawSections,
      templates: docTemplates,
      created_at: new Date().toISOString(),
    };

    return Response.json(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Analysis error:", msg);
    return Response.json(
      { error: "Failed to analyze problem", detail: msg },
      { status: 500 }
    );
  }
}
