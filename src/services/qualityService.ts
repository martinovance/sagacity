import type { IError } from "@/types";
import type { CompareResult } from "@/types/quality";
import Api from "@/utils/api";
import handleApiError from "@/utils/handleApiError";

export const compareRetrieval = async (
  question: string,
): Promise<CompareResult> => {
  try {
    const { data } = await Api.post("/qualify/compare", { question });
    return data;
  } catch (e) {
    throw new Error(handleApiError(e as IError));
  }
};
