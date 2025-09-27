import { defineConfig, defineCollection, s } from "velite";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
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
      // meta.path contains the file path, extract just the filename
      const pathParts = meta.path?.split("/") || [];
      const fileName =
        pathParts[pathParts.length - 1]?.replace(/\.mdx$/, "") || "";
      const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, ""); // Remove date prefix if exists
      return {
        ...data,
        slug,
        permalink: `/blog/${slug}`,
        content: data.code,
      };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
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
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            light: "github-light",
            dark: "github-dark-dimmed",
          },
          keepBackground: true,
          defaultLang: "plaintext",
        },
      ],
    ],
    copyLinkedFiles: false,
  },
});
