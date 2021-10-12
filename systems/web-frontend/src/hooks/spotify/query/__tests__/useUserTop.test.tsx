import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { expect, it } from '../../../../../testHelper/test-runner';
import { renderHook } from '../../../../../testHelper/testing-library/react-hooks';
import { TestApp } from '../../../../App';
import { QueryType, useUserTop } from '../useUserTop';

const _context = createPollyContext(import.meta.url);
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
    result.current?.data.items.every((item: any) => item.type === 'artist'),
  ).toBeTruthy();
});
