# AGENTS.md

## Project

This is the `kit` reusable fullstack template.

- `backend/`: Hono API, PostgreSQL/Drizzle, Redis/BullMQ, OpenAPI, Vitest.
- `frontend/`: React/Vite/TypeScript application.
- `shared/api-contracts/`: shared Zod/type contracts used by both sides.
- `openspec/`: SDD source of truth for feature intent and accepted behavior.

If Chinese text appears garbled, re-read the file with UTF-8.

## Harness Routing

Codex automatically loads every `AGENTS.md` from the repository root down through the current working directory, with deeper files overriding shallower ones on conflict. Keep global rules here, and keep domain-specific rules close to the code they govern.

Before changing files:

- Backend code: read `backend/AGENTS.md`, then load the relevant `backend/.codex/skills/*/SKILL.md`.
- Frontend code: read `frontend/AGENTS.md`, then load the relevant `frontend/.codex/skills/*/SKILL.md`.
- Shared API contracts: read `shared/api-contracts/AGENTS.md`.
- Cross-cutting product behavior: use OpenSpec first. `openspec/changes/<change>/tasks.md` is the feature task truth.

Do not move backend/frontend domain skills to the root. The root is the router; each domain owns its own operating rules. OpenSpec is the exception because it is cross-tier.

Non-Codex command folders are not used. OpenSpec workflows are Codex skills under `.codex/skills`.

## Skill Map

Global:

- TDD discipline for behavior changes: `.codex/skills/test-driven-development/SKILL.md`
- OpenSpec workflows: `.codex/skills/openspec-*/SKILL.md`
- Runtime planning state: `.codex/skills/planning-with-files/SKILL.md`

Backend:

- CRUD/API routes: `backend/.codex/skills/crud/SKILL.md`
- Database schema or migrations: `backend/.codex/skills/db-schema/SKILL.md`
- Drizzle v1 relation/query patterns: `backend/.codex/skills/drizzle-v1/SKILL.md`
- BullMQ queues/jobs/workers: `backend/.codex/skills/bullmq/SKILL.md`
- Effect v4 services/layers/errors: `backend/.codex/skills/effect-v4/SKILL.md`
- New API tier: `backend/.codex/skills/create-tier/SKILL.md`

Frontend:

- User-facing feature/page workflow: `frontend/.codex/skills/frontend-feature/SKILL.md`
- React component/UI work: `frontend/.codex/skills/frontend-component/SKILL.md`
- API client and contract boundary: `frontend/.codex/skills/frontend-api-client/SKILL.md`
- Zustand/client state: `frontend/.codex/skills/frontend-state-store/SKILL.md`
- Frontend test strategy: `frontend/.codex/skills/frontend-ui-test/SKILL.md`

## Development Discipline

Use `$test-driven-development` for behavior changes, bug fixes, refactors, and non-trivial validation logic:

1. Write or update the failing test first.
2. Run the smallest relevant test and confirm RED.
3. Implement the smallest useful change.
4. Run the test and confirm GREEN.
5. Refactor while tests stay GREEN.
6. Run the relevant typecheck, lint, and test/build commands.

If a test harness does not exist in the touched area, either add the minimal harness first or explicitly record that the current verification floor is build/typecheck/lint only.

## OpenSpec, Planning, And Subagents

OpenSpec owns WHAT, and `openspec/changes/<change>/tasks.md` is the only feature task truth.

Planning files own runtime STATE only. For Codex sessions, put them under `.planning/<date>-<slug>/` only when the task is expected to need 5+ tool calls and session continuity matters.
Use `.codex/skills/planning-with-files/SKILL.md` for that workflow.

Subagents are allowed for independent implementation, review, research, and context isolation. Give each subagent an explicit context pack; do not assume inherited conversation history.

For the full harness rationale, lifecycle, archive rules, planning boundaries, and subagent dispatch criteria, see `docs/harness.md`. Treat that document as the rationale; this file is the operating contract.

## Commands

From repo root:

```bash
pnpm install
pnpm dev:be
pnpm dev:fe
pnpm build:be
pnpm build:fe
pnpm lint
pnpm test
pnpm typecheck:contracts
```

Contracts are source-only today; validate them with `pnpm typecheck:contracts`.

OpenSpec workflow in Codex:

- `$openspec-explore`: think mode, no implementation code
- `$openspec-propose`: generate proposal, design, specs, and tasks
- `$openspec-apply-change`: implement OpenSpec tasks
- `$openspec-archive-change`: archive completed changes

Run the smallest command that proves the change first, then broaden verification before completion.
