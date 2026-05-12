import app from "./app";
import { logger } from "./lib/logger";
import { pushSchema } from "@workspace/db";
import { autoSeed } from "./lib/productSeeder.js";

const rawPort = process.env.PORT || "5001";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, async (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  // Ensure all tables exist, then seed
  pushSchema();
  await autoSeed();
});
