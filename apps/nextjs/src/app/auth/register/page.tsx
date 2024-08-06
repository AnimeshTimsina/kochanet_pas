"use server";

import { redirectToAssessmentsIfLoggedIn } from "~/actions";
import RegisterForm from "./form";

const Register = async () => {
  await redirectToAssessmentsIfLoggedIn();
  return <RegisterForm />;
};

export default Register;
