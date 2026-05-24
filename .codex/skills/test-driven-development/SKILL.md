---
name: test-driven-development
description: Use when implementing any feature, bugfix, refactor, behavior change, schema validation logic, frontend interaction, backend API behavior, or contract runtime logic before writing implementation code.
---

# Test-Driven Development

This project uses the Superpowers TDD discipline as a Codex project skill.

## Iron Law

No production behavior change without a failing test first.

If implementation code was written before the test, do not treat that as TDD. Delete or set aside the implementation and restart from the test.

## RED-GREEN-REFACTOR

1. RED: write one minimal failing test for the next behavior.
2. Verify RED: run the smallest target test and confirm it fails for the expected reason.
3. GREEN: write the smallest implementation that makes the test pass.
4. Verify GREEN: rerun the target test and confirm it passes.
5. REFACTOR: clean up while the test remains green.
6. Repeat for the next behavior.

## Project Rules

- Backend API/CRUD behavior: use Vitest tests near the route module, usually `__tests__`.
- Frontend behavior: use Vitest + React Testing Library when the harness exists; if it does not, add the minimal test harness before feature work that needs behavioral confidence.
- Shared contracts: test non-trivial `refine`, `transform`, or `superRefine` logic in `src/__tests__/`.
- Bugs: reproduce the bug with a failing test before fixing it.
- Refactors: preserve behavior with tests before changing structure.

## Allowed Exceptions

Ask the user before skipping TDD for:

- throwaway prototypes
- generated code
- configuration-only changes
- documentation-only changes
- areas where no practical test harness exists yet

If a harness is missing and the change still affects behavior, either add the minimal harness or explicitly report that verification is limited to typecheck/lint/build.

## Red Flags

Stop and restart with a test if you catch yourself saying:

- "I'll add tests after"
- "This is too small to test"
- "Manual testing is enough"
- "The test passed immediately"
- "I'll keep the implementation as reference"
- "This is different"

## Completion Checklist

- The test failed before implementation.
- The failure reason matched the missing behavior.
- Minimal implementation made the test pass.
- Refactor kept tests green.
- Relevant broader verification ran, or the remaining verification gap was reported.
