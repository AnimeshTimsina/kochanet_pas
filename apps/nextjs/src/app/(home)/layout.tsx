"use server";

import React from "react";

import { getSessionOrRedirectToHome } from "~/actions";
import Sidebar from "../_components/sidebar";

const Wrapper = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSessionOrRedirectToHome();
  return (
    <div>
      <Sidebar user={session.user}>{children}</Sidebar>
    </div>
  );
};

export default Wrapper;
