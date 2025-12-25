export type Lang = 'en' | 'ar';

export interface TeamMember {
  id: string;
  departmentKey: 'pr' | 'media' | 'content' | 'research' | 'moderator';
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  bio: { en: string; ar: string };
  avatarUrl: string;
}

export interface Service {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  details: { en: string[]; ar: string[] };
}

export interface LeadPayload {
  name: string;
  email: string;
  slot: string;
  timestamp: number;
}

export interface CaseStudy {
  id: string;
  title: { en: string; ar: string };
  industry: { en: string; ar: string };
  problem: { en: string; ar: string };
  decision: { en: string; ar: string };
  outcome: { en: string; ar: string };
  metrics?: Array<{
    label: { en: string; ar: string };
    value: string;
  }>;
  imageUrl?: string;
}

export interface FAQ {
  id: string;
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
  category: 'services' | 'process' | 'pricing' | 'technical' | 'general';
}

export interface SpecialOffer {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  cta: { en: string; ar: string };
  validUntil?: string;
}

export interface VisionMission {
  vision: { en: string; ar: string };
  mission: { en: string; ar: string };
}
