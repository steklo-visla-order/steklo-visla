export default {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
  rules: {
    'selector-class-pattern': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'config', 'theme'],
      },
    ],
  },
};
