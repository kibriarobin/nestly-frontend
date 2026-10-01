"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Eye, EyeOff, Loader2, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegistration } from "@/hooks";
import { getErrorMessage } from "@/utils";
import { type RegisterFormValues, registerSchema } from "@/validation";

const ROLE_OPTIONS = [
  {
    value: "TENANT",
    label: "Tenant",
    description: "Find and book a place",
    icon: User,
  },
  {
    value: "OWNER",
    label: "Owner",
    description: "List flats and rooms",
    icon: Building2,
  },
] as const;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate, isPending } = useRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "TENANT",
    },
  });

  const onSubmit = ({ phone, ...rest }: RegisterFormValues) =>
    mutate(
      { ...rest, phone: phone?.trim() || undefined },
      {
        onSuccess: () => {
          toast.success("Account created. Please log in.");
          router.push("/login");
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
      <fieldset className="space-y-2">
        <legend className="text-sm leading-none font-medium">
          I want to join as
        </legend>
        <div className="grid grid-cols-2 gap-2 pt-2">
          {ROLE_OPTIONS.map((option) => (
            <label key={option.value} className="cursor-pointer">
              <input
                type="radio"
                value={option.value}
                className="peer sr-only"
                {...register("role")}
              />
              <div className="flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-colors hover:bg-accent peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:[&_svg]:text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                <option.icon className="size-5 text-muted-foreground" />
                <span className="text-sm font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">
                  {option.description}
                </span>
              </div>
            </label>
          ))}
        </div>
        {errors.role && (
          <p role="alert" className="text-sm text-destructive">
            {errors.role.message}
          </p>
        )}
      </fieldset>

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

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p role="alert" className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            className="pr-10"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 h-full"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p role="alert" className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending && <Loader2 className="size-4 animate-spin" />}
        Create account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}