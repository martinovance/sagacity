export interface Source {
  id: string;
  documentId: string;
  documentName: string;
  page?: number;
  passage: string;
  highlight?: [number, number];
  relevance: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  streaming?: boolean;
}

export interface ChatRequest {
  question: string;
  conversartionId?: string;
  useRerank: boolean;
}

export type ChatStreamEvent =
  | { type: "token"; text: string }
  | { type: "sources"; sources: Source[] }
  | { type: "done" }
  | { type: "error"; message: string };
