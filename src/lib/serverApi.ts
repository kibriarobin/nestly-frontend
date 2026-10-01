import { cookies } from "next/headers";
import type { FetchOptions } from "ofetch";
import apiClient from "./clientApi";

export async function serverFetch<T>(
  url: string,
  options: FetchOptions<"json"> = {},
): Promise<T> {
  const cookieStore = await cookies();

  const headers = new Headers(options.headers);
  headers.set("Cookie", cookieStore.toString());

  return apiClient<T>(url, {
    ...options,
    headers,
  });
}