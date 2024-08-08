import "../styles.css";

import type { Theme } from "@react-navigation/native";
import * as React from "react";
import Toast from "react-native-toast-message";
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

import { DrawerProvider } from "~/components/ui/popup";
// import { DrawerProvider } from "~/components/ui/popup";
import { NAV_THEME } from "~/lib/constants";
import { TRPCProvider } from "~/utils/api";

// const LIGHT_THEME: Theme = {
//   dark: false,
//   colors: NAV_THEME.light,
// };
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const { isDarkColorScheme } = useColorScheme();
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
  if (!fontsLoaded) {
    return null;
  }

  return (
    <TRPCProvider>
      <ThemeProvider
        value={{
          dark: true,
          colors: DARK_THEME.colors,
        }}
      >
        <DrawerProvider>
          <StatusBar style={"light"} />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </DrawerProvider>
        <Toast autoHide visibilityTime={2000} position="top" />
      </ThemeProvider>
    </TRPCProvider>
  );
}
