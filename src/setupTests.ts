// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';
import 'jest-expect-message';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// @ts-expect-error no type for this module
import MutationObserver from 'mutation-observer';

// @ts-expect-error no type for this module
global.MutationObserver = MutationObserver;

configure({ adapter: new Adapter() });
Object.assign(window, {
  location: {
    ...window.location,
    replace: jest.fn().mockReturnValue(undefined),
  },
});
// https://github.com/facebook/react/issues/11098
Object.assign(console, {
  error: jest.fn(),
});
