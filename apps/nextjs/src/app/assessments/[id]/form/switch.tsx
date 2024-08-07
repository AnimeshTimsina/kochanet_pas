import React, { useState } from "react";
import Image from "next/image";

import { Card } from "@kochanet_pas/ui/card";
import { ImageViewer } from "@kochanet_pas/ui/image-view";
import { Switch } from "@kochanet_pas/ui/switch";

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
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-1 flex-row items-center gap-3">
          {props.image ? (
            <div
              // variant={"outline"}
              className="relative h-10 w-10 cursor-pointer rounded-full border border-border px-2 py-2 transition hover:scale-110"
              // type="button"
              onClick={() => {
                setIsViewerOpen(true);
              }}
            >
              <Image
                alt={`image-${props.title}`}
                // style={{
                //   objectFit:""
                // }}
                layout="fill"
                objectFit="fill"
                src={props.image}
                className="rounded-full"
              />
            </div>
          ) : (
            <></>
          )}
          <div className="text-lg font-medium">{props.title}</div>
        </div>
        <div>
          <Switch
            checked={props.selected}
            onCheckedChange={() => {
              props.onSelect();
            }}
          />
        </div>
      </div>
      {isViewerOpen && props.image && (
        <ImageViewer
          src={[props.image]}
          currentIndex={0}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={() => {
            setIsViewerOpen(false);
          }}
        />
      )}
    </Card>
  );
};

export default ToggleSwitch;
