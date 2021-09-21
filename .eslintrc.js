module.exports = {
  extends: ['@busybox'],
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
