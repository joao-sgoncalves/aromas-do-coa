## Project Conventions

- Use `pnpm`; do not use `npm`, `yarn`, or `bun` for project commands.
- Create a new feature branch before changing files. Prefer small branches named `codex/<short-feature-name>`.
- Keep changes focused. Avoid broad refactors, unrelated cleanup, or large PR-shaped chunks unless explicitly requested.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4 through `@tailwindcss/postcss`
- HeroUI through `@heroui/react` and `@heroui/styles`
- Vitest with React Testing Library and jsdom
- ESLint flat config with Next, TypeScript, Testing Library, jest-dom, and Prettier integration
- Prettier with `prettier-plugin-tailwindcss`
- Husky, lint-staged, and commitlint

## Important Scripts

- `pnpm dev`: start the Next development server.
- `pnpm build`: run a production build.
- `pnpm start`: start the built production app.
- `pnpm lint`: run ESLint.
- `pnpm lint:fix`: run ESLint with auto-fixes.
- `pnpm test`: run Vitest.
- `pnpm format`: run Prettier write mode for paths supplied by the caller.
- `pnpm format:all`: format the whole repository.
- `pnpm format:check`: run Prettier check mode for paths supplied by the caller.
- `pnpm format:check:all`: check formatting across the whole repository.
- `pnpm check:staged`: run lint-staged.

## Coding Guidelines

- Read the relevant documentation for the actual tool, library, or framework version before changing behavior.
- Keep App Router pages and layouts as Server Components by default.
- If a dependency requires client-only execution, isolate it behind a small `"use client"` component instead of turning a whole page client-side by default.
- Use the `@/` import alias for project imports. Relative parent/current-directory imports are intentionally restricted.
- Keep tests close to changed behavior. Do not add broad snapshot-style coverage for small UI changes.
- Run the narrowest useful checks before handing work back, and mention any checks that could not be run.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
