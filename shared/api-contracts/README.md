# @kit/api-contracts

Shared Zod schemas and TypeScript types for the template.

## Usage

```ts
import { itemListQuerySchema, type Item } from "@kit/api-contracts";
```

Rules:

- Define runtime schemas here before backend/frontend adapters rely on them.
- Keep this package framework-free.
- Add Vitest tests when schemas use non-trivial `refine`, `transform`, or `superRefine` logic.
