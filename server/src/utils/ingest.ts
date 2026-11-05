import { insertChunks } from "../db/chunk";
import { updateDocument } from "../db/documents";
import { chunkText } from "./chunker";
import { embedTexts } from "./cohere";
import { parseFile } from "./parser";

// Runs in the background after the upload resource has been sent
export async function ingestDocument(documentId: string, file: File) {
  try {
    const pages = await parseFile(file);
    const items = pages.flatMap((p) =>
      chunkText(p.text).map((content) => ({
        page: p.page,
        content,
      })),
    );
    if (items.length === 0) throw new Error("No readable text found");

    await updateDocument(documentId, { pages: pages.length });

    const embeddings = await embedTexts(
      items.map((i) => i.content),
      "search_document",
      (done, total) =>
        void updateDocument(documentId, {
          progress: Math.round((done / total) * 90),
        }),
    );

    await insertChunks(
      documentId,
      items.map((item, i) => ({ ...item, embedding: embeddings[i]! })),
    );
    await updateDocument(documentId, { status: "ready", progress: 100 });
  } catch (error) {
    console.error("Ingest failed:", error);
    await updateDocument(documentId, { status: "failed" });
  }
}
