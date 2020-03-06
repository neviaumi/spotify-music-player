import { shallow } from 'enzyme';
import React from 'react';

import withSuspense from '../withSuspense';

const Dummy = () => <div />;
const DummyWithSuspense = withSuspense<{ foo: string }>(Dummy);

it('Should render withSuspense', () => {
  const wrapper = shallow(<DummyWithSuspense foo="bar" />);
  const DummyWrapper = wrapper.find(Dummy);
  const SuspenseWrapper = wrapper.find('Suspense');
  expect(DummyWrapper).toBeDefined();
  expect(DummyWrapper.prop('foo')).toEqual('bar');
  expect(SuspenseWrapper).toBeDefined();
  expect(SuspenseWrapper.prop('fallback')).toBeDefined();
});
