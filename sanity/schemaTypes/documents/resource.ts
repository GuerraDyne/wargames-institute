import { defineField, defineType } from 'sanity';

export const resourceType = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'format', title: 'Format', type: 'string' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: Rule => Rule.required() }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
});
