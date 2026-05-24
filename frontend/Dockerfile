# syntax=docker.io/docker/dockerfile:1

# ============================================================
# Stage 1: 安装依赖
# ============================================================
FROM node:25-alpine AS deps

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ============================================================
# Stage 2: 构建静态产物
# ============================================================
FROM deps AS builder

WORKDIR /app

# 构建时可注入的环境变量（如 API 地址）
ARG VITE_API_BASE_URL=""
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY . .

RUN pnpm build

# ============================================================
# Stage 3: 生产运行（nginx 托管静态文件）
# ============================================================
FROM nginx:alpine AS runner

# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制静态产物到 nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
