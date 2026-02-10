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

// Student results data
const STUDENT_RESULTS = [
  {
    id: 1,
    photo: '/photos/students/AnarHəbibli.png',
    examType: 'YÖS/TYS',
    score: 'Bilgisayar Mühendisliği',
  },
  {
    id: 2,
    photo: '/photos/students/SəidəMustafayeva.png',
    examType: 'YÖS/TYS',
    score: 'Bilgisayar Mühendisliği',
  },
  {
    id: 3,
    photo: '/photos/students/AzərZamanov.png',
    examType: 'YÖS/TYS',
    score: 'Yazılım Mühendisliği',
  },
  {
    id: 4,
    photo: '/photos/students/ƏminəMəhərrəmli.png',
    examType: 'YÖS/TYS',
    score: 'Bilgisayar Mühendisliği',
  },
  {
    id: 5,
    photo: '/photos/students/KənanKərimli.png',
    examType: 'YÖS/TYS',
    score: 'Makina Mühendisliği',
  },
  {
    id: 6,
    photo: '/photos/students/ƏliMehdiyev.png',
    examType: 'YÖS/TYS',
    score: 'Diş Hekimliği',
  },
]

// University mappings
const UNIVERSITY_MAPPING = {
  1: 'adnan', // Adnan Menderes
  2: 'iskenderun', // İskenderun
  3: 'adnan',
  4: 'iskenderun',
  5: 'adnan',
  6: 'zonguldak',
}

async function migrate() {
  console.log(`Starting migration for ${STUDENT_RESULTS.length} student results...`)

  for (const result of STUDENT_RESULTS) {
    const { id, photo, examType, score } = result

    // Get name from locales
    const nameAz = az.achievements.studentResults.data[id]?.name
    const nameEn = en.achievements.studentResults.data[id]?.name

    if (!nameAz || !nameEn) {
      console.warn(`Missing name data for student ID ${id}, skipping...`)
      continue
    }

    // Get university and country
    const universityKey = UNIVERSITY_MAPPING[id]
    const acceptedCountryAz = az.achievements.countries.turkey
    const acceptedCountryEn = en.achievements.countries.turkey
    const acceptedUniversityAz = az.achievements.universities[universityKey]
    const acceptedUniversityEn = en.achievements.universities[universityKey]

    // Construct Sanity Document
    const doc = {
      _id: `student-result-${id}`,
      _type: 'studentResult',
      
      order: id,
      nameAz: nameAz,
      nameEn: nameEn,
      examType: examType,
      scoreAz: score,
      scoreEn: score, // Defaulting to same as AZ for now, user can edit in Studio
      acceptedCountryAz: acceptedCountryAz,
      acceptedCountryEn: acceptedCountryEn,
      acceptedUniversityAz: acceptedUniversityAz,
      acceptedUniversityEn: acceptedUniversityEn,
      
      // Note: Photo path saved as reference, not uploaded
      // Can be added manually in Sanity Studio later
    }

    try {
      const result = await client.createOrReplace(doc)
      console.log(`✅ Migrated: ${nameAz} / ${nameEn} (ID: ${id})`)
    } catch (err) {
      console.error(`❌ Failed to migrate student ${id}:`, err.message)
    }
  }

  console.log('Migration complete!')
}

migrate().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
