import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { defineCollection, defineConfig, s } from 'velite';

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string().min(1),
      description: s.string().max(160),
      date: s.isodate(),
      updated: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      cover: s.string().optional(),
      code: s.mdx(),
    })
    .transform((data, { meta }) => {
      // meta.path contains the file path, extract directory or filename as slug
      const pathParts = (meta.path as string | undefined)?.split('/') || [];
      const fileName =
        pathParts[pathParts.length - 1]?.replace(/\.mdx$/, '') || '';

      // If filename is 'index', use parent directory name as slug
      let slug: string;
      if (fileName === 'index' && pathParts.length > 1) {
        slug = pathParts[pathParts.length - 2] || '';
      } else {
        slug = fileName;
      }

      // Remove date prefix if exists
      slug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');

      return {
        ...data,
        slug,
        permalink: `/blog/${slug}`,
        content: data.code,
      };
    }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light',
            dark: 'github-dark-dimmed',
          },
          keepBackground: true,
          defaultLang: 'plaintext',
        },
      ],
    ],
    copyLinkedFiles: true,
  },
});
