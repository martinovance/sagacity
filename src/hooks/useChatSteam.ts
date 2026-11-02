import { streamChat } from "@/services/ChatService";
import type { Message } from "@/types/chat";
import { useCallback, useRef, useState } from "react";

export function useChatStream({ useRerank }: { useRerank: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(
    async (question: string) => {
      const answerId = crypto.randomUUID();
      const questionId = crypto.randomUUID();
      setMessages((m) => [
        ...m,
        { id: questionId, role: "user", content: question },
        { id: answerId, role: "assistant", content: "", streaming: true },
      ]);
      setIsStreaming(true);
      const controller = new AbortController();
      abortRef.current = controller;
      const patch = (fn: (msg: Message) => Message) =>
        setMessages((m) => m.map((x) => (x.id === answerId ? fn(x) : x)));

      try {
        for await (const ev of streamChat(
          { question, useRerank },
          controller.signal,
        )) {
          if (ev.type === "token")
            patch((x) => ({ ...x, content: x.content + ev.text }));
          if (ev.type === "sources")
            patch((x) => ({ ...x, sources: ev.sources }));
          if (ev.type === "error") throw new Error(ev.message);
        }
      } catch (e) {
        if (!controller.signal.aborted) {
          patch((x) => ({ ...x, content: x.content || (e as Error).message }));
        }
      } finally {
        patch((x) => ({ ...x, streaming: false }));
        setIsStreaming(false);
      }
    },
    [useRerank],
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);

  return { messages, isStreaming, send, stop };
}
