import type { IError } from "@/types";
import type { LibraryDocument } from "@/types/document";
import Api from "@/utils/api";
import handleApiError from "@/utils/handleApiError";

export const getDocuments = async (): Promise<LibraryDocument[]> => {
  try {
    const { data } = await Api.get("/documents");
    if (!Array.isArray(data)) {
      throw new Error("Unexpected response from the documents endpoint");
    }
    return data;
  } catch (e) {
    throw new Error(handleApiError(e as IError));
  }
};

export const uploadDocument = async (file: File): Promise<LibraryDocument> => {
  try {
    const form = new FormData();
    form.append("file", file);
    const { data } = await Api.post("/documents", form);
    return data;
  } catch (e) {
    throw new Error(handleApiError(e as IError));
  }
};

export const deleteDocument = async (id: string) => {
  try {
    await Api.delete(`/documents/${id}`);
  } catch (e) {
    throw new Error(handleApiError(e as IError));
  }
};
