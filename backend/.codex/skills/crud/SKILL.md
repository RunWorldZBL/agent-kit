---
name: crud
description: Use when creating or modifying backend CRUD API modules, route handlers, route schemas, module tests, or admin/client/public management endpoints.
---
# CRUD 模块生成/修改指南

## 模块文件结构

```
src/routes/{tier}/{category}/{feature}/
├── {feature}.index.ts       # 必需：路由入口
├── {feature}.routes.ts      # 必需：OpenAPI 路由定义
├── {feature}.handlers.ts    # 必需：处理器实现
├── {feature}.types.ts       # 必需：类型定义
├── {feature}.schema.ts      # 可选：Zod 验证
├── {feature}.services.ts    # 可选：复杂业务逻辑或模块内复用
└── __tests__/               # 必需：行为/API 变更必须有 Vitest 测试
```

## 路由层级

| Tier | 路径前缀 | 认证 | 说明 |
|------|---------|------|------|
| public | `/api/public/*` | 无 | 公开接口 |
| client | `/api/client/*` | JWT | 客户端用户 |
| admin | `/api/admin/*` | JWT + RBAC + 审计 | 后台管理 |

## TDD 生成步骤

行为或 API 变更必须先写测试。不要先写 handlers 再补测试。

### 1. 测试文件

参考 [templates/tests.md](templates/tests.md)。

先创建或更新 `__tests__/{feature}.test.ts`，覆盖成功路径、权限/参数错误、关键边界条件。运行目标测试并确认 RED。

### 2. 数据库 Schema（如需新表）

参考 [db-schema.md](../_shared/templates/db-schema.md)

```typescript
// src/db/schema/{tier}/{category}/{feature}.ts
export const {feature}s = pgTable("{tier}_{feature}s", {
  ...baseColumns,
  // 字段定义...
});
```

### 3. 类型文件

参考 [templates/types.md](templates/types.md)

### 4. Schema 文件

参考 [zod-schema.md](../_shared/templates/zod-schema.md)

### 5. 路由文件

参考 [templates/routes.md](templates/routes.md)

### 6. 处理器文件

参考 [templates/handlers.md](templates/handlers.md)

### 7. 入口文件

```typescript
// {feature}.index.ts
import { createRouter } from "@/lib/core/create-app";
import * as handlers from "./{feature}.handlers";
import * as routes from "./{feature}.routes";

export default createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
  .openapi(routes.remove, handlers.remove);
```

### 8. 验证

```bash
pnpm test --run path/to/__tests__/{feature}.test.ts
pnpm typecheck
pnpm lint:fix
pnpm test --run
```

## 关键规则

### 响应包装（必须）

```typescript
return c.json(Resp.ok(data), HttpStatusCodes.OK);
return c.json(Resp.fail("错误信息"), HttpStatusCodes.BAD_REQUEST);
```

### 日志格式（必须）

```typescript
logger.info({ userId }, "[模块名]: 操作描述");
// 数据对象放第一个参数
```

### 审计字段

- 创建时设置 `createdBy: sub`
- 更新时设置 `updatedBy: sub`
- `sub` 从 `c.get("jwtPayload")` 获取

### 命名约定

- 文件：kebab-case（`user-roles.ts`）
- 类型：PascalCase（`SystemUserRouteHandlerType`）
- 枚举值：UPPER_SNAKE_CASE（`Status.ENABLED`）

## 完整示例

参考 [examples/dicts.md](examples/dicts.md) 查看完整的 dicts 模块实现。
