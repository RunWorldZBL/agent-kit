---
name: frontend-component
description: Use when creating, refactoring, or reviewing React components, UI primitives, forms, Radix controls, validation UI, layout, icons, accessibility, responsive behavior, or Chinese text rendering.
---
# Frontend Component

## Component Rules

- Use TypeScript props with explicit names and narrow types.
- Keep presentational components free of data fetching and global store writes unless the component is a true container.
- Reuse `src/components/ui` first.
- Use `lucide-react` for common icons.
- Prefer controlled props for reusable controls.
- Use accessible labels, roles, focus states, and keyboard behavior.
- For forms, keep validation messages near the relevant field and preserve keyboard submission behavior.

## Layout Rules

- Do not nest cards inside cards.
- Keep app screens operational and scannable, not marketing-like.
- Define stable sizes for toolbars, icon buttons, counters, tiles, and fixed-format controls.
- Check long Chinese strings and button labels for wrapping/overflow.
- Do not scale font size with viewport width.

## Verification

When tests exist, test user-visible behavior with accessible queries. Always run:

```bash
pnpm lint
pnpm build
```
