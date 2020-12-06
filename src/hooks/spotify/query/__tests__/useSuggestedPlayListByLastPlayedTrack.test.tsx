import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { TestApp } from '../../../../App';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import useSuggestedPlayListByLastPlayedTrack from '../useSuggestedPlayListByLastPlayedTrack';

const _context = createPollyContext();
it('Return playlist of user by last played track', async () => {
  const { result, waitFor } = renderHook(
    () => useSuggestedPlayListByLastPlayedTrack(),
    {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    },
  );
  await waitFor(() => expect(result.current).toBeDefined());
  expect(result.error).toBeUndefined();
  expect(result.current?.data).toEqual({
    playlists: expect.any(Array),
    track: expect.any(Object),
  });
});