# Kit

Reusable fullstack template for Codex-driven product development.

## What Is Included

- Root Codex harness with AGENTS.md, docs/harness.md, OpenSpec skills, TDD, and planning-with-files.
- Backend based on RunWorldZBL/clhoria-template, kept as a reusable API foundation with business-specific exam/question code removed.
- Frontend based on React, Vite, TypeScript, Tailwind CSS, Radix-style UI primitives, React Query, Zustand, and Vitest.
- shared/api-contracts for framework-free Zod schemas and shared TypeScript types.
- GitHub Actions CI and tools/harness-doctor.mjs structure checks.

## Quick Start

```bash
pnpm install
pnpm dev:be
pnpm dev:fe
```

## Verification

```bash
pnpm check
```

Backend integration tests require PostgreSQL and Redis. CI provides those services.

## Agent Workflow

Read AGENTS.md first. The full rationale lives in docs/harness.md.
