---
name: frontend-api-client
description: Use when changing frontend API calls, mock data, request or response shapes, route params, form payloads, Zod validation, error handling, loading states, or shared API contract usage.
---
# Frontend API Client

## Contract Boundary

`@koi/api-contracts` is the source of truth. Do not create new manual API types in `frontend/src` when a shared schema/type should exist.

## Workflow

1. Read `shared/api-contracts/AGENTS.md` when a request, response, enum, or field changes.
2. Update shared schemas/types first.
3. Keep `frontend/src/types.ts` as a thin compatibility wrapper.
4. Keep transport/mocking in API adapter files, not page components.
5. Normalize API errors into UI-friendly states at the adapter or hook boundary.
6. Keep mock data aligned with shared contracts.

## Verification

Run:

```bash
pnpm --filter @koi/api-contracts typecheck
pnpm --filter frontend build
pnpm --filter frontend lint
```
