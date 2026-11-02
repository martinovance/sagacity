import Composer from "@/components/chat/Composer";
import MessageList from "@/components/chat/MessageList";
import SourcesPanel from "@/components/chat/SourcesPanel";
import { useChatStream } from "@/hooks/useChatSteam";
import { useState } from "react";

export default function Chat() {
  const { messages, isStreaming, send, stop } = useChatStream({
    useRerank: true,
  });
  const [activeMessageId, setActiveMessageId] = useState<string>();
  const [activeSourceId, setActiveSourceId] = useState<string>();

  const lastAnswer = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");
  const shown = messages.find((m) => m.id === activeMessageId) ?? lastAnswer;
  const sources = shown?.sources ?? [];

  const handleCitation = (messageId: string, index: number) => {
    setActiveMessageId(messageId);
    const source = messages.find((m) => m.id === messageId)?.sources?.[
      index - 1
    ];
    if (source) setActiveSourceId(source.id);
  };

  const panel = (
    <SourcesPanel
      sources={sources}
      activeId={activeSourceId}
      onSelect={setActiveSourceId}
    />
  );

  return (
    <div className="flex h-full">
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b px-4 py-3.5 sm:px-7">
          <h1 className="font-semibold">New Conversation</h1>
        </header>
        {/* // Message list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7">
          <MessageList messages={messages} onCitationClick={handleCitation} />
        </div>

        {/* Composer (input field) */}
        <div className="p-4 sm:px-7 sm:pb-6">
          <Composer isStreaming={isStreaming} onSend={send} onStop={stop} />
        </div>
      </section>

      <aside className="hidden w-85 shrink-0 overflow-y-auto border p-5 xl:block">
        {panel}
      </aside>
    </div>
  );
}
