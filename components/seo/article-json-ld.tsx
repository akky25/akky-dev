import { buildJsonLd } from '@/lib/seo';

interface Post {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  cover?: string;
  tags?: string[];
}

interface ArticleJsonLdProps {
  post: Post;
}

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const jsonLd = buildJsonLd(post);

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires dangerouslySetInnerHTML, content is safely stringified
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
