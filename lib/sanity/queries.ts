export const homePageQuery = `*[_type == "homePage"][0]{
  title,
  heroTitle,
  heroSummary,
  featuredLinks[]{
    title,
    summary,
    href,
    label
  }
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  contactEmail,
  socialLinks[]{
    label,
    href
  }
}`;

export const researchBriefsQuery = `*[_type == "researchBrief"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  category,
  summary,
  signal,
  body,
  publishedAt
}`;

export const researchBriefBySlugQuery = `*[_type == "researchBrief" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  category,
  summary,
  signal,
  body,
  publishedAt
}`;

export const articlesQuery = `*[_type == "article"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  series,
  summary,
  body,
  publishedAt
}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  series,
  summary,
  body,
  publishedAt
}`;

export const projectsQuery = `*[_type == "project"] | order(title asc){
  _id,
  title,
  "slug": slug.current,
  status,
  summary,
  applications,
  body
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  status,
  summary,
  applications,
  body
}`;

export const caseStudiesQuery = `*[_type == "caseStudy"] | order(title asc){
  _id,
  title,
  "slug": slug.current,
  clientType,
  problem,
  approach,
  outcome,
  body
}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  clientType,
  problem,
  approach,
  outcome,
  body
}`;

export const resourcesQuery = `*[_type == "resource"] | order(title asc){
  _id,
  title,
  "slug": slug.current,
  format,
  summary,
  body
}`;

export const resourceBySlugQuery = `*[_type == "resource" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  format,
  summary,
  body
}`;

export const educationProgramsQuery = `*[_type == "educationProgram"] | order(title asc){
  _id,
  title,
  audience,
  summary,
  modules
}`;
