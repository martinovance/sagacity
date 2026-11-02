import { useState } from "react";
import CompareColumns from "@/components/quality/CompareColumns";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/hooks/useCompare";

export default function Quality() {
  const [question, setQuestion] = useState("");
  const compare = useCompare();

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col gap-5 overflow-y-auto p-4 sm:p-7">
      <h1 className="text-xl font-semibold">Retrieval quality</h1>
      <p className="text-muted-foreground">
        Same question, answered with and without Rerank.
      </p>
      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          compare.mutate(question);
        }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question to compare"
          aria-label="Question"
          className="flex-1 rounded-xl border bg-card px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring/40"
        />
        <Button disabled={!question.trim() || compare.isPending}>
          Compare
        </Button>
      </form>
      {compare.data && <CompareColumns result={compare.data} />}
    </div>
  );
}
