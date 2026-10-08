import type { Metadata } from "next";
import { GoogleLoginButton, RegisterForm } from "@/components/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join Nestly as an owner or a tenant.",
};

export default function RegisterPage() {
  return (
    <Card className="gap-4 py-4">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>Join Nestly in less than a minute</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RegisterForm />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          OR
          <span className="h-px flex-1 bg-border" />
        </div>
        <GoogleLoginButton />
        <p className="text-center text-xs text-muted-foreground">
          Signing up with Google creates a tenant account. Owners should
          register with email and password.
        </p>
      </CardContent>
    </Card>
  );
}
