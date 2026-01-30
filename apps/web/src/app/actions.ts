"use server";

import { createLogger } from "@repo/logger";

const logger = createLogger("web-app");

export async function getServerMessage() {
  logger.info("Getting server message");
  return "Hello from the server with pino logging!";
}
