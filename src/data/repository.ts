import type { TeamMember, Service, LeadPayload, CaseStudy, FAQ, SpecialOffer, VisionMission } from './types';
import { team, services, caseStudies, faq, specialOffer, visionMission } from './mock';

/**
 * Repository layer for data access.
 * Currently returns mock data with artificial delays to simulate async operations.
 *
 * TO INTEGRATE WITH FIRESTORE + SUPABASE:
 * 1. Install: npm install firebase @supabase/supabase-js
 * 2. Create src/lib/firebase.ts and src/lib/supabase.ts with config
 * 3. Replace these mock implementations with actual Firestore queries
 * 4. Use Supabase for file storage (avatars, audio, images)
 *
 * Example Firestore implementation:
 *
 * import { db } from '../lib/firebase';
 * import { collection, getDocs } from 'firebase/firestore';
 *
 * export const getTeam = async (): Promise<TeamMember[]> => {
 *   const snapshot = await getDocs(collection(db, 'team'));
 *   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
 * };
 */

export const Repository = {
  /**
   * Get all team members
   */
  getTeam: async (): Promise<TeamMember[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(team), 500));
  },

  /**
   * Get all services
   */
  getServices: async (): Promise<Service[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(services), 500));
  },

  /**
   * Get all case studies
   */
  getCaseStudies: async (): Promise<CaseStudy[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(caseStudies), 500));
  },

  /**
   * Get all FAQ items
   */
  getFAQ: async (): Promise<FAQ[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(faq), 500));
  },

  /**
   * Get special offer
   */
  getSpecialOffer: async (): Promise<SpecialOffer> => {
    return new Promise((resolve) => setTimeout(() => resolve(specialOffer), 500));
  },

  /**
   * Get vision and mission
   */
  getVisionMission: async (): Promise<VisionMission> => {
    return new Promise((resolve) => setTimeout(() => resolve(visionMission), 500));
  },

  /**
   * Save a lead (consultation booking)
   * Currently saves to localStorage.
   *
   * TO INTEGRATE WITH FIRESTORE:
   * import { db } from '../lib/firebase';
   * import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
   *
   * const docRef = await addDoc(collection(db, 'leads'), {
   *   ...payload,
   *   createdAt: serverTimestamp()
   * });
   * return docRef.id;
   */
  saveLead: async (payload: LeadPayload): Promise<boolean> => {
    console.log('[MOCK] Saving lead to localStorage:', payload);

    // Save to localStorage
    const leads = JSON.parse(localStorage.getItem('xfuse_leads') || '[]');
    leads.push(payload);
    localStorage.setItem('xfuse_leads', JSON.stringify(leads));
    localStorage.setItem('xfuse_last_lead', JSON.stringify(payload));

    // Simulate network delay
    return new Promise((resolve) => setTimeout(() => resolve(true), 800));
  }
};
