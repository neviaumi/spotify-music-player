/* eslint-disable no-restricted-globals */

// import { expect as orgExcept, jest as orgJest } from '@jest/globals';
// @ts-expect-error no type for that
import * as matchers from '@testing-library/jest-dom/matchers';
// @ts-expect-error no type for that
import withMessage from 'jest-expect-message/dist/withMessage';
//
// orgExcept.extend(matchers);
// export const expect = withMessage(orgExcept);
// export const jest = global.jest ?? orgJest;
//
// export { afterEach, beforeAll, beforeEach, describe, it } from '@jest/globals';

const {
  describe: reDescribe,
  it: reIt,
  afterEach: reAfterEach,
  beforeAll: reBeforeAll,
  beforeEach: reBeforeEach,
  expect: reExpect,
  jest: reJest,
} = {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
};

reExpect.extend(matchers);
const reExpectWithExtension = withMessage(reExpect);

export {
  reAfterEach as afterEach,
  reBeforeAll as beforeAll,
  reBeforeEach as beforeEach,
  reDescribe as describe,
  reExpectWithExtension as expect,
  reIt as it,
  reJest as jest,
};
