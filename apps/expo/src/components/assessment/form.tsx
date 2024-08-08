import React, { useState } from "react";
import { Text as NativeText, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import type { RouterOutputs } from "@kochanet_pas/api";

import { COLORS } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { ArrowRightIcon, CheckIcon, ChevronLeftIcon } from "../icons";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import Spinner from "../ui/spinner";
import { Text } from "../ui/text";
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

const AssessmentForm: React.FC<IProps> = ({ data }) => {
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
  const apiUtils = api.useUtils();

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
      onSuccess: async () => {
        await apiUtils.assessment.all.invalidate();
        await apiUtils.assessment.byId.invalidate({ id: data.id });
        Toast.show({
          type: "success",
          text1: "Assessment saved successfully",
        });
        router.navigate("/home");
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Failed to save assessment",
          text2: error.message,
        });
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

  return (
    <View className="flex w-full flex-1">
      <ScrollView className="mt-2 w-full flex-1">
        <View className="flex w-full flex-col items-center gap-12">
          <Indicator
            pages={data.applicableMeasure.Question.length + 1}
            activePage={value.pageNumber}
          />
          <View className="flex w-full flex-col">
            <View className="">
              {!activeQuestion ? (
                <Card className="flex w-[80vw] flex-col items-center gap-4 py-10">
                  <Text className="text-center text-2xl font-bold">
                    Confirm the results
                  </Text>
                  <View className="">
                    <StatsGraph
                      total={data.applicableMeasure.Question.length}
                      correct={numberOfCorrectAnswers}
                    />
                    <Separator className="my-4" />
                    <View className="flex flex-col gap-4">
                      {data.applicableMeasure.Question.slice(
                        0,
                        showAll
                          ? data.applicableMeasure.Question.length
                          : MAX_RESULTS,
                      ).map((q, idx) => {
                        const rightAnswer = isCorrect(q.id);
                        return (
                          <View
                            className="flex w-full flex-row items-center justify-between gap-8 px-4"
                            key={q.id}
                          >
                            <Text className="text-md">Question {idx + 1}</Text>
                            <NativeText
                              className={cn(
                                "text-md text-right font-medium",
                                rightAnswer
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-destructive dark:text-red-700",
                              )}
                            >
                              {rightAnswer ? "Correct" : "Incorrect"}
                            </NativeText>
                          </View>
                        );
                      })}

                      {data.applicableMeasure.Question.length > MAX_RESULTS ? (
                        <Button
                          variant={"link"}
                          size="default"
                          className="self-start pl-0 pr-0 font-medium"
                          onPress={() => {
                            setShowAll(!showAll);
                          }}
                        >
                          <Text> {showAll ? "Show less" : "Show all"}</Text>
                        </Button>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                </Card>
              ) : (
                <View className="flex flex-col items-center gap-3">
                  <Text className="block text-center text-2xl font-bold">
                    {activeQuestion.title}
                  </Text>
                  {activeQuestion.description ? (
                    <Description
                      text={activeQuestion.description}
                      title={activeQuestion.title}
                      noClamp={activeQuestion.questionType === "READ_ONLY"}
                    />
                  ) : (
                    <></>
                  )}
                  <View className="mt-6 flex w-full flex-col gap-4">
                    {activeQuestion.QuestionOption.map((option) =>
                      activeQuestion.questionType === "MULTI_SELECT" ||
                      activeQuestion.questionType === "SINGLE_SELECT" ? (
                        <SelectBox
                          key={option.id}
                          selected={
                            !!value.answers[activeQuestion.id]?.includes(
                              option.id,
                            )
                          }
                          title={option.title}
                          withCheckbox={
                            activeQuestion.questionType === "MULTI_SELECT"
                          }
                          onSelect={() => {
                            if (
                              activeQuestion.questionType === "SINGLE_SELECT"
                            ) {
                              form.setValue("answers", {
                                ...value.answers,
                                [activeQuestion.id]: [option.id],
                              });
                            } else {
                              const answers =
                                value.answers[activeQuestion.id] ?? [];
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
                            !!value.answers[activeQuestion.id]?.includes(
                              option.id,
                            )
                          }
                          title={option.title}
                          image={option.pictureURL}
                          onSelect={() => {
                            const answers =
                              value.answers[activeQuestion.id] ?? [];
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
                  </View>
                </View>
              )}
            </View>
          </View>
          <View className="flex flex-row items-center justify-center gap-2">
            {!firstPage ? (
              <Button
                variant={"black"}
                size="lg"
                onPress={() => {
                  form.setValue("pageNumber", value.pageNumber - 1);
                }}
              >
                <ChevronLeftIcon color={"#ffffff"} />
              </Button>
            ) : (
              <></>
            )}
            <Button
              className="flex-1"
              variant={"black"}
              disabled={isPending}
              size={"lg"}
              onPress={() => {
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
                <CheckIcon color={COLORS.PRIMARY} size={18} className="mr-2" />
              ) : (
                <></>
              )}
              <Text>
                {lastPage ? "Save" : secondLastPage ? "Finish" : "Continue"}
              </Text>
              {!lastPage ? (
                <ArrowRightIcon
                  color={COLORS.PRIMARY}
                  size={18}
                  className="ml-2"
                />
              ) : (
                <></>
              )}
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AssessmentForm;
