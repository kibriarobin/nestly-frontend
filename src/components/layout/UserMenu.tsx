"use client";

import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_DASHBOARD } from "@/constants/roles";
import { USER_KEY, useLogout } from "@/hooks";
import { cn } from "@/lib/utils";
import type { IUser } from "@/types";
import { getErrorMessage } from "@/utils";

export default function UserMenu({ user }: { user: IUser }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () =>
    logout(undefined, {
      onSuccess: async () => {
        await queryClient.resetQueries({ queryKey: USER_KEY });
        toast.success("Logged out successfully");
        router.push("/login");
        router.refresh();
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open user menu"
        className={cn(buttonVariants({ variant: "ghost" }), "gap-2 px-2")}
      >
        <Avatar className="size-7">
          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="hidden max-w-28 truncate text-sm sm:inline">
          {user.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          <p className="mt-1 text-xs font-medium capitalize text-primary">
            {user.role.toLowerCase()}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push(ROLE_DASHBOARD[user.role])}
        >
          <LayoutDashboard className="size-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isPending} onClick={handleLogout}>
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}