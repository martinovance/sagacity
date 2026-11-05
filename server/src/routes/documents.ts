import { Hono } from "hono";
import { list, remove, upload } from "../controllers/documents.controller";

const documents = new Hono();

documents.get("/", list);
documents.post("/", upload);
documents.delete("/:id", remove);

export default documents;
