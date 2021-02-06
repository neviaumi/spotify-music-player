import { renderHook } from '@testing-library/react-hooks';

import { interceptNetlifyFunctions } from '../../../../../functions/testHelper/polly/interceptNetlifyFunctions';
import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../../App';
import { useTopStreamingAlbum } from '../useTopStreamingAlbum';

const context = createPollyContext();
describe('Test useTopStreamingAlbum', () => {
  it('fetch track report and the get track details to show albumn', async () => {
    interceptNetlifyFunctions(context.polly);
    const { result, waitFor } = renderHook(() => useTopStreamingAlbum(), {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    });
    await waitFor(() => expect(result.current?.data).toBeDefined(), {
      timeout: 8000,
    });
    expect(result.current?.data).toHaveProperty('albums');
    expect(result.current?.data).toHaveProperty('userCountry');
    expect(result.current?.data.albums.length).toBeGreaterThan(0);
    expect(result.current?.data.albums.length).toBeLessThanOrEqual(50);
  }, 100000);
});
