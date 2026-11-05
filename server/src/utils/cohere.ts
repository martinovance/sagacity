import { CohereClientV2 } from "cohere-ai";
import { env } from "../config/env";

export const cohere = new CohereClientV2({ token: env.COHERE_API_KEY });

const EMBED_BATCH = 96;

export async function embedTexts(
  texts: string[],
  inputType: "search_document" | "search_query",
  onProgress?: (done: number, total: number) => void,
): Promise<number[][]> {
  const out: number[][] = [];
  for (let i = 0; i < texts.length; i += EMBED_BATCH) {
    const res = await cohere.embed({
      model: env.COHERE_EMBED_MODEL,
      texts: texts.slice(i, i + EMBED_BATCH),
      inputType,
      embeddingTypes: ["float"],
      outputDimension: env.EMBED_DIM,
    });
    out.push(...(res.embeddings.float ?? []));
    onProgress?.(out.length, texts.length);
  }

  return out;
}

export async function rerank(query: string, documents: string[], topN: number) {
  const res = await cohere.rerank({
    model: env.COHERE_RERANK_MODEL,
    query,
    documents,
    topN,
  });

  return res.results.map((r) => ({ index: r.index, score: r.relevanceScore }));
}
