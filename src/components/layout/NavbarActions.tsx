"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/hooks";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

export default function NavbarActions() {
  const { data: user, isPending } = useMe();

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      {isPending ? (
        <Skeleton className="h-9 w-24" />
      ) : user ? (
        <UserMenu user={user} />
      ) : (
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
            Login
          </Link>
          <Link href="/register" className={buttonVariants()}>
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}