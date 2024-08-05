"use client";

import React, { useEffect } from "react";

import { deleteCookie } from "./deleteCookie";

const SignoutContainer: React.FC<{ redirectURL?: string }> = ({
  redirectURL,
}) => {
  //   const searchParams = useSearchParams();
  //   const redirectURL = searchParams.get("expoRedirect");
  //   console.log("Redirect URL", redirectURL);
  useEffect(() => {
    if (redirectURL) {
      deleteCookie(redirectURL);
    }
  }, [redirectURL]);
  return <div>Signing out...{redirectURL ? "URL" : "NO URL"}</div>;
};

export default SignoutContainer;
