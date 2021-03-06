import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly, PollyConfig } from '@pollyjs/core';

import { createPollyContext as createPollyContextShared } from '../../../testHelper/polly/createPollyContext';

Polly.register(NodeHttpAdapter);

export function createPollyContext(config: PollyConfig = {}) {
  return createPollyContextShared({
    pollyConfig: {
      adapters: [NodeHttpAdapter],
      ...config,
    },
  });
}
