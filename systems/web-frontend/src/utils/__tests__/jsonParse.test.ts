import { expect, it } from '../../../testHelper/test-runner';
import { jsonParse } from '../jsonParse';

it('Input is stringify object, should parse value', () => {
  expect(jsonParse(JSON.stringify({ foo: 'abc' }))).toEqual({ foo: 'abc' });
});

it('Input is string, should return original value', () => {
  expect(jsonParse('Hello World')).toEqual('Hello World');
});
