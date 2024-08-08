/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CheckIcon, PlusCircleIcon } from "~/components/icons";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useDrawer from "../ui/popup";
import Select from "../ui/select";
import { Separator } from "../ui/separator";
import Spinner from "../ui/spinner";
import { Text } from "../ui/text";

const AddAssessment = () => {
  const { close: closePopup } = useDrawer();
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { data: allTypes, isLoading: typesLoading } =
    api.assessmentType.all.useQuery();
  const { mutate, isPending } = api.assessment.createAssessment.useMutation({
    onSuccess: async (newRes) => {
      Toast.show({
        type: "success",
        text1: "Addedd successfully",
      });
      await apiUtils.assessment.all.invalidate();
      router.push(`/home/${newRes.id}` as any);
      closePopup();
    },
    onError: (err) => {
      const errorMessage = err.message || "Failed to add";
      console.error(errorMessage);
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
    },
  });

  const schema = z.object({
    assessmentType: z.string(),
    applicableMeasureId: z.string(),
    newPatientName: z.string(),
    // assessmentDate: z.date(),
  });
  type IFormValues = z.infer<typeof schema>;
  const form = useForm<IFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const assessmentType = form.watch("assessmentType");
  const applicableMeasureId = form.watch("applicableMeasureId");
  const newPatientName = form.watch("newPatientName");

  function onSubmit(data: IFormValues) {
    mutate({
      applicableMeasureId: data.applicableMeasureId,
      newPatientName: data.newPatientName,
    });
  }
  const applicableMeasureOptions = allTypes?.find(
    (e) => e.id === assessmentType,
  )?.ApplicableMeasure;

  const disabled = !assessmentType || !applicableMeasureId || !newPatientName;

  return (
    <>
      <View className="mt-2 flex flex-col gap-7">
        <View className="flex flex-col gap-4">
          <Text className="text-xl">Add new Assessment</Text>
          <Separator />
        </View>
        {typesLoading ? (
          <View className="flex w-full flex-col items-center gap-2">
            <Spinner />
            <Text>Please wait...</Text>
          </View>
        ) : (
          <>
            <Select
              header="Select cognitive status"
              label="Cognitive status*"
              options={allTypes ?? []}
              value={assessmentType}
              onSelect={(v) => {
                form.setValue("assessmentType", v);
                const selectedType = allTypes?.find((e) => e.id === v);
                if (applicableMeasureId) {
                  const allowed = !!selectedType?.ApplicableMeasure.find(
                    (e) => e.id === applicableMeasureId,
                  );
                  if (!allowed) {
                    form.resetField("applicableMeasureId");
                  }
                }
              }}
              placeholder="Select cognitive status"
            />

            <Select
              header="Select applicable measure"
              label="Applicable measure*"
              options={applicableMeasureOptions ?? []}
              value={applicableMeasureId}
              onSelect={(v) => {
                form.setValue("applicableMeasureId", v);
              }}
              placeholder="Select applicable measure"
              disabled={!assessmentType}
            />
            <View className="flex flex-col gap-3">
              <Text>Patient*</Text>
              <Input
                placeholder={"Enter patient name or ID"}
                value={newPatientName}
                onChangeText={(v) => form.setValue("newPatientName", v)}
                editable={!!assessmentType && !!applicableMeasureId}
                returnKeyLabel="done"
              />
            </View>
            <View className="flex justify-end">
              <Button
                variant={"black"}
                size="default"
                disabled={disabled || isPending}
                onPress={() => {
                  void form.handleSubmit(onSubmit)();
                }}
              >
                <View className="flex flex-row items-center gap-2">
                  {isPending ? (
                    <Spinner />
                  ) : (
                    <CheckIcon color={"#ffffff"} size={20} />
                  )}
                  <Text className="-mt-0.5">Save and Start</Text>
                </View>
              </Button>
            </View>
          </>
        )}
      </View>
    </>
  );
};

const AddNewAssessment = () => {
  const { open } = useDrawer();

  return (
    <Button
      variant={"black"}
      size="default"
      onPress={() => {
        open({
          component: <AddAssessment />,
          config: {
            height: 500,
          },
        });
      }}
    >
      <View className="flex flex-row items-center gap-2">
        <PlusCircleIcon color={"#ffffff"} size={20} />
        <Text className="-mt-0.5">New Assessment</Text>
      </View>
    </Button>
  );
};

export default AddNewAssessment;
