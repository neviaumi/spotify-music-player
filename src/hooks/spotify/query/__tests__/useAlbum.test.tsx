import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { describe, expect, it } from '../../../../../testHelper/test-runner';
import { renderHook } from '../../../../../testHelper/testing-library/react-hooks';
import { TestApp } from '../../../../App';
import { useAlbum } from '../useAlbum';

createPollyContext();
describe('Test useAlbum', () => {
  it('fetch the album', async () => {
    const { result, waitFor } = renderHook(
      () => useAlbum('6P5QHz4XtxOmS5EuiGIPut'),
      {
        wrapper: ({ children }) => <TestApp>{children}</TestApp>,
      },
    );
    await waitFor(() => expect(result.current?.data).toBeDefined());
    expect(result.current?.data.name).toEqual('Led Zeppelin III (Remaster)');
  });
});
