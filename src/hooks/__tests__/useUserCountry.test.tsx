import { renderHook } from '@testing-library/react-hooks/dom';
import { expect } from 'chai';

import { createPollyContext } from '../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../App';
import { useUserCountry } from '../useUserCountry';

const _context = createPollyContext();

describe('useUserCountry', () => {
  it('should return my current location - hk', async () => {
    const { result, waitFor } = renderHook(() => useUserCountry(), {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    });

    await waitFor(() => {
      expect(result.current).to.not.be.equal(undefined);
    });
    expect(result.current).to.be.equal('HK');
  });
});
