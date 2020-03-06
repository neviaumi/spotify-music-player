// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import pollyContext from './polly.config';

configure({ adapter: new Adapter() });
Object.assign(window.location, {
  replace: jest.fn().mockReturnValue(undefined),
});
jest.mock('./hooks/useDataFetcher');
jest.mock('./hooks/useAccessToken');

global.pollyContext = pollyContext;
// Wait until all network requests are handled by Polly before ending each test.
global.afterEach(async () => {
  await pollyContext.polly?.flush();
});
