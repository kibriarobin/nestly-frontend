"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import { ROLE_DASHBOARD } from "@/constants/roles";
import { useGetMe } from "@/hooks";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data } = useGetMe();
  const user = data?.data;
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "md:hidden",
        )}
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <NavLinks className="flex-col items-stretch" onNavigate={close} />
          <div className="flex flex-col gap-2 border-t pt-4">
            {user ? (
              <Link
                href={ROLE_DASHBOARD[user.role]}
                onClick={close}
                className={buttonVariants()}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={close}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={close}
                  className={buttonVariants()}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
