export type Lang = "bn" | "en";

export type LegalCategory =
  | "labor_law"
  | "family_law"
  | "property_law"
  | "criminal_law"
  | "human_rights"
  | "land_law"
  | "domestic_violence"
  | "child_rights"
  | "consumer_rights"
  | "cyber_law"
  | "general";

export interface NGO {
  id: string;
  name_bn: string;
  name_en: string;
  description_bn: string;
  description_en: string;
  specializations: LegalCategory[];
  districts: string[];
  phone?: string;
  email?: string;
  website?: string;
  address_bn?: string;
  is_free: boolean;
  verified: boolean;
}

export interface LawSection {
  id: string;
  category: LegalCategory;
  law_name_bn: string;
  law_name_en: string;
  section_number: string;
  title_bn: string;
  title_en: string;
  summary_bn: string;
  summary_en: string;
  year?: number;
}

export interface DocumentTemplate {
  id: string;
  category: LegalCategory;
  title_bn: string;
  title_en: string;
  description_bn: string;
  description_en: string;
  template_content: string;
  variables: string[];
}

export interface AnalysisResult {
  category: LegalCategory;
  confidence: number;
  district?: string;
  summary_bn: string;
  summary_en: string;
  keywords: string[];
  severity: "low" | "medium" | "high";
  recommended_action_bn: string;
}

export interface CaseResult {
  id: string;
  problem_text: string;
  analysis: AnalysisResult;
  matched_ngos: NGO[];
  law_sections: LawSection[];
  templates: DocumentTemplate[];
  created_at: string;
}
