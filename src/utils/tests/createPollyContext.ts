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
    mode: (process.env.REACT_APP_POLLY_MODE as MODE) || 'replay',
    persister: 'fs',
    persisterOptions: {
      keepUnusedRequests: false,
      fs: {
        recordingsDir: path.join(getCurrentTestPath(), '__recordings__'),
      },
    },
    recordIfMissing: false,
    recordFailedRequests: true,
    matchRequestsBy: {
      headers: false,
      body: false,
    },
    ...config,
  });
};
