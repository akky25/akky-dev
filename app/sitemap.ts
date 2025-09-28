import { MetadataRoute } from 'next'
import { posts } from '#site/content'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true'

  const siteUrl = siteConfig.url

  // 記事のサイトマップエントリ
  const postEntries = posts
    .filter(post => isDevelopment || !post.draft)
    .map(post => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updated || post.date,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'daily',
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    ...postEntries,
  ]
}