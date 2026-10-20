export const ROUTES = {
  signIn: "/sign-in",
  chat: "/",
  chatById: (id: string) => `/chat/${id}`,
  library: "/library",
  quality: "/quality",
  settings: "/settings",
} as const;

export const QUERY_KEYS = {
  documents: ["documents"] as const,
  conversations: ["conversations"] as const,
  quality: (question: string) => ["quality", question] as const,
};

// Poll the library while anything is still being indexed
export const INDEX_POLL_MS = 3000;
