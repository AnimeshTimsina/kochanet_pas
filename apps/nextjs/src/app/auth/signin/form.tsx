"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, HomeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CustomButton from "@kochanet_pas/ui/custom-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@kochanet_pas/ui/form";
import { Input } from "@kochanet_pas/ui/input";
import SectionTitle from "@kochanet_pas/ui/sectionTitle";
import { Separator } from "@kochanet_pas/ui/separator";
import { toast } from "@kochanet_pas/ui/toast";

import { signInSubmit } from "./submit";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type IFormValues = z.infer<typeof signinSchema>;

const SigninForm = () => {
  const form = useForm<IFormValues>({
    resolver: zodResolver(signinSchema),
    mode: "onChange",
  });
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function onSubmit(data: IFormValues) {
    setIsPending(true);
    const msg = await signInSubmit(data.email, data.password, "/");
    setIsPending(false);

    if (!msg.success) {
      toast.error(msg.message);
    } else {
      console.log("Success");
    }
  }
  return (
    <main className="container flex h-screen items-center justify-center px-4 py-4">
      <div className="flex w-screen max-w-sm flex-col items-center justify-center gap-6 rounded-sm border border-border px-6 py-10">
        <SectionTitle>
          Sign in to <span className="text-primary">PAS</span>
        </SectionTitle>
        <Separator />
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder={`name@example.com`}
                        {...field}
                        autoCapitalize="none"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        required
                        placeholder={`Enter password`}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  type="submit"
                  className="flex-1"
                  size={"lg"}
                  isLoading={isPending}
                  Icon={<CheckIcon className="mr-1" size={18} />}
                  title={"Sign in"}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default SigninForm;
