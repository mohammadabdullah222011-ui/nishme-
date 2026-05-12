import { defineConfig } from "drizzle-kit";

const isSqlite = !process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith("file:");
const dbUrl = process.env.DATABASE_URL || "file:../../.local/db/nashmi-market.db";

export default defineConfig({
  schema: "./src/schema/*",
  dialect: isSqlite ? "sqlite" : "postgresql",
  dbCredentials: isSqlite
    ? { url: dbUrl }
    : { url: dbUrl },
});
