# Repository Guidelines

## Project Structure & Module Organization
Source routes and pages live in `app/`, with shared UI in `components/` and reusable logic in `lib/`. MDX content is stored under `content/`, while long-form docs and design notes reside in `docs/`. Static assets, favicons, and Open Graph images belong in `public/`. Keep experimental work in `tmp/` so production bundles stay clean. When adding new modules, co-locate styles and tests beside the implementation to keep the tree discoverable.

## Build, Test, and Development Commands
- `pnpm install` — install workspace dependencies; rerun after updating `package.json` or `pnpm-lock.yaml`.
- `pnpm dev` — start the Next.js dev server with Turbopack; visit http://localhost:3000 and watch for console warnings.
- `pnpm build` — create an optimized production build; fails fast on type or lint violations.
- `pnpm start` — preview the production build locally.
- `pnpm lint` — run ESLint across the project; add `--fix` before committing style-only changes.

## Coding Style & Naming Conventions
Use TypeScript with strict typing and prefer async/await over raw promises. Follow ESLint feedback; keep JSX indented with two spaces. Name React components and files in PascalCase (`CardGrid.tsx`), hooks in camelCase with a `use` prefix (`useThemeToggle.ts`), and constants in SCREAMING_SNAKE_CASE when shared. Tailwind utility bundles belong in `lib/tailwind.ts` or colocated alongside components; avoid inline `style` props unless necessary.

## Testing Guidelines
Automated tests are still emerging; rely on `pnpm lint` and manual QA in multiple themes. When adding logic-heavy utilities, include lightweight unit tests in adjacent `*.test.ts` files and document expected MDX output in `docs/`. Capture screenshots or recordings if a change affects layout.

## Commit & Pull Request Guidelines
Follow the established imperative tone (`Add draft indicator`, `Fix MDX parsing`) and keep messages under 72 characters. Reference related GitHub issues in the body. PRs should summarise intent, list affected routes or components, and attach before/after visuals for UI updates. Request review from a maintainer familiar with the touched area and confirm `pnpm build` passes before merging.

## Content Authoring Tips
Use `.mdx` files in `content/` for posts; frontmatter must include `title`, `description`, and `published`. Drafts can stay unpublished by omitting `published` or setting it to false. For new docs pages, add them to `content/` and update any navigation data in `app/` as needed.
