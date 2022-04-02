import { createCurrentUserHooks, createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2021-03-25',
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
})
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
