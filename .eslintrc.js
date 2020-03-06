module.exports = {
  extends: ['@spotify'],
  plugins: [
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-import',
    'eslint-plugin-jest',
    'eslint-plugin-prettier',
    'eslint-plugin-simple-import-sort',
  ],
  rules: {
    'block-scoped-var': 'error',
    // Prefer less responsibility for function, ideally is only one
    complexity: ['error', { max: 8 }],
    'lines-between-class-members': 'error',
    'max-lines': [
      'error',
      {
        max: 500,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-params': ['error', 4],
    // Prefer smaller function and composite together
    'max-statements': [
      'error',
      {
        max: 40,
      },
    ],
    'no-console': 'error',
    // No unnecessary else branch
    'no-else-return': 'error',
    'prefer-const': 'error',
    // Promise reject always is instance of error
    'prefer-promise-reject-errors': 'error',
    radix: 'error',
    // auto sort import statements
    'simple-import-sort/sort': 'error',
    'jest/expect-expect': 'error',
    'jest/prefer-spy-on': 'error',
    'jest/no-test-callback': 'error',
    'jest/consistent-test-it': [
      'error',
      {
        fn: 'it',
        withinDescribe: 'it',
      },
    ],
  },
  overrides: [
    {
      files: ['typings/**/*.d.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off', // Not work for type declaration file
      },
    },
  ],
};
