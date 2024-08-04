"use server";

import { redirect } from "next/navigation";

import { auth } from "@kochanet_pas/auth";

import SignInForm from "./form";

const SignIn = async () => {
  const session = await auth();
  console.log({ hasSession: !!session });

  if (session) {
    redirect("/");
  }

  return <SignInForm />;
};

export default SignIn;
