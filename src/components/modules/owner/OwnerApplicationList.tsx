"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Check, ClipboardList, Loader2, TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import EmptyState from "@/components/shared/EmptyState";
import StatusBadge from "@/components/shared/StatusBadge";
import { RowListSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import {
  APPLICATION_KEYS,
  useApproveApplication,
  useOwnerApplications,
  useRejectApplication,
} from "@/hooks";
import type { IOwnerApplication } from "@/types";
import { formatDate, formatRent, getErrorMessage } from "@/utils";

const ACTIONABLE_STATUSES = ["PENDING", "UNDER_REVIEW"];

export default function OwnerApplicationList() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error, refetch } = useOwnerApplications();
  const {
    mutate: approve,
    isPending: approving,
    variables: approvingId,
  } = useApproveApplication();
  const { mutate: reject, isPending: rejecting } = useRejectApplication();
  const [rejectTarget, setRejectTarget] = useState<IOwnerApplication | null>(
    null,
  );

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: APPLICATION_KEYS.owner });

  const handleApprove = (application: IOwnerApplication) =>
    approve(application.id, {
      onSuccess: () => {
        invalidate();
        toast.success(`Approved ${application.tenant.name}'s application`);
      },
      onError: (err) => toast.error(getErrorMessage(err)),
    });

  const confirmReject = () => {
    if (!rejectTarget) return;
    reject(rejectTarget.id, {
      onSuccess: () => {
        invalidate();
        toast.success(`Rejected ${rejectTarget.tenant.name}'s application`);
        setRejectTarget(null);
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
        setRejectTarget(null);
      },
    });
  };

  if (isPending) return <RowListSkeleton />;

  if (isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load applications"
        description={getErrorMessage(error)}
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );
  }

  const applications = data.data;

  if (applications.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No applications yet"
        description="When a tenant applies to one of your listings, it will show up here for review."
      />
    );
  }

  return (
    <>
      <ul className="space-y-4">
        {applications.map((application) => {
          const actionable = ACTIONABLE_STATUSES.includes(application.status);
          const approvingThis = approving && approvingId === application.id;

          return (
            <li
              key={application.id}
              className="flex flex-col gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold">
                    {application.flat.property.title} - {application.flat.name}
                    {application.room && ` · ${application.room.name}`}
                  </h2>
                  <StatusBadge status={application.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {application.tenant.name} ({application.tenant.email})
                  {application.tenant.phone && ` · ${application.tenant.phone}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatRent(application.rent)} · Applied{" "}
                  {formatDate(application.appliedAt)}
                </p>
                {application.message && (
                  <p className="text-sm text-muted-foreground italic">
                    "{application.message}"
                  </p>
                )}
              </div>

              {actionable && (
                <div className="flex shrink-0 gap-2">
                  <Button
                    size="sm"
                    disabled={approving || rejecting}
                    onClick={() => handleApprove(application)}
                  >
                    {approvingThis ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Check className="size-4" />
                    )}
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={approving || rejecting}
                    onClick={() => setRejectTarget(application)}
                  >
                    <X className="size-4" />
                    Reject
                  </Button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <ConfirmDialog
        open={rejectTarget !== null}
        onOpenChange={(open) => {
          if (!open) setRejectTarget(null);
        }}
        title="Reject this application?"
        description={`"${rejectTarget?.tenant.name ?? ""}"'s application will be rejected. They can submit a new application later.`}
        pending={rejecting}
        onConfirm={confirmReject}
      />
    </>
  );
}
