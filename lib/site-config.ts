// lib/site-config.ts - サイト全体で共通利用する設定
export const siteConfig = {
  name: 'My Blog',
  description: 'A modern blog built with Next.js and MDX',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: {
    name: 'Author Name',
    email: 'author@example.com',
    url: 'https://example.com',
  },
  social: {
    twitter: '@handle',
    github: 'username',
  },
  locale: 'ja-JP',
  timezone: 'Asia/Tokyo',
} as const

export type SiteConfig = typeof siteConfig

// 環境変数チェック付きのサイトURL取得
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL

  if (!url) {
    console.warn('NEXT_PUBLIC_SITE_URL is not set. Using default: http://localhost:3000')
    return 'http://localhost:3000'
  }

  return url
}