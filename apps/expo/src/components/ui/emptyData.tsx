import React from "react";
import { View } from "react-native";

import { FrownIcon, RefreshCcwIcon } from "~/components/icons";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/lib/constants";
import { Button } from "./button";
import Spinner from "./spinner";

export const EmptyData: React.FC<{
  message: string;
  refetch?: () => void;
  refetchLoading?: boolean;
  Icon?: React.ReactNode;
}> = ({ message, refetch, refetchLoading, Icon }) => {
  return (
    <View className="flex min-h-[80px] w-full flex-1 shrink-0 items-center justify-center rounded-md border border-dashed dark:border-white">
      <View className="mx-auto flex flex-col items-center justify-center gap-4 text-center">
        {Icon ?? (
          <FrownIcon
            className="text-foreground dark:text-white"
            color={COLORS.PRIMARY}
            size={32}
          />
        )}

        <Text className="font-fregular text-center text-lg">{message}</Text>
        {refetch ? (
          <Button variant={"default"} size="sm" onPress={refetch}>
            {refetchLoading ? (
              <Spinner forButton />
            ) : (
              <RefreshCcwIcon
                color={"#ffffff"}
                className="text-white"
                size={14}
              />
            )}
            <Text>Refresh</Text>
          </Button>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};
