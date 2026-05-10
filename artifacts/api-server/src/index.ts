import app from "./app";
import { logger } from "./lib/logger";
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

  // Auto-seed admin user + products on every startup
  await autoSeed();
});
