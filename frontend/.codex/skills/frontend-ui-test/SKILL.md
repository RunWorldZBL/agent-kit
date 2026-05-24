---
name: frontend-ui-test
description: Use when adding frontend tests, converting frontend work to TDD, choosing Vitest/React Testing Library/Playwright coverage, or verifying UI behavior, forms, routes, stores, Chinese copy, and API adapters.
---
# Frontend UI Test

## Current State

The frontend currently has no installed test harness. The first behavior task that requires frontend tests should add:

- Vitest
- React Testing Library
- `@testing-library/user-event`
- `@testing-library/jest-dom`
- jsdom
- a `test` script

Use Playwright only for browser-level flows that cannot be proven with component or store tests.

## TDD Pattern

1. Write the smallest failing test around visible behavior or state transition.
2. Run the target test and confirm RED.
3. Implement minimal code.
4. Confirm GREEN.
5. Refactor.
6. Run `pnpm lint` and `pnpm build`.

## Test Style

- Query by role, label, placeholder, text, or other user-visible affordances.
- Avoid testing implementation details such as internal state variable names.
- Mock API boundaries, not component internals.
- Keep tests close to the component/store/feature they prove.
