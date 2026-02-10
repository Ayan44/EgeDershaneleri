export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
    {
      name: 'name',
      title: 'Ad Soyad (AZ)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name_en',
      title: 'Full Name (EN)',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Vəzifə (AZ)',
      type: 'string',
      options: {
        list: [
          { title: 'Müəllim', value: 'teacher' },
          { title: 'Əməkdaş', value: 'staff' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role_en',
      title: 'Role (EN)',
      type: 'string',
      description: 'e.g. Teacher, Staff (Optional override)',
    },
    {
      name: 'title',
      title: 'Vəzifə Başlığı (AZ)',
      type: 'string',
      description: 'Məsələn: Riyaziyyat müəllimi, Direktor',
    },
    {
      name: 'title_en',
      title: 'Job Title (EN)',
      type: 'string',
      description: 'e.g. Math Teacher, Director',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
          source: 'name',
          maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'experience',
      title: 'Təcrübə',
      type: 'string',
    },
    {
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Haqqında (AZ)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'bio_en',
      title: 'Bio (EN)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'course' } }],
      hidden: ({ document }) => document?.role !== 'teacher',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on home page slider?',
      initialValue: false,
    },
    {
      name: 'skills',
      title: 'İxtisaslar / Skills',
      type: 'array',
      of: [{ type: 'skill' }],
      description: 'Add skills/specialties for this team member',
    }
  ],
  orderings: [
    {
      title: 'Order Asc',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
    },
  },
}
