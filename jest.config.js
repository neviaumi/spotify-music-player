const configBuilder = require('@snowpack/app-scripts-react/jest.config.js');
const dotenv = require('dotenv');

dotenv.config({
  path: '.env.test',
});
dotenv.config({
  path: '.env',
});

const jestConfig = configBuilder();

module.exports = {
  ...jestConfig,
  coverageReporters: ['text', 'text-summary', 'lcov', 'clover', 'json'],
  coverageThreshold: {
    global: {
      branches: 64,
      functions: 84,
      lines: 80,
      statements: 80,
    },
  },
  testRunner: 'jest-circus/runner',
  transformIgnorePatterns: ['node_modules/(?!(parse-ms)).*\\.js$'],
};
