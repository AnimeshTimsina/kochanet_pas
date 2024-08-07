import React, { createContext, useContext, useEffect, useState } from "react";
import Snackbar from "react-native-snackbar-component";

import { COLORS } from "~/lib/constants";
import { getBackgroundTextColor } from "~/lib/utils";

interface ISnackbarInputProps {
  message: string;
  type?: "info" | "success" | "warning" | "error" | "default";
  duration?: number;
}

interface ISnackbarReturnProps {
  snackbar: (e: ISnackbarInputProps) => void;
  close: () => void;
}

const snackbarContext = createContext<ISnackbarReturnProps | null>(null);
const { Provider } = snackbarContext;

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState<ISnackbarInputProps | null>(null);

  const color = (() => {
    switch (visible?.type) {
      case "info":
        return COLORS.INFO_COLOR;
      case "success":
        return COLORS.SUCCESS_COLOR;
      case "warning":
        return COLORS.WARNING;
      case "error":
        return COLORS.DANGER_COLOR;
      default:
        return COLORS.PRIMARY;
    }
  })();

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(null);
      }, visible.duration ?? 3000);
    }
  }, [visible]);

  return (
    <Provider
      value={{
        snackbar: (e) => setVisible(e),
        close: () => setVisible(null),
      }}
    >
      {children}
      <Snackbar
        backgroundColor={color}
        visible={!!visible}
        accentColor={COLORS.PRIMARY}
        messageColor={getBackgroundTextColor(color)}
        position="bottom"
        left={1}
        right={1}
        textMessage={visible?.message}
      />
    </Provider>
  );
};

export const useSnackbar: () => ISnackbarReturnProps = () => {
  const context = useContext(snackbarContext);
  if (!context)
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  return context;
};
