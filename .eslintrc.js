module.exports = {
  extends: ['@busybox'],
  rules: {
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-check': false,
        'ts-expect-error': false,
        'ts-ignore': true,
        'ts-nocheck': true,
      },
    ],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
