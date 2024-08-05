"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@kochanet_pas/auth";
import { AUTH_SESSION_KEY_NAME, EXPO_COOKIE_NAME } from "@kochanet_pas/const";

import SignInForm from "./form";

const SignIn = async () => {
  const session = await auth();
  console.log({ hasSession: !!session });

  if (session) {
    const sessionCookie = cookies().get(AUTH_SESSION_KEY_NAME)?.value;
    const expoURL = cookies().get(EXPO_COOKIE_NAME)?.value;
    console.log({ sessionCookie, expoURL });
    if (expoURL && sessionCookie) {
      const redirectURL = new URL(expoURL);
      redirectURL.searchParams.set("session_token", sessionCookie);
      console.log("Redirecting...", {
        redirectURL: redirectURL.toString(),
      });
      return redirect(redirectURL.toString());
    } else {
      redirect("/");
    }
  }

  return (
    <div>
      {/* <div>{expoURL}</div>
      <div>{sessionCookie}</div> */}
      <SignInForm />;
    </div>
  );
};

export default SignIn;
