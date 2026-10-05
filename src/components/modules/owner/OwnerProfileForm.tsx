"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { USER_KEY, useGetMe, useUpdateProfile } from "@/hooks";
import { getErrorMessage } from "@/utils";
import {
  type UpdateProfileFormValues,
  updateProfileSchema,
} from "@/validation";

export default function OwnerProfileForm() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error, refetch } = useGetMe();
  const { mutate, isPending: saving } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: "", phone: "" },
  });

  useEffect(() => {
    if (data?.data) {
      reset({ name: data.data.name, phone: data.data.phone ?? "" });
    }
  }, [data, reset]);

  if (isPending) {
    return (
      <div className="max-w-md space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-28" />
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load your profile"
        description={getErrorMessage(error)}
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );
  }

  const onSubmit = ({ phone, ...rest }: UpdateProfileFormValues) =>
    mutate(
      { ...rest, phone: phone?.trim() || undefined },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: USER_KEY });
          toast.success("Profile updated");
        },
        onError: (err) => toast.error(getErrorMessage(err)),
      },
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-md space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={data.data.email} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <p role="alert" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
        {errors.phone && (
          <p role="alert" className="text-sm text-destructive">
            {errors.phone.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="size-4 animate-spin" />}
        Save changes
      </Button>
    </form>
  );
}
