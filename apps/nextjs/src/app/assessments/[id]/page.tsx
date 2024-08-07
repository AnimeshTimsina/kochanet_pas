import React from "react";

import { Card } from "@kochanet_pas/ui/card";

import NoDataAlert from "~/app/_components/noDataAlert";
import { api } from "~/trpc/server";
import Crumb from "./crumb";
import ConductAssessmentForm from "./form";

const AssessmentDetailPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  try {
    const assessment = await api.assessment.byId({ id: params.id });
    return (
      <div className="flex w-full flex-col gap-10">
        <Crumb title={assessment.patient.name} />
        <div className="flex w-full flex-row justify-center">
          <Card className="flex min-h-[70vh] w-full min-w-[28rem] flex-col items-center gap-6 px-6 py-6 md:max-w-[40rem]">
            <h1 className="block text-center text-lg font-medium">
              Assessment
            </h1>
            <div className="w-full flex-1">
              <ConductAssessmentForm data={assessment} />
            </div>
          </Card>
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    return <NoDataAlert title="Not found" desc="Assessment doesn't exist" />;
  }
};

export default AssessmentDetailPage;
