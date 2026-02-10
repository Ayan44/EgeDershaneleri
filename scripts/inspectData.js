
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'izr9jo3j',
  dataset: 'production',
  apiVersion: '2024-02-09',
  useCdn: false,
})

async function testFetch() {
  try {
    const result = await client.fetch('*[_type == "teamMember"][0]')
    console.log('Keys:', Object.keys(result))
    console.log('Name:', result.name)
    console.log('Slug:', result.slug.current)
  } catch (err) {
    console.error('Fetch FAILED:', err.message)
  }
}

testFetch()
