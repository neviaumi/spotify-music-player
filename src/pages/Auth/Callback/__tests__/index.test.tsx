import { shallow } from 'enzyme';
import React from 'react';
import { Redirect } from 'react-router-dom';

import useAccessToken from '../../../../hooks/useAccessToken';
import AuthCallback from '../index';

jest.mock('../../../../hooks/useAccessToken');
const useAccessTokenSpy = useAccessToken as TestUtils.JestMock<
  typeof useAccessToken
>;
it('Should render without error', () => {
  useAccessTokenSpy.mockReturnValue({
    getAccessInfo: jest.fn().mockReturnValue('Spotify Access Token here'),
    setAccessInfo: jest.fn(),
  });
  const wrapper = shallow(<AuthCallback />);
  const redirect = wrapper.find(Redirect).first();
  expect(redirect).toBeDefined();
  expect(redirect.prop('to')).toEqual({
    pathname: '/',
    state: { from: undefined },
  });
});
