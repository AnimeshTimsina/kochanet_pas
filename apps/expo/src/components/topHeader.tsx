import React from "react";
import { View } from "react-native";
import moment from "moment";

import { getInitials } from "@kochanet_pas/utils";

import { useUser } from "~/utils/auth";
import LogoutButton from "~/utils/logout";
import { Text } from "./ui/text";

export const LeftSection = () => {
  const user = useUser();
  const initials = user?.name ? getInitials(user.name) : "-";

  return (
    <View className="flex flex-row items-center gap-2">
      <View className="flex flex-row items-center justify-center rounded-full bg-primary px-2 py-2">
        <Text className="font-fbold">{initials}</Text>
      </View>
      <View className="flex flex-col gap-1">
        <View>
          <Text className="block text-xs text-muted-foreground">
            Welcome back
          </Text>
        </View>
        <View>
          <Text className="text-md block font-bold">{user?.name}</Text>
        </View>
      </View>
    </View>
  );
};

export const RightSection = () => {
  const date = moment();
  const todaysDay = date.format("dddd");
  return (
    <View className="flex flex-col gap-1">
      <View>
        <Text className="text-right text-xs text-muted-foreground">
          {todaysDay}
        </Text>
      </View>
      <View>
        <Text className="text-md text-right font-bold">
          {date.format("DD MMMM YYYY")}
        </Text>
      </View>
    </View>
  );
};

const TopHeader = () => {
  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <LeftSection />
        <RightSection />
      </View>
      <View className="mt-2 flex w-full flex-row justify-end">
        <LogoutButton />
      </View>
    </View>
  );
};

export default TopHeader;
