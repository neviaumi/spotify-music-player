import React from 'react';

import Panel from '../../components/Panel';
import useAccessToken from '../../hooks/useAccessToken';

export default function Home() {
  const { getAccessInfo } = useAccessToken();
  const accessInfo = getAccessInfo();
  return (
    <Panel
      data-testid="panel"
      Left={<div>Hello</div>}
      Right={<div>World</div>}
      Bottom={<div>Access Token: {accessInfo}</div>}
    />
  );
}
