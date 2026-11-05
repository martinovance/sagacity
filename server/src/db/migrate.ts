import { readFileSync } from "node:fs";
import { env } from "../config/env";
import { sql } from "./client";

const schema = readFileSync(
  new URL("./schema.sql", import.meta.url),
  "utf8",
).replaceAll("{{EMBED_DIM}}", String(env.EMBED_DIM));

await sql.unsafe(schema);
console.log("Database ready");
await sql.end();
