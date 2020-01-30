import getAuthorizeUrl from './getAuthorizeUrl';

export default () => {
  const url = getAuthorizeUrl();
  window.location.replace(url);
};
