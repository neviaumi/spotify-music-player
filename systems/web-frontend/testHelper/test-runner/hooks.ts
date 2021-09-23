import { cleanup, configure } from '@testing-library/react';

configure({
  asyncUtilTimeout: 5000,
});
// https://github.com/modernweb-dev/web/issues/1418
(window as any).__WTR_CONFIG__.testFrameworkConfig.rootHooks = {
  afterEach: () => {
    cleanup();
  },
};
