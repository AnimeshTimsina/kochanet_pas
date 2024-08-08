import baseConfig, {
  restrictEnvAccess,
} from "@kochanet_pas/eslint-config/base";
import nextjsConfig from "@kochanet_pas/eslint-config/nextjs";
import reactConfig from "@kochanet_pas/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
