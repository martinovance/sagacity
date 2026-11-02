import { useState } from "react";
import { Button } from "../ui/button";
import { Square } from "lucide-react";

interface Props {
  isStreaming: boolean;
  onSend: (question: string) => void;
  onStop: () => void;
}

export default function Composer({ isStreaming, onSend, onStop }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const prompt = value.trim();
    if (!prompt) return;
    onSend(prompt);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 rounded-2xl border bg-card p-2 pl-4">
      <label htmlFor="ask" className="sr-only">
        Ask about your documents
      </label>
      <input
        id="ask"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Ask about your documents"
        className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
      />
      {isStreaming ? (
        <Button
          variant="secondary"
          size="icon"
          aria-label="stop"
          className="cursor-pointer bg-red-500"
          onClick={onStop}
        >
          <Square className="bg-white" />
        </Button>
      ) : (
        <Button className="cursor-pointer" onClick={handleSubmit}>
          Ask
        </Button>
      )}
    </div>
  );
}
