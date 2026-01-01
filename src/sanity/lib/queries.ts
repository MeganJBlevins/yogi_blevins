import { defineQuery } from 'next-sanity'

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage
  }
`)

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body,
    excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]->{ _id, title, slug }
  }
`)

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`)

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage
  }
`)

export const VIDEOS_QUERY = defineQuery(`
  *[_type == "video" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    youtubeId,
    description,
    publishedAt,
    featured,
    "category": category->{ _id, title, slug }
  }
`)

export const RECENT_VIDEOS_QUERY = defineQuery(`
  *[_type == "video" && defined(slug.current)] | order(publishedAt desc)[0...4] {
    _id,
    title,
    slug,
    youtubeId,
    description,
    publishedAt,
    featured,
    "category": category->{ _id, title, slug }
  }
`)

export const VIDEO_QUERY = defineQuery(`
  *[_type == "video" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    youtubeId,
    description,
    publishedAt,
    featured,
    "category": category->{ _id, title, slug }
  }
`)

export const VIDEO_CATEGORIES_QUERY = defineQuery(`
  *[_type == "videoCategory"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`)

export const VIDEOS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "video" && category._ref == $categoryId] | order(publishedAt desc) {
    _id,
    title,
    slug,
    youtubeId,
    description,
    publishedAt,
    featured,
    "category": category->{ _id, title, slug }
  }
`)

export const UPCOMING_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current) && eventDate >= now()] | order(eventDate asc) {
    _id,
    title,
    slug,
    description,
    eventDate,
    endDate,
    location,
    registrationUrl,
    image,
    featured,
    "category": category->{ _id, title, slug }
  }
`)

export const RECENT_UPCOMING_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current) && eventDate >= now()] | order(eventDate asc)[0...4] {
    _id,
    title,
    slug,
    description,
    eventDate,
    endDate,
    location,
    registrationUrl,
    image,
    featured,
    "category": category->{ _id, title, slug }
  }
`)

export const EVENT_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    eventDate,
    endDate,
    location,
    registrationUrl,
    image,
    featured,
    "category": category->{ _id, title, slug }
  }
`)

export const EVENT_CATEGORIES_QUERY = defineQuery(`
  *[_type == "eventCategory"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`)

export const UPCOMING_EVENTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "event" && category._ref == $categoryId && eventDate >= now()] | order(eventDate asc) {
    _id,
    title,
    slug,
    description,
    eventDate,
    endDate,
    location,
    registrationUrl,
    image,
    featured,
    "category": category->{ _id, title, slug }
  }
`)
