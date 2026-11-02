import type { LibraryDocument } from "@/types/document";
import StatusBadge from "./StatusBadge";

export default function DocumentTable({
  documents,
}: {
  documents: LibraryDocument[];
}) {
  return (
    <ul className="divide-y rounded-2xl border bg-card">
      {documents.map((document) => (
        <li
          key={document.id}
          className="grid items-center gap-2 md:grid-cols-[1fr_70px_100px_130px] md:gap-3 p-4"
        >
          <span className="truncate font-medium">{document.name}</span>
          <span className="text-sm text-muted-foreground">
            {document.pages} pages
          </span>
          <span className="text-sm text-muted-foreground">
            {new Date(document.addedAt).toLocaleDateString()}
          </span>
          <StatusBadge doc={document} />
        </li>
      ))}
    </ul>
  );
}
