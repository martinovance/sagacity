import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";

export const errorHandler: ErrorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status as ContentfulStatusCode);
  }
  if (err instanceof ZodError) {
    return c.json({ message: "Invalid request", error: err.issues }, 400);
  }
  console.error(err);
  return c.json({ message: "Something went wrong" }, 500);
};
