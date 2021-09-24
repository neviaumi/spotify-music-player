import { expect, it, jest } from '../../../testHelper/test-runner';
import { getCurrentTimestamp } from '../getCurrentTimestamp';

it('Should get current timestamp from milliseconds', () => {
  jest.spyOn(Date, 'now').mockReturnValue(1580380185812);
  expect(getCurrentTimestamp()).toEqual(1580380185);
});
