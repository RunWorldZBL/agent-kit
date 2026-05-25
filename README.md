# Kit

Kit 是一个面向 Codex 驱动开发的全栈模板（fullstack template，前后端一体的模板）。

它同时提供三样东西：

1. 一个可以直接复用的后端基础
2. 一个可以直接复用的前端基础
3. 一套告诉 Codex 该怎么工作的 agent harness（代理开发框架，负责约束代理如何思考、实现和验证）

这份模板的目标不是“先生成一点代码”，而是让你从一开始就站在一个把意图、实现规则、运行态和验证机制分开的仓库上。

## 为什么存在

AI 辅助开发最常见的问题，是把产品意图、临时笔记、实现约定和验证步骤全部混进一段 prompt（提示词）或一份文档里。

Kit 把它们拆开：

| 轴 | 职责 | 放在哪里 |
| --- | --- | --- |
| WHAT | 产品意图和可接受行为 | `openspec/` |
| HOW-tech | 后端和前端的实现规则 | `AGENTS.md`、各域 skills（技能） |
| STATE | 当前任务进度和恢复信息 | `.planning/<date>-<slug>/` |
| DISCIPLINE | TDD（测试驱动开发）、验证、评审、调试 | `.codex/skills/` |

这种拆分让长任务更容易检查、恢复和复盘，也是这份模板真正的价值。

## 你会得到什么

- **Codex 优先的 harness（代理框架）**：根目录和各域的 `AGENTS.md` 会先把规则讲清楚，再让代理动代码。
- **OpenSpec 工作流（Specification-Driven Development，规格驱动开发）**：非平凡行为先进入 `openspec/changes/<change>/`，再进入实现。
- **项目级 skills（技能）**：OpenSpec、TDD、planning-with-files（基于文件的运行态规划）、后端和前端专用 skills 都在仓库里，不依赖某台机器的全局配置。
- **TDD 纪律**：行为改动先写失败测试，再进入 red / green / refactor（红灯、绿灯、重构）。
- **共享契约（shared contracts，前后端共用的接口约束）**：`shared/api-contracts` 保存框架无关的 Zod schema（运行时校验）和 TypeScript 类型。
- **后端基础**：运行时栈包括 Hono、Drizzle、PostgreSQL、Redis、BullMQ、OpenAPI、Effect、Casbin；工程化包括 Vitest、Docker、migrations（迁移）、scripts（脚本）、plugins（插件）。
- **前端基础**：运行时栈包括 React、React Query、Zustand、Radix 风格 UI primitives（基础组件）、lucide-react；工程化包括 Vite、TypeScript、Tailwind CSS、Vitest。
- **健康检查（health checks，自动检查仓库是否漂移）**：GitHub Actions、`pnpm check` 和 `tools/harness-doctor.mjs` 负责盯住漂移。

如果你想看细节，先读 [AGENTS.md](AGENTS.md) 和 [docs/harness.md](docs/harness.md)，再去看 `backend/README.md` 或 `frontend/README.md`。

这个模板以中文优先；如果下游产品是英文优先，可以再加一份 `README.en.md`，并保持两份文档在对用户重要的层面一致。

## 目录结构

```text
kit/
  .codex/skills/              # 项目 skills（技能）：OpenSpec、TDD、planning
  .github/workflows/          # CI
  backend/                    # Hono API 基础
    .codex/skills/            # 后端专用 skills
    migrations/               # 迁移历史与 seed 数据
    plugins/                  # 构建和运行插件
    scripts/                  # 后端工具脚本
    src/
    tests/
    docker-compose.yml
    .env.example
  frontend/                   # React 应用基础
    .codex/skills/            # 前端专用 skills
    public/
    src/
    components.json
    Dockerfile
  shared/api-contracts/       # 共享 Zod schema 和推导类型
  openspec/                   # OpenSpec 源头
    changes/archive/
    specs/
  docs/
    examples/                 # 非活跃示例，包括 OpenSpec 文件结构样例
    harness.md                # 代理工作流的理由说明
  walkthrough.md              # 衍生产品用的实施 walkthrough（占位文件）
  project_introduction.md     # 衍生产品用的项目简介（占位文件）
  AGENTS.md                   # Codex 的根操作契约
```

## 代理工作流

直接使用这些 workflow 文件和 skills（技能）：

