import { useRef, useState } from "react";

interface Props {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
}

export default function UploadDropzone({ onFiles, disabled }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        onFiles([...e.dataTransfer.files]);
      }}
      className={`rounded-2xl border-2 border-dashed p-6 text-center text-muted-foreground ${over ? "border-primary" : ""}`}
    >
      <input
        ref={input}
        type="file"
        multiple
        hidden
        accept=".pdf,.docx,.md,.txt"
        onChange={(e) => onFiles([...(e.target.files ?? [])])}
      />
      Drop PDFs, Word files or Markdown here, or{" "}
      <button
        disabled={disabled}
        className="text-primary underline"
        onClick={() => input.current?.click()}
      >
        Browse
      </button>
    </div>
  );
}
