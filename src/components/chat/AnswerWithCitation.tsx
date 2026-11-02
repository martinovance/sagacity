import { cn } from "@/lib/utils";

interface Props {
  content: string;
  streaming?: boolean;
  onCitationClick: (index: number) => void;
}

export default function AnswerWithCitation({
  content,
  streaming,
  onCitationClick,
}: Props) {
  const parts = content.split(/(\[\d+\])/g);

  return (
    <p className="font-answer max-w-prose text-[19px] leading-relaxed">
      {parts.map((part, i) => {
        const m = part.match(/^\[(\d+)\]$/);
        return (
          <button
            key={i}
            onClick={() => onCitationClick(Number(m![1!]))}
            className="mx-0.5 -translate-y-0.5 rounded-md bg-cite px-1.5 font-sans text-[11px] font-semibold text-cite-foreground"
          >
            {m![1!]}
          </button>
        );
      })}

      {streaming && (
        <span
          className={cn(
            "ml-0.5 inline-block h-4.5 w-2 bg-primary align-middle",
          )}
        />
      )}
    </p>
  );
}
