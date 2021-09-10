import '@testing-library/jest-dom';
import 'jest-expect-message';
import './testHelper/casual';

import { configure } from '@testing-library/react';
import crypto from 'crypto';
import MutationObserver from 'mutation-observer';
import { TextEncoder } from 'util';

global.MutationObserver = MutationObserver;
global.TextEncoder = TextEncoder;

configure({
  asyncUtilTimeout: 5000,
});

// https://github.com/facebook/react/issues/11098
Object.assign(console, {
  error: jest.fn(),
});

Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: arr => new Uint8Array(crypto.randomBytes(arr.length)),
    subtle: {
      digest: byteArray =>
        new Uint8Array(crypto.createHash('SHA256').update(byteArray).digest()),
    },
  },
});

jest.mock('./src/contexts/SpotifyWebPlayback/hooks/useLocalSpotifyPlayback');
