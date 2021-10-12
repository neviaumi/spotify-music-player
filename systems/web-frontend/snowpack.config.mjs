// Snowpack Configuration File
import proxy from 'http2-proxy';

// See all supported options: https://www.snowpack.dev/reference/configuration
/** @type {import('snowpack').SnowpackUserConfig } */
// eslint-disable-next-line import/no-default-export
export default {
  alias: {
    'graceful-fs': 'memfs',
  },
  buildOptions: {
    baseUrl: 'https://storage.googleapis.com/test-pulumi-37a15b8',
    jsxInject: "import React from 'react'",
    sourcemap: false,
  },
  devOptions: {
    port: 3000,
  },
  mount: {
    public: '/',
    src: '/src',
    testHelper: '/testHelper',
  },
  packageOptions: {
    external: ['crypto'],
    polyfillNode: true,
    source: 'local',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    ['snowpack-plugin-svgr', {}],
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-webpack',
      {
        manifest: true,
      },
    ],
  ],
  routes: [
    {
      dest: (req, res) => {
        return proxy.web(req, res, {
          hostname: 'localhost',
          port: 8000,
        });
      },
      src: '/api/.*',
    },
    {
      dest: '/index.html',
      match: 'routes',
      src: '.*',
    },
  ],
  testOptions: {
    files: [
      '**/__tests__/**/*',
      '**/__mocks__/**/*',
      '**/testHelper/**/*',
      '**/*.@(spec|test).*',
      '**/*.har',
    ],
  },
  workspaceRoot: '../..',
};
