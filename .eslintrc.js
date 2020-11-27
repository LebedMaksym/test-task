module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:vue/recommended"
  ],
  "plugins": [
    "vue"
  ],
  "rules": {
    "indent": [2, 2],
    "array-element-newline": ["error", { "multiline": true, "minItems": 4 }],
    "space-before-function-paren": ["error", "never"],
    "quotes": ["error", "double"],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "space-before-blocks": "error",
  }
};
