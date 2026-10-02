import { type NextRequest, NextResponse } from "next/server";
import { ROLE, ROLE_DASHBOARD, type Role } from "@/constants/roles";

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

const PROTECTED: Record<string, Role> = {
  "/admin": ROLE.ADMIN,
  "/owner": ROLE.OWNER,
  "/dashboard": ROLE.TENANT,
};

const AUTH_PAGES = ["/login", "/register"];
const ROLES = Object.values(ROLE) as Role[];

function readRole(token?: string): Role | null {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const { role, exp } = JSON.parse(json) as { role?: string; exp?: number };
    if (exp && exp * 1000 < Date.now()) return null;
    return role && ROLES.includes(role as Role) ? (role as Role) : null;
  } catch {
    return null;
  }
}

function redirectTo(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = readRole(request.cookies.get(ACCESS_TOKEN)?.value);
  const hasRefresh = request.cookies.has(REFRESH_TOKEN);

  if (AUTH_PAGES.includes(pathname)) {
    return role
      ? redirectTo(request, ROLE_DASHBOARD[role])
      : NextResponse.next();
  }

  const match = Object.entries(PROTECTED).find(
    ([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (!match) return NextResponse.next();

  if (!role) {
    return hasRefresh ? NextResponse.next() : redirectTo(request, "/login");
  }
  if (role !== match[1]) return redirectTo(request, ROLE_DASHBOARD[role]);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/owner/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
