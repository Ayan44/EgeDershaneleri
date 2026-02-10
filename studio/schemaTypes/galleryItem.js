import { defineField, defineType } from 'sanity'
import { Images } from 'lucide-react'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  icon: Images,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for the image (internal use or display)',
    }),
    defineField({
      name: 'altAz',
      title: 'Alt Text (AZ)',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Alternative text for accessibility (Azerbaijani)',
    }),
    defineField({
        name: 'altEn',
        title: 'Alt Text (EN)',
        type: 'string',
        validation: (rule) => rule.required(),
        description: 'Alternative text for accessibility (English)',
      }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Alternative text for screen readers (optional override)',
        }
      ]
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to control the sort order of images (Ascending)',
    }),
    defineField({
        name: 'isFeatured',
        title: 'Is Featured?',
        type: 'boolean',
        initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'altAz',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || subtitle || 'Untitled Image',
        subtitle: title ? subtitle : '',
        media,
      }
    },
  },
})
