module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended",
  ],
  plugins: ["astro"],
  rules: {
    "@typescript-eslint/no-empty-function": "off",
  },
};
