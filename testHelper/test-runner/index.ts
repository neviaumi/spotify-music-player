/* eslint-disable no-restricted-globals,import/no-unresolved */

import { ModuleMocker } from 'jest-mock';

import { array } from './each/array';
import { objects } from './each/objects';
import { expect } from './expect';

const moduleMocker = new ModuleMocker(window);

const {
  describe: reDescribe,
  it: reIt,
  afterEach: reAfterEach,
  beforeAll: reBeforeAll,
  beforeEach: reBeforeEach,
  expect: reExpect,
  jest: reJest,
} = {
  afterEach: window.afterEach,
  beforeAll: window.before,
  beforeEach: window.beforeEach,
  describe: window.describe,
  expect: expect,
  it: window.it,
  jest: {
    fn: () => moduleMocker.fn<any, any>(),
    spyOn: moduleMocker.spyOn.bind(moduleMocker),
  },
};

export const each = { array, objects };

export {
  reAfterEach as afterEach,
  reBeforeAll as beforeAll,
  reBeforeEach as beforeEach,
  reDescribe as describe,
  reExpect as expect,
  reIt as it,
  reJest as jest,
};
