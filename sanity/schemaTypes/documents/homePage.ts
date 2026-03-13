import { defineField, defineType } from 'sanity';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Hero title', type: 'string' }),
    defineField({ name: 'heroSummary', title: 'Hero summary', type: 'text', rows: 4 }),
    defineField({
      name: 'featuredLinks',
      title: 'Featured links',
      type: 'array',
      of: [{ type: 'featuredLink' }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
});
