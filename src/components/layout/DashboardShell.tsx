"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { ROLE_DASHBOARD, type Role } from "@/constants/roles";
import { useGetMe } from "@/hooks";
import { cn } from "@/lib/utils";
import { roleRoutes } from "@/routes";
import Logo from "./Logo";
import SidebarNav from "./SidebarNav";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

interface DashboardShellProps {
  role: Role;
  children: ReactNode;
}

export default function DashboardShell({
  role,
  children,
}: DashboardShellProps) {
  const router = useRouter();
  const { data, isPending } = useGetMe();
  const user = data?.data;
  const [open, setOpen] = useState(false);
  const allowed = !!user && user.role === role;

  useEffect(() => {
    if (isPending) return;
    if (!user) router.replace("/login");
    else if (user.role !== role) router.replace(ROLE_DASHBOARD[user.role]);
  }, [isPending, user, role, router]);

  if (!allowed) {
    return (
      <div className="flex min-h-svh">
        <Skeleton className="hidden w-64 rounded-none lg:block" />
        <div className="flex-1 space-y-4 p-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  const items = roleRoutes[role];
  const roleLabel = `${role.charAt(0)}${role.slice(1).toLowerCase()}`;

  return (
    <div className="flex min-h-svh">
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b px-4">
          <Logo />
        </div>
        <div className="flex-1 p-3">
          <SidebarNav items={items} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-2 border-b bg-background/80 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                aria-label="Open sidebar"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "lg:hidden",
                )}
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="border-b">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="p-3">
                  <SidebarNav items={items} onNavigate={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <span className="text-sm font-medium text-muted-foreground">
              {roleLabel} panel
            </span>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <UserMenu user={user} />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
