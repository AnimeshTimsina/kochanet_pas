import React from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@kochanet_pas/ui/alert";

const NoDataAlert: React.FC<{
  title: string;
  desc?: string;
}> = ({ title, desc }) => {
  return (
    <Alert variant={"destructive"} className="bg-destructive/5">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      {desc ? <AlertDescription>{desc}</AlertDescription> : <></>}
    </Alert>
  );
};

export default NoDataAlert;
