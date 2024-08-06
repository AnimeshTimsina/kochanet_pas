"use client";

import React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PlusIcon, XIcon } from "lucide-react";

import { cn } from ".";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Spinner from "./spinner";

interface IOption {
  name: string;
  value: string;
  icon?: React.ReactNode;
}

interface IProps<T extends IOption> {
  label?: string;
  value: T["value"] | null;
  options: T[];
  placeholder?: string;
  onChange: (e: T["value"] | null) => void;
  emptyMessage?: string;
  description?: React.ReactNode;
  addable?: {
    onClick: () => void;
    tooltip?: string;
  };
  searchPlaceholder?: string;
  isLoading?: boolean;
  width?: string;
  required?: boolean;
  onClear?: () => void;
  disabled?: boolean;
}

const Autocomplete = <T extends IOption>(props: IProps<T>) => {
  const [open, setOpen] = React.useState(false);

  return (
    <FormItem className="flex flex-col">
      {props.label ? (
        <div className="mb-1 flex flex-row items-end gap-2">
          <FormLabel>
            {props.label}
            {props.required ? "*" : ""}
          </FormLabel>
          {props.addable ? (
            <Button
              onClick={() => props.addable?.onClick()}
              variant={"ghost"}
              size={"sm"}
              className="-mb-2.5 text-primary"
              type="button"
            >
              <PlusIcon size={17} className="text-primary" />
            </Button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <Popover
        open={open}
        onOpenChange={(x) => {
          if (props.disabled) return;
          setOpen(x);
        }}
      >
        <PopoverTrigger asChild>
          <FormControl>
            <div className="flex flex-row items-center">
              <Button
                variant={props.disabled ? "secondary" : "outline"}
                role="combobox"
                type="button"
                disabled={props.disabled}
                aria-expanded={open}
                className={cn(
                  `${props.width ?? "w-[200px]"} justify-between`,
                  !props.value && "text-muted-foreground",
                  props.disabled ? "border border-border" : undefined,
                )}
              >
                {props.value
                  ? props.options.find((opt) => opt.value === props.value)?.name
                  : (props.placeholder ?? `Select ${props.label}`)}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
              {props.onClear && props.value ? (
                <Button
                  variant={"ghost"}
                  className="text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (props.onClear) props.onClear();
                    setOpen(false);
                  }}
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              ) : (
                <></>
              )}
            </div>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className={`${props.width ?? "w-[200px]"} p-0`}>
          {props.isLoading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-6">
              <Spinner className="mr-2 h-6 w-6 animate-spin text-primary" />
              <div className="text-sm text-muted-foreground">
                Getting data...
              </div>
            </div>
          ) : (
            <Command>
              <CommandInput
                placeholder={props.searchPlaceholder ?? `Search...`}
                spellCheck={false}
              />
              <CommandEmpty>{props.emptyMessage ?? "No data"}</CommandEmpty>
              <CommandGroup>
                {props.options.map((opt) => (
                  <CommandItem
                    value={opt.name}
                    key={opt.value}
                    onSelect={() => {
                      props.onChange(opt.value);
                      setOpen(false);
                    }}
                    className="w-full"
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        opt.value === props.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {opt.name}
                    {opt.icon ? (
                      <div className="ml-auto">{opt.icon}</div>
                    ) : (
                      <></>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          )}
        </PopoverContent>
      </Popover>
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
};

export default Autocomplete;
