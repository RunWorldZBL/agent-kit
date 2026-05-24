---
name: frontend-feature
description: Use when adding or modifying frontend pages, React Router route behavior, user workflows, filters, baskets, previews, exports, forms, validation flows, Chinese UI copy, or multi-component UI features.
---
# Frontend Feature

## Core Rule

Start from the user workflow and contract boundary, then implement the smallest UI slice that proves the behavior.

## Workflow

1. Read `frontend/AGENTS.md`.
2. Check whether the feature changes API shape, form payloads, route params, or validation rules. If yes, update `shared/api-contracts` first.
3. Choose the smallest local boundary:
   - one page/component/store for small changes
   - `src/features/{feature}/` only when the feature becomes a real cluster
4. Write the failing test first when the frontend test harness exists.
5. Keep server data in API adapters/React Query and client-only state in Zustand.
6. Reuse `src/components/ui` and existing app components before creating new primitives.
7. Run `pnpm lint` and `pnpm build`; run frontend tests when available.

## Avoid

- Duplicating contract types already available from `@koi/api-contracts`
- Creating a new feature folder for one or two files
- Mixing mock data, network transport, and UI state in a page component
- Adding explanatory in-app text about how the UI works unless it is product copy
- Adding Chinese UI copy without checking wrapping and overflow