- Explore（探索模式）：[`.codex/skills/openspec-explore/SKILL.md`](.codex/skills/openspec-explore/SKILL.md)
- Propose（提出变更）：[`.codex/skills/openspec-propose/SKILL.md`](.codex/skills/openspec-propose/SKILL.md)
- Apply（执行变更）：[`.codex/skills/openspec-apply-change/SKILL.md`](.codex/skills/openspec-apply-change/SKILL.md)
- Archive（归档变更）：[`.codex/skills/openspec-archive-change/SKILL.md`](.codex/skills/openspec-archive-change/SKILL.md)
- TDD（测试驱动开发）：[`.codex/skills/test-driven-development/SKILL.md`](.codex/skills/test-driven-development/SKILL.md)
- Planning（基于文件的运行态规划）：[`.codex/skills/planning-with-files/SKILL.md`](.codex/skills/planning-with-files/SKILL.md)

短版操作契约在 [AGENTS.md](AGENTS.md)，更完整的理由说明在 [docs/harness.md](docs/harness.md)。

## 快速开始

打开两个终端：

```bash
pnpm install
pnpm dev:be
```

```bash
pnpm dev:fe
```

后端和前端是分开的 workspace（工作区）包，这样每一层都能保留自己的约定，不会互相吞掉。

## 启动本地依赖服务

如果你想在本地跑后端集成测试，先启动 PostgreSQL 和 Redis：

```bash
cd backend
docker compose up -d postgres redis
```

然后再跑迁移或完整校验。

## 验证

先跑模板级检查：

```bash
pnpm check
```

它会依次执行：

- harness（代理框架）结构检查
- 共享契约 typecheck（类型检查）
- 后端 typecheck（类型检查）
- 前端 build（构建）
- 前端测试
- 仓库 lint（静态检查）

如果你只想检查 harness 本身：

```bash
pnpm harness:check
```

CI（持续集成）会用这一条链路再加上后端测试：

```bash
pnpm check:ci
```

根目录的 `pnpm test` 只跑后端测试（backend tests only，后端测试）；前端测试已经包含在 `pnpm check` 里了。

## OpenSpec

默认情况下，模板只保留空的 OpenSpec 结构：

```text
openspec/
  changes/archive/
  specs/
```

当你要开始一个真实变更时，可以直接拿 [docs/examples/openspec-change-example](docs/examples/openspec-change-example) 做文件结构参考，然后复制到 `openspec/changes/<change-name>/`。

## 从 Kit 创建新产品

1. 先把 `project_introduction.md` 改成你的产品简介。
2. 保留 `AGENTS.md` 和 `docs/harness.md` 作为代理层的规则。
3. 把产品契约放到 `shared/api-contracts/src/`。
4. 用 `backend/AGENTS.md` 和 backend skills（后端技能）实现后端行为。
5. 用 `frontend/AGENTS.md` 和 frontend skills（前端技能）实现前端页面。
6. 涉及跨层、跨契约、用户可见行为变化时，优先走 OpenSpec。

## 共享契约示例

```ts
import { itemListQuerySchema, type Item } from "@kit/api-contracts";

const parsed = itemListQuerySchema.parse({ page: 1, pageSize: 20 });
```

## 模板边界

Kit 不包含具体业务逻辑。前端里现在的 `items` mock 数据，只是为了证明 React、React Query 和 `@kit/api-contracts` 之间的 wiring（连线）是通的。

历史 planning 归档、截图和产品型文档都不属于模板本体。新产品应该按 `docs/harness.md` 里的归档命名规则，创建自己的归档目录。

`walkthrough.md` 和 `project_introduction.md` 是给下游产品预留的占位文件：前者写实施 walkthrough（实施过程说明），后者写产品简介。

## 命令

```bash
pnpm install              # 安装 workspace 依赖
pnpm dev:be               # 启动后端开发服务
pnpm dev:fe               # 启动前端开发服务
pnpm build:be             # 构建后端
pnpm build:fe             # 构建前端
pnpm typecheck:contracts  # 检查共享契约
pnpm lint                 # 检查全部 workspace 包
pnpm test                 # 只跑后端测试
pnpm check                # 跑模板标准本地验证链路
pnpm check:ci             # 跑本地验证链路 + 后端测试
pnpm harness:check        # 检查 harness 结构是否漂移
```

## 许可证

MIT。见 [LICENSE](LICENSE)。
