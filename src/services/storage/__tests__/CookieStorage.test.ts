import { CookieStorage } from '../CookieStorage';

describe('Test CookieStorage', () => {
  it('call getItem should call get', () => {
    const client = {
      get: jest.fn(),
    } as any;
    new CookieStorage(client).getItem('foo');
    expect(client.get).toHaveBeenCalledWith('foo');
  });
  it('call setItem should call set', () => {
    const client = {
      set: jest.fn(),
    } as any;
    new CookieStorage(client).setItem('foo', 'value', {});
    expect(client.set).toHaveBeenCalledWith('foo', 'value', {});
  });
  it('call removeItem should call remove', () => {
    const client = {
      remove: jest.fn(),
    } as any;
    new CookieStorage(client).removeItem('foo', {});
    expect(client.remove).toHaveBeenCalledWith('foo', {});
  });
});
