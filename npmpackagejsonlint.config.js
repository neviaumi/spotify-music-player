'use strict';

module.exports = {
  extends: '@busybox/npm-package-json-lint-config',
  overrides: [
    {
      patterns: ['systems/**/package.json'],
      rules: {
        'require-repository': 'error',
        'require-repository-directory': 'error'
      },
    },
  ],
};
