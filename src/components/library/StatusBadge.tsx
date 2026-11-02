import { cn } from "@/lib/utils";
import type { LibraryDocument } from "@/types/document";

export default function StatusBadge({ doc }: { doc: LibraryDocument }) {
  const label =
    doc.status === "ready"
      ? "Ready"
      : doc.status === "indexing"
        ? `Indexing ${doc.progress ?? 0}`
        : "Retry needed";

  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        doc.status === "ready" && "text-primary",
        doc.status === "indexing" &&
          "border-transparent bg-cite text-cite-foreground",
      )}
    >
      {label}
    </span>
  );
}
