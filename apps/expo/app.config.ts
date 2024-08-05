import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "kochanetMobile",
  slug: "kochanetMobile",
  scheme: "expo",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#1F104A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/17e06bea-d497-4740-9414-beb34f903b4e",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.animesh.kochanetPas",
    supportsTablet: true,
  },
  android: {
    package: "com.animesh.kochanetPas",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
  },
  extra: {
    eas: {
      projectId: "17e06bea-d497-4740-9414-beb34f903b4e",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router"],
  jsEngine: "hermes",
  runtimeVersion: {
    policy: "appVersion",
  },
});
