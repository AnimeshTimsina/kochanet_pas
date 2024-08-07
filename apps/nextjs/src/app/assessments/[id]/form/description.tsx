"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@kochanet_pas/ui";
import { Button } from "@kochanet_pas/ui/button";
import usePopup from "@kochanet_pas/ui/customPopup";

interface IProps {
  text: string;
  title: string;
  noClamp?: boolean;
}

const Description: React.FC<IProps> = ({ text, title, noClamp }) => {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [isClamped, setIsClamped] = useState(false);
  const { openPopup } = usePopup();
  useEffect(() => {
    if (noClamp) {
      setIsClamped(false);
      return;
    }
    const checkClamping = () => {
      const element = ref.current;
      if (element) {
        setIsClamped(element.scrollHeight > element.clientHeight);
      }
    };

    if (text) {
      checkClamping();
      window.addEventListener("resize", checkClamping);
    }

    return () => {
      window.removeEventListener("resize", checkClamping);
    };
  }, [text, noClamp]);

  return (
    <div className="flex flex-col">
      <h2
        className={cn(
          "text-md text-center text-muted-foreground",
          noClamp ? "" : "line-clamp-2",
        )}
        ref={ref}
      >
        {text}
      </h2>
      {isClamped ? (
        <Button
          variant={"link"}
          size="sm"
          onClick={() => {
            openPopup({
              content: <div>{text}</div>,
              header: title,
              separator: true,
              size: "sm",
            });
          }}
        >
          See more
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Description;
