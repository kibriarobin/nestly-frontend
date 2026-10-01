import type { ReactNode } from "react";
import Logo from "@/components/layout/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/40 p-4">
      <Logo />
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}