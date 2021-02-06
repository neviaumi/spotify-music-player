import { renderHook } from '@testing-library/react-hooks';
import { TestApp } from 'src/App';

import { createPollyContext } from '../../../testHelper/polly/createPollyContext';
import { useUserCountry } from '../useUserCountry';

const _context = createPollyContext();

describe('useUserCountry', () => {
  it('should return my current location - hk', async () => {
    const { result, waitFor } = renderHook(() => useUserCountry(), {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    });
    await waitFor(() => expect(result.current).toBeDefined());
    expect(result.current).toEqual('HK');
  });
});
