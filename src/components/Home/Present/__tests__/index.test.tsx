import { render } from '@testing-library/react';
import React from 'react';

import PresentPlayList from '../';

describe('Test render Present component', () => {
  it('Should render Present component', () => {
    const { getByTestId } = render(
      <PresentPlayList playlists={[]} title="Hello World" />,
    );
    expect(getByTestId('present-plat-list')).toBeDefined();
  });
});
