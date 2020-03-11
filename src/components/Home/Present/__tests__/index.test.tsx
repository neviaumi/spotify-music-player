import { render } from '@testing-library/react';
import React from 'react';

import PresentPlayList from '../';
import ThemeProvider from '../../../../contexts/Theme';

describe('Test render Present component', () => {
  it('Should render Present component', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <PresentPlayList
          playlists={[
            {
              id: 'FooBarID',
              name: 'FooBar',
              description: 'FooBar',
              images: [{ url: 'https://www.google.com' }],
            } as any,
          ]}
          title="Hello World"
        />
      </ThemeProvider>,
    );
    expect(getByTestId('present-play-list')).toBeDefined();
    expect(getByTestId('present-play-list-item')).toBeDefined();
  });
});
