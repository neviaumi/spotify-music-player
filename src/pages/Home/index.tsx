import React from 'react';

import useAccessToken from '../../hooks/useAccessToken';

export default function AuthCallback() {
  const { getAccessInfo } = useAccessToken();
  const accessInfo = getAccessInfo();
  return <div>{JSON.stringify(accessInfo, null, 4)}</div>;
}
