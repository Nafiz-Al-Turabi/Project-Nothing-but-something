import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_TOKEN_COOKIE } from "@/lib/auth/session";

const LOGIN_PATH = "/auth/login";
const HOME_PATH = "/";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type MeResponse = {
  user?: {
    type?: string;
  };
};

async function getCurrentUser(token: string) {
  if (!API_URL) {
    return null;
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as MeResponse;

  return data.user ?? null;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (pathname.startsWith("/dashboard") && user.type !== "admin") {
    return NextResponse.redirect(new URL(HOME_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
