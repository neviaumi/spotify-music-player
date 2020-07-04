# Spotify Music Player

![](https://github.com/davidNHK/spotify-music-player/workflows/testing/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/275b2340c6d573ec886d/maintainability)](https://codeclimate.com/github/davidNHK/spotify-music-player/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/275b2340c6d573ec886d/test_coverage)](https://codeclimate.com/github/davidNHK/spotify-music-player/test_coverage)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Installation

```bash
yarn
yarn start
```

# Testing

To make PollyJS start record your network call

```js
global.pollyContext.polly?.configure({
  mode: 'record',
});
```
