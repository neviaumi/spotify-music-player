import React from 'react';

import HomeComponent from '../../components/Home';
import Nav from '../../components/Nav';
import Panel from '../../components/Panel';
import useAccessToken from '../../hooks/useAccessToken';

export default function Home() {
  const { getAccessInfo } = useAccessToken();
  const accessInfo = getAccessInfo();
  return (
    <Panel
      data-testid="panel"
      Left={<Nav />}
      Right={<HomeComponent />}
      Bottom={<div>Access Token: {accessInfo}</div>}
    />
  );
}
