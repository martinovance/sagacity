import type { Source } from "./chat";

export interface RankedRun {
  answer: string;
  sources: Source[];
}

export interface CompareResult {
  withoutRerank: RankedRun;
  withRerank: RankedRun;
}
