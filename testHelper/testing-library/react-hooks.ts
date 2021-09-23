import { getConfig } from '@testing-library/react';
import { renderHook as originalRenderHook } from '@testing-library/react-hooks/dom';

export const renderHook: typeof originalRenderHook = function renderHook<
  TProps,
  TResult,
>(callback: (props: TProps) => TResult, options = {}) {
  const config = getConfig();
  const defaultTimeout = config.asyncUtilTimeout;
  const { result, waitForNextUpdate, waitFor, waitForValueToChange, ...rest } =
    originalRenderHook(callback, options);
  return {
    result,
    waitFor: (callback, options) =>
      waitFor(callback, { timeout: defaultTimeout, ...options }),
    waitForNextUpdate: options =>
      waitForNextUpdate({ timeout: defaultTimeout, ...options }),
    waitForValueToChange: (callback, options) =>
      waitForValueToChange(callback, { timeout: defaultTimeout, ...options }),
    ...rest,
  };
};
