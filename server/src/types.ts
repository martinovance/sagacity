export interface Source {
  id: string;
  documentId: string;
  documentName: string;
  page?: number;
  passage: string;
  highlight?: [number, number];
  relevance: number;
}

export type DocumentStatus = "ready" | "indexing" | "failed";

export interface LibraryDocument {
  id: string;
  name: string;
  pages: number;
  addedAt: string;
  status: DocumentStatus;
  progress?: number;
}

export type ChatStreamEvent =
  | { type: "token"; text: string }
  | { type: "sources"; sources: Source[] }
  | { type: "done" }
  | { type: "error"; message: string };
