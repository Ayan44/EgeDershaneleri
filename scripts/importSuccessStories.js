import 'dotenv/config'
import { createClient } from '@sanity/client'
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

// Success stories data - mapping slug to ID and photo path
const SUCCESS_STORIES = [
  {
    slug: 'sureyya',
    id: 1,
    photo: '/photos/students/Sürəyya.png',
    imageLeft: true,
  },
  {
    slug: 'zehra',
    id: 2,
    photo: '/photos/students/Zəhra.png',
    imageLeft: false,
  },
  {
    slug: 'rena',
    id: 3,
    photo: '/photos/students/Rəna.png',
    imageLeft: true,
  },
]

async function migrate() {
  console.log(`Starting migration for ${SUCCESS_STORIES.length} success stories...`)

  for (const story of SUCCESS_STORIES) {
    const { slug, id, photo, imageLeft } = story

    // Get data from locales
    const dataAz = az.achievements.successStoriesData[slug]
    const dataEn = en.achievements.successStoriesData[slug]

    if (!dataAz || !dataEn) {
      console.warn(`Missing data for story: ${slug}, skipping...`)
      continue
    }

    // Construct Sanity Document
    const doc = {
      _id: `success-story-${slug}`,
      _type: 'successStory',
      
      order: id,
      nameAz: dataAz.name,
      nameEn: dataEn.name,
      beforeAfterAz: dataAz.beforeAfter,
      beforeAfterEn: dataEn.beforeAfter,
      storyAz: dataAz.story,
      storyEn: dataEn.story,
      highlightDurationAz: dataAz.highlights.duration,
      highlightDurationEn: dataEn.highlights.duration,
      highlightTypeAz: dataAz.highlights.type,
      highlightTypeEn: dataEn.highlights.type,
      highlightProgramAz: dataAz.highlights.program,
      highlightProgramEn: dataEn.highlights.program,
      imageLeft: imageLeft,
      
      // Note: Photo path saved as reference, not uploaded
      // Can be added manually in Sanity Studio later
    }

    try {
      const result = await client.createOrReplace(doc)
      console.log(`✅ Migrated: ${dataAz.name} / ${dataEn.name} (${slug})`)
    } catch (err) {
      console.error(`❌ Failed to migrate story ${slug}:`, err.message)
    }
  }

  console.log('Migration complete!')
}

migrate().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
