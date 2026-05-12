import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";
import fs from "fs";
import * as schema from "./schema";

function getDbPath(): string {
  const envUrl = process.env.DATABASE_URL;
  if (envUrl?.startsWith("file:")) {
    return envUrl.slice("file:".length);
  }
  const dbDir = path.resolve(import.meta.dirname, "../../../.local/db");
  fs.mkdirSync(dbDir, { recursive: true });
  return path.join(dbDir, "nashmi-market.db");
}

const dbPath = getDbPath();

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

const db = drizzle(sqlite, { schema });

export { db };
export * from "./schema";
