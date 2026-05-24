# AGENTS.md

## Frontend Stack

React 19 + Vite 8 + TypeScript + Tailwind CSS v4 + Radix/shadcn-style UI components + Zustand + React Query + lucide-react + Zod + `@kit/api-contracts`.

## Commands

From `frontend/`:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

From repo root:

```bash
pnpm --filter frontend dev
pnpm --filter frontend build
pnpm --filter frontend lint
```

Frontend tests are not installed yet. The first behavior change that needs frontend tests should add a minimal Vitest + React Testing Library + jsdom setup and a `test` script before implementing the feature.

## Architecture

Current structure:

- `src/components/`: reusable app components.
- `src/components/ui/`: shadcn/Radix-style primitives.
- `src/pages/`: route-level screens.
- `src/stores/`: Zustand client state.
- `src/api.ts`: API/data adapter boundary. It currently contains mock data.
- `src/types.ts`: thin compatibility wrapper over `@kit/api-contracts`.
- `shared/api-contracts/src/`: source of truth for shared API types and schemas.

Prefer the current structure for small changes. Introduce `src/features/{feature}/` only when a feature has enough page, component, store, API, and test files to justify a local boundary.

## Skill Map

Load these local skills before changing code:

- Feature/page workflow: `frontend/.codex/skills/frontend-feature/SKILL.md`
- React component/UI work: `frontend/.codex/skills/frontend-component/SKILL.md`
- API client and contract boundary: `frontend/.codex/skills/frontend-api-client/SKILL.md`
- Zustand/client state: `frontend/.codex/skills/frontend-state-store/SKILL.md`
- Frontend tests: `frontend/.codex/skills/frontend-ui-test/SKILL.md`

## Contracts

Do not hand-copy backend response shapes into frontend files. Update `shared/api-contracts` first when an API field, enum, request body, query, or response changes.

`src/types.ts` should remain a thin compatibility layer. New domain types should normally come from `@kit/api-contracts`.

## UI Rules

- Reuse `src/components/ui` primitives before creating new controls.
- Use `lucide-react` icons for icon buttons and common actions.
- Keep operational app screens dense, scannable, and restrained.
- Do not create marketing-style hero pages for app workflows.
- Do not nest cards inside cards.
- Give fixed-format controls stable dimensions so hover labels, counters, and dynamic content do not shift layout.
- Use accessible labels and keyboard-friendly controls for interactive UI.
- Keep Chinese text readable and verify it does not overflow at desktop and mobile widths.

## TDD Workflow

Frontend behavior changes must load the root `$test-driven-development` skill. Then:

1. Write a failing component, store, API adapter, or integration test first.
2. Run the smallest target test and confirm RED.
3. Implement the smallest change.
4. Confirm GREEN.
5. Refactor while tests stay green.
6. Run `pnpm lint` and `pnpm build`.

Until the test harness is installed, record the gap and use `pnpm lint` plus `pnpm build` as the minimum verification floor.

## Subagents

Use subagents for independent UI review, API-contract review, test planning, and implementation slices. Include root `AGENTS.md`, this file, relevant frontend skill files, and the exact task in the subagent prompt.
