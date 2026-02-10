export default {
  name: 'skill',
  title: 'Skill',
  type: 'object',
  fields: [
    {
      name: 'title_az',
      title: 'Title (AZ)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title_az',
      subtitle: 'title_en',
    },
  },
}
