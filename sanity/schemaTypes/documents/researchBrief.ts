import { defineField, defineType } from 'sanity';

export const researchBriefType = defineType({
  name: 'researchBrief',
  title: 'Research brief',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: Rule => Rule.required() }),
    defineField({ name: 'signal', title: 'Signal line', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
});
