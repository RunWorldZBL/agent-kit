---
name: frontend-state-store
description: Use when creating or modifying Zustand stores, client-only UI state, selections, filters, baskets, persistence, or derived frontend state.
---
# Frontend State Store

## Store Boundary

Use Zustand for client-only state: filters, selections, baskets, UI mode, local persistence. Do not duplicate server state that belongs in API calls or React Query.

## Rules

- Keep actions explicit and named by user intent.
- Keep derived values as selectors or pure helpers when possible.
- Avoid storing data that can be derived from IDs plus API data.
- Keep persistence keys stable and scoped.
- Make reset/clear behavior explicit.

## TDD

When tests exist, test store transitions as pure behavior:

1. initial state
2. action result
3. edge cases such as duplicate add/remove/reset

Run frontend tests when available, then `pnpm lint` and `pnpm build`.

