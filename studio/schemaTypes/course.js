export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Göstərilmə sırası',
    },
    {
      name: 'title',
      title: 'Başlıq (AZ)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Qısa Təsvir (AZ)',
      type: 'text',
      description: 'Kart üzərində göstəriləcək qısa mətn',
    },
    {
      name: 'shortDescription_en',
      title: 'Short Description (EN)',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Kateqoriya',
      type: 'string',
      options: {
        list: [
          { title: 'İmtahan', value: 'imtahan' },
          { title: 'Dil', value: 'dil' },
          { title: 'Olimpiada', value: 'olimpiada' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'level',
      title: 'Səviyyə (AZ)',
      type: 'string',
      description: 'Məsələn: Başlanğıc səviyyə, Orta səviyyə',
    },
    {
      name: 'level_en',
      title: 'Level (EN)',
      type: 'string',
    },
    {
      name: 'format',
      title: 'Format (AZ)',
      type: 'string',
      description: 'Məsələn: Onlayn / Əyani',
    },
    {
      name: 'format_en',
      title: 'Format (EN)',
      type: 'string',
    },
    {
      name: 'thumbnail',
      title: 'Şəkil',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'featured',
      title: 'Ana səhifədə göstər',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'audience',
      title: 'Kurs kimlər üçün (AZ)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Hədəf auditoriya siyahısı',
    },
    {
      name: 'audience_en',
      title: 'Target Audience (EN)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'learningOutcomes',
      title: 'Nə öyrənəcəklər (AZ)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Proqram və öyrənmə nəticələri',
    },
    {
      name: 'learningOutcomes_en',
      title: 'Learning Outcomes (EN)',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnail',
    },
  },
}
