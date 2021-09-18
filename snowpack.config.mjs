// Snowpack Configuration File

// See all supported options: https://www.snowpack.dev/reference/configuration
/** @type {import('snowpack').SnowpackUserConfig } */
// eslint-disable-next-line import/no-default-export
export default {
  buildOptions: {
    jsxInject: "import React from 'react'",
    sourcemap: true,
  },
  devOptions: {
    port: 3000,
  },
  exclude: [
    '**/.github/**/*',
    '**/.git/**/*',
    '**/coverage/**/*',
    '**/scripts/**/*',
    '**/.husky/**/*',
    '**/.idea/**/*',
    '**/commitlint.config.js',
    '**/npmpackagejsonlint.config.js',
    '**/package.json',
    '**/package-lock.json',
    '**/tsconfig.json',
    '**/tsconfig.tsbuildinfo',
    '**/web-test-runner.config.mjs',
    '**/*.md',
    '**/*.yml',
    '**/*.toml',
  ],
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
    // https://github.com/snowpackjs/snowpack/issues/3682
    external: ['crypto', 'path', 'util', 'url'],

    polyfillNode: true,
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
      '__tests__/**/*',
      '__mocks__/**/*',
      '**/*.@(spec|test).*',
      '**/*.har',
    ],
  },
};
