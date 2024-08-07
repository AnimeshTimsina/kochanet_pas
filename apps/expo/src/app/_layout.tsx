import "../styles.css";

import type { Theme } from "@react-navigation/native";
import * as React from "react";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { ThemeProvider } from "@react-navigation/native";

import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { TRPCProvider } from "~/utils/api";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
  React.useEffect(() => {
    if (fontsLoaded) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <TRPCProvider>
      <ThemeProvider
        value={{
          dark: isDarkColorScheme,
          colors: isDarkColorScheme ? DARK_THEME.colors : LIGHT_THEME.colors,
        }}
      >
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack />
      </ThemeProvider>
    </TRPCProvider>
  );
}
