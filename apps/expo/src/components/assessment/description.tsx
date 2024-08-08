import React from "react";
import { ScrollView, View } from "react-native";

import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import useDrawer from "../ui/popup";
import { Separator } from "../ui/separator";
import { Text } from "../ui/text";

interface IProps {
  text: string;
  title: string;
  noClamp?: boolean;
}

const Description: React.FC<IProps> = ({ text, title, noClamp }) => {
  const CLAMP_THRESHOLD = 220;
  const isClamped = noClamp ? false : text.length > CLAMP_THRESHOLD;
  const { open: openPopup } = useDrawer();

  return (
    <View className="flex flex-col">
      <Text className={cn("text-md text-center text-muted-foreground")}>
        {isClamped ? text.slice(0, CLAMP_THRESHOLD) + "..." : text}
      </Text>
      {isClamped ? (
        <Button
          variant={"link"}
          size="sm"
          onPress={() => {
            openPopup({
              component: (
                <ScrollView className="mt-3">
                  <View className="flex flex-col gap-4">
                    <View className="flex flex-col gap-4">
                      <Text className="text-xl">{title}</Text>
                      <Separator />
                    </View>
                    <Text>{text}</Text>
                  </View>
                </ScrollView>
              ),
              config: {
                height: 500,
              },
            });
          }}
        >
          <Text className="text-primary">See more</Text>
        </Button>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Description;
