export function isSslCommerzUrl(value: string) {
  try {
    const { protocol, hostname } = new URL(value);
    return (
      protocol === "https:" &&
      (hostname === "sslcommerz.com" || hostname.endsWith(".sslcommerz.com"))
    );
  } catch {
    return false;
  }
}
