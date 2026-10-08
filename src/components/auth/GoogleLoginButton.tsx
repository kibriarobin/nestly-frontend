import type { SVGProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.89c2.27-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.89-3a7.4 7.4 0 0 1-11-3.89H1.06v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.05 14.2a7.2 7.2 0 0 1 0-4.6V6.51H1.06a12 12 0 0 0 0 10.98Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.06 6.51l3.99 3.1A7.15 7.15 0 0 1 12 4.75Z"
      />
    </svg>
  );
}

export default function GoogleLoginButton() {
  return (
    <a
      href="/api/v1/auth/google"
      className={cn(buttonVariants({ variant: "outline" }), "w-full gap-2")}
    >
      <GoogleIcon className="size-4" />
      Continue with Google
    </a>
  );
}