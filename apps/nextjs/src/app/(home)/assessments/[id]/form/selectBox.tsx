import React from "react";
import { CheckCircleIcon, CircleIcon } from "lucide-react";

import { cn } from "@kochanet_pas/ui";
import { Card } from "@kochanet_pas/ui/card";

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
      className={cn(
        "cursor-pointer px-3 py-3 transition hover:scale-105",
        props.selected ? "ring-2 ring-primary" : "",
      )}
      onClick={props.onSelect}
    >
      <div className="flex flex-row items-center gap-3">
        {props.withCheckbox ? (
          props.selected ? (
            <CheckCircleIcon className="text-primary" size={ICON_SIZE} />
          ) : (
            <CircleIcon className="text-muted-foreground" size={ICON_SIZE} />
          )
        ) : (
          <></>
        )}
        <div className="text-lg font-medium">{props.title}</div>
      </div>
    </Card>
  );
};

export default SelectBox;
