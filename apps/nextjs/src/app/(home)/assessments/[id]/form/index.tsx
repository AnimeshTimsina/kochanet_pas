"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, CheckIcon, ChevronLeftIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import type { RouterOutputs } from "@kochanet_pas/api";
import { cn } from "@kochanet_pas/ui";
import { Button } from "@kochanet_pas/ui/button";
import { Card } from "@kochanet_pas/ui/card";
import { Separator } from "@kochanet_pas/ui/separator";
import Spinner from "@kochanet_pas/ui/spinner";
import { toast } from "@kochanet_pas/ui/toast";

import NoDataAlert from "~/app/_components/noDataAlert";
import { api } from "~/trpc/react";
import Description from "./description";
import Indicator from "./indicator";
import SelectBox from "./selectBox";
import StatsGraph from "./statsGraph";
import ToggleSwitch from "./switch";

interface IProps {
  data: RouterOutputs["assessment"]["byId"];
}
interface IForm {
  answers: Record<string, string[]>;
  pageNumber: number;
}

const ConductAssessmentForm: React.FC<IProps> = ({ data }) => {
  const form = useForm<IForm>({
    defaultValues: {
      answers: data.applicableMeasure.Question.reduce(
        (acc, q) => {
          acc[q.id] = data.answers
            .filter((a) => a.questionId === q.id)
            .map((ans) => ans.optionId);
          return acc;
        },
        {} as Record<string, string[]>,
      ),
      pageNumber: 1,
    },
  });
  const [showAll, setShowAll] = useState(false);
  const MAX_RESULTS = 5;
  const router = useRouter();
  const value = form.watch();
  const questions = data.applicableMeasure.Question;
  const firstPage = value.pageNumber === 1;
  const lastPage = value.pageNumber === questions.length + 1;
  const secondLastPage = value.pageNumber === questions.length;
  const activeQuestion = questions[value.pageNumber - 1];

  const isCorrect = (questionId: string) => {
    const question = data.applicableMeasure.Question.find(
      (q) => q.id === questionId,
    );
    if (question?.questionType === "READ_ONLY") return true;
    const myAnswers = value.answers[questionId] ?? [];
    const correctAnswers =
      question?.QuestionOption.filter((o) => o.isCorrect).map((o) => o.id) ??
      [];
    return (
      myAnswers.length === correctAnswers.length &&
      myAnswers.every((a) => correctAnswers.includes(a))
    );
  };
  const numberOfCorrectAnswers = data.applicableMeasure.Question.filter((q) =>
    isCorrect(q.id),
  ).length;

  const { mutate: saveAnswers, isPending } =
    api.assessment.saveAnswers.useMutation({
      onSuccess: () => {
        toast.success("Answers saved successfully");
        router.replace("/assessments");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const submit = () => {
    saveAnswers({
      assessmentId: data.id,
      answers: Object.entries(value.answers)
        .map(([questionId, optionIds]) =>
          optionIds.map((optionId) => ({
            questionId,
            questionOptionId: optionId,
          })),
        )
        .flat(),
    });
  };

  if (!questions.length) {
    return (
      <NoDataAlert
        title="No questions"
        desc="No questions created for this applicable measure."
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-12">
      <Indicator
        pages={data.applicableMeasure.Question.length + 1}
        activePage={value.pageNumber}
      />
      <div className="flex w-full flex-1 justify-center">
        {!activeQuestion ? (
          <div className="flex h-full w-full flex-col items-center gap-4">
            <h1 className="block text-center text-2xl font-bold">
              Confirm the results
            </h1>
            <Card className="w-[70%] flex-1 px-4 py-4">
              <StatsGraph
                total={data.applicableMeasure.Question.length}
                correct={numberOfCorrectAnswers}
              />
              <Separator className="my-4" />
              <div className="flex flex-col gap-4">
                {data.applicableMeasure.Question.slice(
                  0,
                  showAll
                    ? data.applicableMeasure.Question.length
                    : MAX_RESULTS,
                ).map((q, idx) => {
                  const rightAnswer = isCorrect(q.id);
                  return (
                    <div
                      className="flex flex-row items-center justify-between gap-2"
                      key={q.id}
                    >
                      <h4 className="text-md">Question {idx + 1}</h4>
                      <h4
                        className={cn(
                          "text-md text-right font-medium",
                          rightAnswer
                            ? "text-green-600 dark:text-green-400"
                            : "text-destructive dark:text-red-700",
                        )}
                      >
                        {rightAnswer ? "Correct" : "Incorrect"}
                      </h4>
                    </div>
                  );
                })}

                {data.applicableMeasure.Question.length > MAX_RESULTS ? (
                  <Button
                    variant={"link"}
                    size="md"
                    className="self-start pl-0 pr-0 font-medium"
                    onClick={() => {
                      setShowAll(!showAll);
                    }}
                  >
                    {showAll ? "Show less" : "Show all"}
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <h1 className="block text-center text-2xl font-bold">
              {activeQuestion.title}
            </h1>
            {activeQuestion.description ? (
              <Description
                text={activeQuestion.description}
                title={activeQuestion.title}
                noClamp={activeQuestion.questionType === "READ_ONLY"}
              />
            ) : (
              <></>
            )}
            <div className="mt-6 flex w-full flex-col gap-4">
              {activeQuestion.QuestionOption.map((option) =>
                activeQuestion.questionType === "MULTI_SELECT" ||
                activeQuestion.questionType === "SINGLE_SELECT" ? (
                  <SelectBox
                    key={option.id}
                    selected={
                      !!value.answers[activeQuestion.id]?.includes(option.id)
                    }
                    title={option.title}
                    withCheckbox={
                      activeQuestion.questionType === "MULTI_SELECT"
                    }
                    onSelect={() => {
                      if (activeQuestion.questionType === "SINGLE_SELECT") {
                        form.setValue("answers", {
                          ...value.answers,
                          [activeQuestion.id]: [option.id],
                        });
                      } else {
                        const answers = value.answers[activeQuestion.id] ?? [];
                        if (answers.includes(option.id)) {
                          form.setValue("answers", {
                            ...value.answers,
                            [activeQuestion.id]: answers.filter(
                              (a) => a !== option.id,
                            ),
                          });
                        } else {
                          form.setValue("answers", {
                            ...value.answers,
                            [activeQuestion.id]: [...answers, option.id],
                          });
                        }
                      }
                    }}
                  />
                ) : activeQuestion.questionType === "SWITCH" ? (
                  <ToggleSwitch
                    key={option.id}
                    selected={
                      !!value.answers[activeQuestion.id]?.includes(option.id)
                    }
                    title={option.title}
                    image={option.pictureURL}
                    onSelect={() => {
                      const answers = value.answers[activeQuestion.id] ?? [];
                      if (answers.includes(option.id)) {
                        form.setValue("answers", {
                          ...value.answers,
                          [activeQuestion.id]: answers.filter(
                            (a) => a !== option.id,
                          ),
                        });
                      } else {
                        form.setValue("answers", {
                          ...value.answers,
                          [activeQuestion.id]: [...answers, option.id],
                        });
                      }
                    }}
                  />
                ) : (
                  <></>
                ),
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full flex-row items-center gap-2">
        {!firstPage ? (
          <Button
            variant={"outline"}
            size="lg"
            onClick={() => {
              form.setValue("pageNumber", value.pageNumber - 1);
            }}
          >
            <ChevronLeftIcon />
          </Button>
        ) : (
          <></>
        )}
        <Button
          className="flex-1"
          variant={"primary"}
          size={"lg"}
          onClick={() => {
            if (lastPage) {
              submit();
            } else {
              form.setValue("pageNumber", value.pageNumber + 1);
            }
          }}
        >
          {isPending ? (
            <Spinner className="mr-2 animate-spin" />
          ) : lastPage ? (
            <CheckIcon size={18} className="mr-2" />
          ) : (
            <></>
          )}
          {lastPage ? "Save" : secondLastPage ? "Finish" : "Continue"}
          {!lastPage ? <ArrowRightIcon size={18} className="ml-2" /> : <></>}
        </Button>
      </div>
    </div>
  );
};

export default ConductAssessmentForm;
