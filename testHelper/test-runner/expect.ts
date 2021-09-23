// @ts-expect-error no typing
import matchers from '@testing-library/jest-dom/matchers';
import orgExpect from 'expect';
// @ts-expect-error no typing
import withMessage from 'jest-expect-message/dist/withMessage';

orgExpect.extend(matchers);
window.expect = withMessage(orgExpect);

export const expect = window.expect;
