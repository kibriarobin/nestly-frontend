import type { ReactNode } from "react";
import { Navbar } from "@/components/layout";

export default function PaymentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
    </>
  );
}
