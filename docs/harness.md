# Project Harness

This harness keeps four concerns separate so agents know where to look and what to update.

| Axis | Owns | Files | Lifetime |
| --- | --- | --- | --- |
| WHAT | feature intent and accepted behavior | `openspec/changes/<change>/` | feature lifecycle, then archive |
| HOW-tech | project-specific implementation rules | `backend/AGENTS.md`, `frontend/AGENTS.md`, local skills | project lifecycle |
| STATE | current execution progress | `.codex/skills/planning-with-files/SKILL.md`, `.planning/<date>-<slug>/{task_plan.md,findings.md,progress.md}` | task/session lifecycle |
| DISCIPLINE | engineering method | `.codex/skills/test-driven-development/SKILL.md`, verification, review, debugging rules | every implementation step |

## Loading Order

Codex automatically concatenates `AGENTS.md` instructions from root to the current working directory. More specific files override broader ones on conflict.

Human-facing docs such as `README.md`, `walkthrough.md`, and `project_introduction.md` explain the project to people. `AGENTS.md` is the agent operating contract. Do not copy one wholesale into the other; link or summarize only when needed.

Use this structure:

1. Root `AGENTS.md`: routing, global commands, OpenSpec/planning/subagent boundaries.
2. Domain `AGENTS.md`: backend/frontend/shared implementation rules.
3. Local skills: task-specific playbooks.
4. OpenSpec change files: feature-specific behavior and tasks.

## Lifecycle

1. Explore: clarify the request without writing implementation code.
2. Propose: create or update OpenSpec artifacts for non-trivial behavior.
3. Plan runtime state: mirror `openspec/changes/<change>/tasks.md` into `.planning/<date>-<slug>/` only when the task is long enough to need session recovery.
4. Execute: load domain `AGENTS.md`, relevant skills, `$test-driven-development`, and apply TDD.
5. Review: use subagents for spec compliance and code-quality review on meaningful changes.
6. Verify: run focused tests first, then broader lint/typecheck/build/test commands.
7. Archive: archive OpenSpec after the feature is accepted.
8. Cleanup: remove or retain planning files only as runtime history; they are not the source of product truth.

## Boundary Rules

- `openspec/changes/<change>/tasks.md` is the only feature task truth.
- Planning files can mirror and annotate execution state, but must not introduce new product requirements.
- Backend skills stay in `backend/.codex/skills`.
- Frontend skills stay in `frontend/.codex/skills`.
- OpenSpec workflow entrypoints are root Codex skills under `.codex/skills`.
- Shared contracts stay in `shared/api-contracts`.
- Root docs route agents; they do not duplicate every domain rule.

## Planning Files

Codex runtime planning files live in `.planning/<date>-<slug>/`.

Use the project-level `.codex/skills/planning-with-files/SKILL.md` skill for
this workflow. Do not rely on a user-global `planning-with-files` skill for this
repository.

Use planning files only when both are true:

- the task is expected to span 5+ tool calls
- session continuity matters because of compaction risk, multi-day work, or multi-tier changes

Do not use planning files for single-task quick fixes.

When a planned task is complete, either remove the `.planning/<date>-<slug>/` directory or move it to `docs/archive/legacy-planning/<date>-<slug>/` if the notes are worth retaining.

Before completing a task, run `pnpm harness:check` to verify the active harness structure has not drifted.

## Archive Naming

Archive directories must be named for the problem solved, not for the tool,
client, or source folder that produced the files.

Use:

```text
YYYY-MM-DD-<resolved-intent>
```

The date is the archive date. The slug must describe the work outcome or task
intent, for example `2026-05-24-build-kit-template`.

Do not use vague source-based names such as `2026-05-24-kiro-plan`,
`2026-05-24-old-files`, or `2026-05-24-archive`. If the intent is unclear,
read `task_plan.md`, `findings.md`, and `progress.md` and infer the resolved
problem before naming the archive directory.

## OpenSpec Archive

On archive, sync delta specs into `openspec/specs/<capability>/spec.md` when delta specs exist. The archive folder keeps the original proposal, design, tasks, and `.openspec.yaml` for historical reference; `openspec/specs/` holds the long-term canonical contract.

`openspec/specs/` may start empty. It is populated as accepted changes are archived and their delta specs are synced.

## Subagent Context Pack

When dispatching a subagent, include:

```text
Root rules: AGENTS.md
Domain rules: backend/AGENTS.md or frontend/AGENTS.md
Skills: exact SKILL.md files relevant to the task
Spec task: exact OpenSpec task text or user request
Discipline: include .codex/skills/test-driven-development/SKILL.md; write failing test first, then implement, then verify
Commands: smallest target verification plus final broader verification
Output: DONE/BLOCKED, files changed, commands run, risks
```

Subagents are useful because they isolate context. That also means they must be given explicit project knowledge instead of relying on inherited conversation history.

## Subagent Dispatch Criteria

- Task touches 1-2 files with a complete spec: main agent may execute directly.
- Task touches 3+ files or is expected to need 5+ tool calls: dispatch a subagent.
- Task is read-only research, audit, or architecture mapping: dispatch a subagent to preserve main context.
- Task is a review of completed work: always dispatch a subagent.
