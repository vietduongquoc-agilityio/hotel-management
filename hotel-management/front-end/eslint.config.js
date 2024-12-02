import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin";
import storybook from "eslint-plugin-storybook";

export default [
  // General JS/TS Config
  js.configs.recommended,
  {
    ignores: ["dist"], // Ignore distribution folder
    files: ["**/*.{ts,tsx}"], // Target TypeScript files
    languageOptions: {
      ecmaVersion: 2020, // Set ECMAScript version
      globals: globals.browser, // Use browser globals
    },
    plugins: {
      "react-hooks": reactHooks, // Enable React Hooks plugin
      "react-refresh": reactRefresh, // Enable React Refresh plugin
      "@typescript-eslint": tseslint, // Enable TypeScript ESLint plugin
      storybook, // Enable Storybook plugin
    },
    extends: [
      js.configs.recommended, // Base JS recommended rules
      "plugin:storybook/recommended", // Storybook rules
      ...tseslint.configs.recommended, // TypeScript recommended rules
    ],
    rules: {
      ...reactHooks.configs.recommended.rules, // Recommended React Hooks rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }, // Warn for non-constant exports
      ],
      "react-refresh/only-export-components": "off",
    },
  },
];
