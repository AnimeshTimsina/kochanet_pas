import baseConfig from "@kochanet_pas/eslint-config/base";
import reactConfig from "@kochanet_pas/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".expo/**", "expo-plugins/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
