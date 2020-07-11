// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
Object.assign(window.location, {
  replace: jest.fn().mockReturnValue(undefined),
});
// https://github.com/facebook/react/issues/11098
Object.assign(console, {
  error: jest.fn(),
});
jest.mock('./hooks/useAccessToken');
