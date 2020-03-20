import Cookies from 'js-cookie';

import IStorage from './Storage';

function getCookie(client: Cookies.CookiesStatic, key: string) {
  return client.get(key) as string | null;
}

export class CookieStorage
  implements IStorage<Cookies.CookieAttributes, Cookies.CookiesStatic> {
  readonly length: number;

  constructor(readonly client: Cookies.CookiesStatic) {
    this.length = 0;
  }

  getItem(key: string): string | null {
    return getCookie(this.client, key);
  }

  removeItem(key: string, options?: Cookies.CookieAttributes): void {
    this.client.remove(key, options);
  }

  setItem(
    key: string,
    value: string,
    options?: Cookies.CookieAttributes,
  ): void {
    this.client.set(key, value, options);
  }
}
