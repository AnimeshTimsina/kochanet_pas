import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalSearchParams, useRouter } from "expo-router";

import AssessmentForm from "~/components/assessment/form";
import { ChevronLeftIcon, FrownIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import Spinner from "~/components/ui/spinner";
import { Text } from "~/components/ui/text";
import { COLORS, ICON_SIZE_SM } from "~/lib/constants";
import { api } from "~/utils/api";

const AssessmentDetail = () => {
  const { id } = useGlobalSearchParams();
  const router = useRouter();
  const { data, isLoading } = api.assessment.byId.useQuery(
    { id: id as string },
    { enabled: !!id && typeof id === "string" },
  );
  if (!id || typeof id !== "string") return <></>;
  return (
    <SafeAreaView>
      <View className="flex flex-col gap-4">
        <View className="flex w-full flex-row justify-start">
          <Button
            variant="ghost"
            size="sm"
            onPress={() => {
              router.back();
            }}
          >
            <ChevronLeftIcon
              className="text-primary transition-all"
              size={ICON_SIZE_SM}
              color={COLORS.PRIMARY}
            />
            <Text className="text-xl text-primary">Home</Text>
          </Button>
        </View>
        <View className="flex flex-col items-center gap-4 px-2">
          <Text className="text-xl">Assessment</Text>
          {isLoading ? (
            <View>
              <Spinner size={40} />
            </View>
          ) : !data?.applicableMeasure.Question.length ? (
            <View className="mt-10 flex flex-col items-center gap-2">
              <FrownIcon size={28} color={COLORS.PRIMARY} />
              <Text className="text-lg">No questions </Text>
            </View>
          ) : (
            <View>
              <AssessmentForm data={data} />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AssessmentDetail;
