"use server";

import type { AuthError } from "@auth/core/errors";
import { isRedirectError } from "next/dist/client/components/redirect";

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
  } catch (error) {
    const toReturn = { success: false, message: "" };
    console.error("ER", error);
    // console.error("Auth error", err);
    // return { success: false, message: "Invalid credentials" };
    if (error instanceof Error) {
      if (isRedirectError(error)) throw error;
      const { type, cause } = error as AuthError;
      switch (type) {
        // case "CredentialsSignin":
        //   toReturn.message = "Invalid credentials.";
        //   break;
        // // return "Invalid credentials.";
        case "CallbackRouteError":
          toReturn.message = cause?.err?.toString() ?? "";
          break;

        // return cause?.err?.toString();
        default:
          toReturn.message = "Something went wrong.";
        // return "Something went wrong.";
      }
      // throw error;
      return toReturn;
    }

    throw error;
  }
}
