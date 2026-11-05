import { DocumentStatus, LibraryDocument } from "../types";
import { sql } from "./client";

type Row = {
  id: string;
  name: string;
  pages: number;
  status: DocumentStatus;
  progress: number;
  created_at: Date;
};

const toDocument = (r: Row): LibraryDocument => ({
  id: r.id,
  name: r.name,
  pages: r.pages,
  addedAt: r.created_at.toISOString(),
  status: r.status,
  progress: r.status === "indexing" ? r.progress : undefined,
});

export async function listDocuments(): Promise<LibraryDocument[]> {
  const rows = await sql<Row[]>`
    Select id, name, pages, status, progress, created_at
    from documents order by created_at desc`;
  return rows.map(toDocument);
}

export async function createDocument(name: string): Promise<LibraryDocument> {
  const [row] = await sql<Row[]>`
    insert into documents (name) values (${name})
    returning id, name, pages, status, progress, created_at`;
  return toDocument(row!);
}

export async function updateDocument(
  id: string,
  patch: { pages?: number; status?: DocumentStatus; progress?: number },
) {
  await sql`
    update documents set
      pages = coalesce(${patch.pages ?? null}, pages),
      status = coalesce(${patch.status ?? null}, status),
      progress = coalesce(${patch.progress ?? null}, progress)
    where id = ${id}`;
}

export async function deleteDocument(id: string) {
  await sql`delete from documents where id = ${id}`;
}
