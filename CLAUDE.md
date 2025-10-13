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

## Git Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Commit Message Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries
- `ci`: Changes to CI configuration files and scripts
- `build`: Changes that affect the build system or external dependencies
- `content`: Blog post or content additions/updates

### Examples
```bash
# Adding a new feature
feat: add user authentication feature

# Bug fix with scope
fix(api): correct response header error

# Breaking change
feat!: change API endpoint specification

BREAKING CHANGE: response format for /api/v1/users has been changed

# Adding blog post
content: add article about Next.js 15 new features

# Updating blog post
content: update TypeScript introduction article

# Adding draft post
content(draft): add draft article about AI utilization
```

### Rules
- Type is required
- Use the imperative, present tense in the description
- First line should be limited to 72 characters
- For breaking changes, add `!` after the type or include `BREAKING CHANGE:` in the footer

### Blog Content Specific Rules
- Use `content` type for blog post additions/updates
- Use scope to indicate draft posts: `content(draft)`
- Include article title or main topic in commit message
- When modifying multiple articles, describe the main changes
- Use `content(assets)` for image or asset-only additions