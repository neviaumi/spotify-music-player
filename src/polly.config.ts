import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import { setupPolly } from 'setup-polly-jest';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

// setup Polly instance and save it into global context
export default setupPolly({
  adapters: ['node-http'],
  persister: 'fs',
  persisterOptions: {
    keepUnusedRequests: false,
    fs: {
      recordingsDir: '__recordings__',
    },
  },
  recordIfMissing: false,
  recordFailedRequests: true,
  matchRequestsBy: {
    headers: false,
    body: false,
  },
});
