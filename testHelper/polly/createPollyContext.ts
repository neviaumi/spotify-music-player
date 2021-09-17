import XHRAdapter from '@pollyjs/adapter-xhr';
import { MODE, Polly, PollyConfig, Timing } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import kebabcase from 'lodash.kebabcase';
import path from 'path';

import { getCurrentTestPath } from './getCurrentTestPath';
import { APIMock, setupMockServer } from './setupMockServer';

Polly.register(XHRAdapter);
Polly.register(FSPersister);

export function createPollyContext(
  config: {
    appConfig?: {
      enableMockServer: boolean;
      mockRouteHandlers?: APIMock;
    };
    pollyConfig?: PollyConfig;
  } = {},
) {
  const {
    pollyConfig = {},
    appConfig = {
      enableMockServer: false,
      mockRouteHandlers: {},
    },
  } = config;
  const env = import.meta.env;
  const pollyMode: MODE =
    env.SNOWPACK_PUBLIC_POLLY_MODE || pollyConfig.mode || 'replay';
  const isRunningOnRecordMode = pollyMode === 'record';
  const pollyOptions: PollyConfig = {
    adapters: [XHRAdapter],
    expiresIn: '14d',

    expiryStrategy: 'warn',
    flushRequestsOnStop: true,
    matchRequestsBy: {
      body: false,
      headers: false,
    },
    persister: FSPersister,
    recordFailedRequests: true,
    recordIfMissing: false,
    timing: Timing.fixed(100),
    ...pollyConfig,
    mode: pollyMode,
  };
  // @ts-expect-error This file should included in test, and even context must get initialized
  const context: {
    polly: Polly;
  } = {};
  // https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=test-hook-ordering
  beforeEach(() => {
    const { testPath: currentTestPath, currentTestName } = {
      currentTestName: '',
      testPath: '',
    };
    context.polly = new Polly(kebabcase(currentTestName), {
      ...pollyOptions,
      persisterOptions: {
        keepUnusedRequests: false,
        [FSPersister.id]: {
          recordingsDir: path.join(
            getCurrentTestPath(),
            '__recordings__',
            path.parse(currentTestPath).name,
          ),
        },
      },
    });
    if (!isRunningOnRecordMode) {
      // @ts-expect-error trick to remove log here
      context.polly.logger.disconnect();
    }

    // https://github.com/Netflix/pollyjs/issues/175
    context.polly.server.any().on('beforePersist', (_, recording) => {
      recording.request.headers = recording.request.headers.filter(
        ({ name }: { name: string }) => name !== 'authorization',
      );
    });

    context.polly.server
      .any()
      .off('error')
      .on('error', (req, err) => {
        // @ts-expect-error Error here defined as Network Error
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
        const isNetworkError = req.requestArguments?.xhr?.status === 0;
        const shouldIgnoreError = isNetworkError;
        if (!shouldIgnoreError) {
          throw new Error(
            [
              '\n',
              currentTestPath,
              currentTestName,
              `throw pollyJS Error - ${err.message}`,
              `${req.method} ${req.absoluteUrl}`,
            ].join('\n'),
          );
        }
      });
    if (appConfig?.enableMockServer) {
      setupMockServer(context.polly, {
        handlers: appConfig.mockRouteHandlers,
      });
    }
  });
  afterEach(async () => {
    await context.polly?.stop();
  });
  return context;
}
