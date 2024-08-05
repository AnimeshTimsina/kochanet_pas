"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_SESSION_KEY_NAME, EXPO_COOKIE_NAME } from "@kochanet_pas/const";

export const deleteCookie = (redirectURL: string) => {
  cookies().delete(AUTH_SESSION_KEY_NAME);
  cookies().delete(`__Secure-${AUTH_SESSION_KEY_NAME}`);
  cookies().delete(EXPO_COOKIE_NAME);
  cookies().delete(`__Secure-${EXPO_COOKIE_NAME}`);
  redirect(redirectURL);
};
