// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration
/** @type {import('snowpack').SnowpackUserConfig } */
export default {
  optimize: {
    bundle: true,
    splitting: true,
    treeshake: true,
    manifest: true,
    minify: true,
    loader: {
      ".png": 'file',
      ".gif": 'file'
    },
    target: "es2020"
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
    '**/*.md',
    '**/*.yml',
  ],
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html',
    },
  ],
  plugins: [
    '@snowpack/plugin-react-refresh',
    ['snowpack-plugin-svgr', { /* see "Plugin Options" below */}],
    '@snowpack/plugin-dotenv'
  ],
  packageOptions: {
    polyfillNode: true,
    // https://github.com/snowpackjs/snowpack/issues/3682
    external: [
      'crypto',
      'path',
      'util',
      'url',
    ]
  },
  devOptions: {
    port: 3000
  },
  buildOptions: {
    jsxInject: 'import React from \'react\'',
    sourcemap: true
  },
  testOptions: {
    files: ["__tests__/**/*","__mocks__/**/*", "**/*.@(spec|test).*","**/*.har"]
  }
};
