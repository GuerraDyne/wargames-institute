import { defineField, defineType } from 'sanity';

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'clientType', title: 'Client type', type: 'string' }),
    defineField({ name: 'problem', title: 'Problem', type: 'text', rows: 4 }),
    defineField({ name: 'approach', title: 'Approach', type: 'text', rows: 4 }),
    defineField({ name: 'outcome', title: 'Outcome', type: 'text', rows: 4 }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
});
