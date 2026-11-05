import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { errorHandler } from "./middlewares/error";
import { env } from "./config/env";
// import { env } from "./config/env";
// import chat from "./routes/chat";
import documents from "./routes/documents";
// import quality from "./routes/quality";

const app = new Hono();

app.use("*", logger());
app.use("/api/*", cors({ origin: env.CLIENT_ORIGIN }));

app.get("/api/health", (c) => c.json({ ok: true }));
app.route("/api/documents", documents);
// app.route("/api/chat", chat);
// app.route("/api/quality", quality);

app.onError(errorHandler);

export default app;
