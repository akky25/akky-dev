import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export const remarkPlugins = [remarkGfm];

export const rehypePlugins = [
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
        dark: 'github-dark',
      },
      keepBackground: false,
    },
  ],
];
