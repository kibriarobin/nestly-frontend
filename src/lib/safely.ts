export async function safely<T>(task: () => Promise<T>): Promise<T | null> {
  try {
    return await task();
  } catch {
    return null;
  }
}
