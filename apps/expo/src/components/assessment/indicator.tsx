import React from "react";
import { View } from "react-native";

interface IProps {
  pages: number;
  activePage: number;
}

const Indicator: React.FC<IProps> = ({ activePage, pages }) => {
  return (
    <View className="flex flex-row gap-2">
      {Array.from({ length: pages }, (_, i) => (
        <View
          key={`${i + 1}`}
          className={`h-1.5 w-8 rounded-full ${i + 1 <= activePage ? "bg-primary" : "bg-gray-300 dark:bg-gray-300"}`}
        ></View>
      ))}
    </View>
  );
};

export default Indicator;
