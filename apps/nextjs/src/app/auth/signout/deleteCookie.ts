"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_SESSION_KEY_NAME, EXPO_COOKIE_NAME } from "@kochanet_pas/const";

export const deleteCookie = (redirectURL: string) => {
  cookies().delete(AUTH_SESSION_KEY_NAME);
  cookies().delete(EXPO_COOKIE_NAME);
  console.log("Cookies deleted...");
  redirect(redirectURL);
};
