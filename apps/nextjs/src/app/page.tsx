import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_SESSION_KEY_NAME } from "@kochanet_pas/const";

import { api, HydrateClient } from "~/trpc/server";
import { AuthShowcase } from "./_components/auth-showcase";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";

// export const runtime = "edge";

export default function HomePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // You can await this here if you don't want to show Suspense fallback below
  void api.post.all.prefetch();
  const expoURL = searchParams?.expoURL;

  const sessionCookie =
    cookies().get(`__Secure-${AUTH_SESSION_KEY_NAME}`)?.value ??
    cookies().get(AUTH_SESSION_KEY_NAME)?.value;

  if (expoURL && typeof expoURL === "string") {
    if (sessionCookie) {
      const redirectURL = new URL(expoURL);
      redirectURL.searchParams.set("session_token", sessionCookie);

      return redirect(redirectURL.toString());
    }
  }

  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-primary">T3</span> Turbo
          </h1>
          <AuthShowcase />
          <div>{sessionCookie ?? "NO COOKIE"}</div>

          <CreatePostForm />
          <div className="w-full max-w-2xl overflow-y-scroll">
            <Suspense
              fallback={
                <div className="flex w-full flex-col gap-4">
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                </div>
              }
            >
              <PostList />
            </Suspense>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
