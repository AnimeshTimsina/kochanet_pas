"use client";

import React, { useState } from "react";

import { signInSubmit } from "./submit";

// import { signIn } from "@kochanet_pas/auth";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await signInSubmit(email, password);
    if (!res.success) {
      alert(res.message);
    } else {
      console.log("Successfully logged in");
    }
    // "use server";
    // await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: true,
    //   redirectTo: "/",
    // });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
