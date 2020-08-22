import nanoid from 'nanoid';

import Storage from '../../storage';
import getAuthorizeUrl from './getAuthorizeUrl';

export interface State {
  [key: string]: unknown;
}

export default (state: State) => {
  const transactionId = nanoid();
  const url = getAuthorizeUrl(transactionId);
  Storage.setItem(transactionId, JSON.stringify(state));
  window.location.replace(url);
};
