import orgExpect from 'expect';
// @ts-expect-error no typing
import withMessage from 'jest-expect-message/dist/withMessage';

window.expect = withMessage(orgExpect);

export const expect = window.expect;
