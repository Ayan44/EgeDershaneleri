import 'dotenv/config'
import { createClient } from '@sanity/client'
import { TEAM_MEMBERS_DATA } from '../src/data/teamMembers.js'
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
  useCdn: false, // We are writing data
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

// Helper to find course ID by slug
async function findCourseId(slug) {
    const query = `*[_type == "course" && slug.current == $slug][0]._id`
    return client.fetch(query, { slug })
}

async function migrate() {
  console.log(`Starting migration for ${TEAM_MEMBERS_DATA.length} team members...`)

  for (const member of TEAM_MEMBERS_DATA) {
    const { slug, role, order, featured, courseSlugs } = member
    
    // Get text content from locale files
    const localeDataAz = az.teachers.data[slug]
    const localeDataEn = en.teachers.data[slug]

    if (!localeDataAz) {
      console.warn(`No AZ locale data found for slug: ${slug}, skipping...`)
      continue
    }

    const { fullName, role: roleTitle, bio } = localeDataAz
    const { fullName: fullNameEn, role: roleTitleEn, bio: bioEn } = localeDataEn || {}

    // Map Courses
    const courseRefs = []
    if (courseSlugs && courseSlugs.length > 0) {
        for (const courseSlug of courseSlugs) {
            const courseId = await findCourseId(courseSlug)
            if (courseId) {
                courseRefs.push({
                    _type: 'reference',
                    _ref: courseId,
                    _key: courseSlug // meaningful key
                })
            }
        }
    }

    // Construct Sanity Document
    const doc = {
      _id: `teamMember-${slug}`, // Deterministic ID
      _type: 'teamMember',
      
      // AZ Fields (Default)
      name: fullName,
      title: roleTitle || (role === 'teacher' ? 'Müəllim' : 'Əməkdaş'),
      bio: convertToBlocks(bio),

      // EN Fields
      name_en: fullNameEn,
      title_en: roleTitleEn, // "Math Teacher" etc.
      bio_en: convertToBlocks(bioEn),
      
      // Common Fields
      slug: {
        _type: 'slug',
        current: slug,
      },
      role: role, // 'teacher' or 'staff' internal ID
      role_en: role === 'teacher' ? 'Teacher' : 'Staff', // Display role, fallback to static if needed
      
      experience: '', 
      featured: featured || false,
      order: order,
      // Images: Skipping upload for now as requested.
    }

    // Add courses only if teacher
    if (role === 'teacher') {
        doc.courses = courseRefs
    }

    // Create or Replace
    try {
      const result = await client.createOrReplace(doc)
      console.log(`✅ Migrated: ${fullName} / ${fullNameEn} (${slug})`)
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
