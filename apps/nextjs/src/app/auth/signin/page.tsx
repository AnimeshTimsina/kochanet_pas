"use server";

import { redirectToAssessmentsIfLoggedIn } from "~/actions";
import SignInForm from "./form";

const SignIn = async () => {
  await redirectToAssessmentsIfLoggedIn();

  return (
    <div>
      <SignInForm />;
    </div>
  );
};

export default SignIn;
