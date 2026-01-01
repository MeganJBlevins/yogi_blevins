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
