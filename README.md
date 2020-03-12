# Spotify Music Player

[![codecov](https://codecov.io/gh/davidNHK/spotify-music-player/branch/development/graph/badge.svg)](https://codecov.io/gh/davidNHK/spotify-music-player)
![](https://github.com/davidNHK/spotify-music-player/workflows/build/badge.svg)

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
