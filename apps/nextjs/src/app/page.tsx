import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRightIcon, PlusIcon } from "lucide-react";

import { AUTH_SESSION_KEY_NAME } from "@kochanet_pas/const";
import { Button } from "@kochanet_pas/ui/button";
import SectionTitle from "@kochanet_pas/ui/sectionTitle";

import { HydrateClient } from "~/trpc/server";

export default function HomePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const expoURL = searchParams?.expoURL;

  const sessionCookie =
    cookies().get(`__Secure-${AUTH_SESSION_KEY_NAME}`)?.value ??
    cookies().get(AUTH_SESSION_KEY_NAME)?.value;

  if (sessionCookie) {
    if (expoURL && typeof expoURL === "string") {
      const redirectURL = new URL(expoURL);
      redirectURL.searchParams.set("session_token", sessionCookie);
      return redirect(redirectURL.toString());
    } else {
      return redirect("/assessments");
    }
  }

  return (
    <HydrateClient>
      <main className="container flex h-screen items-center justify-center py-4">
        <div className="flex flex-col items-center justify-center gap-6">
          <SectionTitle>
            Kochanet <span className="text-primary">PAS</span>
          </SectionTitle>
          <form className="flex flex-col gap-2">
            <Button
              variant={"outline"}
              size={"lg"}
              formAction={async () => {
                "use server";
                redirect("/auth/register");
              }}
            >
              <PlusIcon size={18} />
              <div className="ml-1 text-sm">Register</div>
            </Button>

            <Button
              size={"lg"}
              variant={"primary"}
              formAction={async () => {
                "use server";
                redirect("/auth/signin");
              }}
            >
              <div className="mr-1 text-sm">Sign in</div>
              <ArrowRightIcon size={18} />
            </Button>
          </form>
          {/* <AuthShowcase /> */}
          {/* <div>{sessionCookie ?? "NO COOKIE"}</div> */}

          {/* <CreatePostForm />
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
          </div> */}
        </div>
      </main>
    </HydrateClient>
  );
}
