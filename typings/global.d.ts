import { MODE } from '@pollyjs/core';

declare global {
  namespace NodeJS {
    interface Global {
      MutationObserver: any;
      jasmine: { testPath: string };
    }
  }
  interface ImportMeta {
    env: {
      MODE: 'development' | 'production';
      NODE_ENV: 'development' | 'production' | 'test';
      SNOWPACK_PUBLIC_IPINFO_TOKEN: string;
      SNOWPACK_PUBLIC_POLLY_MODE: MODE;
      SNOWPACK_PUBLIC_SPOTIFY_ACCESS_TOKEN?: string;
      SNOWPACK_PUBLIC_SPOTIFY_CLIENT_ID: string;
      SNOWPACK_PUBLIC_SPOTIFY_REQUESTED_SCOPE: string;
    };
  }
}
