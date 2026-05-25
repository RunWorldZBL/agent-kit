# Kit

**Kit is a fullstack application template designed for Codex-driven development.**

It combines a production-oriented backend foundation, a modern React frontend,
shared runtime contracts, and an agent harness that tells Codex where intent,
implementation rules, task state, and engineering discipline live.

The goal is simple: start new products from a repository where the codebase and
the AI workflow are already organized.

## Why This Template Exists

Most AI-assisted repositories fail in the same way: requirements, temporary
notes, implementation conventions, and verification rules all get mixed into
one long prompt or one overloaded document.

Kit separates those concerns:

| Axis | Responsibility | Where It Lives |
| --- | --- | --- |
| WHAT | product intent and accepted behavior | `openspec/` |
| HOW-tech | backend/frontend implementation rules | `AGENTS.md`, domain skills |
| STATE | current task progress and recovery notes | `.planning/<date>-<slug>/` |
| DISCIPLINE | TDD, verification, review, debugging | `.codex/skills/` |

That separation makes long-running agent work easier to inspect, resume, and
review.

## What You Get

- **Codex-first harness**: root and domain `AGENTS.md` files route Codex to the
  right rules before it edits code.
- **OpenSpec workflow**: feature intent lives in `openspec/changes/<change>/`
  before implementation starts.
- **Project-level skills**: OpenSpec, TDD, planning-with-files, backend, and
  frontend playbooks are stored in the repo instead of depending on a user's
  global machine state.
- **TDD discipline**: behavior changes are expected to start from a failing
  test, then move through red, green, and refactor.
- **Shared contracts**: `shared/api-contracts` provides framework-free Zod
  schemas and TypeScript types consumed by both backend and frontend.
- **Backend foundation**: Hono, Drizzle, PostgreSQL, Redis, BullMQ, OpenAPI,
  Vitest, Effect, Casbin, and Docker support.
- **Frontend foundation**: React, Vite, TypeScript, Tailwind CSS, Radix-style UI
  primitives, React Query, Zustand, lucide-react, and Vitest.
- **CI and local sensors**: GitHub Actions, `pnpm check`, and
  `tools/harness-doctor.mjs` keep the harness from drifting.

## Architecture

```text
kit/
  .codex/skills/              # global project skills: OpenSpec, TDD, planning
  .github/workflows/          # CI
  backend/                    # Hono API foundation
    .codex/skills/            # backend-specific implementation playbooks
    src/
  frontend/                   # React application foundation
    .codex/skills/            # frontend-specific implementation playbooks
    src/
  shared/api-contracts/       # shared Zod schemas and inferred types
  openspec/                   # SDD source of truth
    changes/archive/
    specs/
  docs/
    examples/                 # non-active examples, including OpenSpec shape
    harness.md                # rationale behind the agent workflow
  AGENTS.md                   # root operating contract for Codex
```

## Agent Workflow

For non-trivial product behavior, use this loop:

1. **Explore** the idea without writing implementation code.
2. **Propose** the change in OpenSpec.
3. **Plan** runtime state only when the task is long enough to need recovery.
4. **Implement** with the relevant domain skills and TDD.
5. **Review** meaningful work, preferably with isolated subagents.
6. **Verify** with focused tests first, then broader checks.
7. **Archive** accepted OpenSpec changes into long-term specs.

The short operating contract is [AGENTS.md](AGENTS.md). The longer rationale is
[docs/harness.md](docs/harness.md).

## Quick Start

```bash
pnpm install
pnpm dev:be
pnpm dev:fe
```

Backend and frontend run as separate workspace packages so each tier can evolve
without hiding its own conventions.

## Verification

Run the template-level check before claiming work is complete:

```bash
pnpm check
```

That runs:

- harness structure check
- shared contracts typecheck
- backend typecheck
- frontend build
- frontend tests
- repository lint

Backend integration tests may require PostgreSQL and Redis. CI provides those
services.

## OpenSpec

The template keeps active OpenSpec state empty by default:

```text
openspec/
  changes/archive/
  specs/
```

Use [docs/examples/openspec-change-example](docs/examples/openspec-change-example)
as a shape reference when starting a real change. Copy the example into
`openspec/changes/<change-name>/` instead of editing the example in place.

## Creating A Product From Kit

1. Replace `project_introduction.md` with your product brief.
2. Keep `AGENTS.md` and `docs/harness.md` as the agent operating layer.
3. Add product contracts under `shared/api-contracts/src/`.
4. Add backend behavior using `backend/AGENTS.md` and backend skills.
5. Add frontend screens using `frontend/AGENTS.md` and frontend skills.
6. Use OpenSpec for behavior that crosses tiers or changes user-visible
   contracts.

## Template Boundaries

Kit intentionally does not include product-specific business logic. The starter
frontend uses neutral `items` mock data only to prove the wiring between React,
React Query, and `@kit/api-contracts`.

Historical planning archives, screenshots, and product-specific docs are not
part of this template. New products should create their own archives using the
archive naming rules in `docs/harness.md`.

## Commands

```bash
pnpm install              # install workspace dependencies
pnpm dev:be               # run backend dev server
pnpm dev:fe               # run frontend dev server
pnpm build:be             # build backend
pnpm build:fe             # build frontend
pnpm typecheck:contracts  # check shared contracts
pnpm lint                 # lint all workspace packages
pnpm check                # run the standard local verification set
pnpm harness:check        # verify agent harness structure
```

## License

Use this template as a starting point for product work. Keep upstream license
notices from the backend foundation where applicable.
