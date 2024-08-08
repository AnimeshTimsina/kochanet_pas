import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { handlers, isSecureContext } from "@kochanet_pas/auth";
import { EXPO_COOKIE_NAME } from "@kochanet_pas/const";

// export const runtime = "edge";

/**
 * Noop in production.
 *
 * In development, rewrite the request URL to use localhost instead of host IP address
 * so that Expo Auth works without getting trapped by Next.js CSRF protection.
 * @param req The request to modify
 * @returns The modified request.
 */
function rewriteRequestUrlInDevelopment(req: NextRequest) {
  if (isSecureContext) return req;

  const host = req.headers.get("host");
  const newURL = new URL(req.url);
  newURL.host = host ?? req.nextUrl.host;
  return new NextRequest(newURL, req);
}

export const POST = (_req: NextRequest) => {
  return handlers.POST(_req);
};

export const GET = async (
  _req: NextRequest,
  props: { params: { nextauth: string[] } },
) => {
  // First step must be to correct the request URL.
  const req = rewriteRequestUrlInDevelopment(_req);

  const nextauthAction = props.params.nextauth[0];
  const isExpoSignIn = req.nextUrl.searchParams.get("expo-redirect");

  if (nextauthAction === "signin" && !!isExpoSignIn) {
    cookies().set({
      name: EXPO_COOKIE_NAME,
      value: isExpoSignIn,
      maxAge: 60 * 10, // 10 min
      path: "/",
    });
  }

  return handlers.GET(req);
};
