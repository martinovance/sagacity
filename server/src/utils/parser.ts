import { extractText, getDocumentProxy } from "unpdf";

export interface PageText {
  page: number;
  text: string;
}

export async function parseFile(file: File): Promise<PageText[]> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    const pdf = await getDocumentProxy(
      new Uint8Array(await file.arrayBuffer()),
    );
    const { text } = await extractText(pdf, { mergePages: false });
    return text.map((t, i) => ({ page: i + 1, text: t }));
  }

  if (name.endsWith(".md") || name.endsWith(".txt")) {
    return [{ page: 1, text: await file.text() }];
  }

  throw new Error("Unsupported file type");
}
