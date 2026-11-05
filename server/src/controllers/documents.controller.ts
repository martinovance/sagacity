import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { createDocument, deleteDocument, listDocuments } from "../db/documents";
import { ingestDocument } from "../utils/ingest";
import z from "zod";

const ALLOWED = [".pdf", ".md", ".txt"];
const MAX_BYTES = 10 * 1024 * 1024;

export const list = async (c: Context) => c.json(await listDocuments());

export const upload = async (c: Context) => {
  const body = await c.req.parseBody();

  const file = body["file"];
  if (!(file instanceof File)) {
    throw new HTTPException(400, {
      message: "Attach a file in the 'file' field",
    });
  }

  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!ALLOWED.includes(ext)) {
    throw new HTTPException(400, {
      message: "Uses a PDF, Markdown or text file",
    });
  }
  if (file.size > MAX_BYTES) {
    throw new HTTPException(413, { message: "File is larger than 10 MB" });
  }

  const doc = await createDocument(file.name);
  void ingestDocument(doc.id, file); // not awaited: the library polls for status
  return c.json(doc, 201);
};

export const remove = async (c: Context) => {
  const id = z.string().uuid().parse(c.req.param("id"));
  await deleteDocument(id);
  return c.body(null, 204);
};
