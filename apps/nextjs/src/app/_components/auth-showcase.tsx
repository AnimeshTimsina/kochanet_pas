import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "@kochanet_pas/auth";
import { Button } from "@kochanet_pas/ui/button";

export async function AuthShowcase() {
  const session = await auth();

  if (!session) {
    return (
      <form>
        <div className="flex flex-row items-center gap-4">
          <Button
            size="lg"
            formAction={async () => {
              "use server";
              await signIn("discord");
            }}
          >
            Sign in with Discord
          </Button>
          <Button
            size="lg"
            // eslint-disable-next-line @typescript-eslint/require-await
            formAction={async () => {
              "use server";
              redirect("/auth/signin");
            }}
          >
            Sign in with Credentials
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {session.user.name}</span>
      </p>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signOut();
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
