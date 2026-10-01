import Image from "next/image";
import type { ReactNode } from "react";
import Logo from "@/components/layout/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="/images/login-photo.jpg"
          alt="A bright, comfortable living room in a rental flat"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-10 right-10 left-10 text-white">
          <p className="text-2xl font-semibold tracking-tight">
            Find a place that feels like home.
          </p>
          <p className="mt-2 text-sm text-white/80">
            Search verified flats and rooms, apply online, and book with secure
            payment.
          </p>
        </div>
      </div>

      <div className="flex min-h-svh flex-col">
        <header className="flex justify-end p-4">
          <Logo />
        </header>
        <main className="flex flex-1 items-center justify-center px-6 pb-6">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  );
}