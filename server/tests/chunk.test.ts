import { describe, expect, it } from "vitest";
import { chunkText } from "../src/utils/chunker";

describe("chunkText", () => {
  it("returns nothing for empty text", () => {
    expect(chunkText("   ")).toEqual([]);
  });

  it("keeps short text as one chunk", () => {
    expect(chunkText("hello world")).toEqual(["hello world"]);
  });

  it("splits long text with overlap", () => {
    const chunks = chunkText("a".repeat(2000), 1000, 100);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0]!.length).toBe(1000);
  });
});
