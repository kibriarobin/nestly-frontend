"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormActions, FormField } from "@/components/form";
import FormDialog from "@/components/shared/FormDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { APPLICATION_KEYS, useCreateApplication, useGetMe } from "@/hooks";
import type { FlatStatus, RentalType } from "@/types";
import { formatRent, getErrorMessage } from "@/utils";
import { type ApplicationFormValues, applicationSchema } from "@/validation";

interface ApplyTarget {
  flatId: string;
  roomId?: string;
  rentalType: RentalType;
  listingName: string;
  rent: string | null;
}

interface ApplyFormProps {
  target: ApplyTarget;
  onDone: () => void;
}

function ApplyForm({ target, onDone }: ApplyFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: apply } = useCreateApplication();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { message: "" },
  });

  const onSubmit = async ({ message }: ApplicationFormValues) => {
    try {
      await apply({
        flatId: target.flatId,
        roomId: target.roomId,
        rentalType: target.rentalType,
        message: message || undefined,
      });
      await queryClient.invalidateQueries({ queryKey: APPLICATION_KEYS.mine });
      toast.success("Application sent. The owner will review it.");
      onDone();
      router.push("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="rounded-lg bg-muted p-4 text-sm">
        <p className="font-medium">{target.listingName}</p>
        <p className="text-primary">{formatRent(target.rent)}</p>
      </div>
      <FormField
        id="apply-message"
        label="Message to the owner (optional)"
        hint="Introduce yourself and say when you would like to move in."
        error={errors.message?.message}
      >
        <Textarea
          id="apply-message"
          rows={4}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </FormField>
      <FormActions
        submitLabel="Send application"
        submitting={isSubmitting}
        onCancel={onDone}
      />
    </form>
  );
}

interface ApplyButtonProps extends ApplyTarget {
  status: FlatStatus;
}

export default function ApplyButton({ status, ...target }: ApplyButtonProps) {
  const [open, setOpen] = useState(false);
  const { data, isPending } = useGetMe();
  const user = data?.data;

  if (status !== "AVAILABLE") {
    return (
      <div className="space-y-2">
        <Button disabled>Not available</Button>
        <p className="text-sm text-muted-foreground">
          This listing is not open for applications right now.
        </p>
      </div>
    );
  }

  if (isPending) return <Skeleton className="h-9 w-32" />;

  if (!user) {
    return (
      <div className="space-y-2">
        <Link href="/login" className={buttonVariants()}>
          <LogIn className="size-4" />
          Log in to apply
        </Link>
        <p className="text-sm text-muted-foreground">
          You need a tenant account to send an application.
        </p>
      </div>
    );
  }

  if (user.role !== "TENANT") {
    return (
      <p className="text-sm text-muted-foreground">
        Only tenant accounts can apply for a listing.
      </p>
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Apply now</Button>
      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title={`Apply for ${target.listingName}`}
        description="The owner reviews your application and may approve it for booking."
      >
        {open && <ApplyForm target={target} onDone={() => setOpen(false)} />}
      </FormDialog>
    </>
  );
}