export default {
  name: 'studentResult',
  title: 'Student Result',
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
      name: 'examType',
      title: 'İmtahan Növü',
      type: 'string',
      description: 'Məsələn: YÖS/TYS, SAT, IELTS',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'scoreAz',
      title: 'Nəticə/Proqram (AZ)',
      type: 'string',
      description: 'Məsələn: Bilgisayar Mühendisliği, 1500',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'scoreEn',
      title: 'Result/Program (EN)',
      type: 'string',
      description: 'e.g., Computer Engineering, 1500',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'acceptedCountryAz',
      title: 'Qəbul olunduğu ölkə (AZ)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'acceptedCountryEn',
      title: 'Accepted Country (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'acceptedUniversityAz',
      title: 'Qəbul olunduğu universitet (AZ)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'acceptedUniversityEn',
      title: 'Accepted University (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'nameAz',
      subtitle: 'examType',
      media: 'photo',
    },
  },
}
