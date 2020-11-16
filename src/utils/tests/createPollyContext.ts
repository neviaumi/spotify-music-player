import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { MODE, Polly, PollyConfig } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import path from 'path';
import { setupPolly } from 'setup-polly-jest';

import getCurrentTestPath from './getCurrentTestPath';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

export default (config: PollyConfig = {}) => {
  return setupPolly({
    adapters: ['node-http'],
    matchRequestsBy: {
      body: false,
      headers: false,
    },
    mode: (process.env.REACT_APP_POLLY_MODE as MODE) || 'replay',
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: path.join(getCurrentTestPath(), '__recordings__'),
      },
      keepUnusedRequests: false,
    },
    recordFailedRequests: true,
    recordIfMissing: false,
    ...config,
  });
};
