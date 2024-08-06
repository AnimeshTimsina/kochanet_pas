"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";
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

import { api } from "~/trpc/react";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  imageURL: z.string().url().optional(),
});
type IFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const form = useForm<IFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const { mutate, isPending } = api.auth.registerUser.useMutation({
    onSuccess: () => {
      toast.success("Registered successully");
      router.replace("/auth/signin");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to register");
    },
  });

  function onSubmit(data: IFormValues) {
    mutate({
      email: data.email,
      name: data.name,
      password: data.password,
      image: data.imageURL,
    });
  }
  return (
    <main className="container flex h-screen items-center justify-center px-4 py-4">
      <div className="flex w-screen max-w-sm flex-col items-center justify-center gap-6 rounded-sm border border-border px-6 py-10">
        <SectionTitle>
          Register <span className="text-primary">User</span>
        </SectionTitle>
        <Separator />
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input placeholder={"Enter name"} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="imageURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder={`https://`} {...field} />
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
                  Icon={<ArrowLeftIcon className="mr-1" size={18} />}
                  title={"Go back"}
                  onClick={() => {
                    router.back();
                  }}
                />
                <CustomButton
                  type="submit"
                  className="flex-1"
                  size={"lg"}
                  isLoading={isPending}
                  Icon={<CheckIcon className="mr-1" size={18} />}
                  title={"Register"}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
