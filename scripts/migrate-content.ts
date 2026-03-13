import { createClient } from '@sanity/client';
import {
  articlePreviews,
  projectProfiles,
  caseStudies,
  educationPrograms,
  researchBriefs,
  resourceItems,
} from '../lib/site-content';

// Initialize Sanity client with write token
const client = createClient({
  projectId: 'pvyzepbx',
  dataset: 'production',
  apiVersion: '2026-03-12',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // You'll need to create this
});

async function migrateContent() {
  console.log('Starting content migration...\n');

  try {
    // Migrate Articles
    console.log('Migrating articles...');
    for (const article of articlePreviews) {
      const doc = {
        _type: 'article',
        title: article.title,
        slug: { _type: 'slug', current: article.slug },
        series: article.series,
        summary: article.summary,
        body: article.body.map(paragraph => ({
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'normal',
          children: [{ _type: 'span', text: paragraph }],
        })),
        publishedAt: new Date().toISOString(),
      };
      await client.create(doc);
      console.log(`  ✓ Created article: ${article.title}`);
    }

    // Migrate Projects
    console.log('\nMigrating projects...');
    for (const project of projectProfiles) {
      const doc = {
        _type: 'project',
        title: project.title,
        slug: { _type: 'slug', current: project.slug },
        type: project.type,
        summary: project.summary,
        tags: project.tags,
        body: project.body.map(paragraph => ({
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'normal',
          children: [{ _type: 'span', text: paragraph }],
        })),
      };
      await client.create(doc);
      console.log(`  ✓ Created project: ${project.title}`);
    }

    // Migrate Case Studies
    console.log('\nMigrating case studies...');
    for (const study of caseStudies) {
      const doc = {
        _type: 'caseStudy',
        title: study.title,
        slug: { _type: 'slug', current: study.slug },
        studyType: study.studyType,
        gameAnalyzed: study.gameAnalyzed || '',
        question: study.question,
        approach: study.approach,
        findings: study.findings,
        body: study.body.map(paragraph => ({
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'normal',
          children: [{ _type: 'span', text: paragraph }],
        })),
      };
      await client.create(doc);
      console.log(`  ✓ Created case study: ${study.title}`);
    }

    // Migrate Education Programs
    console.log('\nMigrating education programs...');
    for (const program of educationPrograms) {
      const doc = {
        _type: 'educationProgram',
        title: program.title,
        learningPath: program.learningPath,
        summary: program.summary,
        topics: program.topics,
      };
      await client.create(doc);
      console.log(`  ✓ Created education program: ${program.title}`);
    }

    // Migrate Research Briefs
    console.log('\nMigrating research briefs...');
    for (const brief of researchBriefs) {
      const doc = {
        _type: 'researchBrief',
        title: brief.title,
        slug: { _type: 'slug', current: brief.slug },
        category: brief.category,
        summary: brief.summary,
        signal: brief.signal,
        body: brief.body.map(paragraph => ({
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'normal',
          children: [{ _type: 'span', text: paragraph }],
        })),
        publishedAt: new Date().toISOString(),
      };
      await client.create(doc);
      console.log(`  ✓ Created research brief: ${brief.title}`);
    }

    // Migrate Resources
    console.log('\nMigrating resources...');
    for (const resource of resourceItems) {
      const doc = {
        _type: 'resource',
        title: resource.title,
        slug: { _type: 'slug', current: resource.slug },
        format: resource.format,
        summary: resource.summary,
        body: resource.body.map(paragraph => ({
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'normal',
          children: [{ _type: 'span', text: paragraph }],
        })),
      };
      await client.create(doc);
      console.log(`  ✓ Created resource: ${resource.title}`);
    }

    console.log('\n✅ Migration complete!');
    console.log('\nContent migrated:');
    console.log(`  - ${articlePreviews.length} articles`);
    console.log(`  - ${projectProfiles.length} projects`);
    console.log(`  - ${caseStudies.length} case studies`);
    console.log(`  - ${educationPrograms.length} education programs`);
    console.log(`  - ${researchBriefs.length} research briefs`);
    console.log(`  - ${resourceItems.length} resources`);

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateContent();
