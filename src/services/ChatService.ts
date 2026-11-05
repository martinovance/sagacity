import type { ChatRequest, ChatStreamEvent } from "@/types/chat";
import { base_url } from "@/utils/api";

export async function* streamChat(
  req: ChatRequest,
  signal?: AbortSignal,
): AsyncGenerator<ChatStreamEvent> {
  const res = await fetch(`${base_url}/stream/chat`, {
    method: "POST",
    signal,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (!res.ok || !res.body) throw new Error("Could not load response");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";
    for (const frame of frames) {
      const line = frame.replace(/^data: /, "").trim();
      if (line) yield JSON.parse(line) as ChatStreamEvent;
    }
  }
}
