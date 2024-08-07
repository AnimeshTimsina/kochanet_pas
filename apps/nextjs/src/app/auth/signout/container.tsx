"use client";

import React, { useEffect } from "react";

import Spinner from "@kochanet_pas/ui/spinner";

import { deleteCookie } from "./deleteCookie";

const SignoutContainer: React.FC<{ redirectURL?: string }> = ({
  redirectURL,
}) => {
  useEffect(() => {
    if (redirectURL) {
      deleteCookie(redirectURL);
    }
  }, [redirectURL]);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Spinner className="h-10 w-10 animate-spin text-primary" />

      <h1 className="text-center text-2xl font-bold">Signing out</h1>
      <p className="text-sm">
        You will be redirected back to app. Please wait..
      </p>
    </div>
  );
};

export default SignoutContainer;
