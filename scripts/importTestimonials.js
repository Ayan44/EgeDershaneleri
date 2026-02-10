import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { TESTIMONIALS_DATA } from '../src/data/testimonials.js'
import { az } from '../src/locales/az.js'
import { en } from '../src/locales/en.js'

// Load environment variables from .env file
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure Sanity client
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '311681u6',
  dataset: process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN, // Needs write access
  useCdn: false,
})

async function uploadImage(imagePath) {
  try {
    const fullPath = path.join(__dirname, '..', 'public', imagePath)
    if (!fs.existsSync(fullPath)) {
      console.error(`Image not found: ${fullPath}`)
      return null
    }

    const buffer = fs.readFileSync(fullPath)
    const asset = await client.assets.upload('image', buffer, {
      filename: path.basename(imagePath)
    })
    return asset
  } catch (error) {
    console.error(`Failed to upload image ${imagePath}:`, error)
    return null
  }
}

async function importTestimonials() {
  if (!client.config().token) {
    console.error('Error: SANITY_WRITE_TOKEN is required in .env file')
    return
  }

  console.log('Starting testimonials import...')

  for (let i = 0; i < TESTIMONIALS_DATA.length; i++) {
    const item = TESTIMONIALS_DATA[i]
    const deterministicId = `testimonial-${item.id}`
    
    // Extract text data from locales
    // Locales structure: testimonials.data.{id}.{field}
    const azData = az.testimonials.data[item.id]
    const enData = en.testimonials.data[item.id]

    if (!azData || !enData) {
        console.warn(`Missing translation data for testimonial IDs ${item.id}. Skipping.`)
        continue
    }

    console.log(`Processing item ${item.id}: ${azData.studentName}`)

    // Check if document already exists
    const existing = await client.getDocument(deterministicId)
    if (existing) {
      console.log(`Document ${deterministicId} already exists. Skipping...`)
      continue
    }

    // Upload image
    let imageAsset = null
    if (item.image) {
        imageAsset = await uploadImage(item.image)
    }

    // Create document
    const doc = {
      _type: 'testimonial',
      _id: deterministicId,
      nameAz: azData.studentName,
      nameEn: enData.studentName,
      quoteAz: azData.text,
      quoteEn: enData.text,
      universityAz: azData.scoreOrResult,
      universityEn: enData.scoreOrResult,
      order: item.order || i + 1,
      ...(imageAsset && {
        photo: {
          _type: 'image',
          asset: {
            _ref: imageAsset._id,
            _type: 'reference'
          }
        }
      })
    }

    await client.create(doc)
    console.log(`Created document ${deterministicId}`)
  }

  console.log('Testimonials import completed!')
}

importTestimonials().catch(console.error)
