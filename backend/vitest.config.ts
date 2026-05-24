import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig({ mode: "test", command: "serve" }),
  defineConfig({
    test: {
      env: {
        ACCESS_KEY_ID: "test-access-key-id",
        ADMIN_JWT_SECRET: "test-admin-jwt-secret-32-characters",
        CLIENT_JWT_SECRET: "test-client-jwt-secret-32-characters",
        DATABASE_URL: "postgres://test:test@localhost:5432/test",
        ENDPOINT: "https://example.com",
        REDIS_URL: "redis://localhost:6379",
        SECRET_ACCESS_KEY: "test-secret-access-key",
      },
      setupFiles: [],
    },
  }),
);
