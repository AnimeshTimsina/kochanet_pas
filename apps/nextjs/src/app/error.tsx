"use client";

// Error components must be Client Components
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HomeIcon, RedoIcon } from "lucide-react";

import CustomButton from "@kochanet_pas/ui/custom-button";
import SectionTitle from "@kochanet_pas/ui/sectionTitle";
import { Separator } from "@kochanet_pas/ui/separator";

import { logout } from "~/actions";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    async function handleError() {
      // Log the error to an error reporting service
      console.error("_____ERROR_______", error.message);
      if (error.message === "Unauthorized") {
        await logout();
        router.replace("/auth/signin");
      }
    }
    void handleError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <main className="container flex h-screen items-center justify-center px-4 py-4">
      <div className="flex w-screen max-w-sm flex-col items-center justify-center gap-6 rounded-sm border border-border px-6 py-10">
        <SectionTitle>
          <span className="text-destructive">Oops!</span>
        </SectionTitle>
        <Separator />
        <div className="w-full">
          <div className="flex flex-row justify-stretch gap-2">
            <CustomButton
              type="button"
              size={"lg"}
              variant={"outline"}
              className="flex-1"
              isLoading={false}
              Icon={<HomeIcon className="mr-1" size={16} />}
              title={"Go home"}
              onClick={() => {
                router.replace("/");
              }}
            />
            <CustomButton
              type="button"
              className="flex-1"
              size={"lg"}
              onClick={reset}
              isLoading={false}
              Icon={<RedoIcon className="mr-1" size={18} />}
              title={"Retry"}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
