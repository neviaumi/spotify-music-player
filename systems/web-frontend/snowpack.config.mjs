// Snowpack Configuration File

// See all supported options: https://www.snowpack.dev/reference/configuration
/** @type {import('snowpack').SnowpackUserConfig } */
// eslint-disable-next-line import/no-default-export
export default {
  buildOptions: {
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
  optimize: {
    bundle: true,
    loader: {
      '.gif': 'file',
      '.png': 'file',
    },
    manifest: true,
    minify: true,
    splitting: true,
    target: 'es2020',
    treeshake: true,
  },
  packageOptions: {
    external: ['crypto'],
    polyfillNode: true,
    source: 'local',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    [
      'snowpack-plugin-svgr',
      {
        /* see "Plugin Options" below */
      },
    ],
    '@snowpack/plugin-dotenv',
  ],
  routes: [
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
