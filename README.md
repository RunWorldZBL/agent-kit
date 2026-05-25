# Kit

Kit is a fullstack template for Codex-driven product work.

It gives you three things at once:

1. a real backend foundation
2. a real frontend foundation
3. a real agent harness that tells Codex how to work in this repo

The point is not just to scaffold code. The point is to start from a repo where
intent, implementation rules, runtime state, and verification are already
separated.

## Why It Exists

Most AI-assisted repos fail because product intent, temporary notes, coding
rules, and verification steps get mixed together.

Kit keeps them apart:

| Axis | Responsibility | Where It Lives |
| --- | --- | --- |
| WHAT | product intent and accepted behavior | `openspec/` |
| HOW-tech | backend/frontend implementation rules | `AGENTS.md`, domain skills |
| STATE | current task progress and recovery notes | `.planning/<date>-<slug>/` |
| DISCIPLINE | TDD, verification, review, debugging | `.codex/skills/` |

That split is the template's real value.

## What You Get

- **Codex-first harness**: root and domain `AGENTS.md` files route the agent
  before it edits code.
- **OpenSpec workflow**: non-trivial behavior starts in `openspec/changes/<change>/`.
- **Project-level skills**: OpenSpec, TDD, planning-with-files, backend, and
  frontend playbooks live in the repo instead of on one person's machine.
- **TDD discipline**: behavior changes start from a failing test, then move
  through red, green, and refactor.
- **Shared contracts**: `shared/api-contracts` holds framework-free Zod
  schemas and inferred TypeScript types.
- **Backend foundation**: Hono, Drizzle, PostgreSQL, Redis, BullMQ, OpenAPI,
  Vitest, Effect, Casbin, Docker, migrations, scripts, and plugins.
- **Frontend foundation**: React, Vite, TypeScript, Tailwind CSS, Radix-style
  UI primitives, React Query, Zustand, lucide-react, and Vitest.
- **Sensors**: GitHub Actions, `pnpm check`, and `tools/harness-doctor.mjs`
  keep the template honest.

Need the details? Start with [AGENTS.md](AGENTS.md) and
[docs/harness.md](docs/harness.md), then drill into `backend/README.md` or
`frontend/README.md` if you are changing a specific tier.

This template is English-first. If a downstream product is Chinese-first, add a
`README.zh-CN.md` beside this file and keep the two docs aligned at the level
that matters for users.

## Architecture

```text
kit/
  .codex/skills/              # project skills: OpenSpec, TDD, planning
  .github/workflows/          # CI
  backend/                    # Hono API foundation
    .codex/skills/            # backend-specific playbooks
    migrations/               # migration history and seed data
    plugins/                  # build/runtime plugins
    scripts/                  # backend utilities
    src/
    tests/
    docker-compose.yml
    .env.example
  frontend/                   # React application foundation
    .codex/skills/            # frontend-specific playbooks
    public/
    src/
    components.json
    Dockerfile
  shared/api-contracts/       # shared Zod schemas and inferred types
  openspec/                   # SDD source of truth
    changes/archive/
    specs/
  docs/
    examples/                 # non-active examples, including OpenSpec shape
    harness.md                # rationale behind the agent workflow
  walkthrough.md              # placeholder walkthrough for derived products
  project_introduction.md      # placeholder product brief for derived products
  AGENTS.md                   # root operating contract for Codex
```

## Agent Workflow

Use the workflow files and skills directly:

- Explore: [`.codex/skills/openspec-explore/SKILL.md`](.codex/skills/openspec-explore/SKILL.md)
- Propose: [`.codex/skills/openspec-propose/SKILL.md`](.codex/skills/openspec-propose/SKILL.md)
- Apply: [`.codex/skills/openspec-apply-change/SKILL.md`](.codex/skills/openspec-apply-change/SKILL.md)
- Archive: [`.codex/skills/openspec-archive-change/SKILL.md`](.codex/skills/openspec-archive-change/SKILL.md)
- TDD: [`.codex/skills/test-driven-development/SKILL.md`](.codex/skills/test-driven-development/SKILL.md)
- Planning: [`.codex/skills/planning-with-files/SKILL.md`](.codex/skills/planning-with-files/SKILL.md)

The short operating contract is [AGENTS.md](AGENTS.md). The longer rationale is
[docs/harness.md](docs/harness.md).

## Quick Start

Open two terminals:

```bash
pnpm install
pnpm dev:be
```

```bash
pnpm dev:fe
```

Backend and frontend run as separate workspace packages so each tier can evolve
without hiding its own conventions.

## Local Services

If you want to run backend integration tests locally, start PostgreSQL and Redis
first:

```bash
cd backend
docker compose up -d postgres redis
```

Then run migrations or the full local check as needed.

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

For a narrower harness-only check, use:

```bash
pnpm harness:check
```

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

## Shared Contracts Example

```ts
import { itemListQuerySchema, type Item } from "@kit/api-contracts";

const parsed = itemListQuerySchema.parse({ page: 1, pageSize: 20 });
```

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
pnpm test                 # run backend tests
pnpm check                # run the standard local verification set
pnpm harness:check        # verify agent harness structure
```

## License

MIT. See [LICENSE](LICENSE).
