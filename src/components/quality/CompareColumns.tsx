import type { CompareResult } from "@/types/quality";

// TODO: two columns on desktop, Before/After tabs below lg (same pattern as the tablet chat screen)
// Show rank movement per source (up 3 / down 2) by comparing source ids between the two runs.
export default function CompareColumns({ result }: { result: CompareResult }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section aria-label="Without rerank">
        {/* result.withoutRerank */}
      </section>
      <section aria-label="With rerank">{/* result.withRerank */}</section>
    </div>
  );
}
