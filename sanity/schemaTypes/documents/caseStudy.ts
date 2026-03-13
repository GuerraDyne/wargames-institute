import { defineField, defineType } from 'sanity';

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'studyType', title: 'Study Type', type: 'string', description: 'E.g., "Historical Research", "Mechanics Analysis", "Applied Research"' }),
    defineField({ name: 'gameAnalyzed', title: 'Game Analyzed', type: 'string', description: 'Optional - name of the game being analyzed' }),
    defineField({ name: 'question', title: 'Research Question', type: 'text', rows: 4 }),
    defineField({ name: 'approach', title: 'Approach', type: 'text', rows: 4 }),
    defineField({ name: 'findings', title: 'Findings', type: 'text', rows: 4 }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
});
