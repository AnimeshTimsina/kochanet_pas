"use server";

import React from "react";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@kochanet_pas/ui/button";

import { getSessionOrRedirectToHome } from "~/actions";
import { api } from "~/trpc/server";
import NoDataAlert from "../../_components/noDataAlert";
import AddNewAssessment from "./addAssessment";
import AssessmentsCard from "./assessmentCard";

const Assessments = async () => {
  await getSessionOrRedirectToHome();
  const NUMBER_OF_ASSESSMENTS = 3;
  const { assessments: data, count } = await api.assessment.all({
    take: NUMBER_OF_ASSESSMENTS,
  });

  return (
    <div className="flex max-w-md flex-col gap-2 px-4 py-4">
      <div className="flex flex-row items-center justify-between gap-2">
        <h2 className="block text-lg font-semibold">Recent Assessments</h2>
        {count > NUMBER_OF_ASSESSMENTS ? (
          <Button variant={"link"} size="sm" className="-mb-1">
            <span className="block">See more</span>
            <ArrowRightIcon size={16} />
          </Button>
        ) : (
          <></>
        )}
      </div>
      {!data.length ? (
        <div className="">
          <NoDataAlert
            title="No assessments"
            desc="You haven't performed any assessments"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((assessment) => (
            <AssessmentsCard key={assessment.id} data={assessment} />
          ))}
        </div>
      )}
      <AddNewAssessment />
    </div>
  );
};

export default Assessments;
