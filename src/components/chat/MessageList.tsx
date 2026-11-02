import type { Message } from "@/types/chat";
import AnswerWithCitation from "./AnswerWithCitation";

interface Props {
  messages: Message[];
  onCitationClick: (messageId: string, index: number) => void;
}

export default function MessageList({ messages, onCitationClick }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {messages?.map((m) =>
        m.role === "user" ? (
          <div
            key={m.id}
            className="max-w-3/4 self-end rouded-2xl rounded-br-sm bg-primary px-4 py-3 text-primary-foreground"
          >
            {m.content}
          </div>
        ) : (
          <AnswerWithCitation
            key={m.id}
            content={m.content}
            streaming={m.streaming}
            onCitationClick={(i) => onCitationClick(m.id, i)}
          />
        ),
      )}
    </div>
  );
}
