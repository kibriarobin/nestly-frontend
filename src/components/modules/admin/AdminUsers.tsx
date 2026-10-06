"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Ban, RotateCcw, SearchX, TriangleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import DataTable, { type DataTableColumn } from "@/components/shared/DataTable";
import EmptyState from "@/components/shared/EmptyState";
import ListFilters from "@/components/shared/ListFilters";
import Pagination from "@/components/shared/Pagination";
import StatusBadge from "@/components/shared/StatusBadge";
import { RowListSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { ADMIN_KEYS, useAdminUsers, useUpdateUserStatus } from "@/hooks";
import type { AdminUserStatus, IAdminUser } from "@/types";
import { formatDate, getErrorMessage } from "@/utils";

const PAGE_SIZE = 10;

const ROLE_OPTIONS = [
  { value: "OWNER", label: "Owners" },
  { value: "TENANT", label: "Tenants" },
  { value: "ADMIN", label: "Admins" },
];

const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active" },
  { value: "BLOCKED", label: "Blocked" },
];

export default function AdminUsers() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const role =
    ROLE_OPTIONS.find((o) => o.value === searchParams.get("role"))?.value ??
    undefined;
  const status =
    STATUS_OPTIONS.find((o) => o.value === searchParams.get("status"))?.value ??
    undefined;
  const searchTerm = searchParams.get("searchTerm")?.trim() || undefined;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data, isPending, isError, error, refetch } = useAdminUsers({
    role,
    status,
    searchTerm,
    page,
    limit: PAGE_SIZE,
  });
  const { mutate: changeStatus, isPending: updating } = useUpdateUserStatus();
  const [target, setTarget] = useState<{
    user: IAdminUser;
    next: AdminUserStatus;
  } | null>(null);

  const confirm = () => {
    if (!target) return;
    const { user, next } = target;
    changeStatus(
      { id: user.id, status: next },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.users });
          toast.success(
            next === "BLOCKED"
              ? `${user.name} is blocked`
              : `${user.name} is active again`,
          );
          setTarget(null);
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
          setTarget(null);
        },
      },
    );
  };

  const columns: DataTableColumn<IAdminUser>[] = [
    {
      key: "user",
      header: "User",
      cell: (user) => (
        <div className="min-w-48">
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
          {user.phone && (
            <p className="text-xs text-muted-foreground">{user.phone}</p>
          )}
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      cell: (user) => <StatusBadge status={user.role} />,
    },
    {
      key: "status",
      header: "Status",
      cell: (user) => <StatusBadge status={user.status} />,
    },
    {
      key: "joined",
      header: "Joined",
      cell: (user) => (
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          {formatDate(user.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      className: "text-right",
      cell: (user) =>
        user.role === "ADMIN" ? (
          <span className="text-xs text-muted-foreground">Protected</span>
        ) : user.status === "BLOCKED" ? (
          <Button
            size="sm"
            variant="outline"
            disabled={updating}
            onClick={() => setTarget({ user, next: "ACTIVE" })}
          >
            <RotateCcw className="size-4" />
            Unblock
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            disabled={updating}
            onClick={() => setTarget({ user, next: "BLOCKED" })}
          >
            <Ban className="size-4" />
            Block
          </Button>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <ListFilters
        searchPlaceholder="Search by name or email"
        selects={[
          {
            param: "role",
            label: "Filter by role",
            allLabel: "All roles",
            options: ROLE_OPTIONS,
          },
          {
            param: "status",
            label: "Filter by status",
            allLabel: "Any status",
            options: STATUS_OPTIONS,
          },
        ]}
      />

      {isPending && <RowListSkeleton count={5} />}

      {isError && (
        <EmptyState
          icon={TriangleAlert}
          title="Could not load users"
          description={getErrorMessage(error)}
          action={<Button onClick={() => refetch()}>Try again</Button>}
        />
      )}

      {data && data.data.length === 0 && (
        <EmptyState
          icon={SearchX}
          title="No users found"
          description="No users match your filters."
        />
      )}

      {data && data.data.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {data.data.length} of {data.meta.total} users
          </p>
          <DataTable
            caption="Platform users"
            columns={columns}
            rows={data.data}
            getRowKey={(user) => user.id}
          />
          <Pagination
            page={data.meta.page}
            totalPages={data.meta.totalPages}
            basePath="/admin/users"
            params={{ role, status, searchTerm }}
          />
        </>
      )}

      <ConfirmDialog
        open={target !== null}
        onOpenChange={(open) => {
          if (!open) setTarget(null);
        }}
        title={
          target?.next === "BLOCKED" ? "Block this user?" : "Unblock this user?"
        }
        description={
          target?.next === "BLOCKED"
            ? `${target.user.name} will not be able to log in or use the platform until you unblock them.`
            : `${target?.user.name ?? "This user"} will be able to log in again.`
        }
        confirmLabel={target?.next === "BLOCKED" ? "Block" : "Unblock"}
        variant={target?.next === "BLOCKED" ? "destructive" : "default"}
        pending={updating}
        onConfirm={confirm}
      />
    </div>
  );
}
