module.exports = {
  root: true,
  settings: {
    'import/resolver': { typescript: {} },
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'import-newlines',
  ],
  reportUnusedDisableDirectives: true,
  rules: {
    curly: ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    complexity: ['error', 10],
    indent: ['error', 2],
    'max-len': ['error', { code: 160 }],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'never'],
    'function-paren-newline': ['error', 'multiline'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'object-curly-newline': ['error', { ObjectPattern: { multiline: true } }],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-explicit-any': 'off',
    'import-newlines/enforce': ['error', { 'max-len': 160, items: Infinity }]
  },
};
