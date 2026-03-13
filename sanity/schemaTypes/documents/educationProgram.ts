import { defineField, defineType } from 'sanity';

export const educationProgramType = defineType({
  name: 'educationProgram',
  title: 'Education program',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'learningPath', title: 'Learning Path', type: 'string', description: 'E.g., "Beginner Series", "Advanced Analysis"' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: Rule => Rule.required() }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g., "Hex grids", "Movement rules", "Combat resolution"'
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
});
