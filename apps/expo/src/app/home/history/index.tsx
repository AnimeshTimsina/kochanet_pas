import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "~/components/ui/text";

const History = () => {
  return (
    <SafeAreaView>
      <View className="flex h-full w-screen px-3">
        <Text>History</Text>
      </View>
    </SafeAreaView>
  );
};

export default History;
