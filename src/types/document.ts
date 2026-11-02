export type DocumentStatus = "ready" | "indexing" | "field";

export interface LibraryDocument {
  id: string;
  name: string;
  pages: number;
  addedAt: string;
  status: DocumentStatus;
  progress?: number;
}
