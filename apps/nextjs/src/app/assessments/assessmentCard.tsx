import React from "react";
import { ChevronRightCircleIcon } from "lucide-react";

import type { RouterOutputs } from "@kochanet_pas/api";
import { Card } from "@kochanet_pas/ui/card";

interface IProps {
  data: RouterOutputs["assessment"]["all"][number];
}

const AssessmentsCard: React.FC<IProps> = ({ data }) => {
  return (
    <Card className="w-full cursor-pointer px-3 py-3 transition hover:scale-105">
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="flex flex-1 flex-row items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-primary">
          <h2 className="text-md block font-bold">
            {data.applicableMeasure.assessmentType.name}
          </h2>
          <div className="h-2 w-2 rounded-full bg-primary" />
          <h2 className="text-md block">{data.applicableMeasure.name}</h2>
        </div>
        {/* <Button variant={"link"} size={"icon"}> */}
        <ChevronRightCircleIcon className="bloct text-primary" />
        {/* </Button> */}
      </div>
    </Card>
  );
};

export default AssessmentsCard;
