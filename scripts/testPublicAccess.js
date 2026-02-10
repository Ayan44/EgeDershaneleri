
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'izr9jo3j',
  dataset: 'production',
  apiVersion: '2024-02-09',
  useCdn: false,
  // NO TOKEN HERE
})

async function testFetch() {
  try {
    const result = await client.fetch('*[_type == "teamMember"][0]')
    console.log('Fetch SUCCESS:', result ? 'Found data' : 'No data, but access OK')
  } catch (err) {
    console.error('Fetch FAILED:', err.message)
  }
}

testFetch()
