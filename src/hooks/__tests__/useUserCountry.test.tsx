import { createPollyContext } from '../../../testHelper/polly/createPollyContext';
import { describe, expect, it } from '../../../testHelper/test-runner';
import { renderHook } from '../../../testHelper/testing-library/react-hooks';
import { TestApp } from '../../App';
import { useUserCountry } from '../useUserCountry';

createPollyContext(import.meta.url);

describe('useUserCountry', () => {
  it('should return my current location - hk', async () => {
    const { result, waitFor } = renderHook(() => useUserCountry(), {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    });
    await waitFor(() => expect(result.current).toBeDefined());
    expect(result.current).toEqual('HK');
  });
});
