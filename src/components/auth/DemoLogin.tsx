"use client";

import { useQueryClient } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";
import { Building2, Loader2, ShieldCheck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DEMO_ACCOUNTS } from "@/constants/demo-accounts";
import { ROLE, ROLE_DASHBOARD, type Role } from "@/constants/roles";
import { USER_KEY, useLogin } from "@/hooks";
import { getErrorMessage } from "@/utils";

const ROLE_ICON: Record<Role, LucideIcon> = {
  [ROLE.ADMIN]: ShieldCheck,
  [ROLE.OWNER]: Building2,
  [ROLE.TENANT]: User,
};

export default function DemoLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, variables } = useLogin();

  const handleDemoLogin = (email: string, password: string) =>
    mutate(
      { email, password },
      {
        onSuccess: async (res) => {
          await queryClient.invalidateQueries({ queryKey: USER_KEY });
          toast.success("Logged in successfully");
        //   router.push(ROLE_DASHBOARD[res.data.user.role]);
          router.push("/");
          router.refresh();
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );

  return (
    <div className="space-y-3">
      <p className="text-center text-sm font-medium">Quick Demo Login</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {DEMO_ACCOUNTS.map((account) => {
          const Icon = ROLE_ICON[account.role];
          const loading = isPending && variables?.email === account.email;

          return (
            <div
              key={account.role}
              className="flex flex-col items-center gap-2 rounded-lg border p-3 text-center"
            >
              <Icon className="size-6 text-primary" />
              <p className="text-sm font-medium">{account.label}</p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-full"
                disabled={isPending}
                onClick={() => handleDemoLogin(account.email, account.password)}
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                Demo Login
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}