import { sql } from "./client";

const toVector = (values: number[]) => `[${values.join(",")}]`;

export interface ChunkHit {
  id: string;
  document_id: string;
  document_name: string;
  page: number | null;
  content: string;
  similarity: number;
}

export async function insertChunks(
  documentId: string,
  rows: { page: number; content: string; embedding: number[] }[],
) {
  for (const r of rows) {
    await sql`
     insert into chunks (document_id, page, content, embedding)
     values (${documentId}, ${r.page}, ${r.content}, ${toVector(r.embedding)}::vector)`;
  }
}

// Nearest chunks by cosine distance, only from fully indexed documents
export async function searchChunks(embedding: number[], limit: number) {
  const v = toVector(embedding);
  return sql<ChunkHit[]>`
    select c.id, c.document_id, d.name as document_name, c.page, c.content,
           1 - (c.embedding <=> ${v}::vector) as similarity
    from chunks c
    join documents d on d.id = c.document_id
    where d.status = 'ready'
    order by c.embedding <=> ${v}::vector
    limit ${limit}`;
}
