module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // indent: ["error", 2],
    //"linebreak-style": ["error", "unix"],
   // semi: ["error", "never"],
   "react/react-in-jsx-scope": "off",
 "react/jsx-filename-extension": [
    1,
     { extensions: [".ts", ".tsx", ".js", ".jsx"] },
  ],
   "@typescript-eslint/no-explicit-any": "off",
  },
}
