import React from "react";
import { cookies } from "next/headers";

import { EXPO_COOKIE_NAME } from "@kochanet_pas/const";

import SignoutContainer from "./container";

const Signout = () => {
  const expoURL = cookies().get(EXPO_COOKIE_NAME)?.value;

  return <SignoutContainer redirectURL={expoURL} />;
};

export default Signout;
