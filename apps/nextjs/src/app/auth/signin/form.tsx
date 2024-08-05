"use client";

import React, { useState } from "react";

import { Button } from "@kochanet_pas/ui/button";
import { Input } from "@kochanet_pas/ui/input";

import { signInSubmit } from "./submit";

// import { signIn } from "@kochanet_pas/auth";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const msg = await signInSubmit(email, password, "/");

    if (!msg.success) {
      alert(msg.message);
    } else {
      console.log("Success");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-[500px] flex-col gap-2 px-4 py-4">
        <h1 className="block">Sign In</h1>
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit">Sign In</Button>
          {/* <button className="" type="submit">Sign In</button> */}
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
