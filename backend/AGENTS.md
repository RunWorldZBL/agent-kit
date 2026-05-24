# AGENTS.md

## Backend Stack

Hono + Node.js 25 + PostgreSQL with Drizzle snake_case + Redis/ioredis + BullMQ + JWT admin/client auth + Casbin RBAC + Zod Chinese errors + OpenAPI 3.1.0/Scalar + Vitest + Vite.

## Commands

From `backend/`:

```bash
pnpm dev
pnpm build
pnpm start
pnpm typecheck
pnpm lint
pnpm lint:fix
pnpm test
pnpm generate
pnpm push
pnpm migrate
pnpm studio
pnpm seed
```

From repo root, prefer filters when working with other packages:

```bash
pnpm --filter ./backend typecheck
pnpm --filter ./backend lint:fix
pnpm --filter ./backend test --run
```

## Architecture

Route tiers:

- `/api/public/*`: no auth
- `/api/client/*`: JWT
- `/api/admin/*`: JWT + RBAC + audit

Routes auto-load through `import.meta.glob` from `src/routes/{tier}/**/*.index.ts`.

Use local skills before writing code:

- CRUD/API routes: `backend/.codex/skills/crud/SKILL.md`
- Database schema or migration work: `backend/.codex/skills/db-schema/SKILL.md`
- Drizzle relation/query work: `backend/.codex/skills/drizzle-v1/SKILL.md`
- BullMQ work: `backend/.codex/skills/bullmq/SKILL.md`
- Effect v4 service/layer/error work: `backend/.codex/skills/effect-v4/SKILL.md`
- New API tier: `backend/.codex/skills/create-tier/SKILL.md`

OpenSpec is cross-tier and lives at the repository root. Use the root Codex skills: `$openspec-propose`, `$openspec-apply-change`, `$openspec-explore`, and `$openspec-archive-change`.

## Mandatory Rules

Response wrapper:

```typescript
return c.json(Resp.ok(data), HttpStatusCodes.OK);
return c.json(Resp.fail("error"), HttpStatusCodes.BAD_REQUEST);
```

Logging:

```typescript
logger.info({ userId }, "[Module]: message");
```

The data object is always the first logger argument. Do not use `console.log`, `console.warn`, or `console.error` except in env validation, singletons, tests, and scripts.

Other rules:

- Status codes: use `HttpStatusCodes` constants.
- Dates: use `date-fns`.
- DB timestamps: use `timestamp({ mode: "string", precision: 0 })`.
- DB writes: use `format(new Date(), "yyyy-MM-dd HH:mm:ss")`; do not write DB timestamps with `new Date().toISOString()`.
- UUID params: use `IdUUIDParamsSchema`.
- Naming: PascalCase for classes/types, UPPER_SNAKE_CASE for enum values, kebab-case for files.
- Group multiple same-type files into a folder, for example `helpers/`.
- Queries: use enums such as `eq(table.status, Status.ENABLED)`, not magic values.
- Helpers: route-level helpers for complex module logic; global `src/services/` only for cross-tier shared logic.
- Types: infer from Zod schemas with `z.infer<typeof schema>` when possible.
- Simple guard clauses may be single-line when returning one short expression.

## TDD Workflow

Backend behavior changes must load the root `$test-driven-development` skill and use RED-GREEN-REFACTOR:

1. Write or update a failing Vitest test first.
2. Run the smallest target test and confirm it fails for the expected reason.
3. Implement the smallest handler/schema/service change.
4. Run the target test and confirm it passes.
5. Refactor while the target test stays green.
6. Run `pnpm typecheck && pnpm lint:fix && pnpm test --run`.

For CRUD work, create or update `__tests__/` in the route module unless the change is documentation-only or purely mechanical with no runtime behavior.

Database schema changes:

1. Modify schema.
2. Add or update behavior tests around the API/service using the schema.
3. Run `pnpm push` for dev sync or `pnpm generate` for migration generation as appropriate.
4. Run typecheck, lint, and tests.

## OpenSpec And Runtime Planning

For feature work, OpenSpec owns the feature truth:

- `openspec/changes/<change>/proposal.md`
- `openspec/changes/<change>/design.md`
- `openspec/changes/<change>/tasks.md`

If planning files are used, they are only a runtime mirror of progress. Do not create a competing plan outside OpenSpec.

## Subagents

Use subagents for independent implementation tasks, review, debugging, and research. Each subagent prompt must include:

- root `AGENTS.md`
- this `backend/AGENTS.md`
- the relevant backend skill files
- the exact task from OpenSpec or the user
- TDD instructions and verification commands

Subagents must return DONE/BLOCKED, files changed, tests run, and unresolved risks.

## Completion

Do not claim completion without evidence. Run the smallest relevant verification first, then broaden. If a command cannot run, report the blocker and the remaining risk.
