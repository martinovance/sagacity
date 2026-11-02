import { cn } from "@/lib/utils";
import type { Source } from "@/types/chat";

function Passage({ source }: { source: Source }) {
  if (!source.highlight) return <>{source.passage}</>;
  const [a, b] = source.highlight;
  return (
    <>
      {source.passage.slice(0, a)}
      <mark className="bg-cite px-0.5 text-cite-background">
        {source.passage.slice(a, b)}
      </mark>
      {source.passage.slice}
    </>
  );
}

interface Props {
  sources: Source[];
  activeId?: string;
  onSelect: (id: string) => void;
}

export default function SourcesPanel({ sources, activeId, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3.5">
      <h2 className="font-semibold">Sources</h2>
      {sources?.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={cn(
            "rounded-xl border bg-card p-3.5 text-left",
            s.id === activeId && "ring-1 ring-primary",
          )}
        >
          <div className="font-semibold">{s.documentName}</div>
          <div className="text=xs text-muted-foreground">
            {s.page ? `page ${s.page} · ` : ""}Relevance{" "}
            {s.relevance.toFixed(2)}
          </div>
          {s.id === activeId && (
            <p className="font-answer mt-2.5 text-[15px] leading-relaxed">
              <Passage source={s} />
            </p>
          )}
          <div className="mt-2.5 h-1 rounded bg-border">
            <div
              className="h-1 rounded bg-primary"
              style={{ width: `${s.relevance * 100}%` }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
