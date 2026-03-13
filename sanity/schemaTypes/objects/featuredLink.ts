import { defineField, defineType } from 'sanity';

export const featuredLinkType = defineType({
  name: 'featuredLink',
  title: 'Featured link',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3 }),
    defineField({ name: 'href', title: 'Href', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'label', title: 'Label', type: 'string' }),
  ],
});
