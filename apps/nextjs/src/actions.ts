"use server";

import { redirect } from "next/navigation";

import { auth, signOut } from "@kochanet_pas/auth";

export async function redirectToAssessmentsIfLoggedIn() {
  const session = await auth();
  if (session) {
    redirect("/assessments");
  }
}

export async function getSessionOrRedirectToHome() {
  const session = await auth();
  if (!session) {
    redirect("/");
  } else {
    return session;
  }
}

export async function logout() {
  await signOut();
}
