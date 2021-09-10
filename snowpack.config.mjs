// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration
/** @type {import('snowpack').SnowpackUserConfig } */
export default {
  optimize: {
    // bundle: true,
    minify: true,
    splitting: true,
    treeshake: true,
    manifest: true,
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
    ['snowpack-plugin-svgr', { /* see "Plugin Options" below */}],
    '@snowpack/plugin-dotenv',
    // [
    //   '@snowpack/plugin-webpack',
    //   {
    //     extendConfig: (config) => {
    //       config.optimization = {
    //         minimize: false,
    //       }
    //       return config;
    //     },
    //   },
    // ],
  ],
  packageOptions: {
    polyfillNode: true,
    // https://github.com/snowpackjs/snowpack/issues/3682
    external: ['crypto', 'path', 'util', 'braces', 'debug', 'fs-extra', 'micromatch', 'ms', 'slash', 'source-map']
  },
  devOptions: {
    port: 3000
  },
  buildOptions: {
    jsxInject: 'import React from \'react\''
  },
};
