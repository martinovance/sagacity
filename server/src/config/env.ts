import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(8787),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
  DATABASE_URL: z.string().min(1),
  COHERE_API_KEY: z.string().min(1),
  COHERE_RERANK_MODEL: z.string().default("rerank-v5.0-pro"),
  COHERE_CHAT_MODEL: z.string().default("command-a-plus-05-2026"),
  COHERE_EMBED_MODEL: z.string().default("embed-v5.0-fast"),
  EMBED_DIM: z.coerce.number().default(1024),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  const missing = parsed.error.issues.map((i) => i.path.join(".")).join(", ");
  console.error(
    `Missing or invalid environment variables: ${missing}. Check server/.env`,
  );
  process.exit(1);
}

export const env = parsed.data;
