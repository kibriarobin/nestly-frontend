"use client";

import { ScrollText, TriangleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";
import DataTable, { type DataTableColumn } from "@/components/shared/DataTable";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import StatusBadge from "@/components/shared/StatusBadge";
import { RowListSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { useAuditLogs } from "@/hooks";
import type { IAuditLog } from "@/types";
import { formatDateTime, getErrorMessage } from "@/utils";

const PAGE_SIZE = 12;

const columns: DataTableColumn<IAuditLog>[] = [
  {
    key: "time",
    header: "When",
    cell: (log) => (
      <span className="whitespace-nowrap text-sm text-muted-foreground">
        {formatDateTime(log.createdAt)}
      </span>
    ),
  },
  {
    key: "action",
    header: "Action",
    cell: (log) => <StatusBadge status={log.action} />,
  },
  {
    key: "entity",
    header: "Entity",
    cell: (log) => (
      <div className="min-w-28">
        <p className="text-sm font-medium">{log.entity}</p>
        <p className="font-mono text-xs text-muted-foreground">
          {log.entityId.slice(0, 8)}
        </p>
      </div>
    ),
  },
  {
    key: "description",
    header: "Details",
    cell: (log) => (
      <span className="block min-w-56 text-sm">{log.description ?? "—"}</span>
    ),
  },
  {
    key: "by",
    header: "By",
    cell: (log) =>
      log.user ? (
        <div className="min-w-36">
          <p className="text-sm font-medium">{log.user.name}</p>
          <p className="text-xs text-muted-foreground">
            {log.user.role.toLowerCase()}
          </p>
        </div>
      ) : (
        <span className="text-xs text-muted-foreground">System</span>
      ),
  },
];

export default function AuditLogs() {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data, isPending, isError, error, refetch } = useAuditLogs({
    page,
    limit: PAGE_SIZE,
  });

  if (isPending) return <RowListSkeleton count={6} />;

  if (isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load the audit log"
        description={getErrorMessage(error)}
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );
  }

  if (data.data.length === 0) {
    return (
      <EmptyState
        icon={ScrollText}
        title="No activity recorded yet"
        description="Approvals, rejections, payments and account changes will appear here."
      />
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Showing {data.data.length} of {data.meta.total} entries, newest first
      </p>
      <DataTable
        caption="Audit log"
        columns={columns}
        rows={data.data}
        getRowKey={(log) => log.id}
      />
      <Pagination
        page={data.meta.page}
        totalPages={data.meta.totalPages}
        basePath="/admin/reports"
      />
    </div>
  );
}
