import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import react from 'eslint-plugin-react';
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      react2: react,
    },
    rules: {
      // ... any rules you want
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error'
    },
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true, js: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": 1,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": [0,
        { extensions: ['.js'] },],
    }
  }
];