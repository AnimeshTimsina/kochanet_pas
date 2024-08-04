"use server";

import { signIn } from "@kochanet_pas/auth";

// import {} from ""

export async function signInSubmit(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/",
    });
    return { success: true, message: null };
  } catch (err) {
    console.error("Auth error", err);
    return { success: false, message: "Invalid credentials" };
  }
}
