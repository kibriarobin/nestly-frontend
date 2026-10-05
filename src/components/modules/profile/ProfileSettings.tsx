"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormActions, FormField } from "@/components/form";
import EmptyState from "@/components/shared/EmptyState";
import StatusBadge from "@/components/shared/StatusBadge";
import { FormSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { USER_KEY, useGetMe, useUpdateProfile } from "@/hooks";
import type { IUser } from "@/types";
import { formatDate, getErrorMessage } from "@/utils";
import { type ProfileFormValues, profileSchema } from "@/validation";

function ProfileForm({ user }: { user: IUser }) {
  const queryClient = useQueryClient();
  const { mutateAsync: update } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await update(values);
      await queryClient.invalidateQueries({ queryKey: USER_KEY });
      reset(values);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <section className="space-y-3 rounded-xl border p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold">Account</h2>
          <StatusBadge status={user.role} />
          <StatusBadge status={user.status} />
        </div>
        <p className="text-sm text-muted-foreground">
          Member since {formatDate(user.createdAt)}
        </p>
        <FormField
          id="profile-email"
          label="Email"
          hint="Email cannot be changed."
        >
          <Input id="profile-email" value={user.email} readOnly disabled />
        </FormField>
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 rounded-xl border p-6"
      >
        <h2 className="text-lg font-semibold">Personal details</h2>
        <FormField
          id="profile-name"
          label="Full name"
          error={errors.name?.message}
        >
          <Input
            id="profile-name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </FormField>
        <FormActions
          submitLabel="Save changes"
          submitting={isSubmitting}
          onCancel={() => reset({ name: user.name })}
        />
      </form>
    </div>
  );
}

export default function ProfileSettings() {
  const { data, isPending, isError, error, refetch } = useGetMe();

  if (isPending) return <FormSkeleton />;

  if (isError || !data) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load your profile"
        description={getErrorMessage(error)}
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );
  }

  return <ProfileForm user={data.data} />;
}
