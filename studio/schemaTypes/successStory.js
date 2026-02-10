export default {
  name: 'successStory',
  title: 'Success Story',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'nameAz',
      title: 'Ad (AZ)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'nameEn',
      title: 'Name (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'photo',
      title: 'Şəkil',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'beforeAfterAz',
      title: 'Əvvəl → Sonra (AZ)',
      type: 'string',
      description: 'Məsələn: YÖS 350 → 475',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'beforeAfterEn',
      title: 'Before → After (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'storyAz',
      title: 'Hekayə (AZ)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'storyEn',
      title: 'Story (EN)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'highlightDurationAz',
      title: 'Müddət (AZ)',
      type: 'string',
      description: 'Məsələn: 19 ay',
    },
    {
      name: 'highlightDurationEn',
      title: 'Duration (EN)',
      type: 'string',
      description: 'e.g., 19 months',
    },
    {
      name: 'highlightTypeAz',
      title: 'Növ (AZ)',
      type: 'string',
      description: 'Məsələn: YÖS hazırlığı',
    },
    {
      name: 'highlightTypeEn',
      title: 'Type (EN)',
      type: 'string',
      description: 'e.g., YÖS preparation',
    },
    {
      name: 'highlightProgramAz',
      title: 'Proqram (AZ)',
      type: 'string',
      description: 'Məsələn: Intensiv proqram',
    },
    {
      name: 'highlightProgramEn',
      title: 'Program (EN)',
      type: 'string',
      description: 'e.g., Intensive program',
    },
    {
      name: 'imageLeft',
      title: 'Şəkil solda',
      type: 'boolean',
      description: 'Şəkil sol tərəfdə göstərilsin',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'nameAz',
      subtitle: 'beforeAfterAz',
      media: 'photo',
    },
  },
}
