import { render, screen } from '@testing-library/react';

import withSuspense from '../withSuspense';

const Dummy = () => <div data-testid="dummy" />;
const DummyWithSuspense = withSuspense<{ foo: string }>(Dummy);

it('Should render withSuspense', () => {
  render(<DummyWithSuspense foo="bar" />);
  expect(screen.getByTestId('dummy')).toBeVisible();
});
