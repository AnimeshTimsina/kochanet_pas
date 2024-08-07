import * as React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { cn } from "~/lib/utils";

const duration = 1000;

function Skeleton({
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Animated.View>, "style">) {
  const sv = useSharedValue(1);

  React.useEffect(() => {
    sv.value = withRepeat(
      withSequence(withTiming(0.5, { duration }), withTiming(1, { duration })),
      -1,
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: sv.value,
  }));

  return (
    <Animated.View
      style={style}
      className={cn("rounded-md bg-secondary dark:bg-muted", className)}
      {...props}
    />
  );
}

interface IProps {
  variant?: 1 | 2;
}

const CustomSkeleton = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & IProps
>(({ className, ...props }, ref) => {
  const bgClass = props.variant === 1 ? "bg-white dark:bg-muted" : "";
  return (
    <View className={className} ref={ref}>
      <View className="flex flex-row items-center gap-4">
        <Skeleton className={`h-16 w-16 rounded-full ${bgClass}`} />
        <View className="w-full gap-2">
          <Skeleton className={`h-4 w-[250px] ${bgClass}`} />
          <Skeleton className={`h-4 w-[200px] ${bgClass}`} />
          <Skeleton className={`h-4 w-full ${bgClass}`} />
          <Skeleton className={`h-4 w-full ${bgClass}`} />
        </View>
      </View>
      <View className="mt-2 flex flex-col gap-2">
        <Skeleton className={`h-4 w-full ${bgClass}`} />
        <Skeleton className={`h-4 w-full ${bgClass}`} />
      </View>
    </View>
  );
});

export { CustomSkeleton, Skeleton };
