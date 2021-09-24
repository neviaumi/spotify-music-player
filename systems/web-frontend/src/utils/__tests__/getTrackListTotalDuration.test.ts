import { expect, it } from '../../../testHelper/test-runner';
import { getTrackListTotalDuration } from '../getTrackListTotalDuration';

it('Should sum total duration', () => {
  expect(
    getTrackListTotalDuration([
      {
        track: { duration_ms: 10 },
      },
      {
        track: { duration_ms: 20 },
      },
    ]),
  ).toEqual(30);
});
