import Link from 'next/link'
import { posts } from '#site/content'
import { Badge } from '@/components/ui/badge'

export default function BlogPage() {
  const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true'

  const filteredPosts = posts
    .filter(post => isDevelopment || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

      <div className="flex flex-col gap-8">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={post.permalink} className="block">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                {post.draft && isDevelopment && (
                  <Badge variant="outline" className="text-xs">
                    下書き
                  </Badge>
                )}
              </div>
              <time className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString('ja-JP')}
              </time>
              {post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Link>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            まだ記事がありません。
          </p>
        )}
      </div>
    </div>
  )
}