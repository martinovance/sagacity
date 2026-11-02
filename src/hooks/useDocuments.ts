import { INDEX_POLL_MS, QUERY_KEYS } from "@/constants";
import {
  deleteDocument,
  getDocuments,
  uploadDocument,
} from "@/services/documentService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDocuments() {
  return useQuery({
    queryKey: QUERY_KEYS.documents,
    queryFn: getDocuments,
    refetchInterval: (q) =>
      q.state.data?.some((d) => d.status === "indexing")
        ? INDEX_POLL_MS
        : false,
  });
}

export function useUploadDocument() {
  const upload = useQueryClient();
  return useMutation({
    mutationFn: uploadDocument,
    onSuccess: () =>
      upload.invalidateQueries({ queryKey: QUERY_KEYS.documents }),
  });
}

export function useDeleteDocument() {
  const del = useQueryClient();
  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => del.invalidateQueries({ queryKey: QUERY_KEYS.documents }),
  });
}
