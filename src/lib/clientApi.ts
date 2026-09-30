import { ApiErrorBody } from "@/types";
import { ofetch } from "ofetch";

export class ApiError extends Error {
  status: number;
  errors?: unknown[];

  constructor(message: string, status: number, errors?: unknown[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

const baseURL =
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL : "/api/v1";

const apiClient = ofetch.create({
  baseURL,
  credentials: "include",
  onResponseError({ response }) {
    const body = response._data as Partial<ApiErrorBody> | undefined;
    throw new ApiError(
      body?.message ?? "Something went wrong. Please try again.",
      response.status,
      body?.errors,
    );
  },
});

export default apiClient;