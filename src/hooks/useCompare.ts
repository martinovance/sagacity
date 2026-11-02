import { compareRetrieval } from "@/services/qualityService";
import { useMutation } from "@tanstack/react-query";

export function useCompare() {
  return useMutation({ mutationFn: compareRetrieval });
}
