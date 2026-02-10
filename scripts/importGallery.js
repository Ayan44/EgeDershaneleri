import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GALLERY_ITEMS } from '../src/data/gallery.js'

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

async function importGallery() {
  const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN
  if (!token) {
    console.error('Error: SANITY_WRITE_TOKEN is required in .env file')
    return
  }

  console.log('Starting gallery import...')

  for (let i = 0; i < GALLERY_ITEMS.length; i++) {
    const item = GALLERY_ITEMS[i]
    const deterministicId = `gallery-item-${i + 1}`

    console.log(`Processing item ${i + 1}/${GALLERY_ITEMS.length}: ${item.alt}`)

    // Check if document already exists
    const existing = await client.getDocument(deterministicId)
    if (existing) {
      console.log(`Document ${deterministicId} already exists. Skipping...`)
      continue
    }

    // Upload image
    const imageAsset = await uploadImage(item.src)
    if (!imageAsset) {
        console.error(`Skipping item ${i+1} due to image upload failure.`)
      continue
    }

    // Create document
    const doc = {
      _type: 'galleryItem',
      _id: deterministicId,
      title: item.alt,
      altAz: item.alt,
      altEn: item.alt, // Fallback for now as we don't have EN translations locally
      order: i + 1,
      image: {
        _type: 'image',
        asset: {
          _ref: imageAsset._id,
          _type: 'reference'
        }
      }
    }

    await client.create(doc)
    console.log(`Created document ${deterministicId}`)
  }

  console.log('Import completed!')
}

importGallery().catch(console.error)
