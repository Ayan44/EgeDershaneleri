import { defineField, defineType } from 'sanity'
import { Settings } from 'lucide-react'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({
      name: 'title',
      title: 'Settings Title',
      type: 'string',
      initialValue: 'Site Settings',
      readOnly: true,
    }),
    defineField({
      name: 'founderPhoto',
      title: 'Founder Photo',
      type: 'image',
      description: 'Photo of the founder (Vüsalə Məmmədova)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'statisticsImage',
      title: 'Statistics Image',
      type: 'image',
      description: 'Statistics visual/infographic',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'studyAbroadHero',
      title: 'Study Abroad Hero Image',
      type: 'image',
      description: 'Hero image for study abroad sections',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
