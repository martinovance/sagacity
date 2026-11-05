# Sagacity server

Hono + TypeScript API. Folders: `routes` (URLs) > `controllers` (request/response) > `services` (the work) > `db` (queries, your "models"), plus `middlewares`.

## One-time setup

1. Node 20.6 or newer (`node -v`) and pnpm.
2. Database: create a free project at neon.com, copy the connection string.
3. Cohere: create a key at dashboard.cohere.com/api-keys.
4. In this folder: `pnpm install`, then copy `.env.example` to `.env` and fill `DATABASE_URL` and `COHERE_API_KEY`.
5. `pnpm db:setup` creates the tables (and enables pgvector).
6. `pnpm dev`, then open http://localhost:8787/api/health. You should see `{"ok":true}`.

## Try it without the frontend

Open `requests.http` in VS Code (REST Client extension). Run, in order: health, upload the sample, list documents until status is `ready`, then ask a question.
Streaming check from a terminal: `curl -N -X POST http://localhost:8787/api/chat/stream -H "Content-Type: application/json" -d '{"question":"How long do contractors have to submit expenses?","useRerank":true}'`

## Connect the frontend

- `vite.config.ts`: add `server: { proxy: { "/api": "http://localhost:8787" } }`
- frontend `.env`: `VITE_APP_BASE_URL=/api` (restart Vite after changing it)

## Notes

- Trial Cohere keys are limited to 1,000 calls a month. Each upload batch, question and rerank is a call, so test with `sample/` first and keep your test set small.
- Embedding size (`EMBED_DIM`) is fixed when the tables are created. If you change it or the embed model, drop the tables and run `pnpm db:setup` again.
- Supported uploads: PDF, Markdown, text. Add `mammoth` later for .docx.
- Not built yet: auth, conversation history, native Cohere citations (highlight offsets).
- `pnpm test` runs the unit tests, `pnpm typecheck` checks types.
