import { posts } from '#site/content'

const isDevelopment = () => process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true'

export function getAllPosts(includeDrafts = false) {
  if (includeDrafts || isDevelopment()) {
    return posts
  }
  return posts.filter(post => !post.draft)
}

export function getPublishedPosts(includeDrafts = false) {
  const filtered = includeDrafts || isDevelopment()
    ? posts
    : posts.filter(post => !post.draft)

  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string, includeDrafts = false) {
  if (includeDrafts || isDevelopment()) {
    return posts.find(post => post.slug === slug)
  }
  return posts.find(post => post.slug === slug && !post.draft)
}