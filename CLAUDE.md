# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
```bash
# Install dependencies
pnpm install

# Development server with Turbopack
pnpm dev

# Build for production with Turbopack
pnpm build

# Start production server
pnpm start

# Lint with ESLint
pnpm lint
```

## Project Architecture

For detailed architecture documentation, see `docs/ARCHITECTURE.md`.

### Tech Stack Overview
- **Framework**: Next.js 15.5 with App Router and Turbopack
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui components in `components/ui/`
- **MDX Processing**: Velite with rehype/remark plugins
- **Theme**: Dark mode support via next-themes

### Key Directories
- `app/`: Next.js App Router pages
  - `blog/`: Blog listing and individual post pages
- `components/`: React components
  - `ui/`: shadcn/ui components
  - `mdx-content.tsx`: MDX content renderer
- `content/posts/`: MDX blog posts source files
- `.velite/`: Generated TypeScript definitions and processed content
- `lib/utils.ts`: Utility functions including `cn()` for className merging

### Path Aliases
- `@/*`: Maps to project root
- `#site/content`: Maps to `.velite` directory for generated content

### Blog System with Velite
Posts are managed in `content/posts/*.mdx` with frontmatter validation via Zod schemas. The Velite configuration (`velite.config.ts`) handles:
- MDX compilation with syntax highlighting (rehype-pretty-code/Shiki)
- Slug generation from filenames
- Draft post filtering
- Static asset copying to `public/static/`