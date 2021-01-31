import { renderHook } from '@testing-library/react-hooks';

import { createPollyContext } from '../../../../../testHelper/createPollyContext';
import { TestApp } from '../../../../App';
import {
  Period,
  useTopStreamingTracksReport,
} from '../useTopStreamingTracksReport';

const context = createPollyContext();
describe('useTopStreamingReport', () => {
  it('fetch top steaming report from backing API', async () => {
    context.polly.server.host('http://localhost', () => {
      context.polly.server
        .get('/.netlify/functions/fetch-top-stream-report')
        .intercept((_, res) => {
          res.status(200).json({
            data: {
              items: [],
            },
          });
        });
    });
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useTopStreamingTracksReport({
          period: Period.Weekly,
          region: 'hk',
        }),
      {
        wrapper: ({ children }) => <TestApp>{children}</TestApp>,
      },
    );
    await waitForNextUpdate();
    expect(result.current?.data).toStrictEqual({
      data: {
        items: [],
      },
    });
  });
});
