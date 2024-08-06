"use client";

import type { Matcher } from "react-day-picker";
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import moment from "moment";

import { Button } from "@kochanet_pas/ui/button";
import { Calendar } from "@kochanet_pas/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@kochanet_pas/ui/popover";

import { cn } from ".";
import { FormItem, FormLabel, FormMessage } from "./form";

interface IProps {
  date: Date | undefined | null;
  setDate: (props: Date | null | undefined) => void;
  nullable: boolean;
  label?: string;
  disableDates?: Matcher[];
}

const dateTimeTableFormat = (d: Date, format?: string) => {
  return moment(d).format(format ?? "LLL");
};

export const DatePicker: React.FC<IProps> = (props) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // if (e.key === "Backspace" && selected.length > 0) {
      //   onChange(
      //     selected.filter((_, index) => index !== selected.length - 1),
      //   );
      // }

      // close on escape
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <FormItem className="flex flex-col">
      {props.label ? (
        <FormLabel>
          {props.label}
          {!props.nullable ? "*" : ""}
        </FormLabel>
      ) : (
        <></>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !props.date && "text-muted-foreground",
            )}
            onClick={() => setOpen(!open)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {props.date ? (
              dateTimeTableFormat(props.date, "LL")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={props.date ?? undefined}
            disabled={props.disableDates}
            onSelect={(e) => {
              if (props.nullable) {
                props.setDate(e);
              } else {
                if (e) {
                  props.setDate(e);
                }
              }
              setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};
