import React from "react";
import { Pressable } from "react-native";

import { COLORS } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { CheckCircleIcon, CircleIcon } from "../icons";
import { Card } from "../ui/card";
import { Text } from "../ui/text";

interface IProps {
  selected: boolean;
  onSelect: () => void;
  title: string;
  withCheckbox: boolean;
}

const SelectBox: React.FC<IProps> = (props) => {
  const ICON_SIZE = 18;
  return (
    <Card
      className={cn("px-3 py-3", props.selected ? "border border-primary" : "")}
    >
      <Pressable
        className="flex flex-row items-center gap-3"
        onPress={() => {
          props.onSelect();
        }}
      >
        {props.withCheckbox ? (
          props.selected ? (
            <CheckCircleIcon color={COLORS.PRIMARY} size={ICON_SIZE} />
          ) : (
            <CircleIcon color={COLORS.DISABLED} size={ICON_SIZE} />
          )
        ) : (
          <></>
        )}
        <Text className="text-lg">{props.title}</Text>
      </Pressable>
    </Card>
  );
};

export default SelectBox;
