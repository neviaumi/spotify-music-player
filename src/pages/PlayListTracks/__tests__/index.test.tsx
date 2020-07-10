import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import PlayListTracks from '../index';

describe('Test render PlayListTracks', () => {
  it('Should render PlayListTracks', () => {
    const props = {
      match: {
        params: {
          playListId: 'foobar',
        },
      },
    };
    const { getByTestId } = render(
      <ThemeProvider>
        <PlayListTracks {...props} />
      </ThemeProvider>,
    );
    expect(getByTestId('playlist-tracks')).toBeDefined();
  });
});
