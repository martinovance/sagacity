import DocumentTable from "@/components/library/DocumentTable";
import UploadDropzone from "@/components/library/UploadDropzone";
import { useDocuments, useUploadDocument } from "@/hooks/useDocuments";

export default function Library() {
  const { data: documents, isLoading, error } = useDocuments();
  const upload = useUploadDocument();

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col gap-5 overflow-y-auto p-4 sm:p-7">
      <h1 className="text-xl font-semibold">Library</h1>
      <UploadDropzone
        disabled={upload.isPending}
        onFiles={(files) => files.forEach((f) => upload.mutate(f))}
      />
      {isLoading && (
        <p className="text-muted-foreground">Loading documents...</p>
      )}
      {error && (
        <p role="alert" className="text-destructive">
          {error.message}
        </p>
      )}
      {documents && <DocumentTable documents={documents} />}
    </div>
  );
}
