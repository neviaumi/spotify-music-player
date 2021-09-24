import { expect, it } from '../../../testHelper/test-runner';
import { formatMS, formatMSToMinute } from '../formatMS';

it('Covert to 1 hour 34 minute', () => {
  expect(formatMS(94 * 60 * 1000)).toEqual('1 hr 34 min');
});

it('Contain day part', () => {
  expect(formatMS(24 * 60 * 60 * 1000 + 3000)).toEqual('1 day');
});

it('Contain leading 0', () => {
  expect(formatMSToMinute(65 * 1000)).toEqual('01:05');
});
