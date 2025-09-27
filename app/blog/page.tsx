import Link from 'next/link'
import { posts } from '#site/content'
import { Badge } from '@/components/ui/badge'

export default function BlogPage() {
  const publishedPosts = posts.filter(post => !post.draft).sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

      <div className="flex flex-col gap-8">
        {publishedPosts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={post.permalink} className="block">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
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

        {publishedPosts.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            まだ記事がありません。
          </p>
        )}
      </div>
    </div>
  )
}