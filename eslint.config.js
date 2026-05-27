const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  {
    ignores: ["node_modules/**", "dist/**", "release/**", "out/**", "coverage/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        console: "readonly",
        document: "readonly",
        window: "readonly",
        process: "readonly",
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
]);
