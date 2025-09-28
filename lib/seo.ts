import { Metadata } from 'next'
import { siteConfig } from './site-config'

interface Post {
  title: string
  description: string
  slug: string
  date: string
  updated?: string
  cover?: string
  tags?: string[]
}

// 画像URLを正規化（相対パスを絶対URLに変換）
function normalizeImageUrl(imagePath: string | undefined, slug: string): string {
  if (!imagePath) {
    // カバー画像がない場合はOG画像生成エンドポイントを使用
    return `${siteConfig.url}/og/${slug}`
  }

  // すでに完全なURLの場合はそのまま返す
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // 相対パスを絶対URLに変換
  return new URL(imagePath, siteConfig.url).toString()
}

// 記事用メタデータ生成
export function generateArticleMetadata(post: Post): Metadata {
  const url = new URL(`/blog/${post.slug}`, siteConfig.url)
  const ogImageUrl = normalizeImageUrl(post.cover, post.slug)

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      type: 'article',
      url: url.toString(),
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [siteConfig.author.name],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
      creator: siteConfig.social.twitter,
    },
    keywords: post.tags?.join(', '),
  }
}

// 構造化データ（JSON-LD）構築
export function buildJsonLd(post: Post) {
  const url = `${siteConfig.url}/blog/${post.slug}`
  const imageUrl = normalizeImageUrl(post.cover, post.slug)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url,
    image: imageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags?.join(', '),
  }
}