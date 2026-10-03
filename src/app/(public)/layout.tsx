import type { ReactNode } from "react";
import { Footer, Navbar } from "@/components/layout";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer></Footer>
    </>
  );
}
