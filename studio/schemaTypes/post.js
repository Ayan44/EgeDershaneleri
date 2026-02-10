export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title_az',
      title: 'Başlıq (AZ)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title_az',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Əsas Şəkil',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt_az',
      title: 'Qısa təsvir (AZ)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt_en',
      title: 'Excerpt (EN)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content_az',
      title: 'Məzmun (AZ)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content_en',
      title: 'Content (EN)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishDate',
      title: 'Dərc tarixi',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'readingTime',
      title: 'Oxuma müddəti',
      type: 'string',
      description: 'Məsələn: 5 dəq',
    },
    {
      name: 'author',
      title: 'Müəllif',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    },
    {
      name: 'category',
      title: 'Kateqoriya',
      type: 'string',
      options: {
        list: [
          { title: 'SAT', value: 'SAT' },
          { title: 'IELTS', value: 'IELTS' },
          { title: 'TOEFL', value: 'TOEFL' },
          { title: 'General English', value: 'General English' },
          { title: 'Xaricdə təhsil', value: 'Xaricdə təhsil' },
          { title: 'Olimpiada', value: 'Olimpiada' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title_az',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
}
