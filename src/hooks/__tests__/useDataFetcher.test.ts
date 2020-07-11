import useSWR from 'swr';

import useDataFetcher from '../useDataFetcher';

jest.mock('swr');

describe('Test useDataFetcher hook', () => {
  it('Should return data', () => {
    const useSWRMock = useSWR as TestUtils.JestMock<typeof useSWR>;
    useSWRMock.mockReturnValue({ data: {} });
    useDataFetcher<unknown>('foobar', jest.fn());
    expect(useSWRMock).toHaveBeenCalledWith('foobar', expect.any(Function));
  });

  it('Should throw error', () => {
    const useSWRMock = useSWR as TestUtils.JestMock<typeof useSWR>;
    useSWRMock.mockReturnValue({ error: new Error('foobar') });
    expect(() => useDataFetcher<unknown>('foobar', jest.fn())).toThrow(
      'Unable fetching data',
    );
  });
});
