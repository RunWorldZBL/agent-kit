# CRUD Test Template

Use Vitest for route-module behavior. Keep tests close to the route module:

```text
src/routes/{tier}/{category}/{feature}/__tests__/{feature}.test.ts
```

Test before implementation:

1. Import the route app or the smallest testable handler/service boundary already used in nearby modules.
2. Arrange DB state with factories or direct inserts used elsewhere in `src/routes/**/__tests__`.
3. Exercise the route through the same Hono/test client pattern used by existing tests.
4. Assert the `Resp.ok` or `Resp.fail` envelope, status code, and persisted state.

Minimum coverage for behavior/API changes:

- success path for list/get/create/update/remove as applicable
- validation failure for required params/body fields
- auth/RBAC/audit behavior for admin routes when the module touches it
- timestamp/audit fields when created or updated

Run target tests first and confirm RED:

```bash
pnpm test --run src/routes/{tier}/{category}/{feature}/__tests__/{feature}.test.ts
```

Then implement the minimal code and rerun until GREEN.
