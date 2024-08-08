import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";

import {
  ClipboardIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from "~/components/icons";
import { COLORS } from "~/lib/constants";

const TabLayout = () => {
  return (
    // <SafeAreaView>
    <View className="h-full w-full">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.PRIMARY,
          lazy: true,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="patients/index"
          options={{
            title: "Patients",
            tabBarIcon: ({ color }) => <UsersIcon size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="history/index"
          options={{
            title: "History",
            tabBarIcon: ({ color }) => (
              <ClipboardIcon size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <SettingsIcon size={26} color={color} />,
            unmountOnBlur: false,
          }}
        />
        <Tabs.Screen
          name="[id]"
          options={{
            href: null,
            tabBarShowLabel: true,
          }}
        />
      </Tabs>
    </View>
    // </SafeAreaView>
  );
};
export default TabLayout;
