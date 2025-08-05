module.exports = {
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
    project: "./tsconfig.json"
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json"
      }
    }
  },
  rules: {
    // TypeScript rules
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/prefer-const": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" }
    ],

    // React rules
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react/jsx-uses-vars": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // Import rules
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ],
    "import/no-unresolved": "error",
    "import/no-duplicates": "error",

    // General rules
    "prefer-const": "error",
    "no-var": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "no-alert": "warn",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "no-script-url": "error",

    // Prettier
    "prettier/prettier": "error"
  },
  ignorePatterns: [
    "dist",
    "build",
    ".next",
    "node_modules",
    "coverage",
    "*.config.js",
    "*.config.ts"
  ]
}; 