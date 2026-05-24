# AGENTS.md

## Purpose

`shared/api-contracts` is the type and validation contract boundary for backend and frontend.

Use this package before duplicating API shapes in either app.

## Rules

- Define runtime contracts with Zod in `src/`.
- Export public contracts from `src/index.ts`.
- Prefer `z.infer<typeof schema>` for TypeScript types.
- Keep contract names stable when frontend aliases rely on them.
- Do not import backend-only Drizzle, Hono, database, or service code here.
- Do not import frontend UI or store code here.
- Keep enum labels and Chinese display text centralized when both apps need them.

## Workflow

For API shape changes:

1. Update or add the shared schema/type first.
2. Update backend validation/response code to use the shared contract where appropriate.
3. Update frontend types/API adapters through `@kit/api-contracts`.
4. Run `pnpm --filter @kit/api-contracts typecheck`.
5. Run the relevant backend and frontend verification.

## Testing

Behavioral contract changes should load the root `$test-driven-development` skill.

Schemas with non-trivial `refine`, `transform`, or `superRefine` logic should have Vitest unit tests in `src/__tests__/`.

Pure type-only contracts may rely on `pnpm --filter @kit/api-contracts typecheck`.

This package is source-only today; there is no separate build step unless packaging output is added later.
