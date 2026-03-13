import { articleType } from './documents/article';
import { caseStudyType } from './documents/caseStudy';
import { educationProgramType } from './documents/educationProgram';
import { homePageType } from './documents/homePage';
import { projectType } from './documents/project';
import { researchBriefType } from './documents/researchBrief';
import { resourceType } from './documents/resource';
import { siteSettingsType } from './documents/siteSettings';
import { featuredLinkType } from './objects/featuredLink';
import { seoType } from './objects/seo';

export const schemaTypes = [
  articleType,
  caseStudyType,
  educationProgramType,
  featuredLinkType,
  homePageType,
  projectType,
  researchBriefType,
  resourceType,
  seoType,
  siteSettingsType,
];
