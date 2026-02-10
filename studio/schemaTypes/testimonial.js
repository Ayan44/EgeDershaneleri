import { defineField, defineType } from 'sanity'
import { MessageSquareQuote } from 'lucide-react'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: MessageSquareQuote,
  fields: [
    defineField({
      name: 'nameAz',
      title: 'Student Name (AZ)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'nameEn',
        title: 'Student Name (EN)',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
    defineField({
      name: 'quoteAz',
      title: 'Quote (AZ)',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'quoteEn',
        title: 'Quote (EN)',
        type: 'text',
        validation: (rule) => rule.required(),
      }),
    defineField({
      name: 'universityAz',
      title: 'University/Result (AZ)',
      type: 'string',
    }),
    defineField({
        name: 'universityEn',
        title: 'University/Result (EN)',
        type: 'string',
      }),
    defineField({
      name: 'photo',
      title: 'Student Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in the slider',
    }),
  ],
  preview: {
    select: {
      title: 'nameAz',
      subtitle: 'universityAz',
      media: 'photo',
    },
  },
})
