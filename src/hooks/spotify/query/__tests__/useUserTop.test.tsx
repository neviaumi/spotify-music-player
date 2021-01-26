/** @jest-environment setup-polly-jest/jest-environment-jsdom */

import { renderHook } from '@testing-library/react-hooks';

import { TestApp } from '../../../../App';
import { createPollyContext } from '../../../../utils/tests/createPollyContext';
import { QueryType, useUserTop } from '../useUserTop';

const _context = createPollyContext();
it('Return user top artist', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useUserTop(QueryType.ARTIST),
    {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    },
  );
  await waitForNextUpdate();
  expect(result.error).toBeUndefined();
  expect(
    result.current.data.items.every((item: any) => item.type === 'artist'),
  ).toBeTruthy();
});
