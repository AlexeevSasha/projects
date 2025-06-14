module.exports = {
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    sourceType: "module",
    jsx: true,
    project: "tsconfig.json",
    ecmaVersion: 6,
    jsxPragma: "React",
    createDefaultProgram: true
  },
  ignorePatterns: [],
  plugins: ["react", "react-native", "@typescript-eslint", "react-hooks", "import"],
  rules: {
    //react-native
    "react-native/no-unused-styles": "error",
    "react-native/split-platform-components": "off",
    "react-native/no-inline-styles": "error",
    "react-native/no-color-literals": "error",
    "react-native/no-raw-text": "error",
    "react-native/no-single-element-style-arrays": "error",

    //react-hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    //import
    "import/no-default-export": "error",
    "import/no-unassigned-import": ["error", { allow: ["**/*.css", "**/*.scss", "**/i18n/index"] }],

    //typescript-eslint
    "@typescript-eslint/strict-boolean-expressions": "off",
    "max-classes-per-file": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-shadow": ["error"],

    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/member-delimiter-style": "error",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/triple-slash-reference": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    camelcase: "error",
    complexity: "error",
    "constructor-super": "error",
    curly: "error",
    "default-case": "error",
    "guard-for-in": "error",
    "id-blacklist": ["error", "any", "Number", "number", "String", "string", "Boolean", "boolean", "Undefined"],
    "id-match": "error",
    "max-len": [
      "error",
      {
        code: 140
      }
    ],
    "new-parens": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-empty": "error",
    "no-eval": "error",
    "no-fallthrough": "error",
    "no-invalid-this": "off",
    "no-multiple-empty-lines": "error",
    "no-new-wrappers": "error",
    "no-redeclare": "error",
    "no-shadow": "off",
    "no-trailing-spaces": "error",
    "no-undef-init": "error",
    "no-underscore-dangle": "error",
    "no-unsafe-finally": "error",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true
      }
    ],
    "no-unused-labels": "error",
    "no-var": "error",
    "no-void": "error",
    "one-var": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return"
      }
    ],
    "prefer-const": "error",
    "use-isnan": "error",
    "valid-typeof": "error",
    "camelcase": 0,
    "react-native/no-inline-styles": 0,
    "react-native/no-raw-text": 0,
    "import/no-unassigned-import": 0,
    "import/no-default-export": 0,
    "react-hooks/exhaustive-deps": 0,
  }
};
