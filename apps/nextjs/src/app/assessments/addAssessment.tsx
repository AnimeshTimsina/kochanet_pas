"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Autocomplete from "@kochanet_pas/ui/autocomplete";
import { Button } from "@kochanet_pas/ui/button";
import CustomButton from "@kochanet_pas/ui/custom-button";
import usePopup from "@kochanet_pas/ui/customPopup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@kochanet_pas/ui/form";
import { Input } from "@kochanet_pas/ui/input";
import { toast } from "@kochanet_pas/ui/toast";

import { api } from "~/trpc/react";

const AddEdit: React.FC = () => {
  const { closePopup } = usePopup();
  const router = useRouter();

  const { data: allTypes, isLoading: typesLoading } =
    api.assessmentType.all.useQuery();
  const { mutate, isPending } = api.assessment.createAssessment.useMutation({
    onSuccess: async (newRes) => {
      toast.success("Added successfully");
      router.refresh();
      router.push(`/assessments/${newRes.id}`);
      closePopup();
    },
    onError: (err) => {
      const errorMessage = err.message || "Failed to add";
      toast.error(errorMessage);
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

  function onSubmit(data: IFormValues) {
    mutate({
      applicableMeasureId: data.applicableMeasureId,
      newPatientName: data.newPatientName,
    });
  }
  const applicableMeasureOptions = allTypes
    ?.find((e) => e.id === assessmentType)
    ?.ApplicableMeasure.map((e) => ({
      name: e.name,
      value: e.id,
    }));
  const FIELD_WIDTH = "w-[670px]";

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="assessmentType"
            render={({ field }) => (
              <Autocomplete
                required
                width={FIELD_WIDTH}
                isLoading={typesLoading}
                label={"Cognitive status"}
                onChange={(v) => {
                  if (v) {
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
                  }
                }}
                placeholder="Select cognitive status"
                options={
                  allTypes?.map((e) => ({
                    name: e.name,
                    value: e.id,
                  })) ?? []
                }
                value={field.value}
              />
            )}
          />
          <FormField
            control={form.control}
            name="applicableMeasureId"
            render={({ field }) => (
              <Autocomplete
                required
                disabled={!assessmentType}
                width={FIELD_WIDTH}
                isLoading={typesLoading}
                label={"Applicable measures"}
                onChange={(v) => {
                  if (v) {
                    form.setValue("applicableMeasureId", v);
                  }
                }}
                placeholder="Select applicable measures"
                options={applicableMeasureOptions ?? []}
                value={field.value}
              />
            )}
          />
          <FormField
            control={form.control}
            name="newPatientName"
            disabled={!assessmentType || !applicableMeasureId}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient*</FormLabel>
                <FormControl>
                  <Input
                    disabled={!assessmentType || !applicableMeasureId}
                    placeholder={"Enter patient name or ID"}
                    {...field}
                    value={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <CustomButton
              type="submit"
              isLoading={isPending}
              Icon={<CheckIcon className="mr-1" size={18} />}
              title={"Save and Start"}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

const AddNewAssessment = () => {
  const { openPopup } = usePopup();

  return (
    <Button
      variant="primary"
      size="lg"
      className="mt-1 w-fit"
      onClick={() => {
        openPopup({
          content: <AddEdit />,
          size: "md",
          header: "New Assessment",
          separator: true,
        });
      }}
    >
      <PlusCircleIcon size={18} className="mr-1" />
      New Assessment
    </Button>
  );
};

export default AddNewAssessment;
