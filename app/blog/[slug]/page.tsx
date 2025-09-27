import { notFound } from 'next/navigation'
import { posts } from '#site/content'
import { MDXContent } from '@/components/mdx-content'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

function getPostBySlug(slug: string) {
  return posts.find(post => post.slug === slug)
}

export async function generateStaticParams() {
  return posts
    .filter(post => !post.draft)
    .map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)

  if (!post || post.draft) {
    notFound()
  }

  return (
    <article className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm">
          <Link href="/blog">
            <ChevronLeft className="mr-2 h-4 w-4" />
            ブログに戻る
          </Link>
        </Button>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time>{new Date(post.date).toLocaleDateString('ja-JP')}</time>
          {post.updated && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <span>更新: {new Date(post.updated).toLocaleDateString('ja-JP')}</span>
            </>
          )}
        </div>
        {post.tags.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <MDXContent code={post.content} />
    </article>
  )
}