module.exports = {
  env: {
    "browser": true,
    "es6": true,
    "node": true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:vue/recommended",
    "@vue/typescript/recommended",
  ],
  plugins: [
    "vue"
  ],
  rules: {
    "indent": [2, 2],
    "brace-style": 2,
    "curly": "error",
    "semi": "error",
    "no-irregular-whitespace": "off",
    "no-useless-escape": "off",
    "arrow-parens": [2, "as-needed", { requireForBlockBody: true }],
    "object-curly-spacing": [2, "always"],
    "array-element-newline": ["error", { "multiline": true, "minItems": 4 }],
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": "error",
    "quotes": ["error", "double"],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "@typescript-eslint/no-var-requires": [0, { properties: "never" }]
  }
};
