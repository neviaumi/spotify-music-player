process.env.NODE_ENV = 'test';

const { playwrightLauncher } = require('@web/test-runner-playwright');
const dotenv = require('dotenv');

dotenv.config({
  path: '.env.test',
});
dotenv.config({
  path: '.env',
});

module.exports = {
  browserLogs: process.env.CI === undefined,
  browsers: [playwrightLauncher({ product: 'chromium' })],
  coverage: false,
  coverageConfig: {
    include: ['./src/**/*'],
  },
  files: ['src/**/*.test.{tsx,ts}'],
  playwright: true,
  plugins: [require('@snowpack/web-test-runner-plugin')()],
  testFramework: {
    config: {
      rootHooks: {},
      timeout: '10000',
    },
  },
  testRunnerHtml: testFramework => `<html>
    <body>
    <script type="module" src="/testHelper/test-runner/hooks.js"></script>
    <script type="module" src="/testHelper/test-runner/expect.js"></script>
    <script id='uit' type="module" src="${testFramework}"></script>
    </body>
  </html>`,
};
