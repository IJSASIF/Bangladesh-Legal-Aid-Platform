-- Bangladesh Legal Aid Platform — Supabase Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- NGOs table
CREATE TABLE IF NOT EXISTS ngos (
  id TEXT PRIMARY KEY,
  name_bn TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_bn TEXT,
  description_en TEXT,
  specializations TEXT[] DEFAULT '{}',
  districts TEXT[] DEFAULT '{}',
  phone TEXT,
  email TEXT,
  website TEXT,
  address_bn TEXT,
  is_free BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Law sections table
CREATE TABLE IF NOT EXISTS law_sections (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  law_name_bn TEXT NOT NULL,
  law_name_en TEXT NOT NULL,
  section_number TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  title_en TEXT,
  summary_bn TEXT NOT NULL,
  summary_en TEXT,
  year INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document templates table
CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_bn TEXT,
  description_en TEXT,
  template_content TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cases table (user submissions)
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  problem_text TEXT NOT NULL,
  detected_category TEXT,
  detected_district TEXT,
  ai_summary_bn TEXT,
  ai_summary_en TEXT,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high')),
  keywords TEXT[] DEFAULT '{}',
  matched_ngo_ids TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ngos ENABLE ROW LEVEL SECURITY;
ALTER TABLE law_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Public read access for reference data
CREATE POLICY "Public read ngos" ON ngos FOR SELECT USING (true);
CREATE POLICY "Public read law_sections" ON law_sections FOR SELECT USING (true);
CREATE POLICY "Public read templates" ON templates FOR SELECT USING (true);

-- Users can only see their own cases
CREATE POLICY "Users see own cases" ON cases FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Anyone can insert cases" ON cases FOR INSERT
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ngos_specializations ON ngos USING GIN(specializations);
CREATE INDEX IF NOT EXISTS idx_ngos_districts ON ngos USING GIN(districts);
CREATE INDEX IF NOT EXISTS idx_law_sections_category ON law_sections(category);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_cases_user_id ON cases(user_id);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at DESC);
