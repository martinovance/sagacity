import { env } from "../config/env";
import postgres from "postgres";
const isLocal = /localhost|127\.0\.0\.1/.test(env.DATABASE_URL);

export const sql = postgres(env.DATABASE_URL, {
  max: 5,
  ssl: isLocal ? false : "require",
});
