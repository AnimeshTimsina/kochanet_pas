import * as React from "react";
import { Text as RNText } from "react-native";

import type {
  SlottableTextProps,
  TextRef,
} from "~/components/primitives/types";
import * as Slot from "~/components/primitives/slot";
import { cn } from "~/lib/utils";

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "web:select-text font-fmedium text-base",
          textClass,
          className,
          className?.includes("text-primary") ||
            className?.includes("text-muted-foreground")
            ? ""
            : "text-foreground dark:text-white",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, TextClassContext };
