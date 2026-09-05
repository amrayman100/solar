import js from "@eslint/js";
import tseslint from "typescript-eslint";
import convexPlugin from "@convex-dev/eslint-plugin";

export default [
  {
    ignores: [
      "**/dist/**",
      "**/.next/**",
      "**/node_modules/**",
      "legacy/**",
      "convex/_generated/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...convexPlugin.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: false,
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];
