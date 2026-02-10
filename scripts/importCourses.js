import 'dotenv/config'
import { createClient } from '@sanity/client'
import { COURSES_DATA } from '../src/data/courses.js'
import { az } from '../src/locales/az.js'
import { en } from '../src/locales/en.js'

// Config
const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2024-02-09'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity configuration. Please check your .env file.')
  console.error('Required: VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, SANITY_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

// Helper to convert plain text to Portable Text blocks
function convertToBlocks(text) {
  if (!text) return []
  return text.split('\n\n').map(paragraph => ({
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: paragraph.trim(),
      },
    ],
    markDefs: [],
    style: 'normal',
  })).filter(block => block.children[0].text.length > 0)
}

async function migrate() {
  console.log(`Starting migration for ${COURSES_DATA.length} courses...`)

  for (const course of COURSES_DATA) {
    const { slug, category, thumbnailUrl, id } = course
    
    // Get text content from locale files
    const localeDataAz = az.courseDetails.data[slug]
    const localeDataEn = en.courseDetails.data[slug]

    if (!localeDataAz) {
      console.warn(`No AZ locale data found for slug: ${slug}, skipping...`)
      continue
    }

    const { 
      title, 
      shortDescription, 
      level, 
      format, 
      audience = [], 
      program = [] 
    } = localeDataAz

    const { 
      title: titleEn, 
      shortDescription: shortDescriptionEn,
      level: levelEn,
      format: formatEn,
      audience: audienceEn = [],
      program: programEn = []
    } = localeDataEn || {}

    // Construct Sanity Document
    const doc = {
      _id: `course-${slug}`,
      _type: 'course',
      
      // Metadata
      slug: {
        _type: 'slug',
        current: slug,
      },
      category: category,
      order: id,
      featured: false,
      
      // AZ Fields
      title: title,
      shortDescription: shortDescription,
      level: level,
      format: format,
      audience: audience,
      learningOutcomes: program,
      
      // EN Fields
      title_en: titleEn,
      shortDescription_en: shortDescriptionEn,
      level_en: levelEn,
      format_en: formatEn,
      audience_en: audienceEn,
      learningOutcomes_en: programEn,
      
      // Note: Images skipped for now, thumbnailUrl would need upload
    }

    try {
      const result = await client.createOrReplace(doc)
      console.log(`✅ Migrated: ${title} / ${titleEn} (${slug})`)
    } catch (err) {
      console.error(`❌ Failed to migrate ${slug}:`, err.message)
    }
  }

  console.log('Migration complete!')
}

migrate().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
