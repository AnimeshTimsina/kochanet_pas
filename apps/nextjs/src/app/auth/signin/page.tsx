"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@kochanet_pas/auth";
import { EXPO_COOKIE_NAME } from "@kochanet_pas/const";

import { redirectToAssessmentsIfLoggedIn } from "~/actions";
import SignInForm from "./form";

const SignIn = async () => {
  const expoRedirectURL =
    cookies().get(EXPO_COOKIE_NAME)?.value ??
    cookies().get(`__Secure-${EXPO_COOKIE_NAME}`)?.value;

  if (expoRedirectURL) {
    const session = await auth();
    if (session) {
      redirect(`/?expoURL=${encodeURIComponent(expoRedirectURL)}`);
    }
  } else {
    await redirectToAssessmentsIfLoggedIn();
  }

  return (
    <div>
      <SignInForm />;
    </div>
  );
};

export default SignIn;
