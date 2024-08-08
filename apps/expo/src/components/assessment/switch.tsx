import React, { useState } from "react";
import { Pressable, Switch, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { Image } from "expo-image";

import { COLORS } from "~/lib/constants";
import { Card } from "../ui/card";
import { Text } from "../ui/text";

interface IProps {
  selected: boolean;
  onSelect: () => void;
  title: string;
  image?: string | null;
}

const ToggleSwitch: React.FC<IProps> = (props) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <Card
      className="px-3 py-3"
      //   onClick={props.onSelect}
    >
      <View className="flex flex-row items-center gap-3">
        <View className="flex flex-1 flex-row items-center gap-3">
          {props.image ? (
            <Pressable
              // variant={"outline"}
              // type="button"
              onPress={() => {
                setIsViewerOpen(true);
              }}
              className="rounded-full"
            >
              <View className="h-10 w-10 rounded-full border border-border">
                <Image
                  alt={`image-${props.title}`}
                  style={{
                    objectFit: "fill",
                    height: "100%",
                    width: "100%",
                    borderRadius: 100,
                  }}
                  source={props.image}
                />
              </View>
            </Pressable>
          ) : (
            <></>
          )}
          <View className="text-lg font-medium">
            <Text className="text-lg">{props.title}</Text>
          </View>
        </View>
        <View>
          <Switch
            value={props.selected}
            onValueChange={() => {
              props.onSelect();
            }}
            trackColor={{
              true: COLORS.PRIMARY,
              false: COLORS.DISABLED,
            }}
          />
        </View>
      </View>
      {props.image ? (
        <ImageView
          images={[{ uri: props.image }]}
          imageIndex={0}
          visible={isViewerOpen}
          onRequestClose={() => setIsViewerOpen(false)}
        />
      ) : (
        <></>
      )}
    </Card>
  );
};

export default ToggleSwitch;
