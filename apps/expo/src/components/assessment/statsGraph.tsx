import React from "react";
import { View } from "react-native";
import { Circle, Svg } from "react-native-svg";

import { Text } from "../ui/text";

interface IProps {
  total: number;
  correct: number;
}

const StatsGraph: React.FC<IProps> = ({ correct, total }) => {
  const percentage = total === 0 ? 0 : (correct / total) * 100;
  const radius = 50;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View className="relative items-center justify-center">
      <Svg height={radius * 2} width={radius * 2} viewBox="0 0 100 100">
        <Circle
          stroke="#eaeaea"
          fill="none"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
        />
        <Circle
          stroke="#008080"
          fill="none"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
        />
      </Svg>
      <View className="absolute items-center justify-center">
        <Text className="text-2xl font-extrabold">{correct}</Text>
        <Text className="text-sm text-muted-foreground">/{total}</Text>
      </View>
    </View>
  );
};

export default StatsGraph;
