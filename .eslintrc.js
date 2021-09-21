module.exports = {
  extends: ['@busybox'],
  overrides: [
    {
      files: ['*.test.tsx', '*.test.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
  rules: {
    'no-restricted-globals': [
      'error',
      ...[
        'afterEach',
        'beforeAll',
        'beforeEach',
        'describe',
        'it',
        'jest',
        'expect',
      ].map(name => ({
        message: `import {${name}} from 'testHelper/test-runner'; instead`,
        name,
      })),
    ],
  },
};
