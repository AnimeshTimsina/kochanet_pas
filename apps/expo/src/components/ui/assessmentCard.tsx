import React from "react";
import { Pressable, View } from "react-native";

import type { RouterOutputs } from "@kochanet_pas/api";

import { ChevronRightCircleIcon } from "~/components/icons";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/lib/constants";

interface IProps {
  assessment: RouterOutputs["assessment"]["all"]["assessments"][number];
}

const AssessmentCard: React.FC<IProps> = ({ assessment }) => {
  return (
    <Pressable className="w-full rounded-lg border bg-white px-3 py-3 text-card-foreground shadow-sm dark:bg-gray-900">
      <View className="flex flex-row items-center justify-between gap-3">
        <View className="flex flex-1 flex-row items-center gap-3 rounded-full bg-primary/10 px-4 py-2 dark:bg-primary/20">
          <Text className="text-md block font-bold text-primary">
            {assessment.applicableMeasure.assessmentType.name}
          </Text>
          <View className="h-2 w-2 rounded-full bg-primary" />
          <Text className="text-md block text-primary">
            {assessment.applicableMeasure.name}
          </Text>
        </View>
        <ChevronRightCircleIcon
          className="bloct text-primary"
          color={COLORS.PRIMARY}
        />
      </View>
    </Pressable>
  );
};

export default AssessmentCard;
