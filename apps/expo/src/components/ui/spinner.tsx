import type { LucideIcon } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { LoaderCircleIcon } from "lucide-react-native";

import { COLORS } from "~/lib/constants";
import { cn } from "~/lib/utils";

const SpinningIcon = Animated.createAnimatedComponent(LoaderCircleIcon);

interface IProps {
  forButton?: boolean;
}

const Spinner = React.forwardRef<
  React.ElementRef<LucideIcon>,
  React.ComponentPropsWithoutRef<LucideIcon> & IProps
>(({ className, forButton, ...props }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SpinningIcon
      style={{ transform: [{ rotate: spin }] }}
      className={cn(
        "h-[1.2rem] w-[1.2rem] animate-spin text-primary transition-all",
        forButton ? "text-white" : "",
        className,
      )}
      color={COLORS.PRIMARY}
      {...props}
    />
  );
});

export default Spinner;
