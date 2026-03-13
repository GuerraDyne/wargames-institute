import { defineField, defineType } from 'sanity';

export const educationProgramType = defineType({
  name: 'educationProgram',
  title: 'Education program',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'audience', title: 'Audience', type: 'string' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: Rule => Rule.required() }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
});
