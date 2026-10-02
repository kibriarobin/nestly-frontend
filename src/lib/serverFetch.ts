import { notFound } from "next/navigation";
import type { ApiErrorBody } from "@/types";

export async function serverFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, init);

  if (res.status === 404) notFound();

  if (!res.ok) {
    const body = (await res
      .json()
      .catch(() => null)) as Partial<ApiErrorBody> | null;
    throw new Error(body?.message ?? "Failed to load data");
  }
  return res.json() as Promise<T>;
}
