"use client";

import type { VariantProps } from "class-variance-authority";
import React from "react";

import type { buttonVariants } from "./button";
import { Button } from "./button";
import Spinner from "./spinner";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  Icon?: React.ReactNode;
  title: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  isLoading,
  title,
  Icon,
  ...props
}) => {
  return (
    <Button {...props} disabled={isLoading ?? props.disabled}>
      {isLoading ? (
        <Spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : Icon ? (
        Icon
      ) : (
        <></>
      )}
      {title}
    </Button>
  );
};

export default CustomButton;
