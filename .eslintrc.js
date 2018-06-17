module.exports = {
    "extends": ["airbnb", "plugin:react/recommended"],
    "parser": "babel-eslint",
    "rules": {
      "comma-dangle": ["error", "never"],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/forbid-prop-types": "false",
      "react/jsx-no-bind": "false",
      "jsx-quotes": ["error", "prefer-single"],
      "no-floating-decimal": 0,
      "no-use-before-define": 0
    }
};