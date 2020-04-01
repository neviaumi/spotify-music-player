import { nanoid } from 'nanoid';

import { Cookie } from '../../storage';
import getAuthorizeUrl from './getAuthorizeUrl';

export interface State {}

export default (state: State) => {
  const transactionId = nanoid();
  const url = getAuthorizeUrl(transactionId);
  Cookie.setItem(transactionId, JSON.stringify(state));
  window.location.replace(url);
};
