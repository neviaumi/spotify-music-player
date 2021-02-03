import { renderHook } from '@testing-library/react-hooks';

import { interceptNetlifyFunctions } from '../../../../../functions/testHelper/polly/interceptNetlifyFunctions';
import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../../App';
import {
  Period,
  useTopStreamingTracksReport,
} from '../useTopStreamingTracksReport';

const context = createPollyContext({});
describe('useTopStreamingReport', () => {
  it('fetch top steaming report from backing API', async () => {
    interceptNetlifyFunctions(context.polly);
    const { result, waitFor } = renderHook(
      () =>
        useTopStreamingTracksReport({
          period: Period.Weekly,
          region: 'hk',
        }),
      {
        wrapper: ({ children }) => <TestApp>{children}</TestApp>,
      },
    );
    await waitFor(() => expect(result.current?.data).toBeDefined(), {
      timeout: 8000,
    });
    expect(result.current?.data.data.items.length).toBeGreaterThan(0);
  }, 10000);
});
