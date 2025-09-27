import { posts } from '#site/content'

export function getAllPosts() {
  return posts
}

export function getPublishedPosts() {
  return posts
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string) {
  return posts.find(post => post.slug === slug)
}