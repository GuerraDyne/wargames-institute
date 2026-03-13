import {
  articlePreviews,
  caseStudies as fallbackCaseStudies,
  educationPrograms as fallbackEducationPrograms,
  projectProfiles as fallbackProjects,
  researchBriefs as fallbackResearchBriefs,
  resourceItems as fallbackResources,
} from '@/lib/site-content';
import { sanityClient } from './client';
import {
  articleBySlugQuery,
  articlesQuery,
  caseStudiesQuery,
  caseStudyBySlugQuery,
  educationProgramsQuery,
  projectBySlugQuery,
  projectsQuery,
  researchBriefBySlugQuery,
  researchBriefsQuery,
  resourceBySlugQuery,
  resourcesQuery,
} from './queries';
import type {
  SanityArticle,
  SanityCaseStudy,
  SanityEducationProgram,
  SanityProject,
  SanityResearchBrief,
  SanityResource,
} from './types';

async function safeFetch<T>(query: string, params?: Record<string, string>) {
  try {
    return await sanityClient.fetch<T>(query, params ?? {});
  } catch {
    return null;
  }
}

export async function getResearchBriefs() {
  const data = await safeFetch<SanityResearchBrief[]>(researchBriefsQuery);
  return data && data.length > 0 ? data : fallbackResearchBriefs;
}

export async function getResearchBrief(slug: string) {
  const data = await safeFetch<SanityResearchBrief | null>(researchBriefBySlugQuery, { slug });
  return data ?? fallbackResearchBriefs.find((item) => item.slug === slug) ?? null;
}

export async function getArticles() {
  const data = await safeFetch<SanityArticle[]>(articlesQuery);
  return data && data.length > 0 ? data : articlePreviews;
}

export async function getArticle(slug: string) {
  const data = await safeFetch<SanityArticle | null>(articleBySlugQuery, { slug });
  return data ?? articlePreviews.find((item) => item.slug === slug) ?? null;
}

export async function getProjects() {
  const data = await safeFetch<SanityProject[]>(projectsQuery);
  return data && data.length > 0 ? data : fallbackProjects;
}

export async function getProject(slug: string) {
  const data = await safeFetch<SanityProject | null>(projectBySlugQuery, { slug });
  return data ?? fallbackProjects.find((item) => item.slug === slug) ?? null;
}

export async function getCaseStudies() {
  const data = await safeFetch<SanityCaseStudy[]>(caseStudiesQuery);
  return data && data.length > 0 ? data : fallbackCaseStudies;
}

export async function getCaseStudy(slug: string) {
  const data = await safeFetch<SanityCaseStudy | null>(caseStudyBySlugQuery, { slug });
  return data ?? fallbackCaseStudies.find((item) => item.slug === slug) ?? null;
}

export async function getResources() {
  const data = await safeFetch<SanityResource[]>(resourcesQuery);
  return data && data.length > 0 ? data : fallbackResources;
}

export async function getResource(slug: string) {
  const data = await safeFetch<SanityResource | null>(resourceBySlugQuery, { slug });
  return data ?? fallbackResources.find((item) => item.slug === slug) ?? null;
}

export async function getEducationPrograms() {
  const data = await safeFetch<SanityEducationProgram[]>(educationProgramsQuery);
  return data && data.length > 0 ? data : fallbackEducationPrograms;
}
