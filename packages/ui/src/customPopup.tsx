"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Separator } from "./separator";

interface IDialogProps {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  header?: string;
  description?: string;
  content: React.ReactNode;
  separator?: boolean;
}

const useDialogProvider = () => {
  const [open, setOpen] = useState<IDialogProps | null>(null);
  const isOpened = !!open;
  const closePopup = () => {
    setOpen(null);
  };
  const openPopup = (props: IDialogProps) => {
    setOpen(props);
  };

  return {
    isOpened,
    openPopup,
    closePopup,
    config: open,
  };
};

const DialogContext = React.createContext<ReturnType<
  typeof useDialogProvider
> | null>(null);

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useDialogProvider();
  const { isOpened, config, closePopup } = value;
  const getSizeClass = () => {
    switch (config?.size) {
      case "xs":
        return "max-w-[450px]";
      case "sm":
        return "max-w-[600px]";
      case "md":
        return "max-w-[750px]";
      case "lg":
        return "max-w-[850px]";
      case "xl":
        return "max-w-[950px]";
      case "2xl":
        return "max-w-[1200px]";
      default:
        return "";
    }
  };
  return (
    <>
      <DialogContext.Provider value={value}>
        <Dialog open={isOpened} onOpenChange={() => closePopup()}>
          <DialogContent className={`${getSizeClass()} overflow-hidden`}>
            {config?.header ? (
              <>
                <DialogHeader>
                  <DialogTitle
                    style={{
                      lineHeight: 1.5,
                    }}
                  >
                    {config.header}
                  </DialogTitle>
                  {config.description ? (
                    <DialogDescription>{config.description}</DialogDescription>
                  ) : (
                    <></>
                  )}
                </DialogHeader>
                {config.separator ? <Separator /> : <></>}
              </>
            ) : (
              <></>
            )}
            <div
              className="grid gap-4 overflow-y-auto py-4 pl-1"
              style={{
                maxHeight: "calc(82vh)",
              }}
            >
              {config?.content}
            </div>
          </DialogContent>
        </Dialog>
        {children}
      </DialogContext.Provider>
    </>
  );
};

const usePopup = () => {
  const context = React.useContext(DialogContext)!;
  return context;
};

export default usePopup;
