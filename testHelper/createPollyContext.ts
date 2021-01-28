import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { MODE, Polly, PollyConfig } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import kebabcase from 'lodash.kebabcase';
import path from 'path';

import { getCurrentTestPath } from './getCurrentTestPath';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

export function createPollyContext(config: PollyConfig = {}) {
  const env = process.env;
  const pollyMode: MODE =
    (env.REACT_APP_POLLY_MODE as MODE) || config.mode || 'replay';
  const isRunningOnRecordMode = pollyMode === 'record';
  const pollyOptions: PollyConfig = {
    adapters: [NodeHttpAdapter],
    expiresIn: '14d',

    expiryStrategy: 'warn',
    flushRequestsOnStop: true,
    matchRequestsBy: {
      body: false,
      headers: false,
    },
    persister: FSPersister,
    recordFailedRequests: true,
    ...config,
    mode: pollyMode,
    recordIfMissing: false,
  };
  // @ts-expect-error This file should included in test, and even context must get initialized
  const context: {
    polly: Polly;
  } = {};
  // https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=test-hook-ordering
  beforeEach(() => {
    const { testPath: currentTestPath, currentTestName } = expect.getState();
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
      .on('error', (_, err) => {
        throw new Error(
          `${currentTestPath} - ${currentTestName} throw pollyJS Error - ${err.message}`,
        );
      });
  });
  afterEach(async () => {
    await context.polly?.stop();
  });
  return context;
}
