export interface PortableTextBlock {
  _key?: string;
  _type: string;
  children?: Array<{
    _key?: string;
    _type: 'span';
    text: string;
    marks?: string[];
  }>;
  style?: string;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
}

export interface SanityResearchBrief {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  signal?: string;
  body?: PortableTextBlock[];
  publishedAt?: string;
}

export interface SanityArticle {
  _id: string;
  title: string;
  slug: string;
  series: string;
  summary: string;
  body?: PortableTextBlock[];
  publishedAt?: string;
}

export interface SanityProject {
  _id: string;
  title: string;
  slug: string;
  status?: string;
  summary: string;
  applications?: string[];
  body?: PortableTextBlock[];
}

export interface SanityCaseStudy {
  _id: string;
  title: string;
  slug: string;
  clientType?: string;
  problem?: string;
  approach?: string;
  outcome?: string;
  body?: PortableTextBlock[];
}

export interface SanityResource {
  _id: string;
  title: string;
  slug: string;
  format?: string;
  summary: string;
  body?: PortableTextBlock[];
}

export interface SanityEducationProgram {
  _id: string;
  title: string;
  audience: string;
  summary: string;
  modules?: string[];
}
