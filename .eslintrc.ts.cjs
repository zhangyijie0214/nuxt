module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ['@typescript-eslint'],
  rules: {
    "@typescript-eslint/no-var-requires": "off", // 禁止在 import 语句中使用 require 语句。
    "@typescript-eslint/ban-ts-comment": "off", // 禁用 TypeScript 注释的规则
    "@typescript-eslint/no-explicit-any": "off", // 禁用明确的 any 类型 设置为 'off'，则可以使用 any 类型而不会引起警告
  },
};
