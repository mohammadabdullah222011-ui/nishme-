import { defineConfig } from "drizzle-kit";
import path from "path";

// Use SQLite for local development if no DATABASE_URL is provided
const databaseUrl = process.env.DATABASE_URL || "file:./nashmi-market.db";

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: databaseUrl.startsWith("file:") ? "sqlite" : "postgresql",
  dbCredentials: databaseUrl.startsWith("file:") 
    ? { url: databaseUrl }
    : { url: databaseUrl },
});
