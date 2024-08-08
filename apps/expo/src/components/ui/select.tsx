import React from "react";
import { Pressable, View, VirtualizedList } from "react-native";

import {
  ChevronDown,
  CircleDotIcon,
  CircleIcon,
  FrownIcon,
} from "~/components/icons";
import { COLORS } from "~/lib/constants";
import { cn } from "~/lib/utils";
import useDrawer, { DrawerProvider } from "./popup";
import { Separator } from "./separator";
import { Text } from "./text";

interface IOption {
  id: string;
  name: string;
}

interface IProps<T extends IOption> {
  options: T[];
  value: string | null;
  header: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
}

const SelectPopup = <T extends IOption>(props: IProps<T>) => {
  const { close: closeDrawer } = useDrawer();
  return (
    <View className="mt-1 flex h-full w-full flex-col gap-3">
      <View>
        <Text className="text-xl">{props.header}</Text>
      </View>
      <Separator />
      <View className="flex-1">
        {props.options.length === 0 ? (
          <View className="flex flex-1 flex-col items-center justify-center gap-2">
            <FrownIcon color={COLORS.PRIMARY} size={28} />
            <Text className="text-lg">No data found</Text>
          </View>
        ) : (
          <VirtualizedList
            className="flex-1"
            renderItem={({ item: _item, index }) => {
              const item = _item as T;
              return (
                <Pressable
                  className={cn(
                    "flex flex-row items-center gap-2 px-3 py-3",
                    index % 2 === 0 ? "" : "bg-gray-100 dark:bg-gray-800",
                  )}
                  onPress={() => {
                    props.onSelect(item.id);
                    closeDrawer();
                  }}
                >
                  {props.value === item.id ? (
                    <CircleDotIcon size={20} color={COLORS.SUCCESS_COLOR} />
                  ) : (
                    <CircleIcon size={20} color={COLORS.DISABLED} />
                  )}
                  <Text className="text-md">{item.name}</Text>
                </Pressable>
              );
            }}
            getItemCount={() => props.options.length}
            getItem={(__, index) => props.options[index]}
            data={props.options}
            ItemSeparatorComponent={() => <View className="my-2" />}
            keyExtractor={(item) => (item as T).id}
          />
        )}
      </View>
    </View>
  );
};

const SelectInput = <T extends IOption>(props: IProps<T>) => {
  const selected = props.options.find((e) => e.id === props.value);
  const { open: openPopup } = useDrawer();
  return (
    <View
      className={cn(
        "h-12 w-full flex-row items-center rounded-md border border-input bg-background px-3 py-2 text-lg leading-[1.25] text-foreground file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground lg:text-sm",
        props.disabled ? "opacity-50" : "",
      )}
    >
      <Pressable
        className="flex w-full flex-row items-center justify-between"
        disabled={props.disabled}
        onPress={() => {
          openPopup({
            component: (
              <SelectPopup
                header={props.header}
                options={props.options}
                value={props.value}
                onSelect={props.onSelect}
              />
            ),
            config: {
              height: 500,
            },
          });
        }}
      >
        <View className="flex-1">
          {!selected ? (
            <Text className="text-lg text-muted-foreground lg:text-sm">
              {props.placeholder}
            </Text>
          ) : (
            <Text className="text-lg lg:text-sm">{selected.name}</Text>
          )}
        </View>
        <ChevronDown color={COLORS.PRIMARY} size={16} />
      </Pressable>
    </View>
  );
};

const Select = <T extends IOption>(props: IProps<T>) => {
  return (
    <DrawerProvider>
      <View className="flex flex-col gap-3">
        {props.label ? <Text>{props.label}</Text> : <></>}
        <SelectInput {...props} />
      </View>
    </DrawerProvider>
  );
};

export default Select;
